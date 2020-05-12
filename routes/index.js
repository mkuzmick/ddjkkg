var express = require('express');
var router = express.Router();
var moment = require('moment');
var Airtable = require('airtable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', timestamp: moment().format('YYYYMMDD-HHmmss.SSS') });
});

router.get('/cats', function(req, res, next) {
  res.render('index', { title: 'Cats', timestamp: moment().format('YYYYMMDD-HHmmss.SSS') });
});

router.get('/airtable', function(req, res, next) {
  // go get some data from Airtable and render it
  // look for stuff using record_id or other search term
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_WATCH_BASE);
  var theRecords = [];
  base('Media').select({
      // Selecting most recent 1000 emoji
      maxRecords: 1000,
      view: "Main View"
  }).eachPage(function page(records, fetchNextPage) {
    // go through each page and accumulate reactionType in theRecords array
    theRecords.push(...records);
    fetchNextPage()
  }).then(()=>{
    // now that you've accumulated all the records, render them
    res.render('json', {
      title: req.params.record_id,
      timestamp: moment().format('YYYYMMDD-HHmmss.SSS'),
      json: JSON.stringify(theRecords, null, 4)
    })
  }, function done(err) {
      if (err) { console.error(err); return; }
  });
});

router.get('/airtable/:record_id', function(req, res, next) {
  var base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_WATCH_BASE);
  base('Media').find(req.params.record_id, function(err, record) {
      if (err) {
        console.error(err); return;
      }
      console.log('Retrieved', record.id);
      res.render('json', {
        title: req.params.record_id,
        timestamp: moment().format('YYYYMMDD-HHmmss.SSS'),
        json: JSON.stringify(record, null, 4)
      });
  });
});


module.exports = router;
