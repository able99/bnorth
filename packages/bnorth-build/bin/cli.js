#!/usr/bin/env node


function run() {
  const argv = require('yargs').argv;
  const type = argv._[0];
  switch(type) {
    case 'dev': 
    case 'build': 
    case 'server': 
      let work = require(`../lib/${type}`);
      work(type);
      break;
    default: 
      console.log(`unknown sub command '${type}'`);
  }
}

if (require.main === module) {
  run();
}
