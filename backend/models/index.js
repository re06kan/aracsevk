const { Sequelize } = require('sequelize');
const config = require('../config/db.config.js');

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);
db.vehicles = require('./vehicle.model.js')(sequelize, Sequelize);
db.drivers = require('./driver.model.js')(sequelize, Sequelize);
db.tasks = require('./task.model.js')(sequelize, Sequelize);

// Define relationships
db.vehicles.belongsTo(db.drivers);
db.drivers.hasMany(db.vehicles);

db.tasks.belongsTo(db.vehicles);
db.vehicles.hasMany(db.tasks, { limit: 20 });

db.tasks.belongsTo(db.drivers);
db.drivers.hasMany(db.tasks);

module.exports = db;
