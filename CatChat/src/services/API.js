import axios from 'axios';
import { io } from 'socket.io-client';

export const socket = io('http://localhost:8000', {
  transports: ['websocket', 'polling'],
  withCredentials: true,
  reconnection: true, // Включает автоматическое восстановление соединения
  reconnectionAttempts: 5, // Максимальное количество попыток восстановления
  reconnectionDelay: 1000, // Задержка между попытками восстановления (в миллисекундах)
});

export const getArchivedRooms = uname => {
  socket.emit('get_archived_rooms', { username: uname });
};

axios.defaults.baseURL = 'http://localhost:8000/api';

export const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

export const loginFoo = async credentials => {
  const { data } = await axios.post('token/login', credentials);

  return data;
};
export const getCurrentUser = async credentials => {
  console.log(credentials);
  const { data } = await axios.get('user', {
    headers: {
      Authorization: `Bearer ${credentials}`, // Передаем токен
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Для передачи куки и авторизационных данных
  });
  return data;
};

export const getCurrentUserToken = async token => {
  try {
    const { data } = await axios.get('user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(
      'Error fetching data:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserProfile = async token => {
  try {
    const result = await axios.get('user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (error) {
    console.error(
      'Error fetching data:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getManagers = async () => {
  try {
    const response = await axios.get('managers');
    return response.data;
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    throw error;
  }
};

export const getManager = async username => {
  try {
    const response = await axios.get(`managers/${username}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении менеджера:', error);
    throw error;
  }
};

export const getRooms = async username => {
  try {
    const response = await axios.get(`rooms/${username}`);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении комнат:', error);
    throw error;
  }
};

export const replaceManager = async (
  roomId,
  oldManagerUsername,
  newManagerUsername
) => {
  try {
    const response = await axios.put(`rooms/${roomId}/replace-manager`, {
      oldManagerUsername,
      newManagerUsername,
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при замене менеджера:', error);
    throw error;
  }
};
