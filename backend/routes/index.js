const authRoutes = require('./auth.routes');
const vehicleRoutes = require('./vehicle.routes');
const driverRoutes = require('./driver.routes');
const taskRoutes = require('./task.routes');

module.exports = function(app) {
    authRoutes(app);
    vehicleRoutes(app);
    driverRoutes(app);
    taskRoutes(app);
};
