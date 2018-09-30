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

  static createState(app, aoptions, sid, ownerId) {
    if(typeof aoptions==='string') {
      return app.State.get(aoptions);
    }
    
    let {state, ...options} = aoptions||{state: app.State};
    let _id = options._id||State.genStateId(sid, ownerId);
    let {constructor=app.State, ...props} = ((typeof state)==='object')?state:{constructor: state};

    if(State.states[_id]) { 
      app.log.error('state _id dup:', _id); 
      State.states[_id].destructor(); 
    }

    return State.states[_id] = Object.assign(new constructor(app, _id, options), props); 
  }

  // constructor
  // ---------------
  constructor(app, _id, options={}) {
    app.log.info('state constructor', _id);

    this.app = app;
    this._id = _id;
    this.options = options;
    if(this.options.initialization===undefined) this.options.initialization = {};
    
    Object.entries(this.options).forEach(([k,v])=>k.indexOf('onState')===0&&this.app.event.on(this._id, k, v, this._id));
    this.app.event.on(this._id, 'onStateStop', ()=>{this.destructor()}, this._id);
  }

  destructor() {
    this.app.log.info('state destructor', this._id);
    this.app.event.off(this._id);
    if(this.options.cleanOnStop!==false) this.clear();
    if(this._id!==true && this.options.removeOnStop!==false) delete State.states[this._id];
  }

  // clean
  // -------------------
  clear() {
    this.app.log.info('state clear');
    return this.app.context.clear(this._id);
  }

  // state
  // -------------------
  stateData() { return this.app.utils.objectCopy(this.app.context.data(this._id, {})) }
  stateUpdate(data) { this.app.context.update(this._id, data) }
  stateSet(data) { this.app.context.set(this._id, data) }
  stateDelete(did) { this.app.context.delete(this._id, did) }

  // data
  // -------------------
  data() {
    return this.app.utils.objectCopy(this.stateData().data||this.options.initialization, this.options.deepCopy)
  }

  get(path='') {
    let data = this.data()
    return this.app.utils.pathGet(data, path);
  }

  async update(data, options) {
    this.app.log.info('state update', data, options);

    options = this.app.utils.getOptions(this.options, options);
    let prevData = this.data();
    let nextData = this.app.utils.objectUpdate(prevData, data, options.append);

    nextData = await this.app.event.emitSync(this._id, 'onStateUpdating', nextData, prevData, data, options) || nextData; 
    this.app.context.update(this._id, {data:nextData});
    this.app.event.emit(this._id, 'onStateUpdated', nextData, prevData, data, options);
    return nextData;
  }
  
  async set(path='', val, input) {
    let data = this.data();
    if(!this.app.utils.pathSet(data, path, val)) return false;
    return await this.update(data, {path, input});
  }

  async delete(_did) {
    let data = this.app.utils.objectDelete(this.data(), _did);
    return await this.update(data, {}, true);
  }

  // ext
  // -------------------
  extData() {}
}