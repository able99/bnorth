'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = getOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getOptions(options) {
  var ret = {};
  if (typeof options === 'function') {
    ret = options() || {};
  } else if ((typeof options === 'undefined' ? 'undefined' : (0, _typeof3.default)(options)) === 'object') {
    ret = options;
  }

  if (ret.getOptions) ret = Object.assign({}, ret, ret.getOptions());
  return ret;
}
module.exports = exports['default'];