"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loader = exports.OverlayLoader = exports.PanelLoader = exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

require("@bnorth/rich.css/css/kf.spin.css");

require("@bnorth/rich.css/css/kf.flyout.right.css");

var _animation = require("@bnorth/rich.css/lib/styles/animation");

var _animationFrame3 = _interopRequireWildcard(require("@bnorth/rich.css/lib/styles/animationFrame"));

var _BaseComponent6 = _interopRequireWildcard(require("./BaseComponent"));

var _Panel = _interopRequireDefault(require("./Panel"));

/**
 * @module
 */

/**
 * 进度显示组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
var _Loader = function Loader(aprops) {
  var _BaseComponent = (0, _BaseComponent6.default)(aprops, _Loader),
      type = _BaseComponent.type,
      types = _BaseComponent.types,
      timeoutTransition = _BaseComponent.timeoutTransition,
      timeoutAnimation = _BaseComponent.timeoutAnimation,
      isProgress = _BaseComponent.isProgress,
      progress = _BaseComponent.progress,
      color = _BaseComponent.color,
      colorReverse = _BaseComponent.colorReverse,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent, ["type", "types", "timeoutTransition", "timeoutAnimation", "isProgress", "progress", "color", "colorReverse"]);

  var component = types[type];
  if (!component) return null;
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    timeout: isProgress ? timeoutTransition : timeoutAnimation,
    isProgress: isProgress,
    progress: progress,
    color: color,
    colorReverse: colorReverse,
    component: component
  }, props));
};

_Loader.defaultProps = {};
/**
 * 显示的样式，默认支持 line 和 circle，可以通过给 Loader.xxx 赋值，增加新的样式
 * @type {string}
 */

_Loader.defaultProps.type = 'circle';
/**
 * 作为进度条时，进度改变时的渐变动画时间
 * @type {string}
 */

_Loader.defaultProps.timeoutTransition = '250ms';
/**
 * 作为加载中等待动画时，帧动画时间
 * @type {string}
 */

_Loader.defaultProps.timeoutAnimation = '2s';
/**
 * 设置为进度条或者是加载中等待动画
 * @type {boolean}
 */

_Loader.defaultProps.isProgress = false;
/**
 * 作为进度条时，进度的百分比， 0-100
 * @type {number}
 */

_Loader.defaultProps.progress = 0;
/**
 * 设置主颜色，一般不用设置，可以设置主题色
 * @type {string}
 */

_Loader.defaultProps.color = 'currentColor';
/**
 * 设置辅助色，进度条的反色颜色，取值为 css 颜色
 * @type {string}
 */

_Loader.defaultProps.colorReverse = 'lightgray';
Object.defineProperty(_Loader, "Loader", {
  get: function get() {
    return _Loader;
  },
  set: function set(val) {
    _Loader = val;
  }
});
_Loader.isBnorth = true;
_Loader.defaultProps['b-precast'] = {};
var _default = _Loader;
/**
 * 进度显示组件的线性样式
 * @component 
 * @private
 * @augments BaseComponent
 * @augments module:Loader.Loader
 */

exports.default = _default;

var _Line = function Line(aprops) {
  var _BaseComponent2 = (0, _BaseComponent6.default)(aprops, _Line),
      isProgress = _BaseComponent2.isProgress,
      progress = _BaseComponent2.progress,
      timeout = _BaseComponent2.timeout,
      color = _BaseComponent2.color,
      colorReverse = _BaseComponent2.colorReverse,
      classNamePre = _BaseComponent2.classNamePre,
      stylePre = _BaseComponent2.stylePre,
      children = _BaseComponent2.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["isProgress", "progress", "timeout", "color", "colorReverse", "classNamePre", "stylePre", "children"]);

  classNamePre = (0, _objectSpread2.default)({
    'width-full height-1em position-relative': true
  }, classNamePre);
  stylePre = (0, _objectSpread2.default)({
    background: colorReverse
  }, stylePre);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    classNamePre: classNamePre,
    stylePre: stylePre
  }, props), _react.default.createElement(_Panel.default, {
    style: (0, _objectSpread2.default)({
      width: (isProgress ? progress : '10') + '%',
      height: '100%',
      left: '0',
      background: color
    }, (0, _animation.transiton)(timeout), !isProgress ? (0, _animation.animation)('fly-out-right') : null)
  }), children);
};

_Line.defaultProps = {};
Object.defineProperty(_Loader, "Line", {
  get: function get() {
    return _Line;
  },
  set: function set(val) {
    _Line = val;
  }
});
_Line.isBnorth = true;
_Line.defaultProps['b-precast'] = {};
/**
 * 进度显示组件的圆环样式
 * @component 
 * @private
 * @augments BaseComponent
 * @augments module:Loader.Loader
 */

var _Circle =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Circle, _React$Component);

  function Circle() {
    (0, _classCallCheck2.default)(this, Circle);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Circle).apply(this, arguments));
  }

  (0, _createClass2.default)(Circle, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var element = (0, _BaseComponent6.domFindNode)(this);
      element = element.querySelectorAll('circle')[1];

      var _animationFrame = (0, _animationFrame3.default)(element, _animationFrame3.afSpin, {
        first: !this.props.isProgress
      }),
          _animationFrame2 = (0, _slicedToArray2.default)(_animationFrame, 2),
          stop = _animationFrame2[0],
          start = _animationFrame2[1];

      this.stop = stop;
      this.start = start;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.isProgress !== this.props.isProgress && this.props.isProgress) {
        this.stop();
      } else if (prevProps.isProgress !== this.props.isProgress && !this.props.isProgress) {
        this.start();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _BaseComponent3 = (0, _BaseComponent6.default)(this.props, _Circle),
          isProgress = _BaseComponent3.isProgress,
          progress = _BaseComponent3.progress,
          timeout = _BaseComponent3.timeout,
          color = _BaseComponent3.color,
          colorReverse = _BaseComponent3.colorReverse,
          classNamePre = _BaseComponent3.classNamePre,
          children = _BaseComponent3.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["isProgress", "progress", "timeout", "color", "colorReverse", "classNamePre", "children"]);

      classNamePre = (0, _objectSpread2.default)({
        'width-1em height-1em': true
      }, classNamePre);
      return _react.default.createElement(_Panel.default, (0, _extends2.default)({
        component: "svg",
        viewBox: "0 0 100 100",
        classNamePre: classNamePre
      }, props), _react.default.createElement("circle", {
        cx: "50",
        cy: "50",
        r: "40",
        strokeWidth: "20",
        stroke: colorReverse,
        fill: "none"
      }), _react.default.createElement("circle", {
        cx: "50",
        cy: "50",
        r: "40",
        strokeWidth: "20",
        stroke: color,
        fill: "none",
        style: isProgress ? (0, _objectSpread2.default)({}, (0, _animation.transiton)(timeout), (0, _animation.transform)('rotate', '-90deg'), (0, _animation.transformOrigin)()) : (0, _objectSpread2.default)({}, (0, _animation.transformOrigin)()),
        strokeDasharray: isProgress ? "".concat(2.51 * (progress || 0), ",251") : "150,251"
      }), children);
    }
  }]);
  return Circle;
}(_react.default.Component);

_Circle.defaultProps = {};
Object.defineProperty(_Loader, "Circle", {
  get: function get() {
    return _Circle;
  },
  set: function set(val) {
    _Circle = val;
  }
});
_Circle.isBnorth = true;
_Circle.defaultProps['b-precast'] = {};
_Loader.defaultProps.types = {
  line: _Line,
  circle: _Circle
  /**
   * 加载动画小面板组件，扩展小面板组件，提供加载动画组件与面板内容混排的能力
   * @component
   * @mount Panel.Loader
   * @augments BaseComponent
   * @augments Panel.module:Container~Container
   */

};

var PanelLoader = function PanelLoader(aprops) {
  var _BaseComponent4 = (0, _BaseComponent6.default)(aprops),
      isProgress = _BaseComponent4.isProgress,
      progress = _BaseComponent4.progress,
      loaderProps = _BaseComponent4.loaderProps,
      title = _BaseComponent4.title,
      titleProps = _BaseComponent4.titleProps,
      children = _BaseComponent4.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent4, ["isProgress", "progress", "loaderProps", "title", "titleProps", "children"]);

  return _react.default.createElement(_Panel.default.Container, (0, _extends2.default)({
    panelContainerProps: aprops,
    ctype: "flex",
    position: "left",
    justify: "center",
    align: "center"
  }, props), _react.default.createElement(_Loader, (0, _extends2.default)({
    isProgress: isProgress,
    progress: progress
  }, loaderProps)), title || children ? _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-text-truncate-1": true
  }, titleProps), title, children) : null);
};

exports.PanelLoader = PanelLoader;
PanelLoader.defaultProps = {};
/**
 * Loader 的属性, 参见 Loader
 * @attribute Panel.module:Loader~PanelLoader.loader*
 * @type {*}
 */

/**
 * 设置图标子组件的属性
 * @attribute Panel.module:Loader~PanelLoader.loaderProps
 * @type {object}
 */

/**
 * 设置文字，也可以使用 children
 * @attribute Panel.module:Loader~PanelLoader.title
 * @type {string}
 */

/**
 * 设置内容子组件的属性
 * @attribute Panel.module:Loader~PanelLoader.titleProps
 * @type {object}
 */

Object.defineProperty(_Loader, "PanelLoader", {
  get: function get() {
    return PanelLoader;
  },
  set: function set(val) {
    exports.PanelLoader = PanelLoader = val;
  }
});
PanelLoader.isBnorth = true;
PanelLoader.defaultProps['b-precast'] = {};

var _OverlayLoader = function OverlayLoader(aprops) {
  var _BaseComponent5 = (0, _BaseComponent6.default)(aprops, _OverlayLoader),
      progress = _BaseComponent5.progress,
      top = _BaseComponent5.top,
      height = _BaseComponent5.height,
      classNamePre = _BaseComponent5.classNamePre,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent5, ["progress", "top", "height", "classNamePre"]);

  classNamePre = (0, _objectSpread2.default)({
    'position-absolute offset-h-start width-full': true
  }, classNamePre);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    type: "line",
    isProgress: true,
    progress: progress,
    "bs-top": top,
    "bs-height": height,
    component: _Loader,
    classNamePre: classNamePre
  }, props));
};

exports.OverlayLoader = _OverlayLoader;
_OverlayLoader.defaultProps = {};
_OverlayLoader.defaultProps.top = 0;
_OverlayLoader.defaultProps.height = 3;
Object.defineProperty(_Loader, "OverlayLoader", {
  get: function get() {
    return _OverlayLoader;
  },
  set: function set(val) {
    exports.OverlayLoader = _OverlayLoader = val;
  }
});
_OverlayLoader.isBnorth = true;
_OverlayLoader.defaultProps['b-precast'] = {};
var loader = {
  _id: 'loader',
  onPluginMount: function onPluginMount(app) {
    app.loader = {
      count: 0,
      timeoutPrgress: '20000',
      timeoutSet: '200',
      reset: function reset() {
        var progress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var cb = arguments.length > 1 ? arguments[1] : undefined;
        var aprops = arguments.length > 2 ? arguments[2] : undefined;
        var aoptions = arguments.length > 3 ? arguments[3] : undefined;

        var _ref = app.router.getPopLayerInfo(app.loader._id) || {},
            content = _ref.content,
            _ref$props = _ref.props,
            props = _ref$props === void 0 ? {} : _ref$props,
            _ref$options = _ref.options,
            options = _ref$options === void 0 ? {} : _ref$options;

        if (!content) {
          app.loader._id = app.router.addPopLayer(_react.default.createElement(_OverlayLoader, {
            timeout: app.loader.timeoutSet,
            isProgress: true,
            progress: progress
          }), aprops, aoptions);
        } else {
          app.loader._id = app.router.addPopLayer(content, (0, _objectSpread2.default)({}, props, aprops, {
            progress: progress,
            timeout: app.loader.timeoutSet
          }), (0, _objectSpread2.default)({}, options, aoptions));
        }

        setTimeout(function () {
          var _ref2 = app.router.getPopLayerInfo(app.loader._id) || {},
              content = _ref2.content,
              _ref2$props = _ref2.props,
              props = _ref2$props === void 0 ? {} : _ref2$props,
              _ref2$options = _ref2.options,
              options = _ref2$options === void 0 ? {} : _ref2$options;

          if (content) {
            props.progress = 100;
            props.timeout = app.loader.timeoutPrgress;
            app.loader._id = app.router.addPopLayer(content, props, options);
            cb && cb();
          }
        }, app.loader.timeoutSet);
        return app.loader._id;
      },
      show: function show() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            options = _ref3.options,
            props = (0, _objectWithoutProperties2.default)(_ref3, ["options"]);

        app.loader.count++;
        return app.loader.reset(0, null, props, options);
      },
      close: function close(force) {
        app.loader.count = force ? 0 : Math.max(--app.loader.count, 0);
        return app.loader.reset(app.loader.count ? 10 : 100, function () {
          if (!app.loader.count) {
            app.router.removePopLayer(app.loader._id);
            app.loader._id = undefined;
          }
        });
      }
    };
    app.loader._loader = app.render.loader;

    app.render.loader = function (show, options) {
      return show ? app.loader.show(options) : app.loader.close();
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    app.render.loader = app.loader._loader;
    delete app.loader;
  }
};
exports.loader = loader;