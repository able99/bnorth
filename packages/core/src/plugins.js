/**
 * @module
 */


/**
 * 插件的声明函数
 * @typedef PluginDefineFunction
 * @type {function}
 * @param {module:app.App} app - App 实例
 * @param {...*} args - 插件的参数 
 * @returns {module:plugins~PluginDefine} 插件的声明对象
 */

/**
 * 插件的声明对象
 * @typedef PluginDefine
 * @type {object}
 * @property {string?} _id - 插件名称
 * @property {(string|string[])?} _dependencies - 依赖的插件列表
 * @property {function?} onXXX - app 或者 当前插件的事件处理函数
 * @property {module:state~StateDefine?} stateXXX - 声明的数据单元
 * @property {*?} xxx - 声明的属性或者方法
 */

/**
 * 插件的实例对象
 * @typedef PluginInstance
 * @type {object}
 * @property {string} _id - 插件实例的 id，声明的 id 或者安装时生成的唯一运行 id
 * @property {module:state.State} stateXXX - 插件的数据单元实例
 * @property {*} xxx - 插件的属性或者方法
 */


/**
 * 新的插件已经被添加
 * @event module:app.App#onPluginAdd
 * @property {module:plugins~PluginInstance} plugin - 插件的实例
 */

/**
 * 插件已经被移除
 * @event module:app.App#onPluginRemove
 * @property {string} _id - 插件的 id
 */

/**
 * 插件即将安装
 * @event module:plugins~PluginInstance#onPluginMount
 * @property {module:app.App} app - App 实例
 * @property {module:plugins~PluginInstance} plugin - 插件的实例
 */

/**
 * 插件移除完成
 * @event module:plugins~PluginInstance#onPluginUnmount
 * @property {module:app.App} app - App 实例
 * @property {module:plugins~PluginInstance} plugin - 插件的实例
 */


/**
 * App 插件管理模块，提供 App 通过插件的扩展的能力
 * @see {@link https://able99.github.io/cbnorth/plugin.html} bnorth 插件机制
 * @exportdefault
 */
class Plugins {
  /**
   * app 的功能模板，不直接构造，而是在启动过程，有 app 负责构造
   * @param {module:app.App} app 
   */
  constructor(app) {
    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = app;
    /**
     * 模块的 id
     * @type {string}
     */
    this._id = app._id+'.plugins';
    this._idNum = 0;
    this._plugins = [];
  }

  _checkPlugin(plugin, ...args) {
    this.app.log.debug('plugin check');
    if(!plugin) return;
    if(plugin instanceof Function) plugin = plugin(this.app, ...args);
    
    plugin._id = '>' + (plugin._id?plugin._id:('anonymous'+(++this._idNum)));
    if(!plugin._dependencies) plugin._dependencies = [];

    if(this._plugins.find(v=>v._id===plugin._id)) {
      this.app.render.critical(plugin._id, {title:'plugin dup'});
      return;
    }

    for(let dependence of (Array.isArray(plugin._dependencies)?plugin._dependencies:[plugin._dependencies])) {
      if(!this._plugins.find(v=>v._id.slice(1)===dependence)) {
        this.app.render.critical(`no dependence plugin: ${plugin._id} - ${dependence}`, {title:'plugin nodeps'});
        return;
      }
    }

    return plugin;
  }

  /**
   * 通过插件 id 获取插件
   * @param {string} - 插件 id，默认为 App 插件
   * @returns {module:plugins~PluginInstance} 插件实例
   */
  getPluginById(_id) {
    return this._plugins.find(v=>v._id===('>'+(_id||this.app._id)))
  }

  /**
   * 通过插件运行 id 获取插件
   * @param {string} - 插件运行 id
   * @returns {module:plugins~PluginInstance} 插件实例
   */
  getPluginByInstanceId(_id) {
    return this._plugins.find(v=>v._id===_id);
  }

  /**
   * 安装插件
   * @param {module:plugins~PluginDefine|module:plugins~PluginDefineFunction} - 插件声明对象 
   * @param  {...*} - 插件的参数 
   */
  add(plugin, ...args) {
    plugin = this._checkPlugin(plugin, ...args);
    if(!plugin) return;
    let app = this.app;
    let _id = plugin._id;
    app.log.debug('plugin add', plugin._id);
    this._plugins.push(plugin);
  
    Object.entries(plugin).forEach(([k,v])=>{
      if(k==='onPluginAdd'||k==='onPluginRemove') {
        app.event.on(app._id,k,v,_id);
      } else if(k.startsWith('onPlugin')) {
        app.event.on(_id,k,v,_id);
      } else if(k.startsWith('on')) {
        app.event.on(app._id,k,v,_id);
      } else if(k.startsWith('state')) {
        plugin[k] = app.State.createState(k, v, _id);
        if(!plugin[k]) { app.render.panic(v, {title: 'no state'}); return } 
        if(typeof v==='string') return;

        let _idState = plugin[k]._id;
        app.event.on(_id, 'onPluginMount', (app)=>{app.event.emit(_idState, 'onStateStart', _idState, false)}, _idState);
        app.event.on(_id, 'onPluginUnmount', (app)=>{app.event.emit(_idState, 'onStateStop', _idState)}, _idState);
      } else {
        plugin[k] = v;
      }
    })

    app.event.emit(_id, 'onPluginMount', app, plugin);
    app.event.emit(app._id, 'onPluginAdd', plugin);
  }

  /**
   * 移除插件
   * @param {string} - 插件实例 id
   */
  remove(_id) {
    this.app.log.debug('plugin remove', _id);
    let index = this._plugins.findIndex(v=>v._id===_id);
    if(index<0) return;
    let plugin = this._plugins[index];

    this.app.event.emit(plugin._id._id, 'onPluginUnmount', this.app, plugin);
    this.app.event.off(_id);
    this._plugins.splice(index,1);
    this.app.event.emit(this.app._id, 'onPluginRemove', _id);
  }
}

export default Plugins;