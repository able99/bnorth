"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("core-js/modules/es6.string.starts-with");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

/**
 * @module
 */
var Poplayer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Poplayer, _React$Component);
  (0, _createClass2.default)(Poplayer, [{
    key: "_id",
    // poplayer interface
    // ---------------------------------------
    get: function get() {
      return this.props.options._id;
    }
  }, {
    key: "dom",
    get: function get() {
      return _reactDom.default.findDOMNode(this);
    } // poplayer interface
    // ---------------------------------------

  }], [{
    key: "getPoplayer",
    // poplayer interface
    // ---------------------------------------
    value: function getPoplayer(_id) {
      return Poplayer.poplayers[_id];
    } // poplayer interface
    // ---------------------------------------

  }, {
    key: "addPoplayer",

    /**
     * 添加弹出层
     * @param {number|string|component|element} - 内容 
     * @param {object} props - 组件属性
     * @param {module:router~PoplayerOptions} options - 弹出层配置
     * @returns {string} 弹出层 id 
     */
    value: function addPoplayer(content) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      options._id = options._id || "".concat(++Poplayer._IdRandom, "@").concat(options._idPage ? options._idPage : '#');
      if (arguments.length === 0) return options._id;
      var poplayer = Poplayer.getPoplayerInfo(options._id);
      options = (0, _objectSpread2.default)({}, options, options.options instanceof Function ? options.options(Poplayer.app, options._id) : options.options);
      props = (0, _objectSpread2.default)({}, props, options.props instanceof Function ? options.props(Poplayer.app, options._id) : options.props);

      if (!poplayer) {
        if (!content) return;
        Poplayer.app.router.setPoplayerInfos((0, _toConsumableArray2.default)(Poplayer.app.router.getPoplayerInfos()).concat([{
          content: content,
          props: props,
          options: options
        }]));
      } else {
        content && (poplayer.content = content);
        poplayer.props = (0, _objectSpread2.default)({}, poplayer.props, props);
        poplayer.options = (0, _objectSpread2.default)({}, poplayer.options, options);
        Poplayer.app.router.refresh();
      }

      return options._id;
    }
    /**
     * 移除弹出层
     * @param {!string} - 弹出层 id
     */

  }, {
    key: "removePoplayer",
    value: function removePoplayer(_id) {
      var infos = Poplayer.app.router.getPoplayerInfos();
      var index = infos.findIndex(function (v) {
        return v.options._id === _id;
      });

      if (index >= 0) {
        infos.splice(index, 1);
        Poplayer.app.router.setPoplayerInfos(infos);
      }
    }
    /**
     * 获取弹出层信息
     * @param {string} - 弹出层 id
     * @returns {module:router~PoplayerInfo}
     */

  }, {
    key: "getPoplayerInfo",
    value: function getPoplayerInfo(_id) {
      return Poplayer.app.router.getPoplayerInfos().find(function (v) {
        return v.options._id === _id;
      });
    }
  }]);

  function Poplayer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Poplayer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Poplayer).call(this, props));
    var options = _this.props.options;
    Poplayer.poplayers[options._id] = (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this));
    _this.options = options;
    _this._states = Object.entries(options).filter(function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      return k.startsWith('state') || k.startsWith('_state');
    });
    Poplayer.app.State.attachStates((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), _this._states);
    Object.entries(options).forEach(function (_ref3) {
      var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
          k = _ref4[0],
          v = _ref4[1];

      if (k.startsWith('on')) {
        Poplayer.app.event.on(Poplayer.app._id, k, Poplayer.app.event.createHandler(k, v, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), _this._id).bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      } else if (k.startsWith('_on')) {
        _this[k] = Poplayer.app.event.createHandler(k, v, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))).bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      } else if (k.startsWith('action')) {
        _this[k] = Poplayer.app.event.createAction(k, v, (0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))).bind((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));
      }
    });
    return _this;
  }

  (0, _createClass2.default)(Poplayer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.options._onStart && this.props.options._onStart(Poplayer.app, this._id, this);
      Poplayer.app.event.emit(Poplayer.app._id, 'onPoplayerStart', this._id);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.options._onStop && this.props.options._onStop(Poplayer.app, this._id, this);
      Poplayer.app.event.emit(Poplayer.app._id, 'onPoplayerStop', this._id);
      Poplayer.app.State.detachStates(this, this._states);
      delete Poplayer.poplayers[this._id];
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _this$props = this.props,
          props = _this$props.props,
          options = _this$props.options;
      if (!Poplayer.app.utils.shallowEqual(nextProps.props, props)) return true;
      if (!Poplayer.app.utils.shallowEqual(nextProps.options, options)) return true;
      if (Poplayer.app.State.checkStates(this, nextProps.context, this.props.context, this._states)) return true;
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          Component = _this$props2.content,
          props = _this$props2.props,
          options = _this$props2.options;
      var _id = options._id;
      Poplayer.app.event.emit(Poplayer.app._id, 'onPoplayerRender', _id, this.props);
      if (typeof Component !== 'function') return Component;

      var component = _react.default.createElement(Component, (0, _extends2.default)({
        "data-poplayer": _id,
        app: Poplayer.app,
        _id: _id,
        poplayer: this,
        info: this.props,
        states: Poplayer.app.State.getStates(this, this._states)
      }, props));

      if (options._idPage) {
        var page = Poplayer.app.Page.getPage(options._idPage);
        var dom = page && page.dom;
        if (dom) return _reactDom.default.createPortal(component, dom);
      }

      return component;
    }
  }]);
  return Poplayer;
}(_react.default.Component);

(0, _defineProperty2.default)(Poplayer, "app", void 0);
(0, _defineProperty2.default)(Poplayer, "poplayers", {});
(0, _defineProperty2.default)(Poplayer, "_IdRandom", 0);
var _default = Poplayer;
exports.default = _default;