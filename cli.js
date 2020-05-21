#!/usr/bin/env node

const yargs = require('yargs').argv;
const path = require('path');
const myMagicTool = require('./tools/my-magic-tool');

require('dotenv').config({path: path.resolve(__dirname,'.env')});
global.ROOT_DIR = __dirname;

console.log(`launching the script with these yargs:`);
console.log(JSON.stringify(yargs, null, 4));

myMagicTool(yargs);
