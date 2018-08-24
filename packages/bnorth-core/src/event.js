export default class Event {
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

  async _trigger(targetId, eventName, ...args) {
    let name = this._getTargetEventName(targetId, eventName);

    for (let {callback, once} of (this._listener[name]||[])) {
      let ret = await callback(...args);
      if(once) ()=>this.off(callback);
      if(ret) return ret;
    }
  }

  on(targetId, eventName, callback, ownerId) {
    return this._addListener(targetId, eventName, callback, ownerId, false);
  }

  once(targetId, eventName, callback, ownerId) {
    return this._addListener(targetId, eventName, callback, ownerId, true);
  }

  off(item) {
    if(!item) return;

    Object.entries(this._listener).map(([k,v])=>{
      let index = v.findIndex(v=>v&&(v.callback===item||v.ownerId===item));
      if(index>=0) v.splice(index, 1);
      if(!v.length) delete this._listener[k];
    })
  }

  delete(targetId, eventName) {
    let name = eventName?this._getTargetEventName(targetId, eventName):targetId;
    delete this._listener[name];
  }

  emit(targetId, eventName, ...args) {
    //return new Promise(()=>this._trigger(targetId, eventName, ...args));
    return setTimeout(()=>this._trigger(targetId, eventName, ...args), 40);
  }

  async emitSync(targetId, eventName, ...args) {
    return await this._trigger(targetId, eventName, ...args);
  }
}