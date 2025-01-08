const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers['authorization'];

  console.log('Incoming request headers:', req.headers);
  console.log('Token received:', token);

  if (!token) {
    console.error('No token provided');
    return res.status(403).send({
      message: 'Token gerekli!'
    });
  }

  try {
    const cleanToken = token.replace('Bearer ', '');
    console.log('Clean token:', cleanToken);

    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).send({
      message: 'Yetkisiz erişim!',
      error: err.message
    });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.rol === 'admin') {
    next();
    return;
  }

  res.status(403).send({
    message: 'Admin yetkisi gerekli!'
  });
};

module.exports = {
  verifyToken,
  isAdmin
};
