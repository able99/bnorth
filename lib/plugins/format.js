'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _time2 = require('../utils/time');

var _validator = require('../utils/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 为app 提供格式化输出与数据校验的功能扩展
 * @class
 * **插件** 该类为插件类扩展了App 的能力
 * app.Format: 该类的原型
 * app.format: 该类的实例
 */
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

var Format = function () {
  function Format(app) {
    (0, _classCallCheck3.default)(this, Format);

    this.app = app;

    /**
     * @property {string} [moneyDefault='0.00'] - 金额默认字符串
     */
    this.moneyDefault = '0.00';

    /**
     * @property {string} [timeFormat='YYYY-MM-DD HH:mm:ss'] - 时间默认的格式化字符串
     */
    this.timeFormat = "YYYY-MM-DD HH:mm:ss";

    /**
     * @property {string} [byteSizeG='G'] - 文件大小默认字符串
     */
    this.byteSizeG = 'G';
    /**
     * @property {string} [byteSizeM='M'] - 文件大小默认字符串
     */
    this.byteSizeM = 'M';
    /**
     * @property {string} [byteSizeK='K'] - 文件大小默认字符串
     */
    this.byteSizeK = 'K';
    /**
     * @property {string} [byteSizeB='B'] - 文件大小默认字符串
     */
    this.byteSizeB = 'B';

    /**
     * @property {string} [checkErrorMessage='error'] - 校验错误的默认字符串
     */
    this.checkErrorMessage = 'error';
  }

  /**
   * 格式化金额
   * @method
   * @param {number|string} val - 金额
   */


  (0, _createClass3.default)(Format, [{
    key: 'money',
    value: function money(val) {
      return !isNaN(val) ? Number(val).toFixed(2) : this.moneyDefault;
    }

    /**
     * 计算折扣并格式化
     * @method
     * @param {number|string} value - 金额
     * @param {number|string} discount - 折扣
     * @param {number|string} [min=0.01] - 最小金额
     */

  }, {
    key: 'discount',
    value: function discount(value, _discount) {
      var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.01;

      if (isNaN(value) || Number(value) === 0) return 0;
      if (isNaN(_discount)) return value;

      return Math.max(Math.round(value * 100 * _discount) / 100, min);
    }

    /**
     * 初始化时间格式化，由于moment 体积较大，分离初始化
     * @method
     */

  }, {
    key: 'timeInit',
    value: function timeInit() {
      return (0, _time2.timeInit)();
    }

    /**
     * 格式化时间
     * @method
     * @param {*} val 
     * @param {*} options 
     */

  }, {
    key: 'time',
    value: function time(val, options) {
      options = options || {};
      options.format = options.format || this.timeFormat;
      return (0, _time2.time)(val, options);
    }

    /**
     * 格式化时间比较
     * @method
     * @param {*} val 
     * @param {*} options 
     */

  }, {
    key: 'timeFrom',
    value: function timeFrom(val, options) {
      return (0, _time2.timeFrom)(val, options);
    }

    /**
     * 格式化文件尺寸
     * @method
     * @param {number} size - 文件大小
     * @param {number} [fixed=2] - 小数点位数 
     */

  }, {
    key: 'byteSize',
    value: function byteSize() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var fixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

      if (size > 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024).toFixed(fixed) + this.byteSizeG;
      } else if (size > 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(fixed) + this.byteSizeM;
      } else if (size > 1024) {
        return (size / 1024).toFixed(fixed) + this.byteSizeK;
      } else {
        return (size ? size : 0) + this.byteSizeB;
      }
    }

    /**
     * 校验数据对象的有效性
     * @method
     * @param {object} val 
     * @param {object} arule 
     * @param {object} options 
     * @param {string} errorMessage 
     */

  }, {
    key: 'check',
    value: function check(val, arule, options, errorMessage) {
      return (0, _validator.check)(val, arule, options, this.checkErrorMessage);
    }
  }, {
    key: 'checkObjectItem',
    value: function checkObjectItem(obj, key, rules, options) {
      return (0, _validator.checkObjectItem)(obj, key, rules, options);
    }
  }, {
    key: 'checkObject',
    value: function checkObject(obj, rules, options) {
      return (0, _validator.checkObject)(obj, rules, options);
    }
  }]);
  return Format;
}();

exports.default = {
  init: function init(app) {
    app.Format = Format;
    app.format = new Format(app);
  }
};
module.exports = exports['default'];