const { resolveApp }  = require('./env.config');
let cache;

function initArgv(type) {
  switch(type) {
    case 'dev': 
      cache = require('yargs')
        .usage('Usage: roadhog build [options]')
        .option('debug', { type: 'boolean', describe: 'Build without compress', default: false, })
        .help('h')
        .argv;

      cache.src = resolveApp(cache._[1]||'src');
      cache.out = resolveApp(cache._[2]||'lib');
      break;

    case 'build': 
      cache = require('yargs')
        .usage('Usage: roadhog build [options]')
        .option('debug', { type: 'boolean', describe: 'Build without compress', default: false, })
        .option('watch', { type: 'boolean', alias: 'w', describe: 'Watch file changes and rebuild', default: false, })
        .option('analyze', { type: 'boolean', describe: 'Visualize and analyze your Webpack bundle.', default: false, })
        .help('h')
        .argv;
      break;
    
  }

  return cache;
}

function getArgv() {
  return cache||require('yargs').argv;
}

module.exports = {
  initArgv, getArgv
}