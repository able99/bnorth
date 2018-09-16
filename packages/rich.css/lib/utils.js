"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stylesToString = stylesToString;
exports.getSizeSet = getSizeSet;
exports.getSelector = getSelector;
exports.getStyleKey = getStyleKey;
exports.getStyleValue = getStyleValue;
exports.getStyleSet = getStyleSet;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

function stylesToString(styles) {
  return (Array.isArray(styles) ? styles : Object.entries(styles || {})).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    var lines = (Array.isArray(v) ? v : Object.entries(v || {})).map(function (_ref3) {
      var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
          kk = _ref4[0],
          vv = _ref4[1];

      return "  ".concat(kk, ": ").concat(vv, ";");
    }).join('\n');
    return "".concat(k, " {\n").concat(lines, "\n}");
  }).join('\n\n');
}

function getSizeSet(name, config) {
  var ret = {};
  if (!name || !config) return ret;
  var base = config["".concat(name, "SizeBase")];
  var min = config["".concat(name, "SizeMin")];
  var minCalc = config["".concat(name, "SizeMinCalc")];
  var max = config["".concat(name, "SizeMax")];
  var maxCalc = config["".concat(name, "SizeMaxCalc")];
  var sizes = config["".concat(name, "SizeSet")] || [];
  if (base !== undefined) ret['-'] = base;

  for (var i = minCalc - 1; i >= 0; i--) {
    ret[i ? 'x'.repeat(i) + 's' : 'sm'] = Math.round(base - (base - min) / minCalc * (i + 1));
  }

  for (var _i = 0; _i < maxCalc; _i++) {
    ret[_i ? 'x'.repeat(_i) + 'l' : 'lg'] = Math.round(base + (max - base) / maxCalc * (_i + 1));
  }

  if (Array.isArray(sizes)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = sizes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var size = _step.value;

        if (Array.isArray(size)) {
          ret[size[0]] = getStyleValue(size[1]);
        } else {
          var pre = typeof size === 'number' ? ' ' : '';
          var ext = typeof size === 'string' && !isNaN(size) ? 'x' : '';
          var ratio = typeof size === 'string' && !isNaN(size) && base || 1;
          ret[pre + size + ext] = getStyleValue(size * ratio);
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
  } else if ((0, _typeof2.default)(sizes) === 'object') {
    Object.entries(sizes).forEach(function (_ref5) {
      var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
          k = _ref6[0],
          v = _ref6[1];

      return ret[k] = getStyleValue(v);
    });
  }

  return ret;
}

function getSelector() {
  var ret = '.';

  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  for (var _i2 = 0; _i2 < args.length; _i2++) {
    var arg = args[_i2];
    if (arg !== 0 && !arg) continue;
    ret += "".concat(ret !== '.' && arg !== '-' ? '-' : '').concat(arg);
  }

  return ret;
}

function getStyleKey() {
  var ret = '';

  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  for (var _i3 = 0; _i3 < args.length; _i3++) {
    var arg = args[_i3];
    if (arg !== 0 && !arg) continue;
    ret += "".concat(ret ? '-' : '').concat(arg);
  }

  return ret;
}

function getStyleValue(val, param) {
  var ret = val === true ? param : val;
  return typeof ret === 'number' ? ret + 'px' : ret;
}

function getStyleSet(pre, val) {
  var _ref7 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      key = _ref7.key,
      mapKey = _ref7.mapKey,
      mapVal = _ref7.mapVal,
      ext = _ref7.ext,
      showMapKey = _ref7.showMapKey;

  var ret = {};

  if (Array.isArray(mapVal)) {
    mapVal.forEach(function (v) {
      return ret[getStyleKey(pre, v, showMapKey ? key : '', ext)] = getStyleValue(val, key);
    });
  } else {
    if (val !== false) ret[getStyleKey(pre, mapVal ? mapKey : '', showMapKey ? key : '', ext)] = getStyleValue(val, key);
  }

  return ret;
}