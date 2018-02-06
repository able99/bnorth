/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


/**
 * **插件** 该类为插件类扩展了App 的能力 - 插件名`app` 依赖插件 `data`
 * 应用的基本插件，该插件是start 函数时添加的插件，实现了应用运行的基本功能
 * @class pluginApp
 */

// app action
//-----------------------------------------
const ActionAppReady = 'ActionAppReady';
/**
 * **action** 改变app ready 状态，app ready后，会关闭waiting 动画，显示渲染的内容
 * @method appReady
 * @param {boolean} ready 
 * @example
 * ```js
 * app.actions.appReady(true)
 * ```
 */
let appReady = (ready)=>(app)=>{
  app.getPage(0).props.states._page.setValue('ready',ready);
}

/**
 * **action** 显示通知内容
 * @method
 * @param {element|string} message - 消息框内容
 * @param {object} [props] - 消息显示的ui 属性，具体由处理该事件的插件所决
 * @param {object} [options] - 消息显示的配置属性，具体由处理该事件的插件所决
 * @example
 * ```js
 * app.actions.noticeMessage(message);
 * ```
 */
let noticeMessage = (...args)=>(app)=>{
  app.trigger('onNoticeMessage', ...args);
}
/**
 * **action** 显示页面加载进度
 * @method
 * @param {boolean} show - 是否显示，default `true`，调用几次显示，也需要调用几次隐藏
 * @param {object} [props] - 显示的ui 属性，具体由处理该事件的插件所决
 * @param {object} [options] - 显示的配置属性，具体由处理该事件的插件所决
 * @example
 * ```js
 * app.actions.noticeLoading(true);
 */
let noticeLoading = (...args)=>(app)=>{
  app.trigger('onNoticeLoading', ...args);
}

/**
 * 显示阻塞操作的加载页面
 * @method 
 * @param {boolean} show 是否显示，default `true`，调用几次显示，也需要调用几次隐藏
 * @param {object} [props] - 显示的ui 属性，具体由处理该事件的插件所决
 * @param {object} [options] - 显示的配置属性，具体由处理该事件的插件所决
 * @example
 * ```js
 * app.actions.noticeBlocking(true);
 */
let noticeBlocking = (...args)=>(app)=>{
  app.trigger('onNoticeBlocking', ...args);
}

export default {
  name: 'app',
  dependences: ['data'],

  onCreateStoreBefore(app) {
    Object.assign(app.actions,{
      appReady,
      noticeMessage,
      noticeLoading,
      noticeBlocking,
    });
  },

  onCreateStore(app) {
    app._createStore();
  },

  onRender(app) {
    app._render();
  },

  onErrorNavigator(app, nextState, replace) {
    app.error('app navigator error', `no route:${nextState.location.pathname}`);
    replace('/');
  },

  onErrorPageRender(app, error, title='page render error') {
    app.error(title ,error);
    setTimeout(()=>app.errorRender(title, error),0);
    return null;
  },

  onRenderMessage(app, title, ...error ) {
    app.showMessageOnRootElement(title ,error);
  },

  onNoticeMessage(app, message) {
    app.showMessageByAlert(message)
  },

  /*！
   * 实现了默认log 显示
   */
  onLog(app, type, trace, ...args) {
    if(!console) return;

    if(trace&&console.trace)console.trace();
    
    if(type==='error'&&console.error){
      console.error(...args);
    }else if(type==='debug'&&console.debug){
      console.debug(...args);
    }else if(console.log){
      console.log(...args);
    }
  },
}
