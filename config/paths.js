const { resolve } = require('path');
const { realpathSync } = require('fs');


module.exports = function getPaths(cwd) {
  const appDirectory = realpathSync(cwd);

  function resolveOwn(relativePath) {
    return resolve(__dirname+"/../", relativePath);
  }

  function resolveApp(relativePath) {
    return resolve(appDirectory, relativePath);
  }

  return {
    appDirectory,
    appPackageJson: resolveApp('package.json'),
    appPublic: resolveApp('public'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    ownNodeModules: resolveOwn('node_modules'),
    appBabelCache: resolveApp('node_modules/.cache/babel-loader'),

    resolveOwn,
    resolveApp,
  };
}
