const router = require('express').Router();
var db = require('../../models');

router.get('/get/all/:proj_id', function (req, res) {
  db.Task.findAll({
    where: { id_project: req.params.proj_id },
  }).then((allTasks) => {
    res.json(allTasks);
  });
});

router.post('/create', function (req, res) {
  const task = req.body;
  db.Task.create({
    id_user: task.id_user,
    id_project: task.id_project,
    id_column: task.id_column,
    column_place: task.column_place,
    created_by: task.created_by,
    task_title: task.task_title,
    task_description: task.task_description,
    start_date: task.start_date,
    end_date: task.end_date,
    id_label1: task.id_label1,
    id_label2: task.id_label2,
    id_label3: task.id_label3,
    complete: task.complete,
  }).then((result) => {
    console.log(result);
    res.redirect('/');
  });
});

router.put('/', function (req, res) {
  //do things here for other routes
});

router.delete('/', function (req, res) {
  //do things here for other routes
});

module.exports = router;
