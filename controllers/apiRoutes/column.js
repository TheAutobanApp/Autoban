const router = require('express').Router();
var db = require('../../models');

router.get('/', function (req, res) {
  //do things here for other routes
  console.log('hey you got a column');
  res.send('column');
});

router.post('/', function (req, res) {
  //do things here for other routes
});

router.put('/', function (req, res) {
  //do things here for other routes
});

router.delete('/', function (req, res) {
  //do things here for other routes
});

module.exports = router;
