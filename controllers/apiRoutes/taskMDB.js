const router = require('express').Router();
var db = require('../../models/TaskMDB.js');

// find all project tasks
router.get('/all/:id_project', function ({params}, res) {
    console.log(params.id_project)
  if (params.id_project) {
    db.find(params.body).then((allTasks) => {
      res.json(allTasks);
    });
  }
});
// find task to render in task modal
router.get('/:id_task', function ({params}, res) {
  if (params.id_task)
    db.findOne(params).then((task) => {
      res.json(task);
    });
});

// create a Task
router.post('/create', ({ body, io }, res) => {
  db.create(body)
    .then((dbTask) => {
      io.sockets.emit(`newTask${body.id_project}`, dbTask);
      res.json(dbTask);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// add exercises to a already existing Task
router.put('/edit/:id_task/:id_project', ({ body, params }, res) => {
  console.log(params);
  db.findOneAndUpdate(params, body, { new: true })
    .then((dbTask) => {
      console.log(dbTask);
      res.json(dbTask);
    })
    .catch((err) => res.status(401).json(err));
});

// add id_label to a task
router.put('/', function ({ body, query, params, io }, res) {
  db.findOneAndUpdate(query, body, { new: true })
    .then((task) => {
      io.sockets.emit(`newTask${query.id_project}`, task);
      res.json(task);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete('/delete', ({ body, query, io }, res) => {
  console.log(body);
  if (body.id_project && body.id_task) {
    db.findOneAndDelete({
      id_project: body.id_project,
      id_task: body.id_task,
    })
      .then((task) => {
        db.find({ id_project: body.id_project }).then((tasks) => {
          res.json(tasks);
          io.sockets.emit(`newTask${body.id_project}`, tasks);
        });
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

//delete all associated tasks when column is deleted
router.delete('/cdelete', function ({ body, query, io }, res) {
  if (body.id_project && typeof body.id_column === 'number') {
    db.deleteMany({
      id_project: body.id_project,
      id_column: body.id_column,
    })
      .then((task) => {
          console.log(task)
        db.find({ id_project: body.id_project }).then((tasks) => {
          res.json(tasks);
          io.sockets.emit(`newTask${body.id_project}`, tasks);
        });
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

module.exports = router;
