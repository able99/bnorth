export default class State {
  constructor(app, name, options={}, page) {
    let key = options.key||(name===true?name:`*${name}@${page&&page.name||'#'}`);
    app.log.info('state create', key);
    if(app.states[key]) { app.log.error('state key dup:', key, page&&page.name); return app.states[key]; }
    if(key!==true) app.states[key] = this;

    this.app = app;
    this.name = key;
    this.options = options;
    if(this.options.initialization===undefined) this.options.initialization = {};
    
    key!==true && page && app.event.on(page, 'onPageStart', (page,active)=>{this.app.event.emit(this, 'onStateStart', this.name, active)}, this.name);
    key!==true && page && app.event.on(page, 'onPageActive', (page,onStart)=>{this.app.event.emit(this, 'onStateActive', this.name, onStart)}, this.name);
    key!==true && page && app.event.on(page, 'onPageInactive', (page,onStop)=>{this.app.event.emit(this, 'onStateInactive', this.name, onStop)}, this.name);
    key!==true && page && app.event.on(page, 'onPageStop', (page)=>{this.app.event.emit(this, 'onStateStop', this.name)}, this.name);
    Object.entries(this.options).filter(([k,v])=>k.indexOf('onState')===0).forEach(([k,v])=> this.app.event.on(this, k, v, this.name));

    this.app.event.on(this, 'onStateStop', ()=>{this.destructor()}, this.name);
  }

  destructor() {
    app.log.info('state destructor', this.name);
    this.app.event.off(this.name);
    if(this.options.cleanOnStop!==false) this.clear();
    if(this.name!==true && this.options.removeOnStop!==false) delete this.app.states[this.name];
  }

  data() {
    return this.app.context.stateData(this.name, this.options.initialization);
  }

  dataExt() {}

  async init(data) {
    this.app.log.info('state init', data);
    data = data || this.app.utils.objectCopy(this.options.initialization);

    let ret = await app.event.emitSync(this, 'onStateInit', data); 
    if(ret) return ret;
    this.app.context.stateInit(this.name, data);
    return true;
  }

  async update(data, options, prevData) {
    this.app.log.info('state update', data, options);
    if(!data) return;

    options = this.app.utils.getOptions(this.options, options);
    prevData = prevData||this.data();
    let nextData = this._dataUpdate(data, options, prevData);

    let ret = await this.app.event.emitSync(this, 'onStateUpdating', nextData, prevData, data, options); 
    this.app.context.stateInit(this.name, ret||nextData);
    this.app.event.emit(this, 'onStateUpdated', ret||nextData, prevData, data, options);
    return true;
  }

  async delete(key) {
    this.app.log.info('state delete', key);
    let data = this._dataDelete(key);
    return await this.update(data);
  }
  
  get(path='') {
    let data = this.data()
    return this.app.utils.pathGet(data, path);
  }

  set(path='', val, input) {
    let data = this.data();
    if(!this.app.utils.pathSet(data, path, val)) return false;
    return this.update(data, {path, input});
  }

  clear() {
    this.app.log.info('state clear');
    return this.app.context.stateClean(this.name);
  }

  _dataUpdate(data, {append}={}, prevData) {
    let pre = prevData||this.data();

    if(Array.isArray(data)) {
      data = [...(append?pre:[]),...data];
    }else if(typeof data==='object'){
      if(typeof append==='string'){
        let appendPrevData = this.app.utils.pathGet(prevData, append);
        let appendNextData = this.app.utils.pathGet(data, append);
        let appendData = Array.isArray(appendNextData)?[...appendPrevData||[], ...appendNextData||[]]:{...appendPrevData||{}, ...appendNextData||{}};
        data = {...pre, ...data};
        this.app.utils.pathSet(data, append, appendData)
      }else if(append===true){
        data = {...pre, ...data};
      }else{
        data = {...data};
      }
    }
    
    return data;
  }

  _dataDelete(key, options, prevData) {
    let pre = prevData||this.data();
    
    if(Array.isArray(pre)) {
      pre.splice(key, 1);
      pre = [...pre];
    }else{
      delete pre[key];
      pre = {...pre};
    }

    return pre;
  }
}