'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.check = check;
exports.checkObjectItem = checkObjectItem;
exports.checkObject = checkObject;

var _jspath = require('jspath');

var _jspath2 = _interopRequireDefault(_jspath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var is = {};
is.required = function (n, checkInput, checkO) {
  if (checkInput) return true;
  if (n === undefined || n === null) return false;
  if (typeof n === 'string' && !n.length) return false;
  if (checkO && Number(n) === 0) return false;
  return true;
};
is.number = function (n, checkInput) {
  return !isNaN(n) || checkInput && (n === '.' || n === '0' || n === '0.');
};
is.positive = function (n, checkInput) {
  return is.number(n) && Number(n) > 0;
};

function check(val, arule) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var checkErrorMessage = arguments[3];

  if (!arule) return null;
  var message = options.checkErrorMessage || checkErrorMessage || 'error';
  var rule = null;
  var params = [];
  var checker = null;

  if ((typeof arule === 'undefined' ? 'undefined' : (0, _typeof3.default)(arule)) === 'object') {
    if (arule.rule) rule = arule.rule;
    if (arule.params) params = arule.params;
    if (arule.message) message = arule.message;
  } else if (typeof arule === 'string') {
    rule = arule;
  }
  if (!rule) return null;

  var getNot = false;
  if (typeof rule === 'function') {
    checker = rule;
  } else if (typeof rule === 'string') {
    if (rule[0] === '!') {
      rule = rule.slice(1);
    }
    var splits = rule.split('|');
    if (splits.length > 1) {
      rule = splits[0];
      params = [].concat((0, _toConsumableArray3.default)(params), [splits.slice(1)]);
    }
    checker = is[rule];
  } else {
    return null;
  }

  var ret = !checker.apply(undefined, [val, options.input].concat((0, _toConsumableArray3.default)(params)));
  if (getNot) ret = !ret;
  return ret ? message : null;
}

function checkObjectItem() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var key = arguments[1];
  var rules = arguments[2];
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (!key || !rules) return false;
  var val = _jspath2.default.apply('.' + key + '[0]', obj);

  if (Array.isArray(rules)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var rule = _step.value;

        var ret = check(val, rule, options);
        if (ret) return ret;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return false;
  } else {
    return check(val, rules, options);
  }
}

function checkObject(obj) {
  var rules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var rets = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (!obj || (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) !== 'object') return;
  var message = '';

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = Object.entries(rules)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = (0, _slicedToArray3.default)(_step2.value, 2),
          key = _step2$value[0],
          rule = _step2$value[1];

      message = checkObjectItem(obj, key, rule);
      if (message) {
        rets[key] = message;
        if (!options.bail) break;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return message;
}