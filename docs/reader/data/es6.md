# npm and publish
npm publish --registry https://registry.npmjs.org/
npm config set registry https://registry.npmjs.org/
npm config set registry https://registry.npm.taobao.org

# build 
lerna run build

# sync
open https://npm.taobao.org/sync/@bnorth/xxx

node -e 'const { spawnSync } = require("child_process"); const fs = require("fs"); let list = fs.readdirSync("packages"); list.forEach(v=>{console.log("sync:"+v);let ret=spawnSync("open",["https://npm.taobao.org/sync/@bnorth/"+v]); ret.output.forEach(v=>console.log(v?v.toString():""))});'

# user bnorth with link
1.sudo npm link
2.npm link xxx

node -e 'const { spawnSync } = require("child_process"); let obj=require("./package.json");Object.entries(obj.dependencies).forEach(([k,v])=>{if(k.startsWith("@bnorth")){console.log("link:"+k);let ret=spawnSync("npm",["link", k]);ret.output.forEach(v=>console.log(v?v.toString():"error"))}});'