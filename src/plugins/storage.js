/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


/**
 * 为app 提供存储的能力扩展
 * @class
 * @example
 * **使用**
 * app.storage.xxx // 操作localStorage
 * app.sessionStorage.xxx // 操作sessionStorage
 * **hook**
 * 参见Browser hook说明
 */
class Storage {
  constructor(app, isSession){
    this.storage = isSession?window.sessionStorage:window.localStorage;
  }
  setObj(item,data){
    this.storage.setItem(item,JSON.stringify(data));
  }
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
  set(item,data){
    this.storage.setItem(item,data);
  }
  get(item){
    let val = this.storage.getItem(item);
    return val;
  }
  remove(item){
    this.storage.removeItem(item);
  }
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


export default {
  init(app) {
    app.Storage = Storage;
    app.storage = new Storage(app);
    app.sessionStorage = new Storage(app, true);
  }
}

