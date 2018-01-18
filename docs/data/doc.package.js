{
  "name": "bnorth",
  "version": "1.0.7",
  "description": "a react based JS framework that covers the functions of scaffolding, routing, data flow and so on. It uses a plug-in mechanism, powerful and easy to extend",
  "main": "lib/index.js",
  "bin": {
    "bnorth": "./bin/bnorth.js"
  },
  "scripts": {
    "start": "",
    "bundle": "webpack -p",
    "postinstall": "node scripts/project.js all",
    "build": "cross-env BABEL_ENV=cjs NODE_ENV=production babel src --out-dir lib",
    "prepublish": "npm run build",
    "postpublish": "open https://npm.taobao.org/sync/bnorth"
  },
  "bnorth": true,
  "files": [
    "LICENSE",
    "dist/",
    "lib/",
    "scripts/",
    "bin/",
    "config/",
    "templates/",
    "docs",
    "res"
  ],
  "keywords": [],
  "author": "able99(8846755@qq.com)",
  "repository": "https://github.com/able99/bnorth",
  "license": "MIT",
  "dependencies": {
    "assert": "^1.4.1",
    "autoprefixer": "^7.2.1",
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.0",
    "babel-eslint": "^8.0.1",
    "babel-loader": "^7.1.2",
    "babel-plugin-add-module-exports": "^0.2.1",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "babel-preset-react-app": "^3.0.3",
    "babel-preset-stage-0": "^6.24.1",
    "babel-preset-stage-1": "^6.24.1",
    "babel-runtime": "^6.26.0",
    "body-parser": "^1.18.2",
    "case-sensitive-paths-webpack-plugin": "^2.1.1",
    "copy-webpack-plugin": "^4.2.3",
    "cross-env": "^5.1.1",
    "cross-spawn": "^5.1.0",
    "css-loader": "^0.28.7",
    "eslint": "^4.7.2",
    "eslint-config-react-app": "^2.0.1",
    "eslint-loader": "^1.9.0",
    "eslint-plugin-flowtype": "^2.36.0",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-jsx-a11y": "^5.1.0",
    "eslint-plugin-react": "^7.4.0",
    "express-http-proxy": "^1.1.0",
    "extract-text-webpack-plugin": "^3.0.2",
    "file-loader": "^1.1.6",
    "fs-extra": "^4.0.2",
    "hi-base64": "^0.2.1",
    "html-webpack-plugin": "^2.30.1",
    "js-md5": "^0.6.0",
    "jspath": "^0.3.4",
    "moment": "^2.18.1",
    "react": "^0.14.0 || ^15.0.0-0 || ^16.0.0-0",
    "react-dev-utils": "^4.2.1",
    "react-dom": "^0.14.0 || ^15.0.0-0 || ^16.0.0-0",
    "react-redux": "^5.0.6",
    "react-router": "^3.0.0",
    "redux": "^3.7.2",
    "requires-port": "^1.0.0",
    "source-map": "^0.6.1",
    "style-loader": "^0.19.0",
    "url": "^0.11.0",
    "url-loader": "^0.6.2",
    "url-parse": "^1.1.9",
    "validator": "^9.1.1",
    "webpack": "^3.6.0",
    "webpack-dev-server": "^2.9.7",
    "webpack-visualizer-plugin": "^0.1.11",
    "whatwg-fetch": "^2.0.3"
  }
}
