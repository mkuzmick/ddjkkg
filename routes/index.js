var express = require('express');
var router = express.Router();
var moment = require('moment');
const Axios = require('axios');

require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', timestamp: moment().format('YYYYMMDD-HHmmss.SSS') });
});

router.get('/cats', function(req, res, next) {
  res.render('index', { title: 'Cats', timestamp: moment().format('YYYYMMDD-HHmmss.SSS') });
});

router.get('/canvas/:course_id', function(req, res, next) {
  console.log("going to look for ", req.params.course_id);
  Axios.get(`https://canvas.instructure.com/api/v1/courses/${req.params.course_id}/assignments`, {
    headers: {
      Authorization: `Bearer ${process.env.CANVAS_API_TOKEN}`
    }
  }).then(response => {
    console.log("got some data");
    console.log(JSON.stringify(response.data));
    res.render('data', {
      title: 'Canvas',
      timestamp: moment().format('YYYYMMDD-HHmmss.SSS'),
      data: JSON.stringify(response.data, null, 4)
    });
  }).catch(err => {

    res.send('there was a problem accessing the Canvas API');
    console.log(err);
  })
});



module.exports = router;
