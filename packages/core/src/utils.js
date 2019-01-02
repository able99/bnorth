/**
 * @module
 */


/**
 * App Utils 模块，提供一些工具函数
 * @exportdefault
 */
class Utils {
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
    this._id = app._id+'.utils';
  }

  /**
   * 合并由对象或者函数组成的参数集合
   * @param  {...(object|function)} - 参数集合 
   * @returns {object} 组合后的参数对象
   */
  getOptions(...args) {
    return Object.assign({}, ...args.filter(v=>v).map(v=>(typeof v==='function'?v():v)));
  }

  _checkPath(path) {
    if(path[0]!=='.'&&path[0]!=='[') path = '.'+path;
    return path;
  }

  /**
   * 以 json path 的方式对对象进行赋值
   * @param {!object} - 需要赋值的对象
   * @param {!string} -  json path 
   * @param {*} - 需要设置的值
   * @returns {object} 赋值后的对象
   * @example
   * ```js
   * let obj = {a: {b:1}}
   * app.utils.pathSet(obj, '.a.b', 2); // {a: {b:2}}
   * ```
   */
  pathSet(data, path, val) {
    path = this._checkPath(path); if(!path) return false;
    /* eslint-disable no-eval*/
    try{ eval(`data${path}=val`) } catch(e) { return false }
    return true;
  }

  /**
   * 以 json path 的方式读取对象中指定的数据
   * @param {!object} - 需要读取的对象
   * @param {!string} -  json path 
   * @returns {*} 读取的值
   */
  pathGet(data, path) {
    path = this._checkPath(path); if(!path) return false;
    /* eslint-disable no-eval*/
    try{ return eval(`data${path}`) } catch(e) { return }
  }

  /**
   * 将 error 实例，字符串，包含 message 字段的对象，安全转换为错误信息字符串
   * @param {(Error|string|{message:string})} - 错误数据
   * @returns {stirng} 错误信息 
   */
  message2String(message) {
    if(message instanceof Error) {
      return message.message;
    }else if(typeof message === 'object') {
      return message.message||'';
    }else if(typeof message === 'string') {
      return message;
    }else {
      return String(message);
    }
  }

  // object op
  // --------------------------
  /**
   * 对象复制或者深度复制
   * @param {array|object} - 要复制的对象 
   * @param {boolean} - 是否深度复制，暂未实现
   * @returns {array|object} 复制后的新对象 
   */
  objectCopy(obj, deep) { // :TODO depp copy
    if(!obj) return obj;
    return Array.isArray(obj)?[...obj]:(typeof obj==='object'?{...obj}:obj);
  }

  /**
   * 用指定的追加方式进行数据连接
   * @param {*} - 原数据
   * @param {*} - 新数据 
   * @param {*} - 追加方式，包括：
   * 
   * 1. 原对象是数组，
   *     - append 为真，返回 追加新数据的新数组，
   *     - append 不为真，返回新数据组成的新数组
   * 1. 原对象是对象，
   *     - append 是字符串，用 json get 方式读取原数据和新数据，然后用 append 参数为 true，递归调用一次数据连接后，用json set 方式设置到由原数据和新数据合并的数据上
   *     - append 为 true 或者没有设置，进行对象合并
   *     - append 为其他值时，返回新数据组成的新数据
   * 1. 其他类型
   *     - append 为真，原数据与新数据进行加号操作
   *     - append 不为真，返回新数据
   * @returns {*} 连接后的数据 
   */
  objectUpdate(obj, data, append) {
    if(Array.isArray(data)) {
      data = [...(append&&obj?obj:[]),...data];
    }else if(typeof data==='object'){
      if(typeof append==='string'){
        let appendObj = this.app.utils.pathGet(obj, append);
        let appendData = this.app.utils.pathGet(data, append);
        let appends = this.app.utils.objectUpdate(appendObj, appendData, true);
        data = {...obj, ...data};
        this.app.utils.pathSet(data, append, appends)
      }else if(append===true||append===undefined){
        data = {...obj, ...data};
      }else{
        data = {...data};
      }
    }else{
      data = append?(obj+data):data;
    }
    
    return data;
  }

  /**
   * 删除对象中的指定数据，如果为数组，按序号删除，如果为对象，按 key 删除
   * @param {(object|array)} - 待处理的对象 
   * @param {(string|number)} - key 值或者序号
   * @returns {(object|array)} 处理后的对象
   */
  objectDelete(obj, _id) {
    if(!obj) return;
    
    if(Array.isArray(obj)) {
      obj.splice(_id, 1);
      obj = [...obj];
    }else{
      delete obj[_id];
      obj = {...obj};
    }

    return obj;
  }

  // compare
  // --------------------------
  /**
   * 对两个对象进行浅层比较
   * @param {object} - 对象1 
   * @param {object} - 对象2
   * @param {string[]} - 需要递归一次浅层比较的属性 
   * @returns {boolean} 是否相等
   */
  shallowEqual(objA, objB, checkEqualProps=[]) {
    if (objA===objB) return true;
    if (typeof objA!=='object' || objA===null || typeof objB!=='object' || objB===null) return false;
    let keysA = Object.keys(objA);
    let keysB = Object.keys(objB);
    if (keysA.length!==keysB.length) return false;
    
    for(let key of keysA) 
      if( !objB.hasOwnProperty(key) || (checkEqualProps.includes(key)?!this.shallowEqual(objA[key], objB[key]):objA[key]!==objB[key])){
      // console.log("shallowEqual: ",key);
      return false;
    }
  
    return true;
  }

  // string
  // -------------------------
  /**
   * 将字符串首字母大写
   * @param {!string} - 要转换的字符串
   * @returns {string} 转换后的字符串 
   * @example
   * ```js
   * app.utils.captilaze('abc'); // 'Abc' 
   * ```
   */
  captilaze(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export default Utils;