import axios from 'axios';
import { io } from 'socket.io-client';

export const socket = io('http://95.164.33.221', {
  transports: ['websocket', 'polling'],
  withCredentials: true,
  reconnection: true, // Включает автоматическое восстановление соединения
  reconnectionAttempts: 5, // Максимальное количество попыток восстановления
  reconnectionDelay: 1000, // Задержка между попытками восстановления (в миллисекундах)
});

export const getArchivedRooms = (uname) => {
  socket.emit("get_archived_rooms", { username: uname });
};


axios.defaults.baseURL = `http${
process.env.REACT_APP_SECURE === 'true' ? 's' : ''
  }://${process.env.REACT_APP_BACKEND_URL}/api`;
  
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
    const { data } = await axios.get('user', credentials);
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