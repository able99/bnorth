# npm and publish
npm publish --registry https://registry.npmjs.org/
npm config set registry https://registry.npmjs.org/
npm config set registry https://registry.npm.taobao.org

# build 
npm run lerna exec npm run build

# sync
open https://npm.taobao.org/sync/@bnorth/xxx