/**
 * @module
 */

/**
 * App Event 模块，提供事件管理的功能
 * @exportdefault
 */
class Event {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {moudle:app.App} app 
   */
  constructor(app) {
    this.app = app;
    this._listener = {};
    this._events = {};
  }

  _getTargetEventName(targetId, eventName) {
    return `!${eventName}@${targetId}`;
  }

  _addListener(targetId, eventName, callback, ownerId, once) {
    let name = this._getTargetEventName(targetId, eventName);
    if(!this._listener[name]) this._listener[name] = []

    this._listener[name].push({ callback, ownerId, once });
    return ()=>this.off(callback);
  }


  /**
   * 向目标注册指定的事件处理函数
   * @param {string} - 目标的 id，比如 app, app 的模块，插件，数据单元或者页面等 
   * @param {string} - 事件的名称 
   * @param {function} - 处理函数，参数由事件决定 
   * @param {?string} - 该事件处理函数的拥有者 id 
   * @returns {function} 返回无参数的函数，调用可取消注册
   */
  on(targetId, eventName, callback, ownerId) {
    return this._addListener(targetId, eventName, callback, ownerId, false);
  }

  /**
   * 通 on 函数，但是事件只触发一次，就会自动取消注册
   */
  once(targetId, eventName, callback, ownerId) {
    return this._addListener(targetId, eventName, callback, ownerId, true);
  }

  /**
   * 取消事件的注册
   * @param {function} - 注册时的事件处理函数或者事件处理函数的所有者 id 
   */
  off(item) {
    if(!item) return;

    Object.entries(this._listener).forEach(([k,v])=>{
      let index = v.findIndex(v=>v&&(v.callback===item||v.ownerId===item));
      if(index>=0) v.splice(index, 1);
      if(!v.length) delete this._listener[k];
    })
  }

  /**
   * 批量删除事件处理函数
   * @param {string} - 目标 id 
   * @param {?string} - 事件名称，如果事件名称为空，则清除目标 id 的全部事件 
   */
  delete(targetId, eventName) {
    let name = eventName?this._getTargetEventName(targetId, eventName):targetId;
    delete this._listener[name];
  }


  /**
   * 触发事件
   * @param {string} - 目标 id 
   * @param {string} - 事件名称 
   * @param  {...*} - 事件的参数 
   */
  emitSync(targetId, eventName, ...args) {
    let name = this._getTargetEventName(targetId, eventName);

    [...this._listener[name]||[]].forEach(({callback, once})=>{
      callback(...args);
      if(once) this.off(callback);
    })
  }

  /**
   * 触发事件，如果某一事件处理函数返回的非负值，则返回该值，并停止继续执行队列中其他事件处理函数
   * @async
   * @param {string} - 目标 id 
   * @param {string} - 事件名称 
   * @param  {...*} - 事件的参数 
   * @returns {*} 处理函数的返回值
   */
  async emit(targetId, eventName, ...args) {
    let name = this._getTargetEventName(targetId, eventName);

    for (let {callback, once} of [...this._listener[name]||[]]) {
      let ret = await callback(...args);
      if(once) this.off(callback);
      if(ret) return ret;
    }
  }
}

export default Event;