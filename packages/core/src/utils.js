export default class Utils {
  constructor(app, options) {
    this.app = app;
  }

  // options
  // ------------------------
  getOptions(...args) {
    return Object.assign({}, ...args.filter(v=>v).map(v=>(typeof v==='function'?v():v)));
  }

  // path props
  // ------------------------
  _checkPath(path) {
    if(path[0]!=='.'&&path[0]!=='[') path = '.'+path;
    return path;
  }

  pathSet(data, path, val) {
    path = this._checkPath(path); if(!path) return false;
    /* eslint-disable no-eval*/
    try{ eval(`data${path}=val`) } catch(e) { return false }
    return true;
  }

  pathGet(data, path) {
    path = this._checkPath(path); if(!path) return false;
    /* eslint-disable no-eval*/
    try{ return eval(`data${path}`) } catch(e) { return }
  }

  // message
  // -------------------------
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
  objectCopy(obj, deep) { // :TODO depp copy
    if(!obj) return obj;
    return Array.isArray(obj)?[...obj]:(typeof obj==='object'?{...obj}:obj);
  }

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
  shallowEqual(objA, objB, checkEqualProps=[]) {
    if (objA===objB) return true;
    if (typeof objA!=='object' || objA===null || typeof objB!=='object' || objB===null) return false;
    let keysA = Object.keys(objA);
    let keysB = Object.keys(objB);
    if (keysA.length!==keysB.length) return false;
    
    for(let key of keysA) if( !objB.hasOwnProperty(key) || 
      (checkEqualProps.includes(key)?!this.shallowEqual(objA[key], objB[key]):objA[key]!==objB[key])
    ){
      // console.log("shallowEqual: ",key);
      return false;
    }
  
    return true;
  }

  // string
  // -------------------------
  captilaze(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}