"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _entries = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/entries"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

/**
 * @module
 */

/**
 * App render 模块，负责 react 根组件描绘和 dom 控制，以及提供通用的描绘工具函数
 * @exportdefault
 */
var Render =
/*#__PURE__*/
function () {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  function Render(app) {
    var _this = this;

    (0, _classCallCheck2.default)(this, Render);

    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */

    this._id = app._id + '.render';
    /**
     * react 根组件
     * @type {component|element}
     */

    this.component = null;
    /**
     * 用于等待中显示的 dom 元素，用户可设置，默认使用 react 根元素渲染前的根元素上的元素，如果没有则建立一个默认的元素
     * @type {element}
     */

    this.domWaiting = null;
    /**
     * 设置因错误关闭 react 绘制的标志位
     * @type {boolean}
     */

    this.stopForRenderError = false;
    this._elementIdRandom = 0;
    this.app.event.on(this.app._id, 'onAppStartRender', function () {
      _this._renderRootComponent();
    });
  }
  /**
     * react 渲染到的根元素，通过 app.options.rootId 配置，默认使用 '#root' 获取根元素
     * @type {component|element}
     */


  (0, _createClass2.default)(Render, [{
    key: "_renderRootComponent",
    // private work
    // -------------------
    value: function _renderRootComponent() {
      if (this.stopForRenderError) return;
      this.domWaiting = this.domRoot.querySelector('*');

      if (!this.domWaiting) {
        this.domWaiting = document.createElement('div');
        this.domWaiting.setAttribute('style', 'text-align: center: margin-top: 48px;');
        this.domWaiting.innerText = '...';
      }

      _reactDom.default.render(_react.default.createElement(this.app.context.Component, {
        app: this.app
      }, _react.default.createElement(this.app.router.Component, {
        app: this.app
      })), this.domRoot);
    } // interface
    // -------------------

    /**
     * 错误处理，严重级别，将停止 react 对跟元素的绘制，并将错误信息显示在跟元素上
     * @param {error|string|object} - 错误信息 
     * @param {object} options - 参数信息，包括错误的标题 title
     */

  }, {
    key: "critical",
    value: function critical(message) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          title = _ref.title;

      this.app.log.error(message, title);
      if (this.stopForRenderError) return;
      this.stopForRenderError = true;

      _reactDom.default.render(_react.default.createElement("div", null, _react.default.createElement("h3", null, title ? this.app.utils.message2String(title) : 'error'), _react.default.createElement("pre", null, this.app.utils.message2String(message))), this.domRoot);
    }
    /**
     * 错误处理，普通级别，将跳转到路由模块的错误页面，可返回或者刷新
     * @param {error|string|object} - 错误信息 
     * @param {object} options - 参数信息，包括错误的标题 title，页面 id 
     */

  }, {
    key: "panic",
    value: function panic(message) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          title = _ref2.title,
          _id = _ref2._id;

      this.app.log.error(message, title);
      this.app.router.error(message, title, _id);
    }
    /**
     * 显示错误信息，未实现功能，由插件负责功能完善
     * @param {number|string|component|element} - 提示的内容 
     * @param {object} - 参数，与实现者具体定义 
     */

  }, {
    key: "error",
    value: function error(message, props, options) {
      this.modal(this.app.utils.message2String(message));
    }
    /**
     * 显示提示信息，未实现功能，由插件负责功能完善
     * @param {number|string|component|element} - 提示的内容 
     * @param {object} - 参数，与实现者具体定义 
     */

  }, {
    key: "notice",
    value: function notice(content, props, options) {
      this.modal(this.app.utils.message2String(content));
    }
    /**
     * 显示阻塞式遮罩，未实现功能，由插件负责功能完善
     * @param {boolean} - 开启或者关闭
     * @param {object} - 参数，与实现者具体定义 
     */

  }, {
    key: "mask",
    value: function mask(show, props, options) {}
    /**
     * 显示进度条，未实现功能，由插件负责功能完善
     * @param {boolean} - 开启或者关闭
     * @param {object} - 参数，与实现者具体定义 
     */

  }, {
    key: "loader",
    value: function loader(show, props, options) {}
    /**
     * 显示模态对话框
     * @param {boolean} - 开启或者关闭
     * @param {object} - 参数，与实现者具体定义 
     * @returns {string} id
     */

  }, {
    key: "modalShow",
    value: function modalShow(content, props, options) {
      alert(content);
    }
    /**
     * 关闭模态对话框
     * @param {string} - id
     */

  }, {
    key: "modalClose",
    value: function modalClose(_id) {}
    /**
     * 限制 render 宽度
     * @param {string|number} 限制的宽度，为空或者0，取消限制 
     */

  }, {
    key: "limitWidth",
    value: function limitWidth(width) {
      this.domRoot.style.maxWidth = width ? "".concat(width, "px") : 'initial';
      this.domRoot.style.marginLeft = width ? 'auto' : 'unset';
      this.domRoot.style.marginRight = width ? 'auto' : 'unset';
    }
  }, {
    key: "addElement",
    value: function addElement() {
      var tag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "div";
      var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var id = this._elementIdRandom++;
      var element = document.createElement(tag);
      attrs['data-popelement'] = id;
      (0, _entries.default)(attrs).map(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            k = _ref4[0],
            v = _ref4[1];

        return element.setAttribute(k, v);
      });
      return id;
    }
  }, {
    key: "getElement",
    value: function getElement(_id) {
      return document.querySelector('[data-popelement="' + _id + '"]');
    }
  }, {
    key: "removeElement",
    value: function removeElement(_id) {
      var element = this.getElement(_id);
      element && element.remove();
    }
  }, {
    key: "domRoot",
    get: function get() {
      return document.querySelector(this.app.options.rootId || '#root');
    }
  }]);
  return Render;
}();

var _default = Render;
exports.default = _default;