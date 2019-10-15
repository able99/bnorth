## build 

1. build
  lerna run --scope @bnorth/core build
  lerna run build

## doc tool

1. doc a package
    lerna run --scope @bnorth/core doc
    lerna run doc

1. gen doc index
    npm run docs

1. start doc dev server
    npm start


## npm registry

npm config set registry https://registry.npmjs.org
npm config set registry https://registry.npm.taobao.org
npm install --registry https://registry.npm.taobao.org --save xxx

## publish

lerna bootstrap
lerna run build
lerna publish --registry https://registry.npmjs.org/

## unpublish 

npx force-unpublish pkg-name 'reason'

## sync

open https://npm.taobao.org/sync/@bnorth/xxx

node -e 'const { spawnSync } = require("child_process"); const fs = require("fs"); let list = fs.readdirSync("packages"); list.forEach(v=>{console.log("sync:"+v);let ret=spawnSync("open",["https://npm.taobao.org/sync/@bnorth/"+v]); ret.output.forEach(v=>console.log(v?v.toString():""))});'

## user bnorth with link

1. cd bnorth/xxx
1. sudo npm link
1. cd project
1. npm link xxx

node -e 'const { spawnSync } = require("child_process"); let obj=require("./package.json");Object.entries(obj.dependencies).forEach(([k,v])=>{if(k.startsWith("@bnorth")){console.log("link:"+k);let ret=spawnSync("npm",["link", k]);ret.output.forEach(v=>console.log(v?v.toString():"error"))}});'