const router = require('express').Router();
var db = require('../../models');

router.get('/', function (req, res) {
  if (req.body.password) {
    db.User.findOne({
      where: {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      },
    }).then((user) => {
      res.json(user);
    });
  }
});

router.post('/', function (req, res) {
  if (req.body.username && req.body.email) {
    db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      enabled: true,
    })
      .then((user) => {
        res.json(user);
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
  //do things here for other routes
});

module.exports = router;
