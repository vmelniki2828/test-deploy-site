const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const Manager = require("./models/Manager");
const Room = require("./models/Room");
const app = express();
const server = http.createServer(app);
const managersRoutes = require("./routes/managersRoutes");
const roomRoutes = require("./routes/roomsRoutes");
const authRoutes = require("./routes/authRoutes");
const { default: mongoose } = require("mongoose");
const ArchivedRoom = require("./models/archivedRoom");
const path = require("path");
const WebSocket = require('ws');
const fs = require('fs');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Укажите правильный адрес вашего клиента (фронтенда)
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Укажите правильный адрес вашего клиента (фронтенда)
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

mongoose
  .connect("mongodb://127.0.0.1:27017/chat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Подключение к базе данных MongoDB установлено");
  })
  .catch((err) => {
    console.error("Ошибка подключения к базе данных MongoDB", err);
  });

app.use(express.static("public"));
app.use(express.json());
app.use("/api", managersRoutes);
app.use("/api", roomRoutes);
app.use("/api", authRoutes);
app.use('/uploads', express.static('uploads'));
app.set("io", io);

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("Нет файла для загрузки.");
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`; // URL для доступа к файлу

  io.emit("file_uploaded", { url: fileUrl, filename: req.file.originalname });

  res.send({ message: "Файл успешно загружен.", fileUrl });
});

const getRandomManager = async () => {
  try {
    const managers = await Manager.find(); // Получаем всех менеджеров
    if (managers.length === 0) {
      return null; // Если менеджеров нет, возвращаем null
    }
    const randomIndex = Math.floor(Math.random() * managers.length); // Выбираем случайный индекс
    return managers[randomIndex];
  } catch (err) {
    console.error("Ошибка при получении случайного менеджера", err);
    throw err; // Выбрасываем ошибку только если произошла ошибка с базой данных
  }
};

io.on("connection", (socket) => {
  console.log("Новый клиент подключен:", socket.id);

  socket.on("join_manager", async (username) => {
    console.log(`Менеджер ${username} присоединился`);
    try {
      let manager = await Manager.findOne({ username });
      if (!manager) {
        manager = new Manager({ username, socketId: socket.id });
        await manager.save();
      } else {
        manager.socketId = socket.id;
        await manager.save();
      }

      // Подключаем менеджера ко всем комнатам, где он участвует
      const rooms = await Room.find({ "managers.username": username });
      rooms.forEach((room) => {
        socket.join(room.roomId);
      });

      console.log(`Менеджер ${username} присоединился ко всем комнатам`);
      socket.emit("manager_connected", { username });
    } catch (err) {
      console.error("Ошибка при сохранении менеджера в базе данных", err);
    }
  });

  socket.on("delete_manager", async (username) => {
    console.log(`Менеджер ${username} вышел`);
    try {
      const manager = await Manager.findOneAndDelete({ username });
      if (manager) {
        console.log(`Менеджер ${username} удален из базы данных`);
      } else {
        console.log(`Менеджер ${username} не найден в базе данных`);
      }
    } catch (err) {
      console.error("Ошибка при удалении менеджера из базы данных", err);
    }
  });

  socket.on("join_user", async ({ username, email, otherInfo }) => {
    try {
      const randomManager = await getRandomManager();
      if (!randomManager) {
        socket.emit(
          "noManagersAvailable",
          "Нет доступных менеджеров. Комната не может быть создана."
        );
        return;
      }

      const clientForRoom = {
        username,
        clientId: socket.id,
        email,
        otherInfo,
      };

      const newRoom = new Room({
        roomId: `room_${clientForRoom.clientId}`,
        clients: clientForRoom,
        managers: [],
        messages: [],
      });

      await newRoom.save();
      console.log(`Комната с ID ${newRoom.roomId} успешно создана`);
      socket.emit("roomCreated", newRoom.roomId);

      newRoom.managers.push({
        username: randomManager.username,
        socketId: randomManager.socketId,
      });
      socket.emit("manager_assigned", randomManager);
      await newRoom.save();

      io.emit("newChat", newRoom);

      socket.join(newRoom.roomId);
    } catch (err) {
      console.error(
        "Ошибка при создании комнаты или присоединении клиента",
        err
      );
      socket.emit(
        "errorCreatingRoom",
        "Произошла ошибка при создании комнаты."
      );
    }
  });

  socket.on("rejoin_user", async ({ username, roomId }) => {
    try {
      // Retrieve the room
      const room = await Room.findOne({ roomId }).lean();
      if (!room) {
        socket.emit("error", "Комната не найдена");
        return;
      }

      // Emit existing messages to the user
      socket.emit("roomRejoined", room.messages);

      // Check for a random manager and reassign if necessary
      if (room.managers.length === 0) {
        const randomManager = await getRandomManager();
        if (randomManager) {
          room.managers.push({
            username: randomManager.username,
            socketId: randomManager.socketId,
          });
          await room.save();
          io.emit("newChat", room);
          socket.emit("manager_assigned", randomManager);
          console.log(
            `Менеджер ${randomManager.username} назначен для повторного подключения пользователя ${username}.`
          );
        } else {
          socket.emit("noManagersAvailable", "Нет доступных менеджеров.");
        }
      }

      // Make the user join the room
      socket.join(roomId);
    } catch (error) {
      console.error("Ошибка при повторном подключении:", error);
      socket.emit("error", "Ошибка при повторном подключении.");
    }
  });

  socket.on("send_message", async (message) => {
    const { roomId, sender, messageText, fileUrl  } = message;
    try {
      const room = await Room.findOne({ roomId });
      if (!room) {
        console.error("Комната не найдена");
        socket.emit("error_message", { message: "Комната не найдена." });
        return;
      }

      const newMessage = {
        sender,
        message: messageText,
        fileUrl: fileUrl || null,
        timestamp: new Date(),
      };

      // Добавляем новое сообщение в комнату
      room.messages.push(newMessage);
      console.log("Добавляем сообщение в комнату:", newMessage);
      await room.save();

      console.log("Новое сообщение сохранено:", newMessage);

      // Отправляем новое сообщение всем клиентам в комнате
      io.to(roomId).emit("receive_message", {
        id: room.roomId,
        messages: room.messages,
      });

      // Отправляем уведомление всем менеджерам, если они подключены
      const managers = await Manager.find(); // Получаем всех менеджеров
      managers.forEach((manager) => {
        if (manager.socketId) {
          io.to(manager.socketId).emit("manager_chat_update", {
            roomId,
            newMessage,
          });
        }
      });

      console.log(`Сообщение отправлено в комнату ${roomId}`);
    } catch (err) {
      console.error("Ошибка при отправке сообщения", err);
      socket.emit("error_message", {
        message: "Ошибка при отправке сообщения. Попробуйте еще раз.",
      });
    }
  });

  socket.on("get_room_messages", async (roomId) => {
    try {
      const room = await Room.findOne({ roomId });

      if (!room) {
        socket.emit("error_message", { message: "Комната не найдена." });
        return;
      }

      socket.emit("receive_message", {
        id: room.roomId,
        messages: room.messages, // Отправляем все сообщения комнаты
      });
    } catch (err) {
      console.error("Ошибка при получении сообщений комнаты", err);
      socket.emit("error_message", {
        message: "Ошибка при получении сообщений.",
      });
    }
  });

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`Клиент ${socket.id} присоединился к комнате ${roomId}`);
    console.log("Текущие комнаты:", socket.rooms);
  });

  socket.on("disconnect_chat", async (roomId) => {
    try {
      const room = await Room.findOne({ roomId });
      if (room) {
        // Создаем архивную комнату на основе текущей
        console.log(room);
        const archivedRoom = new ArchivedRoom({
          roomId: room.roomId,
          clients: room.clients,
          managers: room.managers,
          messages: room.messages,
          startTime: room.startTime,
          endTime: new Date(), // Время окончания чата
        });

        await archivedRoom.save(); // Сохраняем архивную комнату

        // Удаляем активную комнату из коллекции Room
        await Room.deleteOne({ roomId: roomId });
        console.log(
          `Комната с ID ${roomId} была архивирована и удалена из активных комнат`
        );

        setTimeout(async () => {
          try {
            await ArchivedRoom.deleteOne({ roomId: archivedRoom.roomId });
            console.log(
              `Архивная комната с ID ${archivedRoom.roomId} была удалена через 2 минуты`
            );
          } catch (err) {
            console.error("Ошибка при удалении архивной комнаты", err);
          }
        }, 2 * 60 * 1000); // 2 минуты в миллисекундах

        io.to(roomId).emit(
          "chat_disconnected",
          "Чат был отключен и архивирован."
        );
        io.in(roomId).socketsLeave(roomId);
        io.emit("update_chat_list");
        console.log("Событие update_chat_list отправлено");
      } else {
        console.log(`Комната с ID ${roomId} не найдена`);
      }
    } catch (err) {
      console.error("Ошибка при архивации комнаты", err);
    }
  });  

  socket.on("get_archived_rooms", async ({ username }) => {
    try {
      // Находим все архивные комнаты, где менеджер с указанным именем участвовал
      const archivedRooms = await ArchivedRoom.find({
        "managers.username": username,
      });

      socket.emit("archived_rooms_update", archivedRooms); // Отправляем результат клиенту
    } catch (err) {
      console.error("Ошибка при получении архивированных чатов", err);
    }
  });
});

const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
