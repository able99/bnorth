/**
 * app 的插件管理器模块
 * @class
 */
export default class Plugins {
  constructor(app) {
    this.app = app;
    this._idNum = 0;
    this._plugins = [];
  }

  _checkPlugin(plugin) {
    this.app.log.info('plugin check');
    if(!plugin) return;
    if(plugin instanceof Function) plugin = plugin(this.app);
    
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

  getByName(name) {
    return this._plugins.find(v=>v._id===('>'+(name||this.app._id)))
  }

  getById(_id) {
    return this._plugins.find(v=>v._id===_id);
  }

  add(plugin, ...args) {
    plugin = this._checkPlugin(plugin);
    if(!plugin) return;
    let app = this.app;
    let _id = plugin._id;
    app.log.info('plugin add', plugin._id);
    this._plugins.push(plugin);
  
    Object.entries(plugin).forEach(([k,v])=>{
      if(k==='onPluginAdd'||k==='onPluginRemove') {
        app.event.on(app._id,k,v,_id);
      } else if(k.startsWith('onPlugin')) {
        app.event.on(_id,k,v,_id);
      } else if(k.startsWith('on')) {
        app.event.on(app._id,k,v,_id);
      } else if(k.startsWith('state')) {
        let {state=app.State, ...stateOptions} = v||{};
        let _idState = stateOptions._id||app.State.genStateId(k, _id);
        stateOptions._id = _idState;
        plugin[k] = new state(app, stateOptions); 

        app.event.on(_id, 'onPluginMount', (app)=>{app.event.emit(_idState, 'onStateStart', _idState, false)}, _idState);
        app.event.on(_id, 'onPluginUnmount', (app)=>{app.event.emit(_idState, 'onStateStop', _idState)}, _idState);
      }
    })

    app.event.emitSync(_id, 'onPluginMount', app, plugin, ...args);
    app.event.emit(app._id, 'onPluginAdd', plugin);
  }

  remove(_id) {
    this.app.log.info('plugin remove', _id);
    let index = this._plugins.findIndex(v=>v._id===_id);
    if(index<0) return;
    let plugin = this._plugins[index];

    this.app.event.emitSync(plugin._id._id, 'onPluginUnmount', this.app, plugin);
    this.app.event.off(_id);
    this._plugins.splice(index,1);

    this.app.event.emitSync(this.app._id, 'onPluginRemove', _id);
  }
}