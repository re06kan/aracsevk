module.exports = function(app) {
    // Vehicle routes will be implemented later
    app.get('/api/vehicles', (req, res) => {
        res.json({ message: "Vehicle routes will be implemented" });
    });
};
