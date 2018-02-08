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
  constructor(app, isSession){
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
   * @param {boolean} [removeFalse] - 是否去除无效数据
   */
  getObj(item, removeFalse){
    let val = this.storage.getItem(item);
    try{
      let obj = JSON.parse(this.storage.getItem(item));
      if(!removeFalse) return obj;
      for(let key in obj){
        if(!obj[key]) delete obj[key];
      }
      return obj;
    }catch(e){
      return val;
    }
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
        if((new RegExp(reg)).test(item)){
          this.removeItem(item);
        }
      }
    }else{
      this.storage.clear();
    }
  }
}


/**
 * **plugin** name: storage dependence: none
 * 提供存储的能力扩展
 * @class storagePlugin
 * @property {class} app.Storage - Storage 类
 * @property {Storage} app.storage - 处理localStorage 的Storage 类实例
 * @property {Storage} app.sessionStorage - 处理sessionStorage 的Storage 类实例
 */
export default {
  name: 'storage',

  init(app) {
    app.Storage = Storage;
    app.storage = new Storage(app);
    app.sessionStorage = new Storage(app, true);
  }
}

