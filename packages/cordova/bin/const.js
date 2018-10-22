#!/usr/bin/env node
/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';
const path = require('path');

let appPackage;
try{appPackage = require(path.join(process.cwd(),'package.json'))}catch(e){};
  
let descPath = path.join(process.cwd(), 'cordova');
let templatePath = path.join(__dirname, '..', 'templates');

module.exports = {
  appPackage,

  srcWWWPath: (appPackage&&appPackage.bnorth&&appPackage.bnorth.outputPath)||'dist',

  templatePath,
  templateConfigXml: path.join(templatePath, 'config.xml'),

  descPath,
  descWWWPath: path.join(descPath, 'www'),
  descConfigXml: path.join(descPath, 'config.xml'),
  descBuildJson: path.join(descPath, 'build.json'),

  ownMoudles: path.join(__dirname, '..', 'node_modules'),
  ownMoudlesBin: path.join(__dirname, '..', 'node_modules', '.bin'),
}

