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
let pluginApp = {
  // plugin config
  name: 'app',
  dependences: ['data'],

  // event
  // -------------------------
  onCreateStoreBefore(app) {
    Object.assign(app.actions,{
      appReady: pluginApp._appReady,
      noticeMessage: pluginApp._noticeMessage,
      noticeLoading: pluginApp._noticeLoading,
      noticeBlocking: pluginApp._noticeBlocking,
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
  _appReady: (ready)=>(app)=>{
    app.getPage(0).props.states._page.setValue('ready',ready);
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
  _noticeMessage: (...args)=>(app)=>{
    app.trigger('onNoticeMessage', ...args);
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
  _noticeLoading: (...args)=>(app)=>{
    app.trigger('onNoticeLoading', ...args);
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
  _noticeBlocking: (...args)=>(app)=>{
    app.trigger('onNoticeBlocking', ...args);
  },
}


export default pluginApp;
