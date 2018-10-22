#!/usr/bin/env node
/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';
const fs = require('fs-extra');
const xml2js = require('xml2js');
const { runCordova } = require('./utils');
const { appPackage, srcWWWPath, descWWWPath, descConfigXml, descBuildJson } = require('./const');

let commands = {};
function getCommand(command='help') {
  return commands[command];
}

commands.help = function() {
  console.log('# mousync');
  process.exit(runCordova(['help']));
}

commands.web = function() {
  fs.removeSync(descWWWPath);
  fs.copySync(srcWWWPath, descWWWPath);
}

commands.config = function() {
  let parser = new xml2js.Parser();
  let builder = new xml2js.Builder();
  let strConfigXml = fs.readFileSync(descConfigXml).toString();
  
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
          src: appPackage.icon,
        }
      }
    }

    if(appPackage.bnorthAppPreferences) {
      let preference = result.widget.preference?(Array.isArray(result.widget.preference)?result.widget.preference:[result.widget.preference]):[];
      let preferences = Object.entries(appPackage.bnorthAppPreferences).map(([k,v])=>({
        '$': { [k]: v },
      }));

      result.widget.preference = [...preference, ...preferences];
    }

    fs.writeFileSync(descConfigXml, builder.buildObject(result));
  });
}

module.exports = {
  getCommand,
}