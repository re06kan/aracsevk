const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.kayit = async (req, res) => {
  try {
    const user = await User.create({
      tcKimlikNo: req.body.tcKimlikNo,
      ad: req.body.ad,
      soyad: req.body.soyad,
      sifre: bcrypt.hashSync(req.body.sifre, 8),
      rol: req.body.rol
    });

    res.send({ message: 'Kullanıcı başarıyla kaydedildi!' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.giris = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        tcKimlikNo: req.body.tcKimlikNo
      }
    });

    if (!user) {
      return res.status(404).send({ message: 'Kullanıcı bulunamadı.' });
    }

    const sifreGecerli = bcrypt.compareSync(req.body.sifre, user.sifre);

    if (!sifreGecerli) {
      return res.status(401).send({
        message: 'Geçersiz şifre!'
      });
    }

    if (!user.aktif) {
      return res.status(401).send({
        message: 'Hesabınız aktif değil!'
      });
    }

    const token = jwt.sign(
      { id: user.id, tcKimlikNo: user.tcKimlikNo, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: 86400 } // 24 saat
    );

    res.status(200).send({
      id: user.id,
      tcKimlikNo: user.tcKimlikNo,
      ad: user.ad,
      soyad: user.soyad,
      rol: user.rol,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
