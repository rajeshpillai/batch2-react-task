var router = require('express').Router();

// Get all tasks
router.get("/tasks", function (req, res) {
    let db = req.db;
    console.log("Sending..", db.tasks);
    res.json(db.tasks);
});


// Delete tasks by id
router.delete("/task/:id", function (req, res) {
    console.log("deleting todo with id: ", req.params.id);
    res.json({id: req.params.id});
});

// Edit task
router.put("/task/", function (req, res) {
    console.log("editing...", req.body.task);
    res.json(req.body);
});

// Toggle Edit task
router.put("/task/toggle/:id", function (req, res) {
    let db = req.db;
    var task = db.tasks.find((task) => {
        return task.id == req.params.id;
    });
    task.edit = !task.edit;
    console.log("edit: ", task);
    res.json(task);
});

router.post('/task', (req, res) => { 
    console.log("post: ", req.body);
    res.json(req.body);
});

module.exports = router;