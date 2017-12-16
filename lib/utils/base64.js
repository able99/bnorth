'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64encode = base64encode;
exports.base64decode = base64decode;
//https://github.com/emn178
var base64 = require('hi-base64');

function base64encode() {
  return base64.encode.apply(base64, arguments);
}

function base64decode() {
  return base64.decode.apply(base64, arguments);
}