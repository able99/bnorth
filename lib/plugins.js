'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * app 的插件管理器模块
 * @class
 */
var Plugins = function () {
  function Plugins(app) {
    (0, _classCallCheck3.default)(this, Plugins);

    this.app = app;
    this._plugins = [];
  }

  (0, _createClass3.default)(Plugins, [{
    key: '_checkPlugin',
    value: function _checkPlugin(plugin) {
      var _this = this;

      if (!plugin) return;

      if (!plugin.pluginName) plugin.pluginName = 'noname';
      if (!plugin.pluginDependence) plugin.pluginDependence = [];
      if (this._plugins.find(function (v) {
        return v.pluginName === plugin.pluginName;
      })) {
        this.app.log.error('plugin dup', plugin.pluginName);
        this.app.render.critical(plugin.pluginName, { title: 'plugin dup' });
        return;
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        var _loop = function _loop() {
          var dependence = _step.value;

          if (!_this._plugins.find(function (v) {
            return v.pluginName === dependence;
          })) {
            _this.app.log.error('plugin nodeps', plugin.pluginName, dependence);
            _this.app.render.critical('no dependence plugin: ' + plugin.pluginName + ' - ' + dependence, { title: 'plugin nodeps' });
            return {
              v: void 0
            };
          }
        };

        for (var _iterator = (Array.isArray(plugin.pluginDependence) ? plugin.pluginDependence : [plugin.pluginDependence])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ret = _loop();

          if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
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

      return true;
    }
  }, {
    key: 'add',
    value: function add(plugin) {
      var _this2 = this;

      this._checkPlugin(plugin);
      this.app.log.info('plugin add', plugin.pluginName);

      this._plugins.push(plugin);
      plugin.onPluginMount && plugin.onPluginMount(this.app);
      Object.entries(plugin).forEach(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            k = _ref2[0],
            v = _ref2[1];

        if (k.indexOf('on') === 0 && k !== 'onPluginMount' && k !== 'onPluginUnmount') {
          _this2.app.event.on(_this2.app, k, v, plugin.pluginName);
        }
      });

      this.app.event.emitSync(this.app, 'onPluginAdd', plugin);
    }
  }, {
    key: 'remove',
    value: function remove(name) {
      var _this3 = this;

      this.app.log.info('plugin remove', name);
      var index = this._plugins.findIndex(function (v) {
        return v.pluginName === name;
      });
      if (index >= 0) {
        var plugin = this._plugins[index];
        plugin && plugin.onPluginUnmount && plugin.onPluginUnmount(this.app);
        Object.entries(plugin).forEach(function (_ref3) {
          var _ref4 = (0, _slicedToArray3.default)(_ref3, 2),
              k = _ref4[0],
              v = _ref4[1];

          if (k.indexOf('on') === 0) {
            _this3.app.event.off(v);
          }
        });
        this._plugins.splice(index, 1);
        this.app.event.emitSync(this.app, 'onPluginRemove', name);
        this.app.event.off(name);
      }
    }
  }]);
  return Plugins;
}();

exports.default = Plugins;
module.exports = exports['default'];