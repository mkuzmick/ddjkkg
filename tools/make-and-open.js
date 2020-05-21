const chalk = require('chalk');
const fs = require('fs');
const cp = require('child_process');

const myTool = function(options){
  let filePath = `${ROOT_DIR}/data/${options.title}.md`;
  fs.writeFileSync(filePath, options.text);
  cp.spawn('open', ['-a', 'Atom', filePath]);
}

module.exports = myTool;
