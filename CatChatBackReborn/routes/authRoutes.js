const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Настройка CORS
app.use(cors({
  origin: 'http://95.164.33.221:3000', // Укажите здесь ваш фронтенд домен
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Установите true, если ваш фронтенд использует куки
}));

// Middleware для обработки JSON
app.use(express.json());

// Установите базовый URL для запросов
axios.defaults.baseURL = `http${
  process.env.REACT_APP_SECURE === 'true' ? 's' : ''
}://${process.env.REACT_APP_BACKEND_URL}/api`;

// Маршрут для авторизации (логина)
authRoutes.post('/token/login', async (req, res) => {
  try {
    const { data } = await axios.post('token/login', req.body);
    res.json(data);
  } catch (error) {
    console.error('Ошибка при авторизации:', error.response?.data || error.message);
    res.status(500).json({ error: 'Ошибка при авторизации' });
  }
});