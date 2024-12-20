module.exports = function(app) {
    // Driver routes will be implemented later
    app.get('/api/drivers', (req, res) => {
        res.json({ message: "Driver routes will be implemented" });
    });
};
