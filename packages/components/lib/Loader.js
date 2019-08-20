"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mask = exports.MaskPopLayer = exports.pulldown = exports.PullDownPopLayer = exports.loader = exports.LoaderPopLayer = exports.PanelLoader = exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

require("@bnorth/rich.css/css/animation.css");

require("@bnorth/rich.css/css/kf.spin.css");

require("@bnorth/rich.css/css/kf.flyout.right.css");

var _animation2 = require("@bnorth/rich.css/lib/styles/animation");

var _animationFrame = require("@bnorth/rich.css/lib/styles/animationFrame");

var _BaseComponent8 = _interopRequireDefault(require("./BaseComponent"));

var _AnimationFrame = _interopRequireDefault(require("./AnimationFrame"));

var _Panel = _interopRequireDefault(require("./Panel"));

var _Backdrop = _interopRequireDefault(require("./Backdrop"));

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
  var _BaseComponent = (0, _BaseComponent8.default)(aprops, _Loader),
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
  var _BaseComponent2 = (0, _BaseComponent8.default)(aprops, _Line),
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
    }, (0, _animation2.transiton)(timeout), !isProgress ? (0, _animation2.animation)('fly-out-right') : null)
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
    key: "render",
    value: function render() {
      var _BaseComponent3 = (0, _BaseComponent8.default)(this.props, _Circle),
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
        style: isProgress ? (0, _objectSpread2.default)({}, (0, _animation2.transiton)(timeout), (0, _animation2.transform)('rotate', '-90deg'), (0, _animation2.transformOrigin)()) : (0, _objectSpread2.default)({}, (0, _animation2.transformOrigin)()),
        strokeDasharray: isProgress ? "".concat(2.51 * (progress || 0), ",251") : "150,251"
      })), children);
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
  var _BaseComponent4 = (0, _BaseComponent8.default)(aprops),
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

var _LoaderPopLayer = function LoaderPopLayer(aprops) {
  var _BaseComponent5 = (0, _BaseComponent8.default)(aprops, _LoaderPopLayer),
      progress = _BaseComponent5.progress,
      timeout = _BaseComponent5.timeout,
      _BaseComponent5$bThe = _BaseComponent5['b-theme'],
      bTheme = _BaseComponent5$bThe === void 0 ? "primary" : _BaseComponent5$bThe,
      top = _BaseComponent5.top,
      height = _BaseComponent5.height,
      innerProps = _BaseComponent5.innerProps,
      poplayer = _BaseComponent5.poplayer,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent5, ["progress", "timeout", 'b-theme', "top", "height", "innerProps", "poplayer"]);

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

exports.LoaderPopLayer = _LoaderPopLayer;
_LoaderPopLayer.defaultProps = {};
_LoaderPopLayer.defaultProps.top = 0;
_LoaderPopLayer.defaultProps.height = 3;
_LoaderPopLayer.defaultProps.timeout = '1s';
Object.defineProperty(_Loader, "LoaderPopLayer", {
  get: function get() {
    return _LoaderPopLayer;
  },
  set: function set(val) {
    exports.LoaderPopLayer = _LoaderPopLayer = val;
  }
});
_LoaderPopLayer.isBnorth = true;
_LoaderPopLayer.defaultProps['b-precast'] = {};

var loader = function loader(app) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return {
    _id: 'loader',
    onPluginMount: function onPluginMount(app) {
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

          app.loader._id = app.router.addPopLayer(_LoaderPopLayer, (0, _objectSpread2.default)({}, props, {
            progress: progress
          }), (0, _objectSpread2.default)({}, options, {
            _id: app.loader._id
          }));

          if (progress > 100 && !app.loader.count) {
            app.router.removePopLayer(app.loader._id);
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
    onPluginUnmount: function onPluginUnmount(app) {
      app.render.loader = app.loader._loader;
      delete app.loader;
    }
  };
};

exports.loader = loader;

var _PullDownPopLayer = function PullDownPopLayer(aprops) {
  var _BaseComponent6 = (0, _BaseComponent8.default)(aprops, _PullDownPopLayer),
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
    style: typeof progress !== 'string' && (0, _objectSpread2.default)({}, (0, _animation2.transform)('rotate', progress * (360 / height) % 360 + 'deg')),
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

exports.PullDownPopLayer = _PullDownPopLayer;
_PullDownPopLayer.defaultProps = {};
Object.defineProperty(_Loader, "PullDownPopLayer", {
  get: function get() {
    return _PullDownPopLayer;
  },
  set: function set(val) {
    exports.PullDownPopLayer = _PullDownPopLayer = val;
  }
});
_PullDownPopLayer.isBnorth = true;
_PullDownPopLayer.defaultProps['b-precast'] = {};
var pulldown = {
  _id: 'pulldown',
  onPluginMount: function onPluginMount(app) {
    app.pulldown = {
      show: function show() {
        var progress = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var props = arguments.length > 1 ? arguments[1] : undefined;
        var options = arguments.length > 2 ? arguments[2] : undefined;

        if (typeof progress === 'string' && progress < 100) {
          return app.pulldown.close();
        } else {
          return app.pulldown._id = app.PopLayer.addPopLayer(_PullDownPopLayer, (0, _objectSpread2.default)({}, props, {
            progress: progress
          }), (0, _objectSpread2.default)({}, options, {
            _id: app.pulldown._id
          }));
        }
      },
      close: function close() {
        app.router.removePopLayer(app.pulldown._id);
        app.pulldown._id = undefined;
      }
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    delete app.pulldown;
  }
};
/**
 * 蒙层组件
 * @component
 * @augments BaseComponent
 * @export
 */

exports.pulldown = pulldown;

var _MaskPopLayer = function MaskPopLayer(aprops) {
  var _BaseComponent7 = (0, _BaseComponent8.default)(aprops, _MaskPopLayer),
      loaderProps = _BaseComponent7.loaderProps,
      classNamePre = _BaseComponent7.classNamePre,
      children = _BaseComponent7.children,
      poplayer = _BaseComponent7.poplayer,
      props = (0, _objectWithoutProperties2.default)(_BaseComponent7, ["loaderProps", "classNamePre", "children", "poplayer"]);

  children = typeof children === 'function' ? children(poplayer) : children;
  classNamePre = (0, _objectSpread2.default)({
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

exports.MaskPopLayer = _MaskPopLayer;
_MaskPopLayer.defaultProps = {};
/**
 * 设置 蒙层中间的 loader 组件的参数
 * @attribute module:loader.MaskPopLayer.loaderProps
 * @type {object}
 */

Object.defineProperty(_MaskPopLayer, "MaskPopLayer", {
  get: function get() {
    return _MaskPopLayer;
  },
  set: function set(val) {
    exports.MaskPopLayer = _MaskPopLayer = val;
  }
});
_MaskPopLayer.isBnorth = true;
_MaskPopLayer.defaultProps['b-precast'] = {
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
  onPluginMount: function onPluginMount(app) {
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
      return app.mask._id = app.router.addPopLayer(_MaskPopLayer, (0, _objectSpread2.default)({
        children: content
      }, props), (0, _objectSpread2.default)({
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
      var _ref = app.router.getPopLayerInfo(app.mask._id) || {},
          content = _ref.content,
          _ref$props = _ref.props,
          props = _ref$props === void 0 ? {} : _ref$props,
          options = _ref.options;

      if (!content) {
        app.mask._id = undefined;
        return;
      }

      props.rewind = true;

      props.onFinished = function () {
        app.router.removePopLayer(app.mask._id);
        app.mask._id = undefined;
      };

      return app.router.addPopLayer(content, props, options);
    };

    app.mask._oldMask = app.render.mask;

    app.render.mask = function (show, options) {
      return show ? app.mask.show(options) : app.mask.close();
    };
  },
  onPluginUnmount: function onPluginUnmount(app) {
    app.render.mask = app.mask._oldMask;
    delete app.mask;
  }
};
exports.mask = mask;