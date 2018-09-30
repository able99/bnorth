"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var getClass = function getClass(app) {
  var aoptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (
    /*#__PURE__*/
    function (_app$State) {
      (0, _inherits2.default)(Request, _app$State);

      function Request(app, _id, options) {
        var _this;

        (0, _classCallCheck2.default)(this, Request);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Request).call(this, app, _id, options));
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
        value: function _requestFetching(fetching, _ref) {
          var loading = _ref.loading,
              mask = _ref.mask,
              noNotice = _ref.noNotice,
              noLoadingMask = _ref.noLoadingMask,
              isSubmit = _ref.isSubmit;
          loading && this.app.render.loading(fetching);
          mask && this.app.render.mask(fetching);
          !loading && !mask && !noLoadingMask && (!isSubmit ? this.app.render.loading(fetching) : this.app.render.mask(fetching));
          if (isSubmit || !fetching) return;
          this.stateUpdate({
            fetching: fetching
          });
        }
      }, {
        key: "_requestSuccess",
        value: function _requestSuccess(result, _ref2) {
          var append = _ref2.append,
              isSubmit = _ref2.isSubmit;
          this.fetched = true;
          if (isSubmit) return;
          var data = result.data;
          delete result.data;
          result.fetching = false;
          this.stateUpdate(result);
          this.update(data, {
            append: append
          });
        }
      }, {
        key: "_requestError",
        value: function _requestError(error, _ref3) {
          var isSubmit = _ref3.isSubmit;
          this.app.render.error(error);
          if (isSubmit) return;
          this.stateUpdate({
            fetching: false,
            error: error
          });
        }
      }, {
        key: "_requestWork",
        value: function _requestWork() {
          var _this2 = this;

          var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

          if (options.once && this.fetched) {
            this.app.log.info('plugin once');
            return;
          }

          var fetch = options.request || aoptions.request;
          if (!fetch) throw new Error('plugin request error: no request');

          this._requestFetching(true, options);

          return fetch(options, this).then(function () {
            var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _this2._requestFetching(false, options);

            if (options.onSuccess && options.onSuccess(result.data, result, options)) return;

            _this2._requestSuccess(result, options);

            return result;
          }).catch(function (error) {
            _this2._requestFetching(false, options);

            if (error === null) return;
            if (options.onError && options.onError(error, options)) return;

            _this2._requestError(error, options);

            _this2.app.event.emit(_this2, 'onStateError', error, options);
          });
        }
      }, {
        key: "fetch",
        value: function fetch(options) {
          return this._requestWork(this.app.utils.getOptions(this.options, options));
        }
      }, {
        key: "submit",
        value: function submit(options) {
          return this._requestWork(this.app.utils.getOptions(this.options, options, {
            isSubmit: true
          }));
        }
      }, {
        key: "data",
        value: function data() {
          var data = (0, _get2.default)((0, _getPrototypeOf2.default)(Request.prototype), "stateData", this).call(this);
          return !data.error && data.data ? data.data : this.options.initialization || {};
        }
      }, {
        key: "extData",
        value: function extData() {
          if (this.options.trackState) return (0, _get2.default)((0, _getPrototypeOf2.default)(Request.prototype), "stateData", this).call(this);
        }
      }]);
      return Request;
    }(app.State)
  );
};

var _default = function _default(app, options) {
  var Request = getClass(app, options);
  return {
    _id: 'request',
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