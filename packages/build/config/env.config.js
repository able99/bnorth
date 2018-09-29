const { resolve } = require('path');
const { realpathSync } = require('fs');
const { readFileSync } = require('fs-extra');

let cache;
let cacheAppPath;

function resolveOwn(relativePath) {
  return resolve(__dirname+"/../", relativePath);
}

function resolveApp(relativePath) {
  return resolve(cacheAppPath, relativePath);
}

function initEnv({cwd, env}={}) {
  cwd = cwd || process.cwd();
  env = env || 'development'; // production
  isDev = env === 'development';

  const appPath = realpathSync(cwd);
  cacheAppPath = appPath;
  const appPackagePath = resolveApp('package.json');
  const appPackage = JSON.parse(readFileSync(appPackagePath));
  const appName = appPackage.name;

  cache = {
    cwd,
    env, 
    isDev,

    appPath,
    appPackagePath,
    appPackage,
    appName,

    appPublic: resolveApp('public'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    ownNodeModules: resolveOwn('node_modules'),
    bnorhtCoreNodeModules: resolveApp('node_modules/@bnorth/core/node_modules'),
    appBabelCache: resolveApp('node_modules/.cache/babel-loader'),
  };

  process.env.NODE_ENV = env;
  process.env.NODE_PATH = (process.env.NODE_PATH?(process.env.NODE_PATH+':'):'')+cache.ownNodeModules;
 
  return cache;
}

function getEnv() {
  return cache;
}

module.exports = {
  initEnv, getEnv, resolveOwn, resolveApp,
}