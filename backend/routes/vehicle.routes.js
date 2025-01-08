const { authMiddleware } = require('../middleware/auth.middleware');
const db = require('../models');
const Vehicle = db.vehicles;

module.exports = (app) => {
    // Tüm araçları getir
    app.get('/api/vehicles', authMiddleware, async (req, res) => {
        try {
            console.log('Vehicle fetch request received');
            console.log('Vehicle model:', Vehicle);
            console.log('Request headers:', req.headers);
            console.log('Request user:', req.user); // Middleware'den gelen kullanıcı bilgisi
            
            const vehicles = await Vehicle.findAll({
                attributes: ['plaka', 'marka', 'model', 'durum'],
                where: { aktif: true },
                raw: true  // Düz veri almak için
            });

            console.log('Fetched vehicles count:', vehicles.length);
            console.log('Fetched vehicles:', JSON.stringify(vehicles, null, 2));

            const formattedVehicles = vehicles.map(vehicle => ({
                plate: vehicle.plaka,
                brand: vehicle.marka,
                model: vehicle.model,
                status: vehicle.durum
            }));

            console.log('Formatted vehicles:', JSON.stringify(formattedVehicles, null, 2));

            res.json(formattedVehicles);
        } catch (error) {
            console.error('Vehicle fetch error:', error);
            console.error('Full error details:', JSON.stringify(error, null, 2));
            res.status(500).json({ message: 'Araçlar getirilemedi', error: error.message });
        }
    });

    // Araç istatistiklerini getir
    app.get('/api/vehicles/stats', authMiddleware, async (req, res) => {
        try {
            const totalVehicles = await Vehicle.count({ where: { aktif: true } });
            const readyVehicles = await Vehicle.count({
                where: { 
                    durum: 'MUSAIT',
                    aktif: true 
                }
            });
            const onDutyVehicles = await Vehicle.count({
                where: { 
                    durum: 'GOREVDE',
                    aktif: true 
                }
            });

            console.log('Vehicle stats:', {
                total: totalVehicles,
                ready: readyVehicles,
                onDuty: onDutyVehicles
            });

            res.json({
                total: totalVehicles,
                ready: readyVehicles,
                onDuty: onDutyVehicles,
                longRoute: 0,
                standby: 0
            });
        } catch (error) {
            console.error('Vehicle stats error:', error);
            res.status(500).json({ message: 'Araç istatistikleri getirilemedi', error: error.message });
        }
    });
};
