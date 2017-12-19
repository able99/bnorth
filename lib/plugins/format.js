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

var Format = function () {
  function Format(app) {
    (0, _classCallCheck3.default)(this, Format);

    this.app = app;

    this.moneyDefault = '0.00';

    this.timeFormat = "YYYY-MM-DD HH:mm:ss";

    this.byteSizeG = 'G';
    this.byteSizeM = 'M';
    this.byteSizeK = 'K';
    this.byteSizeB = 'B';

    this.checkErrorMessage = 'error';
  }

  (0, _createClass3.default)(Format, [{
    key: 'money',
    value: function money(val) {
      return !isNaN(val) ? Number(val).toFixed(2) : this.moneyDefault;
    }
  }, {
    key: 'discount',
    value: function discount(value, _discount) {
      var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.01;

      if (isNaN(value) || Number(value) === 0) return 0;
      if (isNaN(_discount)) return value;

      return Math.max(Math.round(value * 100 * _discount) / 100, min);
    }
  }, {
    key: 'timeInit',
    value: function timeInit() {
      return (0, _time2.timeInit)();
    }
  }, {
    key: 'time',
    value: function time(val, options) {
      options = options || {};
      options.format = options.format || this.timeFormat;
      return (0, _time2.time)(val, options);
    }
  }, {
    key: 'timeFrom',
    value: function timeFrom(val, options) {
      return (0, _time2.timeFrom)(val, options);
    }
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