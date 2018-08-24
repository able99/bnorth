export default class State {
  static genStateId(_id, ownerId) {
    if(!_id||!ownerId) return;
    return `*${_id}@${ownerId}`
  }

  constructor(app, options={}) {
    app.log.info('state create', options._id);
    if(app.states[options._id]) { app.log.error('state _id dup:', options._id); return app.states[options._id]; }
    app.states[options._id] = this;

    this.app = app;
    this._id = options._id;
    this.options = options;
    if(this.options.initialization===undefined) this.options.initialization = {};
    
    Object.entries(this.options).filter(([k,v])=>k.indexOf('onState')===0).forEach(([k,v])=> this.app.event.on(this._id, k, v, this._id));
    this.app.event.on(this._id, 'onStateStop', ()=>{this.destructor()}, this._id);
  }

  destructor() {
    app.log.info('state destructor', this._id);
    this.app.event.off(this._id);
    if(this.options.cleanOnStop!==false) this.clear();
    if(this._id!==true && this.options.removeOnStop!==false) delete this.app.states[this._id];
  }

  data() {
    return this.app.context.stateData(this._id, this.options.initialization);
  }

  dataExt() {}

  async init(data) {
    this.app.log.info('state init', data);
    data = data || this.app.utils.objectCopy(this.options.initialization);

    let ret = await app.event.emitSync(this._id, 'onStateInit', data); 
    if(ret) return ret;
    this.app.context.stateInit(this._id, data);
    return true;
  }

  async update(data, options, prevData) {
    this.app.log.info('state update', data, options);
    if(!data) return;

    options = this.app.utils.getOptions(this.options, options);
    prevData = prevData||this.data();
    let nextData = this._dataUpdate(data, options, prevData);

    let ret = await this.app.event.emitSync(this._id, 'onStateUpdating', nextData, prevData, data, options); 
    this.app.context.stateInit(this._id, ret||nextData);
    this.app.event.emit(this._id, 'onStateUpdated', ret||nextData, prevData, data, options);
    return true;
  }

  async delete(_id) {
    this.app.log.info('state delete', _id);
    let data = this._dataDelete(_id);
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
    return this.app.context.stateClean(this._id);
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

  _dataDelete(_id, options, prevData) {
    let pre = prevData||this.data();
    
    if(Array.isArray(pre)) {
      pre.splice(_id, 1);
      pre = [...pre];
    }else{
      delete pre[_id];
      pre = {...pre};
    }

    return pre;
  }
}