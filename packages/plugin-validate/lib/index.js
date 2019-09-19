"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var validate = {
  errors: {
    default: '无效数据',
    required: '不可为空',
    number: '不是有效数字',
    positive: '不是有效正数'
  },
  required: function required(val) {
    if (val === undefined || val === null) return this.errors.required;
    if (typeof val === 'string' && !val.length) return this.errors.required;
  },
  number: function number(val) {
    return isNaN(val) && this.errors.number;
  },
  positive: function positive(val) {
    return this.number(val) && val > 0;
  }
};

function getClass(app) {
  return (
    /*#__PURE__*/
    function (_app$State) {
      (0, _inherits2.default)(Validate, _app$State);

      function Validate(_id, options, ownerId) {
        var _this;

        (0, _classCallCheck2.default)(this, Validate);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Validate).call(this, _id, options, ownerId));
        _this.invalidates = {};
        _this.options.__onStateUpdating = _this.options._onStateUpdating;

        _this.options._onStateUpdating = function (nextData, prevData, data, options) {
          var rules = options.validateRules,
              _options$validateOpti = options.validateOptions,
              validateOptions = _options$validateOpti === void 0 ? {} : _options$validateOpti,
              _onStateInvalidate = options._onStateInvalidate,
              _onStateInvalidates = options._onStateInvalidates;
          _this.invalidates = {};

          if (rules) {
            var invalidate;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = (0, _getIterator2.default)(rules), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var rule = _step.value;
                var func = typeof rule.rule === 'function' ? rule.rule : app.validate[rule.rule] && app.validate[rule.rule].bind(app.validate);
                if (!func) continue;
                invalidate = func(nextData[rule.key], rule.params);
                if (invalidate) _this.invalidates[rule.key] = invalidate;

                if (invalidate && validateOptions.bail && _onStateInvalidate) {
                  nextData = _onStateInvalidate(invalidate, rule, nextData, prevData, data, options) || nextData;
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            if (invalidate && _onStateInvalidates) nextData = _onStateInvalidates(_this.invalidates, rules, nextData, prevData, data, options) || nextData;
          }

          return _this.options.__onStateUpdating ? _this.options.__onStateUpdating(nextData, prevData, data, options) : nextData;
        };

        return _this;
      }

      return Validate;
    }(app.State)
  );
}

var _default = {
  _id: 'validate',
  _onStart: function _onStart(app) {
    app.validate = validate;
    app.Validate = getClass(app);
  },
  _onStop: function _onStop(app) {
    delete app.validate;
    delete app.Validate;
  }
};
exports.default = _default;