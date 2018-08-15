export default class Utils {
  constructor(app, options) {
    this._app = app;
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
    try{ eval(`data${path}=val`) } catch(e) { return false }
    return true;
  }

  pathGet(data, path) {
    path = this._checkPath(path); if(!path) return false;
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
  objectCopy(obj) {
    if(!obj) return obj;
    return Array.isArray(data)?[...data]:(typeof data==='object'?{...data}:data);
  }

  objectUpdate(prevData, data) {
    if(!data) return data;
    return Array.isArray(data)?[...prevData, ...data]:(typeof data==='object'?{...prevData, ...data}:data);
  }


  is(x, y) {
    if (x === y) {
      //排除 +0 == -0
      return x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  }

  shallowEqual(objA, objB) {
    if (this.is(objA, objB)) {
      return true;
    }
  
    if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
      return false;
    }
  
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
  
    if (keysA.length !== keysB.length) {
      return false;
    }
  
    for (var i = 0; i < keysA.length; i++) {
      if (keysA[i]==='context') continue;
      if (!hasOwnProperty.call(objB, keysA[i]) || !this.is(objA[keysA[i]], objB[keysA[i]])) {
        return false;
      }
    }
  
    return true;
  }

  // string
  // -------------------------
  captilaze(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}