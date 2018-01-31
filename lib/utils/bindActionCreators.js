'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.default = bindActionCreators;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }
  if ((typeof actionCreators === 'undefined' ? 'undefined' : (0, _typeof3.default)(actionCreators)) !== 'object' || actionCreators === null) {
    return {};
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  var _loop = function _loop(i) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = function () {
        var func = actionCreator.apply(undefined, arguments);
        if (typeof func === 'function') func.fname = key;
        return dispatch(func);
      };
    }
  };

  for (var i = 0; i < keys.length; i++) {
    _loop(i);
  }
  return boundActionCreators;
}
module.exports = exports['default'];