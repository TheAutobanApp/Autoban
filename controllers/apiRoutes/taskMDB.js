const router = require('express').Router();
var db = require('../../models/TaskMDB.js');

// find all project tasks
router.get('/all/:id_project', function ({ params }, res) {
  if (params.id_project) {
    db.find(params)
      .sort({ column_place: -1 })
      .then((allTasks) => {
        res.json(allTasks);
      });
  }
});
// find task to render in task modal
router.get('/:_id', function ({ params }, res) {
  if (params._id)
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

// update a task
router.put('/edit/:_id', ({ body, params, io }, res) => {
  db.findByIdAndUpdate(params._id, body, { new: true })
    .then((dbTask) => {
      console.log(dbTask);
      db.find({ id_project: dbTask.id_project }).then((tasks) => {
        res.json(tasks);
        io.sockets.emit(`taskUpdate${dbTask.id_project}`, tasks);
      });
    })
    .catch((err) => res.status(401).json(err));
});

// update a task spot after drag
router.put('/drop/:new_column', ({ body, io, params }, res) => {
  console.log(body);
  body.forEach(async (task, index) => {
    console.log(index);
    db.findByIdAndUpdate(
      task._id,
      { column_place: body.length - index - 1, id_column: params.new_column },
      { new: true },
    )
      .then((dbTask) => {
        if (index === body.length - 1) {
          console.log('Async complete');
          db.find({ id_project: body[0].id_project })
            .sort({ column_place: -1 })
            .then((tasks) => {
              console.log(tasks);
              res.json(tasks);
              io.sockets.emit(
                `taskUpdate${body[0].id_project}`,
                tasks,
              );
            });
        }
      })
      .catch((err) => res.status(401).json(err));
  });

  //
});

// add/remove id_label to a task
router.put('/', function ({ body, query, io }, res) {
  console.log(body, query);
  db.findByIdAndUpdate(query._id, body, { new: true })
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
  if (body.id_project && body._id) {
    db.findOneAndDelete({
      id_project: body.id_project,
      _id: body._id,
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
        console.log(task);
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
