export default class Event {
  constructor(app) {
    this.app = app;
    this._listener = {};
    this._events = {};
  }

  _getEventName(event, target) {
    return `&${event}@@${target?(target.name||target.pluginName):''}`;
  }

  _addListener(target, event, callback, tag, once) {
    event = this._getEventName(event, target);

    !this._listener[event] && (this._listener[event] = []);
    this._listener[event].push({ callback, tag, once });
    return ()=>this.off(callback);
  }

  async _trigger(target, aevent, ...args) {
    let event = this._getEventName(aevent, target);
    this.app.log.info('event trigger', event);
    if(!this._listener[event]) return;

    for (let {callback, once} of this._listener[event]||[]) {
      let ret = await callback(...args);
      if(once) setTimeout(()=>this.off(callback),0);
      if(ret) return ret;
    }
  }

  on(target, event, callback, tag) {
    return this._addListener(target, event, callback, tag, false);
  }

  once(target, event, callback, tag) {
    return this._addListener(target, event, callback, tag, true);
  }

  off(item) {
    if(!item) return;

    Object.entries(this._listener).map(([k,v])=>{
      let index = v.findIndex(v=>v&&(v.callback===item||v.tag===item));
      if(index>=0) v.splice(index, 1);
      if(!v.length) delete this._listener[k];
    })
  }

  delete(event, target) {
    event = this._getEventName(event, target);
    delete this._listener[event];
  }

  emit(target, event, ...args) {
    return setTimeout(()=>this._trigger(target, event, ...args));
  }

  emitMerge(target, event, ...args) {
    let aevent = ((target&&(target.name||target.pluginName))||'') + event;
    if(this._events[aevent]) return;
    this._events[aevent] = true;
    
    return setTimeout(()=>{
      this._trigger(target, event, ...args);
      delete this._events[event];
    });
  }

  async emitSync(target, event, ...args) {
    return await this._trigger(target, event, ...args);
  }
}