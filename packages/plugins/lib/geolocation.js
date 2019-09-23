"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _coordtransform = _interopRequireDefault(require("coordtransform"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var geolocation = {
  options: {
    timeout: 3000,
    enableHighAccuracy: true,
    maximumAge: 30000,
    watch: 0,
    watchId: undefined,
    error: undefined,
    latitude: 39.92889,
    longitude: 116.38833,
    accuracy: undefined,
    altitudeAccuracy: undefined,
    heading: undefined,
    speed: undefined
  },

  get location() {
    return this.options;
  },

  getLocation: function getLocation(options) {
    var _this = this;

    options = _objectSpread({}, this.options, {}, options);
    return new _promise.default(function (resolve, reject) {
      var ready = false;
      setTimeout(function () {
        if (ready) return;
        reject(_this._handleError());
        ready = true;
      }, options.timeout + 100);
      navigator.geolocation.getCurrentPosition(function (position) {
        if (ready) return;
        resolve(_this._handlePostion(position));
        ready = true;
      }, function (error) {
        if (ready) return;
        reject(_this._handleError(error));
        ready = true;
      }, options);
    });
  },
  watchPosition: function watchPosition(options, successcb, errorcb) {
    var _this2 = this;

    options = _objectSpread({}, this.options, {}, options, {
      watch: ++this.options.watch
    });
    return this.options.watchId = navigator.geolocation.watchPosition(function (position) {
      var location = _this2._handlePostion(position);

      successcb && successcb(location);
    }, function (error) {
      error = _this2._handleError(error);
      errorcb && errorcb(error);
    }, options);
  },
  clearWatch: function clearWatch() {
    var _id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.watchId;

    --this.options.watch;
    if (this.options.watch < 0) this.options.watch = 0;
    navigator.geolocation.clearWatch(_id);
  },
  _handlePostion: function _handlePostion(position) {
    this.options = _objectSpread({}, this.options, {}, position.coords, {
      error: false
    });
    return this.options;
  },
  _handleError: function _handleError(error) {
    this.options.error = error;
    this.options.accuracy = false;
    this.options.altitudeAccuracy = false;
    return this.options;
  }
};

var _default = function _default(app, plugin) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return {
    _id: 'geolocation',
    _onStart: function _onStart(app) {
      app.geolocation = geolocation;
      app.geolocation.options = _objectSpread({}, app.geolocation.options, {}, options);
      app.geolocation.wgs84togcj02 = _coordtransform.default.wgs84togcj02;
      app.geolocation.gcj02tobd09 = _coordtransform.default.gcj02tobd09;

      app.geolocation.wgs84tobd09 = function (lng, lat) {
        var _app$geolocation$wgs = app.geolocation.wgs84togcj02(lng, lat);

        var _app$geolocation$wgs2 = (0, _slicedToArray2.default)(_app$geolocation$wgs, 2);

        lng = _app$geolocation$wgs2[0];
        lat = _app$geolocation$wgs2[1];
        return app.geolocation.gcj02tobd09(lng, lat);
      };

      app.geolocation.bd09togcj02 = _coordtransform.default.bd09togcj02;
      app.geolocation.gcj02towgs84 = _coordtransform.default.gcj02towgs84;

      app.geolocation.bd09towgs84 = function (lng, lat) {
        var _app$geolocation$bd = app.geolocation.bd09togcj02(lng, lat);

        var _app$geolocation$bd2 = (0, _slicedToArray2.default)(_app$geolocation$bd, 2);

        lng = _app$geolocation$bd2[0];
        lat = _app$geolocation$bd2[1];
        return app.geolocation.wgs84tgcj02towgs84ogcj02(lng, lat);
      };
    },
    _onStop: function _onStop(app) {
      delete app.geolocation;
    }
  };
};

exports.default = _default;