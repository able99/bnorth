'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = md5;
//https://github.com/emn178
var md5js = require('js-md5');

function md5() {
  return md5js.apply(undefined, arguments);
}