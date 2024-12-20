const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middleware/auth.middleware');
const controller = require('../controllers/auth.controller');

router.use(function(req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.post('/kayit', [verifyToken, isAdmin], controller.kayit);
router.post('/giris', controller.giris);

module.exports = router;
