"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.mask = exports.MaskPoplayer = exports.pullup = exports.PullUpPoplayer = exports.pulldown = exports.PullDownPoplayer = exports.loader = exports.LoaderPoplayer = exports.PanelLoader = exports.default = void 0;

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/define-property"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

require("@bnorth/rich.css/css/animation.css");

require("@bnorth/rich.css/css/kf.spin.css");

require("@bnorth/rich.css/css/kf.flyout.right.css");

var _animation2 = require("@bnorth/rich.css/lib/styles/animation");

var _animationFrame = require("@bnorth/rich.css/lib/styles/animationFrame");

var _BaseComponent9 = _interopRequireDefault(require("./BaseComponent"));

var _AnimationFrame = _interopRequireDefault(require("./AnimationFrame"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(source).forEach(function (key) { (0, _defineProperty3.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

/**
 * 进度显示组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
var _Loader = function Loader(aprops) {
  var _BaseComponent = (0, _BaseComponent9.default)(aprops, _Loader),
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
(0, _defineProperty3.default)(_Loader, "Loader", {
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
  var _BaseComponent2 = (0, _BaseComponent9.default)(aprops, _Line),
      isProgress = _BaseComponent2.isProgress,
      progress = _BaseComponent2.progress,
      timeout = _BaseComponent2.timeout,
      color = _BaseComponent2.color,
      colorReverse = _BaseComponent2.colorReverse,
      classNamePre = _BaseComponent2.classNamePre,
      stylePre = _BaseComponent2.stylePre,
      children = _BaseComponent2.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent2, ["isProgress", "progress", "timeout", "color", "colorReverse", "classNamePre", "stylePre", "children"]);

  classNamePre = _objectSpread({
    'width-full height-1em position-relative': true
  }, classNamePre);
  stylePre = _objectSpread({
    background: colorReverse
  }, stylePre);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    classNamePre: classNamePre,
    stylePre: stylePre
  }, props), _react.default.createElement(_Panel.default, {
    style: _objectSpread({
      width: (isProgress ? progress : '10') + '%',
      height: '100%',
      left: '0',
      background: color
    }, (0, _animation2.transiton)(timeout), {}, !isProgress ? (0, _animation2.animation)('fly-out-right') : null)
  }), children);
};

_Line.defaultProps = {};
(0, _defineProperty3.default)(_Loader, "Line", {
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
    key: "render",
    value: function render() {
      var _BaseComponent3 = (0, _BaseComponent9.default)(this.props, _Circle),
          isProgress = _BaseComponent3.isProgress,
          progress = _BaseComponent3.progress,
          timeout = _BaseComponent3.timeout,
          color = _BaseComponent3.color,
          colorReverse = _BaseComponent3.colorReverse,
          classNamePre = _BaseComponent3.classNamePre,
          children = _BaseComponent3.children,
          props = (0, _objectWithoutProperties2.default)(_BaseComponent3, ["isProgress", "progress", "timeout", "color", "colorReverse", "classNamePre", "children"]);

      classNamePre = _objectSpread({
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
      }), _react.default.createElement(_AnimationFrame.default, {
        play: !isProgress,
        frameFunc: _animationFrame.afSpin
      }, _react.default.createElement("circle", {
        cx: "50",
        cy: "50",
        r: "40",
        strokeWidth: "20",
        stroke: color,
        fill: "none",
        style: isProgress ? _objectSpread({}, (0, _animation2.transiton)(timeout), {}, (0, _animation2.transform)('rotate', '-90deg'), {}, (0, _animation2.transformOrigin)()) : _objectSpread({}, (0, _animation2.transformOrigin)()),
        strokeDasharray: isProgress ? "".concat(2.51 * (progress || 0), ",251") : "150,251"
      })), children);
    }
  }]);
  return Circle;
}(_react.default.Component);

_Circle.defaultProps = {};
(0, _defineProperty3.default)(_Loader, "Circle", {
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
  var _BaseComponent4 = (0, _BaseComponent9.default)(aprops),
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

(0, _defineProperty3.default)(_Loader, "PanelLoader", {
  get: function get() {
    return PanelLoader;
  },
  set: function set(val) {
    exports.PanelLoader = PanelLoader = val;
  }
});
PanelLoader.isBnorth = true;
PanelLoader.defaultProps['b-precast'] = {};

var _LoaderPoplayer = function LoaderPoplayer(aprops) {
  var _BaseComponent5 = (0, _BaseComponent9.default)(aprops, _LoaderPoplayer),
      progress = _BaseComponent5.progress,
      timeout = _BaseComponent5.timeout,
      bTheme = _BaseComponent5['b-theme'],
      top = _BaseComponent5.top,
      height = _BaseComponent5.height,
      innerProps = _BaseComponent5.innerProps,
      poplayer = _BaseComponent5.poplayer,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent5, ["progress", "timeout", "b-theme", "top", "height", "innerProps", "poplayer"]);

  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-position-absolute": true,
    "bc-offset-h-start": true,
    "bc-width-full": true,
    "bs-top": top,
    "bs-height": height
  }, props), _react.default.createElement(_Panel.default, {
    "b-style": "solid",
    "b-theme": bTheme,
    "bc-height-full": true,
    "bs-width": (progress || 0) + '%',
    style: (0, _animation2.transiton)(timeout, {
      property: 'width'
    })
  }));
};

exports.LoaderPoplayer = _LoaderPoplayer;
_LoaderPoplayer.defaultProps = {};
_LoaderPoplayer.defaultProps.top = 0;
_LoaderPoplayer.defaultProps.height = 3;
_LoaderPoplayer.defaultProps.timeout = '1s';
(0, _defineProperty3.default)(_Loader, "LoaderPoplayer", {
  get: function get() {
    return _LoaderPoplayer;
  },
  set: function set(val) {
    exports.LoaderPoplayer = _LoaderPoplayer = val;
  }
});
_LoaderPoplayer.isBnorth = true;
_LoaderPoplayer.defaultProps['b-precast'] = {
  'b-theme': 'primary'
};

var loader = function loader(app) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    _id: 'loader',
    _onStart: function _onStart(app) {
      app.loader = {
        count: 0,
        timeout: options.timeout || 20000,
        reset: function reset() {
          var progress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
          var props = arguments.length > 1 ? arguments[1] : undefined;
          var options = arguments.length > 2 ? arguments[2] : undefined;

          if (app.loader.timer) {
            window.clearTimeout(app.loader.timer);
            app.loader.timer = null;
          }

          app.loader._id = app.Poplayer.addPoplayer(_LoaderPoplayer, _objectSpread({}, props, {
            progress: progress
          }), _objectSpread({}, options, {
            _id: app.loader._id
          }));

          if (progress > 100 && !app.loader.count) {
            app.Poplayer.removePoplayer(app.loader._id);
            app.loader._id = undefined;
          } else if (progress > 100 && app.loader.count) {
            if (app.loader.timer) {
              window.clearTimeout(app.loader.timer);
              app.loader.timer = null;
            }
          } else {
            app.loader.timer = window.setTimeout(function () {
              return app.loader.reset(progress + 100000 / app.loader.timeout);
            }, 1000);
          }
        },
        show: function show(props, options) {
          app.loader.count++;
          return app.loader.reset(0, props, options);
        },
        close: function close(force) {
          app.loader.count = force ? 0 : Math.max(--app.loader.count, 0);
          return app.loader.reset(app.loader.count ? 10 : 100);
        }
      };
      app.loader._loader = app.render.loader;

      app.render.loader = function (show) {
        var _app$loader;

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return show ? (_app$loader = app.loader).show.apply(_app$loader, args) : app.loader.close();
      };
    },
    _onStop: function _onStop(app) {
      app.render.loader = app.loader._loader;
      delete app.loader;
    }
  };
};

exports.loader = loader;

var _PullDownPoplayer = function PullDownPoplayer(aprops) {
  var _BaseComponent6 = (0, _BaseComponent9.default)(aprops, _PullDownPoplayer),
      progress = _BaseComponent6.progress,
      _BaseComponent6$heigh = _BaseComponent6.height,
      height = _BaseComponent6$heigh === void 0 ? 100 : _BaseComponent6$heigh,
      poplayer = _BaseComponent6.poplayer,
      children = _BaseComponent6.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent6, ["progress", "height", "poplayer", "children"]);

  if (!progress || progress < 0) return null;
  children = typeof children === 'function' ? children(poplayer) : children;
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-padding-a-": true,
    "bc-bg-color-white": true,
    "bc-border-set-a-": true,
    "bc-border-radius-rounded": true,
    "bc-line-height-0": true,
    "bc-position-absolute": true,
    "bc-offset-left-center": true,
    "bc-pointer-events-none": true,
    "bs-left": "50%",
    "bs-top": Math.min(height, progress),
    style: typeof progress !== 'string' && _objectSpread({}, (0, _animation2.transform)('rotate', progress * (360 / height) % 360 + 'deg')),
    "bc-transiton-set-": true,
    "bc-animation-name-spin": Boolean(typeof progress === 'string' && progress >= height),
    "bc-animation-iteration-count-infinite": true,
    "bc-animation-duration-1000": true
  }, props), children || _react.default.createElement("svg", {
    version: "1.1",
    viewBox: "0 0 1024 1024",
    preserveAspectRatio: "none",
    stroke: "currentcolor",
    fill: "currentcolor",
    "bs-width": "1em",
    "bs-height": "1em",
    className: "display-inline width-1em height-1em"
  }, _react.default.createElement("path", {
    d: "M1024 384h-384l143.53-143.53c-72.53-72.526-168.96-112.47-271.53-112.47s-199 39.944-271.53 112.47c-72.526 72.53-112.47 168.96-112.47 271.53s39.944 199 112.47 271.53c72.53 72.526 168.96 112.47 271.53 112.47s199-39.944 271.528-112.472c6.056-6.054 11.86-12.292 17.456-18.668l96.32 84.282c-93.846 107.166-231.664 174.858-385.304 174.858-282.77 0-512-229.23-512-512s229.23-512 512-512c141.386 0 269.368 57.326 362.016 149.984l149.984-149.984v384z"
  })));
};

exports.PullDownPoplayer = _PullDownPoplayer;
_PullDownPoplayer.defaultProps = {};
(0, _defineProperty3.default)(_Loader, "PullDownPoplayer", {
  get: function get() {
    return _PullDownPoplayer;
  },
  set: function set(val) {
    exports.PullDownPoplayer = _PullDownPoplayer = val;
  }
});
_PullDownPoplayer.isBnorth = true;
_PullDownPoplayer.defaultProps['b-precast'] = {};
var pulldown = {
  _id: 'pulldown',
  _onStart: function _onStart(app) {
    app.pulldown = {
      show: function show(progress, props, options) {
        if (progress < 15) return;

        if (typeof progress === 'string' && progress < 100) {
          return app.pulldown.close();
        } else {
          return app.pulldown._id = app.Poplayer.addPoplayer(_PullDownPoplayer, _objectSpread({}, props, {
            progress: progress
          }), _objectSpread({}, options, {
            _id: app.pulldown._id,
            _idPage: app.Page.getPage()._id
          }));
        }
      },
      close: function close() {
        app.Poplayer.removePoplayer(app.pulldown._id);
        app.pulldown._id = undefined;
      }
    };
  },
  _onStop: function _onStop(app) {
    delete app.pulldown;
  }
};
exports.pulldown = pulldown;

var _PullUpPoplayer = function PullUpPoplayer(aprops) {
  var _BaseComponent7 = (0, _BaseComponent9.default)(aprops, _PullUpPoplayer),
      progress = _BaseComponent7.progress,
      _BaseComponent7$heigh = _BaseComponent7.height,
      height = _BaseComponent7$heigh === void 0 ? 100 : _BaseComponent7$heigh,
      poplayer = _BaseComponent7.poplayer,
      children = _BaseComponent7.children,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent7, ["progress", "height", "poplayer", "children"]);

  if (!progress || progress < 0) return null;
  children = typeof children === 'function' ? children(poplayer) : children;
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    "bc-padding-a-": true,
    "bc-bg-color-white": true,
    "bc-border-set-a-": true,
    "bc-border-radius-rounded": true,
    "bc-line-height-0": true,
    "bc-position-absolute": true,
    "bc-offset-left-center": true,
    "bc-pointer-events-none": true,
    "bs-left": "50%",
    "bs-bottom": Math.min(height, progress),
    style: typeof progress !== 'string' && _objectSpread({}, (0, _animation2.transform)('rotate', progress * (360 / height) % 360 + 'deg')),
    "bc-transiton-set-": true,
    "bc-animation-name-spin": Boolean(typeof progress === 'string' && progress >= height),
    "bc-animation-iteration-count-infinite": true,
    "bc-animation-duration-1000": true
  }, props), children || _react.default.createElement("svg", {
    version: "1.1",
    viewBox: "0 0 1024 1024",
    preserveAspectRatio: "none",
    stroke: "currentcolor",
    fill: "currentcolor",
    "bs-width": "1em",
    "bs-height": "1em",
    className: "display-inline width-1em height-1em"
  }, _react.default.createElement("path", {
    d: "M1024 384h-384l143.53-143.53c-72.53-72.526-168.96-112.47-271.53-112.47s-199 39.944-271.53 112.47c-72.526 72.53-112.47 168.96-112.47 271.53s39.944 199 112.47 271.53c72.53 72.526 168.96 112.47 271.53 112.47s199-39.944 271.528-112.472c6.056-6.054 11.86-12.292 17.456-18.668l96.32 84.282c-93.846 107.166-231.664 174.858-385.304 174.858-282.77 0-512-229.23-512-512s229.23-512 512-512c141.386 0 269.368 57.326 362.016 149.984l149.984-149.984v384z"
  })));
};

exports.PullUpPoplayer = _PullUpPoplayer;
_PullUpPoplayer.defaultProps = {};
(0, _defineProperty3.default)(_Loader, "PullUpPoplayer", {
  get: function get() {
    return _PullUpPoplayer;
  },
  set: function set(val) {
    exports.PullUpPoplayer = _PullUpPoplayer = val;
  }
});
_PullUpPoplayer.isBnorth = true;
_PullUpPoplayer.defaultProps['b-precast'] = {};
var pullup = {
  _id: 'pullup',
  _onStart: function _onStart(app) {
    app.pullup = {
      show: function show(progress, props, options) {
        if (progress < 15) return;

        if (typeof progress === 'string' && progress < 100) {
          return app.pullup.close();
        } else {
          return app.pullup._id = app.Poplayer.addPoplayer(_PullUpPoplayer, _objectSpread({}, props, {
            progress: progress
          }), _objectSpread({}, options, {
            _id: app.pullup._id,
            _idPage: app.Page.getPage()._id
          }));
        }
      },
      close: function close() {
        app.Poplayer.removePoplayer(app.pullup._id);
        app.pullup._id = undefined;
      }
    };
  },
  _onStop: function _onStop(app) {
    delete app.pulldown;
  }
};
/**
 * 蒙层组件
 * @component
 * @augments BaseComponent
 * @export
 */

exports.pullup = pullup;

var _MaskPoplayer = function MaskPoplayer(aprops) {
  var _BaseComponent8 = (0, _BaseComponent9.default)(aprops, _MaskPoplayer),
      loaderProps = _BaseComponent8.loaderProps,
      classNamePre = _BaseComponent8.classNamePre,
      children = _BaseComponent8.children,
      poplayer = _BaseComponent8.poplayer,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent8, ["loaderProps", "classNamePre", "children", "poplayer"]);

  children = typeof children === 'function' ? children(poplayer) : children;
  classNamePre = _objectSpread({
    'flex-display-block flex-direction-v flex-justify-center flex-align-center': true
  }, classNamePre);
  return _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: _Backdrop.default,
    classNamePre: classNamePre
  }, props), _react.default.createElement(_Panel.default, (0, _extends2.default)({
    component: PanelLoader,
    position: "top"
  }, loaderProps), children));
};

exports.MaskPoplayer = _MaskPoplayer;
_MaskPoplayer.defaultProps = {};
/**
 * 设置 蒙层中间的 loader 组件的参数
 * @attribute module:loader.MaskPoplayer.loaderProps
 * @type {object}
 */

(0, _defineProperty3.default)(_MaskPoplayer, "MaskPoplayer", {
  get: function get() {
    return _MaskPoplayer;
  },
  set: function set(val) {
    exports.MaskPoplayer = _MaskPoplayer = val;
  }
});
_MaskPoplayer.isBnorth = true;
_MaskPoplayer.defaultProps['b-precast'] = {
  'b-theme': 'white'
};
/**
 * 提供了对蒙层的显示和控制的能力，同时修改了 app.render.mask 的默认行为
 * @plugin mask
 * @exportdefault
 */

var mask = {
  // plugin 
  // --------------------------------
  _id: 'mask',
  _onStart: function _onStart(app) {
    /**
     * 挂载在 App 实例上的蒙层操作对象
     * @memberof module:mask.mask
     */
    app.mask = {};
    /**
     * 显示蒙层
     * @memberof module:loader.mask
     * @param {element|component|string|number?} content - 显示内容
     * @param {object?} props - 弹出层属性
     * @param {object?} options - 弹出层配置
     * @returns {string} 弹出层 id
     */

    app.mask.show = function (content, props, options) {
      return app.mask._id = app.Poplayer.addPoplayer(_MaskPoplayer, _objectSpread({
        children: content
      }, props), _objectSpread({
        isModal: true
      }, options, {
        _id: app.mask._id
      }));
    };
    /**
     * 关闭蒙层
     * @memberof module:loader.mask
     */


    app.mask.close = function () {
      return app.mask._id && app.Poplayer.addPoplayer(null, {
        rewind: true,
        onFinished: function onFinished() {
          app.Poplayer.removePoplayer(app.mask._id);
          app.mask._id = undefined;
        }
      }, {
        _id: app.mask._id
      });
    };

    app.mask._oldMask = app.render.mask;

    app.render.mask = function (show, options) {
      return show ? app.mask.show(options) : app.mask.close();
    };
  },
  _onStop: function _onStop(app) {
    app.render.mask = app.mask._oldMask;
    delete app.mask;
  }
};
exports.mask = mask;