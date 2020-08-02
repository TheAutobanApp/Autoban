const router = require('express').Router();
var db = require('../../models');

// get default columns
router.get('/', function (req, res) {
  db.Columns.findAll({
    where: { id_project: null },
  }).then((columns) => {
    res.json(columns);
  });
});

// get columns associated with project using project id as param
router.get('/:proj', function (req, res) {
  if (req.params.proj) {
    db.Columns.findAll({
      where: { id_project: req.params.proj },
    }).then((columns) => {
      res.json(columns);
    });
  }
});

// post column with project id from param, respond with json
router.post('/:proj', function (req, res) {
  if (req.params.proj) {
    db.Columns.create({
      id_project: req.params.proj,
      id_place: req.body.id_place,
      column_name: req.body.column_name,
      column_description: req.body.column_description,
    })
      .then(function () {
        res.redirect(`/api/columns/${req.params.proj}`);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  }
});

// update column
router.put('/:proj', function (req, res) {
  if (req.params.proj) {
    // update column place id / order
    if (req.body.newPlace) {
      db.Columns.findOne({
        where: {
          id_project: req.params.proj,
          id_place: req.body.oldPlace,
        },
      })
        .then((column) => {
          // Check if record exists in db
          if (column) {
            column
              .update({
                id_place: req.body.newPlace,
              })
              .then(function () {
                res.redirect(`/api/columns/${req.params.proj}`);
              })
              .catch(function (err) {
                res.status(401).json(err);
              });
          }
        })
        .catch(function (err) {
          res.status(401).json(err);
        });
    }
    // update column name
    if (req.body.newName) {
      db.Columns.findOne({
        where: {
          id_project: req.params.proj,
          column_name: req.body.oldName,
          id_place: req.body.id_place,
        },
      })
        .then((column) => {
          // Check if record exists in db
          if (column) {
            column
              .update({
                column_name: req.body.newName,
              })
              .then(function () {
                res.redirect(`/api/columns/${req.params.proj}`);
              })
              .catch(function (err) {
                res.status(401).json(err);
              });
          }
        })
        .catch(function (err) {
          res.status(401).json(err);
        });
    }
    // update column description
    if (req.body.newDescription) {
      db.Columns.findOne({
        where: {
          id_project: req.params.proj,
          id_place: req.body.id_place,
        },
      })
        .then((column) => {
          // Check if record exists in db
          if (column) {
            column
              .update({
                column_description: req.body.newDescription,
              })
              .then(function () {
                res.redirect(`/api/columns/${req.params.proj}`);
              })
              .catch(function (err) {
                res.status(401).json(err);
              });
          }
        })
        .catch(function (err) {
          res.status(401).json(err);
        });
    }
  }
});

router.delete('/:proj', function (req, res) {
  if (req.params.proj) {
    db.Columns.destroy({
      where: {
        id_project: req.params.proj,
        id_place: req.body.id_place,
        column_name: req.body.column_name,
      },
    })
      .then(function () {
        res.redirect(`/api/columns/${req.params.proj}`);
      })
      .catch(function (err) {
        res.status(401).json(err);
      });
  }
});

module.exports = router;
