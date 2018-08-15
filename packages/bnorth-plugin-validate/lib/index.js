"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var validate = {
  errors: {
    default: '无效数据',
    required: '不可为空',
    number: '不是有效数字',
    inumber: '不是有效数字',
    positive: '不是有效正数',
    ipositive: '不是有效正数'
  },
  required: function required(val, check0) {
    if (val === undefined || val === null) return false;
    if (typeof val === 'string' && !val.length) return false;
    return true;
  },
  irequired: function irequired(val) {
    return true;
  },
  number: function number(val) {
    return !isNaN(val);
  },
  inumber: function inumber(val) {
    return !isNaN(val) || val === '.' || val === '0' || val === '0.';
  },
  positive: function positive(val) {
    return number(val) && val > 0;
  },
  ipositive: function ipositive(val) {
    return inumber(val) && val >= 0;
  }
};

function getValidateState(app) {
  return (
    /*#__PURE__*/
    function (_app$State) {
      (0, _inherits2.default)(Request, _app$State);

      function Request(app, name, options, page) {
        var _this;

        (0, _classCallCheck2.default)(this, Request);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Request).call(this, app, name, options, page));

        _this.app.event.on((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'onStateUpdating', function (nextData, prevData) {
          var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
              input = _ref.input,
              irules = _ref.irules,
              rules = _ref.rules,
              path = _ref.path;

          return _this.validate(nextData, input ? irules : rules, path, prevData);
        }, _this.name);

        _this.app.event.on((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'onStateUpadteInvalidate', function (key, message, nextData, prevData) {
          _this.app.render.error(message);

          return true;
        }, _this.name);

        return _this;
      }

      (0, _createClass2.default)(Request, [{
        key: "validateItem",
        value: function validateItem(key, data, rules) {
          var val = data && this.app.utils.pathGet(data, key);
          var rule = rules[key];
          if (!rule) return;
          var rulesArr = Array.isArray(rule) ? rule : [rule];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = rulesArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var ruleItem = _step.value;

              if (typeof ruleItem === 'function') {
                return ruleItem(key, data, rules);
              } else if ((0, _typeof2.default)(ruleItem) === 'object') {} else {
                var _this$app$validate;

                var ruleParams = String(ruleItem).split('|');

                var ret = typeof this.app.validate[ruleParams[0]] === 'function' && (_this$app$validate = this.app.validate)[ruleParams[0]].apply(_this$app$validate, [val].concat((0, _toConsumableArray2.default)(ruleParams.slice(1))));

                if (!ret) return this.app.validate.errors[ruleParams[0]] || this.app.validate.errors.default;
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
        }
      }, {
        key: "validate",
        value: function validate(nextData, rules, paths, prevData) {
          if (!rules) return;
          var keys = !paths ? Object.keys(rules) : Array.isArray(paths) ? paths : [paths];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var key = _step2.value;
              var message = this.validateItem(key, nextData, rules);

              if (message) {
                this.app.event.emitSync(this, 'onStateUpadteInvalidate', key, message, nextData, prevData);
                return prevData;
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }]);
      return Request;
    }(app.State)
  );
}

var _default = {
  // plugin 
  // --------------------------------
  pluginName: 'validate',
  pluginDependence: [],
  onPluginMount: function onPluginMount(app) {
    app.validate = validate;
    app.validate.State = getValidateState(app);
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.validate;
  }
};
exports.default = _default;
module.exports = exports["default"];