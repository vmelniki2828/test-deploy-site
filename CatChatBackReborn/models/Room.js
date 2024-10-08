const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: String,
  message: String,
  fileUrl: String,
  timestamp: String,
});

const clientSchema = new mongoose.Schema({
  username: String,
  clientId : String,
  email: String, 
  otherInfo: Object,
});

const roomSchema = new mongoose.Schema({
  // roomID
  roomId: String,
  clients: clientSchema, // Использовать отдельную схему для клиентов
  managers: [], // Менеджеры чата
  messages: [messageSchema],
  startTime: { type: Date, default: Date.now }, // Время начала чата
  endTime: Date, // Время окончания чата.
  //  Добавить логику когда заканчивается чат! Возможно 10 минут спустя последнего сообщения. Как вариант

});

module.exports = mongoose.model("Room", roomSchema);
