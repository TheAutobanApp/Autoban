const router = require('express').Router();
var db = require('../../models');

// get project labels
router.get('/', function (req, res) {
  if (req.query.proj) {
    db.Label.findAll({
      where: {
        id_project: req.query.proj,
      },
    })
      .then((labels) => {
        res.json(labels);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
});

// get default labels
router.get('/default', function (req, res) {
  db.Label.findAll({
    where: {
      id_project: null,
    },
  })
    .then((labels) => {
      res.json(labels);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

// create a label
router.post('/', function (req, res) {
  if (req.body.color && req.body.label_name) {
    db.Label.create({
      id_project: req.body.id_project,
      color: req.body.color,
      label_name: req.body.label_name,
    })
      .then((labels) => {
        req.io.sockets.emit(`newLabel${req.body.id_project}`, labels);
        res.json(labels);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
});

router.put('/', function (req, res) {
  // update label
});

router.delete('/', function (req, res) {
  if (req.query.proj) {
    db.Label.destroy({
      where: {
        id_project: req.query.proj,
        color: req.body.color,
        label_name: req.body.label_name,
      },
    })
      .then((labels) => {
        res.json(labels);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
});

module.exports = router;
