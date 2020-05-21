const Airtable = require('airtable');

const getAllRecords = async function(options){
  const base = new Airtable({apiKey: options.apiKey}).base(options.base);
  let theRecords = [];
  await base(options.table).select({
      // Selecting most recent 1000 emoji
      maxRecords: 100,
      view: options.view
  }).eachPage(function page(records, fetchNextPage) {
    // go through each page and accumulate reactionType in theRecords array
    theRecords.push(...records);
    fetchNextPage()
  }).then(()=>{
    return
  }, function done(err) {
      if (err) { console.error(err); return; }
  });
  return theRecords;
}

module.exports.getAllRecords = getAllRecords;
