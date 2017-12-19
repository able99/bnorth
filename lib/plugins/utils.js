'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _md2 = require('../utils/md5');

var _md3 = _interopRequireDefault(_md2);

var _uuid2 = require('../utils/uuid');

var _uuid3 = _interopRequireDefault(_uuid2);

var _base = require('../utils/base64');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Utils = function () {
  function Utils() {
    (0, _classCallCheck3.default)(this, Utils);
  }

  (0, _createClass3.default)(Utils, [{
    key: 'uuid',
    value: function uuid() {
      return _uuid3.default.apply(undefined, arguments);
    }
  }, {
    key: 'base64encode',
    value: function base64encode() {
      return _base.base64encode.apply(undefined, arguments);
    }
  }, {
    key: 'base64decode',
    value: function base64decode() {
      return _base.base64decode.apply(undefined, arguments);
    }
  }, {
    key: 'md5',
    value: function md5() {
      return _md3.default.apply(undefined, arguments);
    }
  }]);
  return Utils;
}();

exports.default = {
  init: function init(app) {
    app.Utils = Utils;
    app.utils = new Utils(app);
  }
};
module.exports = exports['default'];