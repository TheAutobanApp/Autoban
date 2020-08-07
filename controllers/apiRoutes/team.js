const router = require('express').Router();
var db = require('../../models');

router.get('/', function (req, res) {
  if (req.body.team_name) {
    db.Team.findOne({
      where: {
        team_name: req.body.team_name,
        username: req.body.team_description,
      },
    }).then((team) => {
      res.json(team);
    });
  }
});

router.post('/', function (req, res) {
  if (req.body.team_name) {
    db.Team.create({
      team_name: req.body.team_name,
      team_description: req.body.team_description,
      enabled: true,
    })
      .then((team) => {
        db.TeamUser.create({
          id_team: team.dataValues.id_team,
          id_user: req.body.id_user,
        }).catch((err) => res.status(401).json(err));
        res.json(team);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
});

// update user info
router.put('/', function (req, res) {
  // update team name
  if (req.query.tn !== req.query.newtn) {
    db.Team.findOne({
      where: { team_name: req.query.tn },
    })
      .then((team) => {
        if (team) {
          team
            .update({ team_name: req.query.newtn })
            .then(() => {
              res.json(team);
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
  // update team description
  if (req.query.description !== req.query.newdescription) {
    db.Team.findOne({
      where: { eteam_description: req.query.description },
    })
      .then((team) => {
        if (team) {
          team
            .update({ team_description: req.query.newdescription })
            .then(() => {
              res.json(team);
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
  if (req.query.team_name && req.query.teamid) {
    db.Team.findOne({ where: { id_team: req.query.teamid } })
      .then((team) => {
        if (team.team_name === req.query.team_name) {
          user
            .destroy()
            .then((team) => res.status(200).json(team))
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

module.exports = router;
