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

router.get('/acceptedusers', function (req, res) {
  if (req.query.id_team) {
    db.TeamUser.findAll({
      where: {
        id_team: req.query.id_team,
        accepted: true,
      },
    }).then((team) => {
      if (team.length > 0) {
        db.User.findAll({
          where: {
            id_user: {
              [Op.or]: team.map((user) => user.dataValues.id_user),
            },
          },
        }).then((users) => {
          res.json(users);
        });
      } else {
        res.json([]);
      }
    });
  }
});

router.get('/pendingusers', function (req, res) {
  if (req.query.id_team) {
    db.TeamUser.findAll({
      where: {
        id_team: req.query.id_team,
        accepted: false,
      },
    }).then((team) => {
      if (team.length > 0) {
        db.User.findAll({
          where: {
            id_user: {
              [Op.or]: team.map((user) => user.dataValues.id_user),
            },
          },
        }).then((users) => {
          res.json(users);
        });
      } else {
        res.json([]);
      }
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
              let foundIndex = teams.findIndex(
                (team) => team.dataValues.team_name === 'Personal',
              );
              if (foundIndex > 0) {
                let newTeams = teams.sort(function (x, y) {
                  return x.dataValues.team_name == 'Personal'
                    ? -1
                    : y.dataValues.team_name == 'Personal'
                    ? 1
                    : 0;
                });
                res.json(newTeams);
              } else {
                res.json(teams);
              }
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
          id_team: item.dataValues.id_team,
          id_inviter: item.dataValues.id_inviter,
        }));
        db.User.findAll({
          where: {
            id_user: {
              [Op.or]: inviteArray.map((item) => item.id_inviter),
            },
          },
        }).then((inviters) => {
          inviteArray.forEach((el) => {
            let foundIndex = inviters.findIndex(
              (item) => item.dataValues.id_user === el.id_inviter,
            );
            el.inviter = inviters[foundIndex].dataValues.username;
          });
          db.Team.findAll({
            where: {
              id_team: {
                [Op.or]: inviteArray.map((item) => item.id_team),
              },
            },
          }).then((teams) => {
            inviteArray.forEach((el) => {
              let foundIndex = teams.findIndex(
                (item) => item.dataValues.id_team === el.id_team,
              );
              el.team = teams[foundIndex].dataValues.team_name;
            });
            res.json(inviteArray);
          });
        });
      })
      .catch((err) => res.status(401).json(err));
  }
});

// get new invite team
router.get('/newinvite', function (req, res) {
  const newInvite = {};
  if (req.query.inviter && req.query.team) {
    db.User.findOne({
      where: {
        id_user: req.query.inviter,
      },
    })
      .then((inviter) => {
        newInvite.inviter = inviter.dataValues.username;
        db.Team.findOne({
          where: {
            id_team: req.query.team,
          },
        })
          .then((team) => {
            newInvite.team = team.dataValues.team_name;
            res.send(newInvite);
          })
          .catch((err) => res.status(401).json(err));
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
router.put('/description', function (req, res) {
  // update team description
  if (typeof req.body.newdescription === 'string') {
    db.Team.findOne({
      where: {
        id_team: req.body.tmid,
      },
    })
      .then((team) => {
        if (team) {
          team
            .update({ team_description: req.body.newdescription })
            .then((tm) => {
              res.json(tm);
            })
            .catch((err) => {
              res.status(401).json(err);
            });
        }
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  } else res.status(401);
});

router.put('/name', function (req, res) {
  // update team name
  if (req.body.newtm) {
    db.Team.findOne({
      where: { id_team: req.body.tmid },
    })
      .then((team) => {
        if (team) {
          team
            .update({ team_name: req.body.newtm })
            .then((tm) => {
              res.json(tm);
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
router.put('/invite/', (req, res) => {
  if (req.body.id_user && req.body.id_team) {
    db.TeamUser.findOne({
      where: {
        id_team: req.body.id_team,
        id_user: req.body.id_user,
      },
    })
      .then((team) => {
        if (team) {
          team
            .update({ accepted: true })
            .then(() => {
              // find all team projects and create ProjectUser associations for all found team projects
              db.Project.findAll({
                where: { id_team: req.body.id_team },
              }).then((projects) => {
                // only create ProjectUser associations if projects exist in the team
                if (projects.length > 0) {
                  const projectArray = projects.map((project) => ({
                    id_project: project.dataValues.id_project,
                    id_user: req.body.id_user,
                  }));
                  db.ProjectUser.bulkCreate(projectArray).then(
                    (assoc) => {
                      req.io.sockets.emit(
                        `inviteAccepted${req.body.id_user}`,
                        team,
                        assoc,
                      );
                      res.status(200).send(team, assoc);
                    },
                  );
                } else {
                  req.io.sockets.emit(
                    `inviteAccepted${req.body.id_user}`,
                    team,
                  );
                  res.status(200).send(team);
                }
              });
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
          team
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

// invite delete when invitee rejects
router.delete('/invite', function (req, res) {
  if (req.query.id && req.query.id_user) {
    db.TeamUser.findOne({
      where: { id: req.query.id, id_user: req.query.id_user },
    })
      .then((team) => {
        team
          .destroy()
          .then((team) => res.status(200).json(team))
          .catch((err) => {
            res.status(401).json(err);
          });
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  }
});

module.exports = router;
