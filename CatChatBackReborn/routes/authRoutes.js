const express = require('express');
const axios = require('axios');
const router = express.Router();

// Установите базовый URL для запросов
axios.defaults.baseURL = `http${
  process.env.REACT_APP_SECURE === 'true' ? 's' : ''
}://${process.env.REACT_APP_BACKEND_URL}/api`;

// Маршрут для авторизации (логина)
router.post('/login', async (req, res) => {
  try {
    const { data } = await axios.post('token/login', req.body);
    res.json(data);
  } catch (error) {
    console.error('Ошибка при авторизации:', error.response?.data || error.message);
    res.status(500).json({ error: 'Ошибка при авторизации' });
  }
});


module.exports = router;
