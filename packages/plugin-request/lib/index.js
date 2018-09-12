"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var Request =
/*#__PURE__*/
function (_app$State) {
  (0, _inherits2.default)(Request, _app$State);

  function Request(app) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2.default)(this, Request);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Request).call(this, app, options));
    _this.fetched = false;
    app.event.on(_this._id, 'onStateStart', function (page) {
      _this.options.fetchOnStart && _this.fetch();
    }, _this._id);
    app.event.on(_this._id, 'onStateActive', function (page, onStart) {
      _this.options.fetchOnActive && !onStart && _this.fetch();
    }, _this._id);
    return _this;
  }

  (0, _createClass2.default)(Request, [{
    key: "_requestFetching",
    value: function _requestFetching(fetching, _ref, isFetch) {
      var loading = _ref.loading,
          mask = _ref.mask,
          noNotice = _ref.noNotice,
          noLoadingMask = _ref.noLoadingMask;
      loading && this.app.render.loading(fetching);
      mask && this.app.render.mask(fetching);
      !loading && !mask && !noLoadingMask && (isFetch ? this.app.render.loading(fetching) : this.app.render.mask(fetching));
      isFetch && (0, _get2.default)((0, _getPrototypeOf2.default)(Request.prototype), "update", this).call(this, {
        fetching: fetching
      }, {
        append: true
      }, this.dataExt(true));
    }
  }, {
    key: "_requestSuccess",
    value: function _requestSuccess(result, options, isFetch) {
      this.fetched = true;
      isFetch && (0, _get2.default)((0, _getPrototypeOf2.default)(Request.prototype), "update", this).call(this, (0, _objectSpread2.default)({
        fetching: false
      }, result), {
        append: typeof options.append === 'string' ? ".data[".concat(options.append, "]") : options.append ? '.data' : options.append
      }, this.dataExt(true));
    }
  }, {
    key: "_requestError",
    value: function _requestError(error, options, isFetch) {
      isFetch && (0, _get2.default)((0, _getPrototypeOf2.default)(Request.prototype), "update", this).call(this, {
        fetching: false,
        error: error
      });
      this.app.render.error(error);
    }
  }, {
    key: "_request",
    value: function _request() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var isFetch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (options.once && this.fetched) {
        this.app.log.info('plugin once');
        return;
      }

      if (!this.app.network || !this.app.network.fetch) throw new Error('plugin error: no dependence network');

      this._requestFetching(true, options, isFetch);

      return this.app.network.fetch(options, isFetch).then(function (result) {
        _this2._requestFetching(false, options, isFetch);

        if (!result) return;
        if (options.onSuccess && options.onSuccess(result.data, result, options, isFetch)) return;

        var ret = _this2.app.event.emitSync(_this2, 'onStateWillUpdate', result.data, result, options, isFetch); // if(ret) result = ret;
        // if(ret===false) return;


        _this2._requestSuccess(result, options, isFetch);

        _this2.app.event.emitSync(_this2, 'onStateDidUpdate', result.data, result, options, isFetch);

        return result;
      }).catch(function (error) {
        _this2._requestFetching(false, options, isFetch);

        if (error === null) return;
        if (options.onError && options.onError(error, options)) return;

        _this2._requestError(error, options, isFetch);

        _this2.app.event.emit(_this2, 'onStateError', error, options, isFetch);
      });
    }
  }, {
    key: "fetch",
    value: function fetch(options) {
      return this._request(this.app.utils.getOptions(this.options, options));
    }
  }, {
    key: "update",
    value: function update(data) {
      var onlyData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return (0, _get2.default)((0, _getPrototypeOf2.default)(Request.prototype), "update", this).call(this, onlyData ? {
        data: data
      } : data);
    }
  }, {
    key: "data",
    value: function data() {
      var data = (0, _get2.default)((0, _getPrototypeOf2.default)(Request.prototype), "data", this).call(this);
      return !data.error && data.data ? data.data : this.options.initialization || {};
    }
  }, {
    key: "dataExt",
    value: function dataExt(force) {
      if (force || this.options.trackState) return (0, _get2.default)((0, _getPrototypeOf2.default)(Request.prototype), "data", this).call(this);
    }
  }]);
  return Request;
}(app.State);

var _default = function _default(app) {
  return {
    _id: 'request',
    _dependencies: ['network'],
    onPluginMount: function onPluginMount(app, plugin) {
      app.Request = Request;
      app.request = plugin;
    },
    onPluginUnmount: function onPluginUnmount(app) {
      delete app.Request;
      delete app.request;
    },
    stateRequest: {
      state: Request
    },
    request: function request(options) {
      return app.request.stateRequest._request(options, false);
    }
  };
};

exports.default = _default;
module.exports = exports["default"];