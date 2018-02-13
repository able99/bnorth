'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

/**
 * **plugin** name: app dependence: data
 * 应用的基本插件，该插件是start 函数运行时添加的插件，是启动阶段添加的最后一个插件，实现了应用运行的基本功能
 * @class appPlugin
 */
var pluginApp = {
  // plugin config
  name: 'app',
  dependences: ['data'],

  // event
  // -------------------------
  onCreateStoreBefore: function onCreateStoreBefore(app) {
    Object.assign(app.actions, {
      appReady: pluginApp._appReady,
      noticeMessage: pluginApp._noticeMessage,
      noticeLoading: pluginApp._noticeLoading,
      noticeBlocking: pluginApp._noticeBlocking
    });
  },
  onCreateStore: function onCreateStore(app) {
    app._createStore();
  },
  onRender: function onRender(app) {
    app._render();
  },
  onErrorNavigator: function onErrorNavigator(app, nextState, replace) {
    app.error('app navigator error', 'no route:' + nextState.location.pathname);
    replace('/');
  },
  onErrorPageRender: function onErrorPageRender(app, error) {
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'page render error';

    app.error(title, error);
    setTimeout(function () {
      return app.errorRender(title, error);
    }, 0);
    return null;
  },
  onRenderMessage: function onRenderMessage(app, title) {
    for (var _len = arguments.length, error = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      error[_key - 2] = arguments[_key];
    }

    app.showMessageOnRootElement(title, error);
  },
  onNoticeMessage: function onNoticeMessage(app, message) {
    app.showMessageByAlert(message);
  },
  onLog: function onLog(app, type, trace) {
    if (!console) return;

    if (trace && console.trace) console.trace();

    for (var _len2 = arguments.length, args = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
      args[_key2 - 3] = arguments[_key2];
    }

    if (type === 'error' && console.error) {
      var _console;

      (_console = console).error.apply(_console, args);
    } else if (type === 'debug' && console.debug) {
      var _console2;

      (_console2 = console).debug.apply(_console2, args);
    } else if (console.log) {
      var _console3;

      (_console3 = console).log.apply(_console3, args);
    }
  },


  // action and reduxer
  // -----------------------------
  /**
   * **action** 
   * 改变app ready 状态，app ready后，会关闭waiting 动画，显示渲染的内容
   * @method app.actions.appReady
   * @param {boolean} ready 
   * @example
   * ```js
   * app.actions.appReady(true)
   * ```
   */
  _appReady: function _appReady(ready) {
    return function (app) {
      app.getPage(0).props.states._page.setValue('ready', ready);
    };
  },

  /**
   * **action** 
   * 显示通知内容
   * @method
   * @param {element|string} message - 消息框内容
   * @param {object} [props] - 消息显示的ui 属性，具体由处理该事件的插件所决
   * @param {object} [options] - 消息显示的配置属性，具体由处理该事件的插件所决
   * @example
   * ```js
   * app.actions.noticeMessage(message);
   * ```
   */
  _noticeMessage: function _noticeMessage() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return function (app) {
      app.trigger.apply(app, ['onNoticeMessage'].concat(args));
    };
  },

  /**
   * **action** 
   * 显示页面加载进度
   * @method
   * @param {boolean} show - 是否显示，default `true`，调用几次显示，也需要调用几次隐藏
   * @param {object} [props] - 显示的ui 属性，具体由处理该事件的插件所决
   * @param {object} [options] - 显示的配置属性，具体由处理该事件的插件所决
   * @example
   * ```js
   * app.actions.noticeLoading(true);
   */
  _noticeLoading: function _noticeLoading() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return function (app) {
      app.trigger.apply(app, ['onNoticeLoading'].concat(args));
    };
  },

  /**
   * **action**
   * 显示阻塞操作的加载页面
   * @method 
   * @param {boolean} show 是否显示，default `true`，调用几次显示，也需要调用几次隐藏
   * @param {object} [props] - 显示的ui 属性，具体由处理该事件的插件所决
   * @param {object} [options] - 显示的配置属性，具体由处理该事件的插件所决
   * @example
   * ```js
   * app.actions.noticeBlocking(true);
   */
  _noticeBlocking: function _noticeBlocking() {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return function (app) {
      app.trigger.apply(app, ['onNoticeBlocking'].concat(args));
    };
  }
};

exports.default = pluginApp;
module.exports = exports['default'];