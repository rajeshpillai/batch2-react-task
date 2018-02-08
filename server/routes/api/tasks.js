var router = require('express').Router();

// Get all tasks
router.get("/tasks", function (req, res) {
    let db = req.db;
    res.json(db.tasks);
});


// Delete tasks by id
router.delete("/tasks/:id", function (req, res) {
    console.log("deleting todo with id: ", req.params.id);
    res.redirect("/");
});

// Edit task
router.put("/task/", function (req, res) {
    res.redirect("/");
});
    
router.post('/tasks', (req, res) => { 
    res.redirect("/");
});

module.exports = router;