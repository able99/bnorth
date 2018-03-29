'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function getValueWork(obj, akey) {
  if (!obj || typeof akey !== 'string') return null;
  if (!akey) return obj;

  var keys = akey.split('.');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var key = _step.value;

      obj = obj[key];
      if (!obj) return null;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return obj;
}

exports.default = {
  setValue: function setValue(obj, key, value) {
    if (!obj || !key || typeof key !== 'string') return obj;

    var keys = key.split('.');
    var aobj = getValueWork(obj, keys.slice(0, -1).join('.'));
    if (!aobj) return obj;
    aobj[keys[keys.length - 1]] = value;
    return obj;
  },
  getValue: function getValue(obj, key) {
    return getValueWork(obj, key);
  }
};
module.exports = exports['default'];