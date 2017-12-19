"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  setValue: function setValue(obj, key, value) {
    if (!obj) return null;
    obj[key] = value;
    return obj;
  },
  getValue: function getValue(obj, key) {
    if (!obj) return null;
    return obj[key];
  }
};
module.exports = exports["default"];