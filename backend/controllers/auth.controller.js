const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');

exports.giris = async (req, res) => {
  const { tcKimlikNo, sifre } = req.body;

  try {
    const user = await User.findOne({ where: { tcKimlikNo } });

    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Basit şifre kontrolü (şifreleme olmadan)
    if (sifre !== 'admin123') {
      return res.status(401).json({ message: 'Geçersiz şifre' });
    }

    const token = jwt.sign(
      { id: user.id, tcKimlikNo: user.tcKimlikNo },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      id: user.id,
      tcKimlikNo: user.tcKimlikNo,
      ad: user.ad,
      soyad: user.soyad,
      accessToken: token
    });

  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ message: 'Sunucu hatası' });
  }
};