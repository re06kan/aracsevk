module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tcKimlikNo: {
      type: Sequelize.STRING(11),
      allowNull: false,
      unique: true,
      validate: {
        len: [11, 11],
        isNumeric: true
      }
    },
    ad: {
      type: Sequelize.STRING,
      allowNull: false
    },
    soyad: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sifre: {
      type: Sequelize.STRING,
      allowNull: false
    },
    rol: {
      type: Sequelize.ENUM('admin', 'kullanici'),
      defaultValue: 'kullanici'
    },
    aktif: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return User;
};
