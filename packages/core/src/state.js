/**
 * @module
 */

/**
 * 数据管理器的数据管理单元
 * @exportdefault
 */
class State {
  // static
  // ---------------
  static genStateId(stateId, ownerId) {
    if(!stateId||!ownerId) return;
    return `*${stateId}@${ownerId}`
  }

  /**
   * 通过 state 的 完整 id 获取 state 实例
   * @param {string} - state 的 id 
   * @returns {moudle:state.State} 获取的 State 实例
   */
  static get(_id) {
    return State.states[_id];
  }

  /**
   * 通过 state id 及 其所在 页面或者插件的 id 获取 state 实例
   * @param {string} - state 的 id 
   * @param {string} - state 所有者 的 id 
   * @returns {moudle:state.State} 获取的 State 实例
   */
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
  /**
   * 不用于直接构造，而是在 page 的 controller 中，定义数据单元，由 page 构造 
   */
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

  // state private work
  clear() { this.app.log.info('state clear'); return this.app.context.clear(this._id) }
  stateData() { return this.app.utils.objectCopy(this.app.context.data(this._id, {})) }
  stateUpdate(data) { this.app.context.update(this._id, data) }
  stateSet(data) { this.app.context.set(this._id, data) }
  stateDelete(did) { this.app.context.delete(this._id, did) }

  // data operation interface
  // -------------------
  /**
   * 读取数据单元中的数据
   * @returns {*} 读取的数据
   */
  data() {
    return this.app.utils.objectCopy(this.stateData().data||this.options.initialization, this.options.deepCopy)
  }

  /**
   * 读取数据单元中的扩展数据
   * @returns {*} 读取的数据
   */
  extData() {}

  /**
   * 以 json path 方式读取数据单元中的数据
   * @param {string} - json path 
   * @returns {*} 读取的数据
   */
  get(path='') {
    let data = this.data()
    return this.app.utils.pathGet(data, path);
  }

  /**
   * 更新数据单元的数据
   * @async
   * @param {*} - 新数据  
   * @param {object} - 更新参数，其中的 append 用于指定追加方式，参见 app.utils.objectUpdate 中对参数的说明
   * @returns {*} 更新后的数据
   */
  async update(data, options) {
    this.app.log.info('state update', data, options);

    options = this.app.utils.getOptions(this.options, options);
    let prevData = this.data();
    let nextData = this.app.utils.objectUpdate(prevData, data, options.append);

    nextData = await this.app.event.emit(this._id, 'onStateUpdating', nextData, prevData, data, options) || nextData; 
    this.app.context.update(this._id, {data:nextData});
    this.app.event.emit(this._id, 'onStateUpdated', nextData, prevData, data, options);
    return nextData;
  }
  
  /**
   * 以 json path 方式设置数据单元中的数据
   * @async
   * @param {string} - json path 
   * @param {*} - 新的数据
   * @param {boolean} - 是否是输入中状态
   * @returns {*} 更新后的数据
   */
  async set(path='', val, input) {
    let data = this.data();
    if(!this.app.utils.pathSet(data, path, val)) return false;
    return await this.update(data, {path, input});
  }

  /**
   * 删除数据单元中的数据
   * @param {*} - 删除的参数，参见 app.utils.objectDelete 中对参数的说明
   * @returns {*} 更新后的数据
   */
  async delete(_did) {
    let data = this.app.utils.objectDelete(this.data(), _did);
    return await this.update(data, {}, true);
  }
}

/**
 * 存放全部 state 的集合
 * @type {object}
 */
State.states = {};

export default State;