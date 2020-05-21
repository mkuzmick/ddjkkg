const makeAndOpen = require('./make-and-open.js');
const airtableTools = require('./airtable-tools');
const recordsToMarkdown = require('./records-to-markdown');
const moment = require('moment');

async function main(){
  let theRecords = await airtableTools.getAllRecords({
    apiKey: process.env.AIRTABLE_API_KEY,
    base: process.env.AIRTABLE_WATCH_BASE,
    table: "LLPEOPLE",
    view: "Current_LLUFs"
  });

  let theMarkdown = recordsToMarkdown(theRecords);

  makeAndOpen({
    title: `md-${moment().format(`YYYYMMDD-HHmmss.SSS`)}`,
    text: theMarkdown
  });
}

module.exports = main;
