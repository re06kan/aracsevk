module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define('vehicle', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    currentMileage: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('AVAILABLE', 'IN_TASK', 'TASK_COMPLETED'),
      defaultValue: 'AVAILABLE'
    },
    route: {
      type: Sequelize.STRING
    },
    lastTaskStartMileage: {
      type: Sequelize.FLOAT
    },
    lastTaskEndMileage: {
      type: Sequelize.FLOAT
    }
  });

  return Vehicle;
};
