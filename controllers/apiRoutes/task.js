const router = require('express').Router();
var db = require('../../models');

router.get('/get/all/:proj_id', function (req, res) {
  db.Task.findAll({
    where: { id_project: req.params.proj_id },
  }).then((allTasks) => {
    res.json(allTasks);
  });
});

router.post('/create/:proj_id', function (req, res) {
  const task = req.body;
  db.Task.create({
    id_user: task.id_user,
    id_project: req.params.proj_id,
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
    res.json(result);
  });
});

router.put('/edit/:id_task/:proj_id', function (req, res) {
  db.Task.update(
    {
      task_title: req.body.task_title,
      task_description: req.body.task_description,
    },
    {
      where: { id_task: req.params.id_task },
    },
  ).then(() => {
    db.Task.findAll({
      where: { id_project: req.params.proj_id },
    }).then((response) => {
      console.log(response);
      res.json(response);
    });
  });
});

router.delete('/delete/:proj_id', function (req, res) {
  const task = req.body;
  db.Task.destroy({
    where: {
      id_task: task.id_task,
      id_project: req.params.proj_id,
    },
  })
    .then((task) => {
      db.Task.findAll().then((tasks) => res.json(tasks));
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
