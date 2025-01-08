require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

// Veritabanı bağlantısı ve sunucuyu başlat
db.sequelize.sync()
  .then(() => {
    console.log('Veritabanı bağlantısı başarılı.');
    app.listen(PORT, () => {
      console.log(`Sunucu ${PORT} portunda çalışıyor.`);
    });
  })
  .catch(err => {
    console.error('Veritabanı bağlantı hatası:', err);
  });