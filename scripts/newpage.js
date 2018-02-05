/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

'use strict';
var fs = require('fs-extra');
var path = require('path');
var argv = require('yargs')
  .options({
    'title': {
      alias: 't',
      describe: 'set route title',
    },
    'usebnorth': {
      alias: 'u',
      describe: 'template with bnorth components',
      type: 'boolean'
    },
    'src': {
      alias: 's',
      describe: 'set src path, default src'
    },
    'base': {
      alias: 'b',
      describe: 'set base path, default pages'
    },
    'module': {
      alias: 'm',
      describe: 'set module path, default no'
    }
  })
  .help()
  .demandCommand(1)
  .argv;


console.log(`------------new page-------------`);

var name = argv._&&argv._[0];
var title = argv.title;
var appPath = process.cwd();
var srcPath = argv.src || 'src';
var basePath = argv.base || 'pages';
var modulePath = argv.module || '';
var descPath = path.join(appPath, srcPath, basePath, modulePath);
var templatePath = path.join('node_modules', 'bnorth', 'templates', 'newpage');
fs.copySync(path.join(templatePath, 'container.js'), path.join(descPath, `_${name}.js`));
!argv.usebnorth && fs.copySync(path.join(templatePath, 'page.js'), path.join(descPath, `${name}.js`));
argv.usebnorth && fs.copySync(path.join(templatePath, 'page_bnorth.js'), path.join(descPath, `${name}.js`));

console.log(`------------route config-------------`);
console.log(`
  <Route 
    key="${name}"
    title="${title||''}"
    component={require('${path.join('..',basePath, modulePath)}/${name}.js')}
    container={require('${path.join('..',basePath, modulePath)}/_${name}.js')} >
  </Route>
`);
console.log(`----------------------------------------`);