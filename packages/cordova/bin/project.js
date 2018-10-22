#!/usr/bin/env node
/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';
const fs = require('fs-extra');
const { templateConfigXml, descPath, descWWWPath, descConfigXml } = require('./const');
const { getCommand } = require('./commands');
const { runCordova } = require('./utils');

function checkCordovaProject() {
  return fs.existsSync(descPath) && fs.existsSync(descWWWPath) && fs.existsSync(descConfigXml);
}

function makeCordovaProject(appPackage) {
  fs.mkdirSync(descPath);
  fs.mkdirSync(descWWWPath);
  fs.copySync(templateConfigXml, descConfigXml);
  getCommand('config')();
  runCordova(['plugin', 'add', 'cordova-plugin-whitelist']);
}


module.exports = {
  checkCordovaProject,
  makeCordovaProject,
}
