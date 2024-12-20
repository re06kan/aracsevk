module.exports = (sequelize, Sequelize) => {
  const Driver = sequelize.define('driver', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ad: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    soyad: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    tcKimlikNo: {
      type: Sequelize.STRING(11),
      allowNull: false,
      unique: true
    },
    telefon: {
      type: Sequelize.STRING(15),
      allowNull: false
    },
    ehliyetSinifi: {
      type: Sequelize.STRING(10)
    },
    aktif: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  return Driver;
};
