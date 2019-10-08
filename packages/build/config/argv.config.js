let cache;

function initArgv(type) {
  switch(type) {
    case 'dev': 
      cache = require('yargs')
        .usage('Usage: npm run dev [-- options]')
        .option('env', { type: 'string', describe: 'node env', default: 'development' })
        .help('h')
        .argv;
      break;

    case 'build': 
      cache = require('yargs')
        .usage('Usage: npm run build [-- options]')
        .option('env', { type: 'string', describe: 'node env', default: 'production' })
        .option('config', { type: 'string', describe: 'config set', default: false })
        .option('watch', { type: 'boolean', alias: 'w', describe: 'Watch file changes and rebuild', default: false })
        .option('analyze', { type: 'boolean', describe: 'Visualize and analyze your Webpack bundle.', default: false })
        .help('h')
        .argv;
      break;
    
    case 'server': 
      cache = require('yargs')
        .usage('Usage: npm start [-- options]')
        .option('env', { type: 'string', describe: 'node env', default: 'development' })
        .option('config', { type: 'string', describe: 'config set' })
        .option('platform', { type: 'string', describe: 'cordova platform asset' })
        .option('https', { type: 'boolean', describe: 'server https support', default: false })
        .option('host', { type: 'string', describe: 'serer host', default: '0.0.0.0' })
        .option('port', { type: 'int', describe: 'server port', default: 8000 })
        .option('urlhost', { type: 'string', describe: 'server url host', default: 'localhost' })
        .help('h')
        .argv;
      break;

    default:
      cache = require('yargs')
        .usage('Usage: npm run xxx [-- options]')
        .option('env', { type: 'string', describe: 'node env', default: 'production' })
        .help('h').argv;
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