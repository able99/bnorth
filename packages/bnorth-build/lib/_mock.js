//const chokidar = require('chokidar');
//const chalk = require('chalk');
const assert = require('assert');
const proxy = require('express-http-proxy');
const url = require('url');
const bodyParser = require('body-parser');
const { join } = require('path');


function createMockHandler(method, path, value) {
  return function mockHandler(...args) {
    const res = args[1];
    if (typeof value === 'function') {
      value(...args);
    } else {
      res.json(value);
    }
  };
}

function createProxy(method, path, target) {
  return proxy(target, {
    filter(req) {
      return method ? req.method.toLowerCase() === method.toLowerCase() : true;
    },
    forwardPath(req) {
      let matchPath = req.originalUrl;
      const matches = matchPath.match(path);
      if (matches.length > 1) {
        matchPath = matches[1];
      }
      return join(url.parse(target).path, matchPath);
    },
  });
}

function parseKey(key) {
  let method = 'get';
  let path = key;

  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ');
    method = splited[0].toLowerCase();
    path = splited[1];
  }

  return { method, path };
}


function doApplyMock(devServer, aconfig, cwd, paths, argv) {
  const app = devServer.app;
  const config = aconfig.proxy;

  devServer.use(bodyParser.json({ limit: '5mb' }));
  devServer.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
  }));

  Object.keys(config).forEach((key) => {
    const keyParsed = parseKey(key);
    assert( !!app[keyParsed.method], `method of ${key} is not valid`);
    assert(
      typeof config[key] === 'function' || typeof config[key] === 'object' || typeof config[key] === 'string',
      `mock value of ${key} should be function or object or string, but got ${typeof config[key]}`
    );
    if (typeof config[key] === 'string') {
      let path = keyParsed.path;
      if (/\(.+\)/.test(keyParsed.path)) {
        path = new RegExp(`^${keyParsed.path}$`);
      }
      app.use( path, createProxy(keyParsed.method, path, config[key]));
    } else {
      app[keyParsed.method]( keyParsed.path, createMockHandler(keyParsed.method, keyParsed.path, config[key]));
    }
  });
}

function applyMock(devServer, aconfig, cwd, paths, argv) {
  try {
    doApplyMock(devServer, aconfig, cwd, paths, argv);
  } catch (e) {
    console.log(e);
    doApplyMock(devServer, aconfig, cwd, paths, argv);
  }
}



module.exports = {
  applyMock,
}
