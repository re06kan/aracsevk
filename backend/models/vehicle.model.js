module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define('vehicle', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    plaka: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    marka: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    model: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    modelYili: {
      type: Sequelize.INTEGER
    },
    kilometresi: {
      type: Sequelize.DECIMAL(10, 2),
      defaultValue: 0,
      allowNull: false
    },
    sonGorevKilometresi: {
      type: Sequelize.DECIMAL(10, 2)
    },
    durum: {
      type: Sequelize.ENUM('MUSAIT', 'GOREVDE', 'UZUN_YOLDA', 'KADEMEDE'),
      defaultValue: 'MUSAIT'
    },
    aktif: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'vehicles',
    timestamps: true
  });

  return Vehicle;
};
