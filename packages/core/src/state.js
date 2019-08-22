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
 * @property {*?} xxx - 其他存在 options 中的属性
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
 * @see {@link https://able99.github.io/cbnorth/data.html} bnorth 数据流
 * @exportdefault
 */
class State {
  static app;

  // states
  // ---------------
  static states = {};
  /**
   * 通过 state 的实例 id 获取 state 实例
   * @param {string} - state 实例 id 
   * @returns {module:state.State} state 实例
   */
  static getState(_id) {
    return State.states[_id];
  }

  // state helper
  // ---------------

  /**
   * 创建数据单元
   * @param {module:app.App} - App 的实例 
   * @param {module:state.StateDefine} - 数据单元声明对象 
   * @param {string} - state 在所有者上的属性名
   * @param {string} - state 所有者 id 
   */
  static createState(stateKey, aoptions={}, ownerId) {
    if(typeof aoptions==='string') return State.app.State.getState(aoptions); 
    if(!stateKey) return;
    let [options, state, override] = Array.isArray(aoptions)?aoptions:[aoptions, State.app.State];
    ownerId = ownerId||State.app._id;
    let _id = options._id||`*${stateKey}@${ownerId}`;

    if(State.states[_id]) { State.app.log.error('state _id dup:', _id); State.states[_id].destructor() }
    return State.states[_id] = Object.assign(new state(_id, options, ownerId), override); 
  }

  static attachStates(modulee, options, cb) {
    options.forEach(([k,v])=>{
      modulee[k] = State.app.State.createState(k, v, modulee._id);
      if(!modulee[k]) { State.app.render.panic(v, {title: 'no state', _id: this._id}); return } 
      cb&&cb(k,v,modulee[k]);
    });
  }

  static detachStates(modulee, options) {
    options.forEach(([k,v])=>modulee[k]&&modulee[k].destructor());
  }

  static checkStates(modulee, context, nextContext, options) {
    for(let [k] of options){
      let key = modulee[k]&&modulee[k]._id;
      if(context[key]!==nextContext[key]) return true;
    }
  }

  static getStates(modulee, options) {
    let ret = {};
    options.forEach(([k,v])=>{
      v = modulee[k]; if(!v) return;
      ret[k] = v.data();
      let extData = v.extData(); extData&&(ret[`${k}Ext`] = extData);
    });
    return ret;
  }
  

  // constructor
  // ---------------
  /**
   * 不用于直接构造，而是通过定义拥有者定义数据单元声明对象，由拥有者通过数据单元构建函数构造
   */
  constructor(_id, options={}, ownerId) {
    /**
     * 数据单元的 id
     * @type {string}
     */
    this._id = _id;
    /**
     * 数据单元的声明对象
     * @type {module:state~StateDefine}
     */
    this.options = typeof(options)==='function'?options(State.app, this):options;

    this.options.ownerId = ownerId;
    if(this.options.initialization===undefined) this.options.initialization = {};
    Object.entries(this.options).forEach(([k,v])=>{
      if(k.startsWith('on')) { State.app.event.on(null, k, v, this._id)
      }else{ this[k] = v }
    });

    State.app.event.emit(null, 'onStateStart', this._id);
    this.options._onStart&&this.options._onStart();
  }

  destructor() {
    State.app.event.emit(null, 'onStateStop', this._id);
    this.options._onStart&&this.options._onStart();
    State.app.event.off(this._id);
    if(this.options.cleanOnStop!==false) this.clear();
  }

  // state work
  clear() { return State.app.context.clear(this._id) }
  stateData() { return State.app.utils.objectCopy(State.app.context.data(this._id, {})) }
  stateUpdate(data) { State.app.context.update(this._id, data) }
  stateSet(data) { State.app.context.set(this._id, data) }
  stateDelete(did) { State.app.context.delete(this._id, did) }

  // data operation interface
  // -------------------
  /**
   * 读取数据单元中的数据
   * @returns {*} 读取的数据
   */
  data() {
    return State.app.utils.objectCopy(this.stateData().data||this.options.initialization, this.options.deepCopy)
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
    return State.app.utils.pathGet(data, path);
  }

  /**
   * 更新数据单元的数据, 异步更新，同时调用2次 update，会导致后面更新覆盖前一次，建议用同步方式调用
   * @async
   * @param {*} - 新数据  
   * @param {object} - 更新参数，其中的 append 用于指定追加方式，参见 app.utils.objectUpdate 中对参数的说明
   * @returns {*} 更新后的数据
   */
  async update(data, options) {
    options = State.app.utils.getOptions(this.options, options);
    let prevData = this.data();
    let nextData = State.app.utils.objectUpdate(prevData, data, options.append);

    nextData = await State.app.event.emit(null, 'onStateUpdating', this._id, nextData, prevData, data, options)||nextData; 
    nextData = (this.options._onStateUpdating&&this.options._onStateUpdating(nextData, prevData, data, options))||nextData;
    State.app.context.update(this._id, {data:nextData});
    State.app.event.emit(null, 'onStateUpdated', this._id, nextData, prevData, data, options);
    this.options._onStateUpdated&&this.options._onStateUpdated(nextData, prevData, data, options);
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
    if(!State.app.utils.pathSet(data, path, val)) return false;
    return await this.update(data, {path, input});
  }

  /**
   * 删除数据单元中的数据
   * @param {*} - 删除的参数，参见 app.utils.objectDelete 中对参数的说明
   * @returns {*} 更新后的数据
   */
  async delete(_did) {
    let data = State.app.utils.objectDelete(this.data(), _did);
    return await this.update(data, {append: false});
  }
}


export default State;