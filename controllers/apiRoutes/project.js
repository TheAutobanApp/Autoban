const router = require('express').Router();
var db = require('../../models');

router.get('/', function (req, res) {
  //get project
  db.Project.findOne({
    where: {
      id_project: req.params.id,
    },
  }).then(function (result) {
    res.json(result);
  });
});

router.post('/', function (req, res) {
  //new project
  var project = req.body;
  db.Project.create({
    id_project: project.id_project,
    id_team: project.id_team,
    project_name: project.project_name,
    project_description: project.project_description,
    start_date: project.start_date,
    end_date: project.end_date,
    enabled: project.enabled,
    automation_order: project.automation_order,
    created_by: project.created_by,
  }).then((result) => {
    console.log(result);
    res.redirect('/');
  });
});

router.put('/', function (req, res) {
  // update project name
  if (req.body.project_name) {
    db.Project.findOne({
      where: {
        id_project: req.params.id,
      },
    })
      .then(function (results) {
        if (results) {
          results
            .update({ project_name: req.body.project_name })
            .then(() => {
              res.json(results);
            })
            .catch((err) => {
              res.status(401).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
  // update project description

  if (req.body.project_description) {
    db.Project.findOne({
      where: {
        id_project: req.params.id,
      },
    })
      .then(function (results) {
        if (results) {
          results
            .update({
              project_description: req.body.project_description,
            })
            .then(() => {
              res.json(results);
            })
            .catch((err) => {
              res.status(401).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
  // update project start date

  if (req.body.start_date) {
    db.Project.findOne({
      where: {
        id_project: req.params.id,
      },
    })
      .then(function (results) {
        if (results) {
          results
            .update({ start_date: req.body.start_date })
            .then(() => {
              res.json(results);
            })
            .catch((err) => {
              res.status(401).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
  // update project start date

  if (req.body.end_date) {
    db.Project.findOne({
      where: {
        id_project: req.params.id,
      },
    })
      .then(function (results) {
        if (results) {
          results
            .update({ end_date: req.body.end_date })
            .then(() => {
              res.json(results);
            })
            .catch((err) => {
              res.status(401).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
});

router.delete('/', function (req, res) {
  //delete project
  db.Project.destroy({
    where: {
      id_project: req.params.id,
    },
  }).then(function (result) {
    res.json(result);
  });
});

module.exports = router;
