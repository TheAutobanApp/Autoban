const router = require('express').Router();
const { Op } = require('sequelize');
var db = require('../../models');

router.get('/', function (req, res) {
  if (req.query.id_team) {
    db.Team.findOne({
      where: {
        id_team: req.query.id_team,
      },
    }).then((team) => {
      res.json(team);
    });
  }
});

// get accepted teams
router.get('/all/:id_user', function (req, res) {
  if (req.params.id_user) {
    db.TeamUser.findAll({
      where: {
        id_user: req.params.id_user,
        accepted: true,
      },
    })
      .then((team) => {
        const teamIds = team.map(
          (tm, index) => tm.dataValues.id_team,
        );
        if (teamIds.length > 0) {
          db.Team.findAll({
            where: { id_team: { [Op.or]: teamIds } },
          })
            .then((teams) => {
              res.json(teams);
            })
            .catch((err) => res.status(401).json(err));
        } else res.status(200).send('No teams found');
      })
      .catch((err) => res.status(401).json(err));
  }
});

// get invite teams
router.get('/invite/:id_user', function (req, res) {
  let inviteArray = [];
  if (req.params.id_user) {
    db.TeamUser.findAll({
      where: {
        id_user: req.params.id_user,
        accepted: false,
      },
    })
      .then((invite) => {
        inviteArray = invite.map((item) => ({
          id: item.dataValues.id,
          team: item.dataValues.id_team,
          inviter: item.dataValues.id_inviter,
        }));
        db.User.findAll({
          where: {
            id_user: {
              [Op.or]: inviteArray.map((item) => item.inviter),
            },
          },
        }).then(inviters => {
          inviteArray.forEach(el => {
            let foundIndex = inviters.findIndex(item => item.dataValues.id_user === el.inviter);
            el.inviter = inviters[foundIndex].dataValues.username
          })
          db.Team.findAll({
            where: {
              id_team: {
                [Op.or]: inviteArray.map((item) => item.team),
              },
            },
          }).then(teams => {
            inviteArray.forEach(el => {
              let foundIndex = teams.findIndex(item => item.dataValues.id_team === el.team);
              el.team = teams[foundIndex].dataValues.team_name
            })
            console.log(inviteArray)
            res.json(inviteArray)
          })
        })
      })
      .catch((err) => res.status(401).json(err));
  }
});

// create team
router.post('/', function (req, res) {
  if (req.body.team_name) {
    db.Team.create({
      team_name: req.body.team_name,
      team_description: req.body.team_description,
      team_color: req.body.team_color,
      enabled: true,
    })
      .then((team) => {
        db.TeamUser.create({
          id_team: team.dataValues.id_team,
          id_user: req.body.id_user,
          accepted: true,
        }).catch((err) => res.status(401).json(err));
        res.json(team);
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
});

// invite user to team
router.post('/invite', (req, res) => {
  if (req.body.invitee && req.body.inviter) {
    db.TeamUser.create({
      id_team: req.body.team,
      id_user: req.body.invitee,
      id_inviter: req.body.inviter,
    })
      .then((invite) => {
        req.io.sockets.emit(`newInvite${req.body.invitee}`, invite);
        res.status(200).send(invite);
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
      where: { team_description: req.query.description },
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

// update TeamUser association when accepted by user
router.put('/invite/:id_user', (req, res) => {
  if (req.params.id_user && req.body.id_team) {
    db.TeamUser.findOne({
      where: {
        id_team: req.body.id_team,
        id_user: req.params.id_user,
      },
    })
      .then((team) => {
        if (team) {
          team
            .update({ accepted: true })
            .then(() => {
              req.io.sockets.emit(
                `inviteAccepted${req.body.id_user}`,
                invite,
              );
              res.status(200).send(team);
            })
            .catch((err) => res.status(401).json(err));
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
