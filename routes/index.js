var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', timestamp: moment().format('YYYYMMDD-HHmmss.SSS') });
});

router.get('/cats', function(req, res, next) {
  res.render('index', { title: 'Cats', timestamp: moment().format('YYYYMMDD-HHmmss.SSS') });
});

module.exports = router;
