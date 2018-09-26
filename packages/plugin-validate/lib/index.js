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
    return this.number(val) && val > 0;
  },
  ipositive: function ipositive(val) {
    return this.inumber(val) && val >= 0;
  }
};

function getClass(app) {
  return (
    /*#__PURE__*/
    function (_app$State) {
      (0, _inherits2.default)(Validate, _app$State);

      function Validate(app, options) {
        var _this;

        (0, _classCallCheck2.default)(this, Validate);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Validate).call(this, app, options));
        app.event.on(_this._id, 'onStateUpdating', function (nextData, prevData, data) {
          var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
              input = _ref.input,
              irules = _ref.irules,
              rules = _ref.rules,
              path = _ref.path;

          return _this.validate(nextData, input ? irules : rules, path, prevData);
        }, _this._id);
        app.event.on(_this._id, 'onStateUpadteInvalidate', function (key, message, nextData, prevData) {
          _this.app.render.error(message);

          return true;
        }, _this._id);
        return _this;
      }

      (0, _createClass2.default)(Validate, [{
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
                this.app.event.emitSync(this._id, 'onStateUpadteInvalidate', key, message, nextData, prevData);
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
      return Validate;
    }(app.State)
  );
}

var _default = function _default(app) {
  var Validate = getClass(app);
  return {
    _id: 'validate',
    onPluginMount: function onPluginMount(app) {
      app.validate = validate;
      app.Validate = Validate;
    },
    onPluginUnmount: function onPluginUnmount(app) {
      delete app.validate;
      delete app.Validate;
    }
  };
};

exports.default = _default;