const router = require('express').Router();
var db = require('../../models');

router.get('/', function (req, res) {
  if (req.query.email) {
    db.User.findOne({
      where: {
        email: req.query.email,
      },
    }).then((user) => {
      res.json(user);
    }).catch((err) => {
      res.status(401).json(err);
    });
  }
});

router.get('/all', function (req, res) {
    db.User.findAll().then((user) => {
      res.json(user);
    }).catch((err) => {
      res.status(401).json(err);
    });
});

router.post('/', function (req, res) {
  if (req.body.username && req.body.email) {
    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      enabled: true,
    })
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.log(err.errors)
        res.status(500).send('Something broke!')
      });
  }
});

// update user info
router.put('/', function (req, res) {
  // update username
  if (req.query.un !== req.query.newun) {
    db.User.findOne({
      where: { username: req.query.un },
    })
      .then((user) => {
        if (user) {
          user
            .update({ username: req.query.newun })
            .then(() => {
              res.json(user);
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
  // update email
  if (req.query.email !== req.query.newemail) {
    db.User.findOne({
      where: { email: req.query.email },
    })
      .then((user) => {
        if (user) {
          user
            .update({ email: req.query.newemail })
            .then(() => {
              res.json(user);
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
  // update password
  // if (req.query.pw !== req.query.newpw) {
  //   db.User.findOne({
  //     where: { password: req.query.pw, id_user: req.query.uid },
  //   })
  //     .then((user) => {
  //       if (user) {
  //         user
  //           .update({ password: req.query.newpw })
  //           .then(() => {
  //             res.json(user);
  //           })
  //           .catch((err) => {
  //             res.status(401).json(err);
  //           });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(401).json(err);
  //     });
  // }
});

// update name
router.put('/:name', function (req, res) {
  if (req.param.name) {
    // udpate first name
    if (req.query.fn !== req.query.newfn) {
      db.User.findOne({
        where: { first_name: req.query.fn, id_user: req.query.uid },
      })
        .then((user) => {
          if (user) {
            user
              .update({ first_name: req.query.newfn })
              .then((user) => {
                // if there is a new last name, don't respond
                if (!req.query.newln) {
                  res.json(user);
                }
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
    // update last name
    if (req.query.ln !== req.query.newln) {
      db.User.findOne({
        where: { last_name: req.query.ln, id_user: req.query.uid },
      })
        .then((user) => {
          if (user) {
            user
              .update({ last_name: req.query.newln })
              .then((user) => {
                res.json(user);
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
  }
});
// delete user if user password matches input pw from query param
router.delete('/', function (req, res) {
  if (req.query.pw && req.query.uid) {
    db.User.findOne({ where: { id_user: req.query.uid } })
      .then((user) => {
        if (user.password === req.query.pw) {
          user
            .destroy()
            .then((user) => res.status(200).json(user))
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
