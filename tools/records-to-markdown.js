module.exports = function(records){
  let theMarkdown = `# TEST\n`
  for (var i = 0; i < records.length; i++) {
    theMarkdown+=`\n\n---\n\n\`\`\`\n${JSON.stringify(records[i], null, 4)}\n\`\`\`\n}`
  }
  return theMarkdown
}
