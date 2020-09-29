const router = require('express').Router();
var db = require('../../models');
const { Op } = require('sequelize');

router.get('/', function (req, res) {
  //get project
  if (req.query.id) {
    db.Project.findOne({
      where: {
        id_project: req.query.id,
      },
    }).then(function (result) {
      res.json(result);
    });
  } else {
    res.status(401).json(err);
  }
});

router.get('/all/:id_user', function (req, res) {
  if (req.params.id_user) {
    db.ProjectUser.findAll({
      where: {
        id_user: req.params.id_user,
      },
    })
      .then((project) => {
        const projectIds = project.map(
          (tm, index) => tm.dataValues.id_project,
        );
        if (projectIds.length > 0) {
          db.Project.findAll({
            where: { id_project: { [Op.or]: projectIds } },
          })
            .then((projects) => {
              res.json(projects);
            })
            .catch((err) => res.status(401).json(err));
        } else res.status(200).send('No projects found');
      })
      .catch((err) => res.status(401).json(err));
  }
});

router.post('/', function (req, res) {
  //new project
  if (req.body.project_name) {
    var project = req.body;
    db.Project.create({
      id_team: project.id_team,
      project_name: project.project_name,
      project_description: project.project_description,
      start_date: project.start_date,
      end_date: project.end_date,
      enabled: true,
      created_by: project.created_by,
    })
      .then((result) => {
        db.ProjectUser.create({
          id_project: result.dataValues.id_project,
          id_user: project.created_by,
        }).catch((err) => res.status(401).json(err));
        res.json(result);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  } else {
    res.status(401).json(err);
  }
});

router.put('/name', function (req, res) {
  // update project name
  if (req.body.pn !== req.body.newpn) {
    db.Project.findOne({
      where: {
        id_project: req.body.pid,
      },
    })
      .then(function (results) {
        if (results) {
          results
            .update({ project_name: req.body.newpn })
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
router.put('/description', function (req, res) {
  // update project description

  if (req.body.description !== req.body.newDescription) {
    db.Project.findOne({
      where: {
        id_project: req.body.pid,
        project_description: req.body.description,
      },
    })
      .then(function (results) {
        if (results) {
          results
            .update({
              project_description: req.body.newDescription,
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
});
//   // update project start date

//   if (req.body.start_date) {
//     db.Project.findOne({
//       where: {
//         id_project: req.query.id,
//       },
//     })
//       .then(function (results) {
//         if (results) {
//           results
//             .update({ start_date: req.body.start_date })
//             .then(() => {
//               res.json(results);
//             })
//             .catch((err) => {
//               res.status(401).json(err);
//             });
//         }
//       })
//       .catch((err) => {
//         res.status(401).json(err);
//       });
//   } else {
//     res.status(401).json(err);
//   }
//   // update project end date

//   if (req.body.end_date) {
//     db.Project.findOne({
//       where: {
//         id_project: req.query.id,
//       },
//     })
//       .then(function (results) {
//         if (results) {
//           results
//             .update({ end_date: req.body.end_date })
//             .then(() => {
//               res.json(results);
//             })
//             .catch((err) => {
//               res.status(401).json(err);
//             });
//         }
//       })
//       .catch((err) => {
//         res.status(401).json(err);
//       });
//   } else {
//     res.status(401).json(err);
//   }
// });
// figure out how to cascade delete all associated tasks, columns, and labels
router.delete('/', function (req, res) {
  //delete project
  if (req.query.id) {
    db.Project.destroy({
      where: {
        id_project: req.query.id,
      },
    })
      .then(function (result) {
        res.json(result);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
});

module.exports = router;
