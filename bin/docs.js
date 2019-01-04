#!/usr/bin/env node
/**
 * Copyright (c) 2017, able99
 * All rights reserved.
 *
 * This source code is licensed under MIT.
 */

'use strict';
const fs = require('fs-extra');
const {join} = require('path');

const PathDocs = './docs';
const PathPackages = './packages';
const PathDocsIndexHtml = './docs/index.html';
const PathPluginsHtml = './docs/plugins.html';

const htmlTemplate = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" /> 
    <meta name="format-detection" content="telephone=no" /> 
    <meta name="msapplication-tap-highlight" content="no" /> 
    <meta http-equiv="X-UA-Compatible" content="IE=11" /> 
    <title>{title}</title>
  </head>
  <body>
    {content}
  </body>
</html>
`;
const htmlIndexTemplate = `
  <div>
    <h3>docs:</h3>
    {list}
  </div>
`;
const htmlIndexDocTemplate = `
  <div>
    <a href="./{link}/">{name}</a>
  </div>
`;
const htmlPluginsTemplate = `
  <div>
    <h3>plugins:</h3>
    {list}
  </div>
`;
const htmlPluginTemplate = `
  <div>
    <strong>{name}</strong>
    <div>{desc}</div>
    <a href="./{link}/">参考手册</a>
    <hr />
  </div>
`;

function genDocIndex() {
  let content = '';
  fs.readdirSync(PathDocs).forEach(v=>{
    let stat = fs.statSync(join(PathDocs,v));
    if(!stat.isDirectory()) return;

    content += htmlIndexDocTemplate.replace('{name}', v).replace('{link}', v);
  })
    
  fs.writeFileSync(
    PathDocsIndexHtml, 
    htmlTemplate
      .replace('{title}','docs')
      .replace(
        '{content}',
        htmlIndexTemplate
          .replace('{list}', content)
      )
  );
}

function genDocPlugins() {
  let content = '';
  fs.readdirSync(PathPackages).forEach(v=>{
    if(!/plugin-\w+/.test(v)) return;
    let stat = fs.statSync(join(PathPackages,v));
    if(!stat.isDirectory()) return;

    let packageObj = JSON.parse(fs.readFileSync(join(PathPackages,v,'package.json')).toString());
    content += htmlPluginTemplate.replace('{name}', v).replace('{desc}', packageObj.description).replace('{link}', v);
  })
    
  fs.writeFileSync(
    PathPluginsHtml, 
    htmlTemplate
      .replace('{title}','plugins')
      .replace(
        '{content}',
        htmlPluginsTemplate
          .replace('{list}', content)
      )
  );
}

genDocIndex();
genDocPlugins();