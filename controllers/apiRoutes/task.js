const router = require('express').Router();
var db = require('../../models');

router.get('/get/all/:proj_id', function (req, res) {
  db.Task.findAll({
    where: { id_project: req.params.proj_id },
  }).then((allTasks) => {
    res.json(allTasks);
  });
});

router.get('/', function (req, res) {
  if (req.query.task_id)
    db.Task.findOne({
      where: { id_task: req.query.task_id },
    }).then((task) => {
      res.json(task);
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
    req.io.sockets.emit('newTask', result);
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
      req.io.sockets.emit('newTask', response);

    });
  });
});

// add id_label to a task
router.put('/', function (req, res) {
  const task = req.body;
  db.Task.update(
    {
      id_label1: task.id_label1,
      id_label2: task.id_label2,
      id_label3: task.id_label3,
    },
    {
      where: { id_task: req.query.id_task },
    },
  )
    .then((res) => {
      req.io.sockets.emit('newLabel', res);

      res.json(res);
    })
    .catch((err) => {
      res.json(err);
    });
});

// remove a label, replacing with null and shift remaining labels over in id_label columns
router.put('/label/remove/', function (req, res) {
  const task = req.body;
  // find the task being updated
  db.Task.findOne({
    where: { id_task: req.query.id_task },
  }).then((response) => {
    const result = response.dataValues;
    // find the incoming label id in the three columns and replace it with null
    // shift over remaining label ids
    if (result.id_label1 === task.id_label) {
      db.Task.update(
        {
          id_label1: result.id_label2,
          id_label2: result.id_label3,
          id_label3: null,
        },
        {
          where: { id_task: req.query.id_task },
        },
      );
    } else if (result.id_label2 === task.id_label) {
      db.Task.update(
        {
          id_label1: result.id_label1,
          id_label2: result.id_label3,
          id_label3: null,
        },
        {
          where: { id_task: req.query.id_task },
        },
      );
    } else if (result.id_label3 === task.id_label) {
      db.Task.update(
        {
          id_label1: result.id_label1,
          id_label2: result.id_label2,
          id_label3: null,
        },
        {
          where: { id_task: req.query.id_task },
        },
      );
    }
    req.io.sockets.emit('newLabel', response);

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
      db.Task.findAll().then((tasks) => {
        res.json(tasks);
        req.io.sockets.emit('newTask', tasks);
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
