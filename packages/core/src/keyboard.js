/**
 * @module
 */


/**
 * 键盘按下
 * @event module:keyboard.Keyboard#keydown
 * @property {event} - 键盘事件
 */

/**
 * 键盘产生可见字符
 * @event module:keyboard.Keyboard#keypress
 * @property {event} - 键盘事件
 */

/**
 * 键盘抬起
 * @event module:keyboard.Keyboard#keyup
 * @property {event} - 键盘事件
 */


/**
 * App 键盘事件管理模块，统一管理键盘事件
 * @exportdefault
 */
class Keyboard {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  constructor(app) {
    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */
    this._id = app._id+'.keyboard';
    this._listeners = [];

    this._handleKeyEventWork = e=>this._handleKeyEvent(e);
    document.addEventListener('keydown', this._handleKeyEventWork);
    document.addEventListener('keypress', this._handleKeyEventWork);
    document.addEventListener('keyup', this._handleKeyEventWork);
  }

  _handleKeyEvent(e) {
    this.app.log.debug('keyboard trigger', e);
    let listener = this._listeners.reverse().find(({event, callback, _id})=>(callback && e.type===event && this.app.router.isFocus(_id)));
    if(listener) {
      listener.callback(e);
      return listener._id;
    }
  }

  /**
   * 指定 id 的目标注册键盘事件处理函数
   * @param {string} - 目标 id
   * @param {string} - 事件名称
   * @param {function} - 事件处理函数 
   * @returns {function} 注销函数
   */
  on(_id, event, callback) {
    if(!event||!callback||!_id) return;
    if(this._listeners.find(listener=>listener.event===event&&listener.callback===callback&&listener._id===_id)) return;
    this._listeners.push({event, callback, _id});
    return ()=>this.off(callback);
  }

  /**
   * 注销键盘事件处理函数
   * @param {string|function} - 目标 id 或者事件处理函数
   */
  off(item) {
    if(typeof item === 'string') {
      this._listeners.forEach((listener,i)=>{if(listener._id===item) this._listeners.splice(i,1)});
    }else if(typeof item === 'function') {
      let index = this._listeners.findIndex(listener=>listener.callback===item);
      if(index>=0) this._listeners.splice(index,1);
    }
  }

  /**
   * 模拟触发指定的键盘事件
   * @param {event} - 键盘事件 
   */
  emit(event) {
    return this._handleKeyEvent(event);
  }
}


export default Keyboard;