#!/usr/bin/env node
/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';
const { appPackage } = require('./const');
const { runCordova } = require('./utils');
const { checkCordovaProject, makeCordovaProject} = require('./project');
const { getCommand } = require('./commands');


function run() {
  console.log('# bnroth cordova');
  if(!appPackage) { console.log('!error no npm project'); return }

  let hasProject = checkCordovaProject();
  console.log('# check project name='+appPackage.name+' result='+Boolean(hasProject));
  if(!hasProject) {
    console.log('# make cordova project');
    makeCordovaProject(appPackage);
  }

  let argv = process.argv.slice(2);
  console.log('# bnroth cordova run: ' + argv);
  let command = getCommand(argv[0]);
  if(command) {
    command(argv.slice(1));
  }else{
    process.exit(runCordova(argv));
  }
}

run();
