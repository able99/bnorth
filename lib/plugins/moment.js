'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * **plugin** moment: format dependence: format
 * 覆盖format 中时间格式化函数，支持 [moment](https://github.com/moment/moment/) 
 * @class formatPlugin
 */
exports.default = {
  name: 'moment',
  dependences: 'format',

  init: function init(app) {
    if (!app.format) return;

    /**
     * 格式化时间
     * @method
     * @param {date|number|string} date - 需要格式化的时间，moment 标准
     * @param {string} [format] - 格式化字符串，moment 标准
     * @return {string} - 格式化后的时间字符串
     */
    app.format.time = function (date, format) {
      return (0, _moment2.default)(date).format(format);
    };

    /**
     * 格式化时间
     * @method
     * @param {date|number|string} date - 需要比较的时间，moment 标准
     * @param {string} [fromTime] - 格式化字符串，moment 标准
     * @return {string} - 计算后的时间字符串
     */
    app.format.timeFrom = function (date, fromTime) {
      return fromTime ? (0, _moment2.default)(date).from(fromTime) : (0, _moment2.default)(date).fromNow();
    };
  }
}; /**
    * bnorth solution
    * @copyright (c) 2016 able99
    * @author able99 (8846755@qq.com)
    * @license MIT
    */

module.exports = exports['default'];