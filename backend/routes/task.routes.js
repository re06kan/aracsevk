module.exports = function(app) {
    // Task routes will be implemented later
    app.get('/api/tasks', (req, res) => {
        res.json({ message: "Task routes will be implemented" });
    });
};
