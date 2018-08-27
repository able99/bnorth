"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */
var Format =
/*#__PURE__*/
function () {
  function Format(app) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, Format);
    this.app = app;
    this.options = (0, _objectSpread2.default)({}, Format.options, options);
  }
  /**
   * 格式化金额
   * @method
   * @param {number|string} val - 金额
   */


  (0, _createClass2.default)(Format, [{
    key: "money",
    value: function money(val, options) {
      options = this.app.utils.getOptions(this.options, options);
      return !isNaN(val) && (!options.zeroDefault || val > 0) ? Number(val).toFixed(2) : options.moneyDefault;
    }
    /**
     * 计算折扣并格式化
     * @method
     * @param {number|string} value - 金额
     * @param {number|string} discount - 折扣
     * @param {number|string} [min=0.01] - 最小金额
     */

  }, {
    key: "discount",
    value: function discount(value, _discount) {
      var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.01;
      if (isNaN(value) || Number(value) === 0) return 0;
      if (isNaN(_discount)) return value;
      return Math.max(Math.round(value * 100 * _discount) / 100, min);
    }
    /**
     * 格式化时间
     * @method
     * @param {date|number|string} date - 需要格式化的时间
     * @param {string} [format=app.format.timeFormat] - 格式化字符串<br />
     * YYYY|YY: 年
     * MM|M: 月
     * DD|D: 日
     * HH|H: 时
     * mm|m: 分
     * ss|s: 秒
     * S: 毫秒
     * Q: 季度
     * @return {string} - 格式化后的时间字符串
     */

  }, {
    key: "time",
    value: function time(date) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.options.timeFormat;
      date = date instanceof Date ? date : new Date(date);
      var o = {
        "M+": date.getMonth() + 1,
        "D+": date.getDate(),
        "H+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "Q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
      };
      if (/(Y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }

      return format;
    }
    /**
     * 格式化文件尺寸
     * @method
     * @param {number} size - 文件大小
     * @param {number} [fixed=2] - 小数点位数 
     */

  }, {
    key: "byteSize",
    value: function byteSize() {
      var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var fixed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

      if (size > 1024 * 1024 * 1024) {
        return (size / 1024 / 1024 / 1024).toFixed(fixed) + this.options.byteSizeG;
      } else if (size > 1024 * 1024) {
        return (size / 1024 / 1024).toFixed(fixed) + this.options.byteSizeM;
      } else if (size > 1024) {
        return (size / 1024).toFixed(fixed) + this.options.byteSizeK;
      } else {
        return (size ? size : 0) + this.options.byteSizeB;
      }
    }
  }]);
  return Format;
}();

Format.options = {
  moneyDefault: '0.00',
  timeFormat: "YYYY-MM-DD HH:mm:ss",
  byteSizeG: 'G',
  byteSizeM: 'M',
  byteSizeK: 'K',
  byteSizeB: 'B'
};
var _default = {
  _id: 'format',
  onPluginMount: function onPluginMount(app, plugin, options) {
    app.Foramt = Format;
    app.format = new Format(app, options);
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.Foramt;
    delete app.format;
  }
};
exports.default = _default;
module.exports = exports["default"];