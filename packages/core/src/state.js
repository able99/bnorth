/**
 * @module
 */


/**
 * 数据单元的声明对象
 * @typedef StateDefine
 * @type {object}
 * @property {string?} id - 覆盖默认的实例 id 生成规则生成的 id
 * @property {*} [initialization={}] - 指定数据单元中数据的初始值
 * @property {boolean?} removeOnStop - 拥有者生命周期结束时不删除数据单元
 * @property {boolean?} deepCopy - 数据更新时，采用深复制方案，参见 `app.utils.objectUpdate`
 * @property {boolean?} append - 数据更新时，采用的数据追加方案，参见 `app.utils.objectUpdate`
 * @property {function?} onXXX - 注册 app 的事件处理函数
 * @property {function?} onStateXXX - 注册该数据单元的事件处理函数
 * @property {(class|object)?} state - 用于扩展和定制数据单元
 * 
 * - 参数为 class 则使用该继承与 State 的数据单元
 * - 参数为 object，对象中的 constructor 为数据单元类，其他将覆盖数据对象实例，实现定制
 * @property {*?} xxx - 声明的属性或者方法
 */


/**
 * 数据单元创建时事件
 * @event module:state.State#onStateStart
 * @property {string} _id - 拥有者 id
 */

/**
 * 数据单元注销时事件
 * @event module:state.State#onStateStop
 * @property {string} _id - 拥有者 id
 */

/**
 * 数据单元数据更新中触发事件，如果事件处理函数返回非假数据，则使用该数据更新数据单元
 * @event module:state.State#onStateUpdating
 * @property {*} nextData - 更新后的数据
 * @property {*} prevData - 更新后的数据
 * @property {*} data - 调用更新函数时的数据
 * @property {object} options - state 的参数
 */

/**
 * 数据单元更新完成时触发事件，参数同 onStateUpdating
 * @event module:state.State#onStateUpdated
 */


/**
 * 数据单元拥有唯一 id，每个数据单元通过 id 对应 context 数据仓库的一个数据块，是对数据的包装，提供读取，更新等操作
 * @exportdefault
 */
class State {
  // static
  // ---------------
  static _genStateId(stateKey, ownerId) {
    if(!stateKey||!ownerId) return;
    return `*${stateKey}@${ownerId}`
  }

  /**
   * 通过 state 的实例 id 获取 state 实例
   * @param {string} - state 实例 id 
   * @returns {module:state.State} state 实例
   */
  static getStateById(_id) {
    return State.states[_id];
  }

  /**
   * 通过 state 实例在其所有者上的属性名和其所有者 id 获取 state 实例
   * @param {string} - state 在所有者上的属性名
   * @param {string} - state 所有者 id 
   * @returns {module:state.State} 获取的 State 实例
   */
  static getStateByOwner(stateKey, ownerId) {
    return State.getStateById(this._genStateId(stateKey, ownerId));
  }

  /**
   * 创建数据单元
   * @param {module:app.App} - App 的实例 
   * @param {module:state.StateDefine} - 数据单元声明对象 
   * @param {string} - state 在所有者上的属性名
   * @param {string} - state 所有者 id 
   */
  static createState(app, aoptions, stateKey, ownerId) {
    if(typeof aoptions==='string') {
      return app.State.getStateById(aoptions);
    }
    
    let {state, ...options} = aoptions||{state: app.State};
    let _id = options._id||State._genStateId(stateKey, ownerId);
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
   * 不用于直接构造，而是通过定义拥有者定义数据单元声明对象，由拥有者通过数据单元构建函数构造
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
 * 存放全部数据单元的集合
 * @type {object}
 */
State.states = {};

export default State;