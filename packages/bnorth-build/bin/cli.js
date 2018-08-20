#!/usr/bin/env node
const watch = require('watch');

function run() {
  const argv = require('yargs').argv;
  const type = argv._[0];
  switch(type) {
    case 'dev': 
    case 'build': 
    case 'server': 
      let work = require(`../lib/${type}`);
      work(type, false);
      break;
    case 'watch':
      let deving = false;
      function dev() {
        if(deving) return;
        deving = true;
        let typeBuild = 'dev';
        let work = require(`../lib/${typeBuild}`);
        work(typeBuild, true);
        deving = false;
      }
      
      watch.watchTree(process.cwd()+'/src', function (f, curr, prev) {
        if (typeof f == "object" && prev === null && curr === null) {
          // Finished walking the tree
          console.log('# start watching');
          setTimeout(()=>dev(),100);
        } else if (prev === null) {
          // f is a new file
          console.log('# watch: new file');
          setTimeout(()=>dev(),100);
        } else if (curr.nlink === 0) {
          // f was removed
          console.log('# watch: delete file');
          setTimeout(()=>dev(),100);
        } else {
          // f was changed
          console.log('# watch: change');
          setTimeout(()=>dev(),100);
        }
      })
      break;
    default: 
      console.log(`unknown sub command '${type}'`);
      break;
  }
}

if (require.main === module) {
  run();
}
