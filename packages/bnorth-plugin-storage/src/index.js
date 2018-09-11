/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


/**
 * 存储能力
 * @class
 */
class Storage {
  constructor(app, _id, options, isSession){
    this.app = app;
    this._id = _id;
    this.options = options;
    this.storage = isSession?window.sessionStorage:window.localStorage;
  }

  /**
   * 保存对象
   * @method
   * @param {string} item - 名称
   * @param {object|array} data - 数据
   */
  setObj(item,data){
    this.storage.setItem(item,JSON.stringify(data));
  }

  /**
   * 获取保存的对象
   * @method
   * @param {string} item - 名称
   */
  getObj(item){
    let val = this.storage.getItem(item);
    try{ return JSON.parse(this.storage.getItem(item)) }catch(e){ return }
  }

  /**
   * 保存字符串
   * @method
   * @param {string} item - 名称
   * @param {*} data - 数据，非字符串数据，将自动进行toString 操作
   */
  set(item,data){
    this.storage.setItem(item,data);
  }

  /**
   * 获取保存的字符串
   * @method
   * @param {string} item - 名称
   */
  get(item){
    let val = this.storage.getItem(item);
    return val;
  }

  getObjPath(item, path) {
    return this.app.utils.pathGet(this.getObj(item), path);
  }

  setObjPath(item, path, val) {
    let data = this.app.utils.pathGet(this.getObj(item), path);
    if(!data) return;
    if(!this.app.utils.pathSet(this.app.utils.pathSet(data, path, val))) return;

    this.setObj(item, data);
  }

  /**
   * 清除指定保存的数据
   * @method
   * @param {string} item - 名称
   */
  remove(item){
    this.storage.removeItem(item);
  }

  /**
   * 清除全部数据
   * @method
   * @param {string} reg - 设置后，清除符合正则表达式名臣的全部数据
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


export default {
  _id: 'storage',

  onPluginMount(app, plugin, options) {
    app.Storage = Storage;
    app.storage = new app.Storage(app, plugin._id, options);
    app.storageSession = new app.Storage(app,  plugin._id, options, true);
  },

  onPluginUnmount(app) {
    delete app.Storage;
    delete app.storage;
    delete app.storageSession;
  },
}
