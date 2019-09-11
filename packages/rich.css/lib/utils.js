"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.classObjectsToString = classObjectsToString;
exports.getStyleValueSetDefault = getStyleValueSetDefault;
exports.getStyleValueSet = getStyleValueSet;
exports.genClassObjects = genClassObjects;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.number.constructor");

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

function classObjectsToString(styles) {
  return ((0, _isArray.default)(styles) ? styles : (0, _entries.default)(styles || {})).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    var lines = ((0, _isArray.default)(v) ? v : (0, _entries.default)(v || {})).map(function (_ref3) {
      var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
          kk = _ref4[0],
          vv = _ref4[1];

      return "  ".concat(kk, ": ").concat(vv, ";");
    }).join('\n');
    return "".concat(k, " {\n").concat(lines, "\n}");
  }).join('\n\n');
}

function getStyleValueSetDefault(styleValueSet) {
  if (!styleValueSet) return;
  return styleValueSet[(0, _keys.default)(styleValueSet)[0]];
}

function getStyleValue(value, key) {
  var unit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'px';
  value = value === true ? key : value;
  return typeof value === 'number' ? value + unit : String(value).trim();
}

function getStyleValueSet(set) {
  if (!set) return {};
  var unit = set['_unit'];
  return ((0, _isArray.default)(set) ? set.map(function (v) {
    return [v, v];
  }) : (0, _entries.default)(set)).reduce(function (v1, _ref5) {
    var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
        k = _ref6[0],
        v = _ref6[1];

    if (k === '_base') {
      var isString = typeof v === 'string';
      var base = Number(v) || 0;
      var min = Number(set['_min']) || 0;
      var minCount = Number(set['_minCount']) || 3;
      var max = Number(set['_max']) || 100;
      var maxCount = Number(set['_maxCount']) || 3;
      v1['-'] = getStyleValue(isString ? String(base) : base, null, unit);

      for (var i = minCount - 1; i >= 0; i--) {
        var value = Math.round(base - (base - min) / minCount * (i + 1));
        v1[i ? 'x'.repeat(i) + 's' : 'sm'] = getStyleValue(isString ? String(value) : value, null, unit);
      }

      for (var _i = 0; _i < maxCount; _i++) {
        var _value = Math.round(base + (max - base) / maxCount * (_i + 1));

        v1[_i ? 'x'.repeat(_i) + 'l' : 'lg'] = getStyleValue(isString ? String(_value) : _value, null, unit);
      }
    } else if (k === '_multiple' && (0, _isArray.default)(v)) {
      var _base = set['_base'];

      var _isString = typeof _base === 'string';

      _base = Number(_base) || 0;
      (_base || _base === 0) && v.forEach(function (vv) {
        var value = _base * Number(vv);

        v1[vv + 'x'] = getStyleValue(_isString ? String(value) : value, null, unit);
      });
    }

    if (k === '_from') {
      var from = Number(v) || 0;
      var to = Number(set['_to']) || 0;
      var step = Number(set['_step']) || 1;

      for (var _i2 = from; _i2 <= to; _i2 += step) {
        v1[' ' + _i2] = _i2;
      }
    } else if (k && k[0] !== '_') {
      v1[k] = getStyleValue(v, k, unit);
    }

    return v1;
  }, {});
}

function concatCssKeys(isSelector) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return args.reduce(function (v1, v2) {
    if (v2 !== 0 && !v2) return v1;
    return String(v1 + (v1 && v2 !== '-' && (!isSelector || v1[0] === '.' && v1.length > 1) ? '-' : '') + String(v2).trim());
  }, '');
}

function genClassObjects(selector) {
  var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      selectorExt = _ref7.selectorExt,
      styleKey = _ref7.styleKey,
      styleKeySet = _ref7.styleKeySet,
      styleKeyExt = _ref7.styleKeyExt,
      styleValueSet = _ref7.styleValueSet,
      styleValueMap = _ref7.styleValueMap,
      styleObjectMap = _ref7.styleObjectMap,
      styleObjectCompatible = _ref7.styleObjectCompatible;

  var classObject = {};
  if (styleKey === true) styleKey = selector[0] === '.' ? selector.slice(1) : selector;
  if (!styleValueSet) styleValueSet = {
    '': ''
  };
  if (!styleKeySet) styleKeySet = {
    '': ''
  };
  (0, _entries.default)(styleKeySet).forEach(function (_ref8) {
    var _ref9 = (0, _slicedToArray2.default)(_ref8, 2),
        styleKeySetKey = _ref9[0],
        styleKeySetValue = _ref9[1];

    (0, _entries.default)(styleValueSet).forEach(function (_ref10) {
      var _ref11 = (0, _slicedToArray2.default)(_ref10, 2),
          styleValueSetKey = _ref11[0],
          styleValueSetValue = _ref11[1];

      var styleObject = {};

      if (styleObjectMap && typeof styleObjectMap === 'function') {
        styleObject = styleObjectMap(styleKeySetKey, styleKeySetValue, styleValueSetKey, styleValueSetValue);
      } else if (styleObjectMap) {
        styleObject = _objectSpread({}, styleObjectMap);
      } else {
        var styleKeySetValues = (0, _isArray.default)(styleKeySetValue) ? styleKeySetValue : [styleKeySetValue];
        styleKeySetValues.forEach(function (styleKeySetValue) {
          styleKeySetValue = styleKeySetValue === true ? styleKeySetKey : styleKeySetValue;
          var styleValue = styleValueMap ? typeof styleValueMap === 'function' ? styleValueMap(styleValueSetValue) : styleValueMap : styleValueSetValue;
          styleObject[concatCssKeys(false, styleKey, styleKeySetValue, styleKeyExt)] = styleValue;
        });
      }

      classObject[concatCssKeys(true, selector, styleKeySetKey, styleValueSetKey, selectorExt)] = styleObjectCompatible ? styleObjectCompatible(styleObject) : styleObject;
    });
  });
  return classObject;
}