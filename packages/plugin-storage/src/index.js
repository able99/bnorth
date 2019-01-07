/**
 * @module
 */


/**
 * 存储管理类，由插件构造，挂载在 app 上
 */
class Storage {
  constructor(app, _id, options, isSession){
    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 所属插件的实例的 id
     * @type {string}
     */
    this._id = _id;
    /**
     * 所属插件的实例的 options
     * @type {module:plugin~PluginOptions}
     */
    this.options = options;

    this.storage = isSession?window.sessionStorage:window.localStorage;
  }

  /**
   * 保存数据
   * @param {string} - 名称
   * @param {*} - 数据
   */
  setObj(item,data){
    this.storage.setItem(item,JSON.stringify(data));
  }

  /**
   * 获取保存的数据
   * @param {string} - 名称
   * @returns {*} 保存的数据
   */
  getObj(item){
    try{ return JSON.parse(this.storage.getItem(item)) }catch(e){ return }
  }

  /**
   * 保存字符串
   * @param {string} - 名称
   * @param {string} - 数据
   */
  set(item,data){
    this.storage.setItem(item,data);
  }

  /**
   * 获取保存的字符串
   * @param {string} item - 名称
   * @returns {string} 保存的字符串
   */
  get(item){
    let val = this.storage.getItem(item);
    return val;
  }

  /**
   * json path 方式保存数据
   * @param {string} - 名称 
   * @param {string} - path 
   * @param {*} - 数据 
   */
  setObjPath(item, path, val) {
    let data = this.app.utils.pathGet(this.getObj(item), path);
    if(!data) return;
    if(!this.app.utils.pathSet(this.app.utils.pathSet(data, path, val))) return;

    this.setObj(item, data);
  }

  /**
   * json path 方式读取数据
   * @param {string} - 名称 
   * @param {string} - path 
   * @returns {*} - 数据 
   */
  getObjPath(item, path) {
    return this.app.utils.pathGet(this.getObj(item), path);
  }

  /**
   * 清除指定保存的数据
   * @param {string} - 名称
   */
  remove(item){
    this.storage.removeItem(item);
  }

  /**
   * 清除全部数据
   * @param {string?} - 为空清楚全部；设置后，清除符合正则表达式名称的全部数据
   */
  clear(reg){
    if(reg){
      for(let item in this.storage){
        if((new RegExp(reg)).test(item)) this.removeItem(item);
      }
    }else{
      this.storage.clear();
    }
  }
}


/**
 * 为 App 实例增加存储管理模块
 * @plugin 
 * @exportdefault
 */
let storage = {
  _id: 'storage',

  onPluginMount(app, plugin, options) {
    /**
     * 为 App 实例增加存储管理类
     * @memberof module:index.storage
     * @type {module:index~Storage}
     * @mount app.Storage
     */
    app.Storage = Storage;
    /**
     * 为 App 实例增加 local storage 存储管理实例
     * @memberof module:index.storage
     * @type {module:index~Storage}
     * @mount app.storage
     */
    app.storage = new app.Storage(app, plugin._id, options);
    /**
     * 为 App 实例增加 session storage 存储管理实例
     * @memberof module:index.storage
     * @type {module:index~Storage}
     * @mount app.storageSession
     */
    app.storageSession = new app.Storage(app,  plugin._id, options, true);
  },

  onPluginUnmount(app) {
    delete app.Storage;
    delete app.storage;
    delete app.storageSession;
  },
}


export default storage;
