#!/usr/bin/env node
/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */
'use strict';
const path = require('path');
const fs = require('fs-extra');
const xml2js = require('xml2js');
let spawn = require('cross-spawn');

let appPackage;
try{appPackage = require(path.join(process.cwd(),'package.json'))}catch(e){};
let descPath = path.join(process.cwd(), 'cordova');
let templatePath = path.join(__dirname, '..', 'templates');
let srcWWWPath = (appPackage&&appPackage.bnorth&&appPackage.bnorth.outputPath)||'dist';
let srcXmlPath = './cordova.xml';
let templateConfigXml = path.join(templatePath, 'config.xml');
let descWWWPath = path.join(descPath, 'www');
let descConfigXml = path.join(descPath, 'config.xml');
let descBuildJson = path.join(descPath, 'build.json');
let ownMoudles = path.join(__dirname, '..', 'node_modules');
let ownMoudlesBin = path.join(__dirname, '..', 'node_modules', '.bin');

function runCordova(argv=[]) {
  process.env.NODE_PATH = process.env.NODE_PATH?(process.env.NODE_PATH+':'+ownMoudles):ownMoudles;
  process.env.PATH = process.env.PATH?(process.env.PATH+':'+ownMoudlesBin):ownMoudlesBin;

  let result = spawn.sync(
    'npx', ['cordova', ...argv],
    { stdio: 'inherit', cwd: descPath }
  );
  return result.status;
}

function checkCordovaProject() {
  return fs.existsSync(descPath) && fs.existsSync(descWWWPath) && fs.existsSync(descConfigXml);
}

function makeCordovaProject(appPackage) {
  fs.mkdirSync(descPath);
  fs.mkdirSync(descWWWPath);
  fs.copySync(templateConfigXml, srcXmlPath);
  syncConfigToCordova();
  runCordova(['plugin', 'add', 'cordova-plugin-whitelist']);
  syncConfigToWeb();
}

function syncWidgetToCordova() {
  fs.removeSync(descWWWPath);
  fs.copySync(srcWWWPath, descWWWPath);
}

function syncConfigToCordova() {
  let parser = new xml2js.Parser();
  let builder = new xml2js.Builder();
  let strConfigXml = fs.readFileSync(srcXmlPath).toString();
  
  parser.parseString(strConfigXml, function (err, result) {
    if(err||!result) { console.log('! error', err); return }

    fs.removeSync(descBuildJson);
    if(appPackage.bnorthAppBuildParams) {
      fs.writeFileSync(descBuildJson, JSON.stringify(appPackage.bnorthAppBuildParams, null, 2));
    }

    result.widget.$.id = appPackage.id||`able99.bnorth.${appPackage.name}`;
    result.widget.$.version = appPackage.version;
    result.widget.name = appPackage.displayName||appPackage.name;
    result.widget.description = appPackage.description||'';
    result.widget.author = {
      $: {
        href: appPackage.homepage||'',
        email: appPackage.email||'',
      },
      _: appPackage.author||'',
    }

    if(appPackage.icon) {
      result.widget.icon = {
        $: {
          src: path.join('..', appPackage.icon),
        }
      }
    }

    fs.writeFileSync(srcXmlPath, builder.buildObject(result));
    fs.copyFileSync(srcXmlPath, descConfigXml);
  });
}

function syncConfigToWeb() {
  fs.copyFileSync(descConfigXml, srcXmlPath);
}


function run() {
  console.log('# bnroth cordova');
  if(!appPackage) { console.log('!error no npm project'); return -1 }

  let hasProject = checkCordovaProject();
  console.log('# check project name='+appPackage.name+' result='+Boolean(hasProject));
  if(!hasProject) { console.log('# make cordova project'); makeCordovaProject(appPackage); }

  let argv = process.argv.slice(2);
  console.log('# bnroth cordova run: ' + argv);

  syncConfigToCordova();
  syncWidgetToCordova();
  let code = runCordova(argv);
  syncConfigToWeb();
  return code;
}

process.exit(run());
