export default class State {
  // static
  // ---------------
  static genStateId(stateId, ownerId) {
    if(!stateId||!ownerId) return;
    return `*${stateId}@${ownerId}`
  }

  static states = {};

  static get(_id) {
    return State.states[_id];
  }

  static getState(stateId, ownerId) {
    return State.get(this.genStateId(stateId, ownerId));
  }

  // constructor
  // ---------------
  constructor(app, options={}) {
    app.log.info('state create', options._id);
    if(State.states[options._id]) { app.log.error('state _id dup:', options._id); return State.states[options._id]; }
    State.states[options._id] = this;

    this.app = app;
    this._id = options._id;
    this.options = options;
    if(this.options.initialization===undefined) this.options.initialization = {};
    
    Object.entries(this.options).filter(([k,v])=>k.indexOf('onState')===0).forEach(([k,v])=> this.app.event.on(this._id, k, v, this._id));
    this.app.event.on(this._id, 'onStateStop', ()=>{this.destructor()}, this._id);
  }

  destructor() {
    this.app.log.info('state destructor', this._id);
    this.app.event.off(this._id);
    if(this.options.cleanOnStop!==false) this.clear();
    if(this._id!==true && this.options.removeOnStop!==false) delete State.states[this._id];
  }

  clear() {
    this.app.log.info('state clear');
    return this.app.context.clear(this._id);
  }

  data() {
    return this.app.context.data(this._id, this.options.initialization, this.options.deepCopy);
  }

  dataExt() {}

  get(path='') {
    let data = this.data()
    return this.app.utils.pathGet(data, path);
  }

  async update(data, options, isRealData) {
    this.app.log.info('state update', data, options);

    options = this.app.utils.getOptions(this.options, options);
    let prevData = this.data();
    let nextData = isRealData?data:this.app.utils.objectUpdate(prevData, data, options.append);

    let ret = await this.app.event.emitSync(this._id, 'onStateUpdating', nextData, prevData, data, options); 
    nextData = ret||nextData;

    this.app.context.set(this._id, nextData);
    this.app.event.emit(this._id, 'onStateUpdated', nextData, prevData, data, options);
    return true;
  }

  async delete(_did) {
    let data = this.app.utils.objectDelete(this.data(), _did);
    return await this.update(data, {}, true);
  }
  
  async set(path='', val, input) {
    let data = this.data();
    if(!this.app.utils.pathSet(data, path, val)) return false;
    return await this.update(data, {path, input});
  }
}