module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('task', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gorevTipi: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    guzergah: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    baslangicKm: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    },
    bitisKm: {
      type: Sequelize.DECIMAL(10, 2)
    },
    durum: {
      type: Sequelize.ENUM('BEKLEMEDE', 'DEVAM_EDIYOR', 'TAMAMLANDI'),
      defaultValue: 'BEKLEMEDE'
    },
    baslamaTarihi: {
      type: Sequelize.DATE
    },
    bitisTarihi: {
      type: Sequelize.DATE
    },
    notlar: {
      type: Sequelize.TEXT
    }
  });

  return Task;
};
