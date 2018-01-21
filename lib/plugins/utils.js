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

/**
 * 为app 提供一些工具函数，如md5 等功能
 * **插件** 该类为插件类扩展了App 的能力
 * app.Utils: 该类的原型
 * app.utils: 该类的实例
 * @class
 */

var Utils = function () {
  function Utils() {
    (0, _classCallCheck3.default)(this, Utils);
  }

  (0, _createClass3.default)(Utils, [{
    key: 'uuid',

    /**
     * 获取uuid
     * @method
     * @param {number} [len=8] - 长度
     * @param {number} [radix=16] - 复杂度半径
     * @return {string} - uuid
     */
    value: function uuid() {
      return _uuid3.default.apply(undefined, arguments);
    }

    /**
     * base64解码
     * @method
     * @param {string} data - base64字符串
     * @return {string} - 解码后的字符串
     */

  }, {
    key: 'base64encode',
    value: function base64encode() {
      return _base.base64encode.apply(undefined, arguments);
    }

    /**
     * base64编码
     * @method
     * @param {string} data - 需要编码的字符串
     * @return {string} - base64 编码字符串
     */

  }, {
    key: 'base64decode',
    value: function base64decode() {
      return _base.base64decode.apply(undefined, arguments);
    }

    /**
     * MD5 编码
     * @method
     * @param {string} data - 需要编码的字符串
     * @return {string} - MD5 编码后的字符串
     */

  }, {
    key: 'md5',
    value: function md5() {
      return _md3.default.apply(undefined, arguments);
    }
  }]);
  return Utils;
}(); /**
      * bnorth solution
      * @copyright (c) 2016 able99
      * @author able99 (8846755@qq.com)
      * @license MIT
      */

exports.default = {
  name: 'utils',

  init: function init(app) {
    app.Utils = Utils;
    app.utils = new Utils(app);
  }
};
module.exports = exports['default'];