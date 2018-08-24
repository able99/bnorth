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
    if(!plugin) return;
    
    plugin._id = '>' + (plugin._id?plugin._id:('anonymous'+(++this._idNum)));
    if(!plugin.dependencies) plugin.dependencies = [];

    if(this._plugins.find(v=>v._id===plugin._id)) {
      this.app.render.critical(plugin._id, {title:'plugin dup'});
      return;
    }

    for(let dependence of (Array.isArray(plugin.dependencies)?plugin.dependencies:[plugin.dependencies])) {
      if(!this._plugins.find(v=>v._id===dependence)) {
        this.app.render.critical(`no dependence plugin: ${plugin._id} - ${dependence}`, {title:'plugin nodeps'});
        return;
      }
    }

    return true;
  }

  get(name) {
    return this._plugins.find(v=>v._id===('>'+(name||this.app._id)))
  }

  add(plugin) {
    this.app.log.info('plugin add', plugin&&plugin._id);
    if(!this._checkPlugin(plugin)) return;
    this._plugins.push(plugin);
    let app = this.app;
    let _id = plugin._id;

    if(plugin.onPluginMount) app.event.on(_id, 'onPluginMount', plugin.onPluginMount, _id);
    if(plugin.onPluginUnmount) app.event.on(_id, 'onPluginUnmount', plugin.onPluginMount, _id);
    Object.entries(plugin)
      .filter(([k,v])=>k.startsWith('on')&&k!=='onPluginMount'&&k!=='onPluginUnmount')
      .forEach(([k,v])=>this.app.event.on(app._id,k,v,_id))
      
    Object.entries(plugin)
      .filter(([k,v])=>k.startsWith('state'))
      .forEach(([k,v])=>{
        let {state=app.State, ...stateOptions} = v||{};
        let _idState = stateOptions._id||app.State.genStateId(k, _id);
        stateOptions._id = _idState;
        plugin[k] = new state(app, stateOptions); 

        app.event.on(_id, 'onPluginMount', (app)=>{app.event.emit(_idState, 'onStateStart', _idState, false)}, _idState);
        app.event.on(_id, 'onPluginUnmount', (app)=>{app.event.emit(_idState, 'onStateStop', _idState)}, _idState);
      })

    app.event.emit(_id, 'onPluginMount', app);
    app.event.emit(app._id, 'onPluginAdd', plugin);
  }

  remove(_id) {
    this.app.log.info('plugin remove', _id);
    let index = this._plugins.findIndex(v=>v._id===_id);
    if(index<0) return;
    let plugin = this._plugins[index];

    app.event.emit(plugin._id._id, 'onPluginUnmount', app);
    this.app.event.off(name);

    this._plugins.splice(index,1);
    this.app.event.emitSync(this.app._id, 'onPluginRemove', name);
  }
}