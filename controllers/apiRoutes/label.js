const router = require('express').Router();
var db = require('../../models');

router.get('/', function (req, res) {
  if (req.query.proj) {
    db.Label.findAll({ where: { id_project: req.query.proj } })
      .then((labels) => {
        res.json(labels);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  } else {
    db.Label.findAll({ where: { id_project: null } })
    .then((labels) => {
      res.json(labels);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
  }
});

router.post('/', function (req, res) {
  if (req.body.color) {
    db.Label.create({
    //   id_project: req.query.proj,
      color: req.body.color,
      label_name: req.body.label_name,
    })
      .then((labels) => {
        res.json(labels);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
});

router.put('/', function (req, res) {
  //do things here for other routes
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
