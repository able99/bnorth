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

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _get2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * @module
 */

/**
 * 带请求能力的数据单元声明对象，扩展了默认的路由声明对象
 * @typedef NetworkStateDefine
 * @extends module:state~StateDefine
 * @extends module:index~PluginOptions
 * @type {object}
 */

/**
 * 请求
 * @callback PluginOptionsOnSuccess
 * @param {*} data - 请求返回的数据
 * @param {object} result - 请求返回的包装对象，具体根据 request 指定
 * @param {module:index~PluginOptions} opitons - 请求时的参数 
 * @returns {boolean} 返回为真，阻止数据更新
 */

/**
 * 请求
 * @callback PluginOptionsOnError
 * @param {object} error - 请求返回的包装对象，具体根据 request 指定
 * @param {module:index~PluginOptions} opitons - 请求时的参数 
 * @returns {boolean} 返回为真，阻止数据更新
 */

/**
 * 请求插件参数，扩展了默认的插件参数
 * @typedef PluginOptions
 * @extends module:plugin~PluginDefine
 * @type {object}
 * @property {function} fetchOnStart - 是否在数据单元装载时自动触发获取操作
 * @property {function} fetchOnActive - 是否在数据单元拥有者活动时自动触发获取操作
 * @property {function} loader - 是否在请求中强制显示进度条
 * @property {function} mask - 是否在请求中强制显示蒙层
 * @property {function} noLoaderMask - 是否强制关闭进度条和蒙层。默认情况下，请求类请求是默认显示进度条，提交型请求默认实现蒙层
 * @property {module:index~PluginOptionsOnSuccess} onSuccess - 成功的回调函数
 * @property {module:index~PluginOptionsOnError} onError - 失败的回调函数
 * @property {function?} checkFetch - 检测是否可以发送求的函数，如果给定了函数，但是返回值不为真，则阻止请求
 * @property {function} once - 是否只请求一次
 * @property {function} request - request 请求函数，必须返回 promise 对象
 * @property {function} xxx - 其他传递给 request 请求函数的参数
 */

/**
 * 请求错误时触发事件
 * @event module:index.Request#onStateError
 * @property {object} error - 错误信息，具体信息依赖于 request 函数
 * @property {module:index~PluginOptions} options - 请求是的参数
 */

/**
 * 扩展的数据单元，实现支持请求的数据单元，由插件构造，挂载在 app 上
 * @class Request
 * @extends module:state.State
 */
var getClass = function getClass(app, plugin) {
  return (
    /*#__PURE__*/
    function (_app$State) {
      (0, _inherits2.default)(Request, _app$State);

      function Request(_id, options, ownerId) {
        var _this;

        (0, _classCallCheck2.default)(this, Request);
        _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Request).call(this, _id, options, ownerId));
        _this.fetched = false;

        if (_this.options.fetchOnStart) {
          app.event.on(app._id, 'onPageStart', app.event.createHandler('onPageStart', function (_id, active) {
            _id === ownerId && _this.fetch();
          }, (0, _assertThisInitialized2.default)(_this)), _this._id);
        }

        if (_this.options.fetchOnActive) {
          app.event.on(app._id, 'onPageStart', app.event.createHandler('onPageActive', function (_id, start) {
            _id === ownerId && !start && _this.fetch();
          }, (0, _assertThisInitialized2.default)(_this)), _this._id);
        }

        return _this;
      }

      (0, _createClass2.default)(Request, [{
        key: "_requestFetching",
        value: function _requestFetching(fetching, _ref) {
          var loader = _ref.loader,
              mask = _ref.mask,
              noLoaderMask = _ref.noLoaderMask,
              isSubmit = _ref.isSubmit;
          loader && this.app.render.loader(fetching);
          mask && this.app.render.mask(fetching);
          !loader && !mask && !noLoaderMask && (!isSubmit ? this.app.render.loader(fetching) : this.app.render.mask(fetching));
          if (isSubmit || !fetching) return;
          this.stateUpdate({
            fetching: fetching,
            error: null
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
            append: append || false
          });
        }
      }, {
        key: "_requestError",
        value: function _requestError(error, _ref3) {
          var noNotice = _ref3.noNotice,
              isSubmit = _ref3.isSubmit;
          !noNotice && this.app.render.error(error);
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

          if (options.checkFetch && !options.checkFetch(options)) {
            return;
          }

          if (options.once && this.fetched) {
            this.app.log.info('plugin once');
            return;
          }

          var fetch = options.request || plugin.options.request;
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
        /**
         * 请求数据
         * @param {module:index~PluginOptions} - 参数 
         * @returns {Promise} 返回数据依赖使用的 request 函数
         */

      }, {
        key: "fetch",
        value: function fetch(options) {
          return this._requestWork(this.app.utils.getOptions(this.options, options));
        }
        /**
         * 提交数据
         * @param {*} options 
         * @returns {Promise} 返回数据依赖使用的 request 函数
         */

      }, {
        key: "submit",
        value: function submit(options) {
          return this._requestWork(this.app.utils.getOptions(this.options, options, {
            isSubmit: true
          }));
        }
        /**
         * 获取请求的数据，仅返回的服务器返回的响应体数据
         * @returns {*} 请求的数据
         */

      }, {
        key: "data",
        value: function data() {
          var data = (0, _get2.default)((0, _getPrototypeOf2.default)(Request.prototype), "stateData", this).call(this);
          return !data.error && data.data ? data.data : this.options.initialization || {};
        }
        /**
         * 获取扩展的数据，只有插件的参数的设置了 trackState 属性
         * @returns {*} 请求的扩展数据
         */

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
/**
 * 为 App 实例增加网络请求模块，包装了网络请求模块，提供了，请求接口和关联网络请求的数据单元
 * @plugin 
 * @exportdefault
 */


var request = function request(app, plugin, options) {
  var Request = getClass(app, plugin);
  return {
    _id: 'request',
    _onStart: function _onStart(app, plugin) {
      /**
       * 为 App 实例增加关联网络请求的数据单元
       * @memberof module:index.request
       * @type {module:index~Request}
       * @mount app.Request
       */
      app.Request = Request;
      /**
       * request 插件的实例，主要用于访问该实例请求方法
       * @memberof module:index.request
       * @type {module:plugins~PluginInstance}
       * @mount app.request
       */

      app.request = plugin;
    },
    _onStop: function _onStop(app) {
      delete app.Request;
      delete app.request;
    },
    stateRequest: [{}, Request],

    /**
     * 为 App 实例增加网络通讯操作实例
     * @mount app.request.request
     * @param {object} options - 请求参数
     */
    request: function request(options) {
      return app.request.stateRequest.fetch(_objectSpread({
        isSubmit: true
      }, options));
    }
  };
};

var _default = request;
exports.default = _default;