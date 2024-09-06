const express = require('express');
const cors = require('cors');
const axios = require('axios');
const router = express.Router();

const app = express();

// Настройка CORS
app.use(cors({
  origin: 'http://95.164.33.221:3000', // Укажите здесь ваш фронтенд домен
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type"],
  credentials: true, // Установите true, если ваш фронтенд использует куки
}));
// Установите базовый URL для запросов
axios.defaults.baseURL = `https://test.cat-tools.com/api`;

app.use(express.json());

// Маршрут для авторизации (логина)
router.post('/token/login', async (req, res) => {
  try {
    const { data } = await axios.post('token/login', req.body);
    res.json(data);
  } catch (error) {
    console.error('Ошибка при авторизации:', error.response?.data || error.message);
    res.status(500).json({ error: 'Ошибка при авторизации' });
  }
});

router.get('/user', async (req, res) => {
  try {
    const { data } = await axios.get('user', req.body);
    res.json(data);
  } catch (error) {
    console.error('Ошибка при авторизации:', error.response?.data || error.message);
    res.status(500).json({ error: 'Ошибка при авторизации' });
  }
});


module.exports = router;
