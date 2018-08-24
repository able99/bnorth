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
    
    if(!plugin._id) plugin._id = 'anonymous'+(++this._idNum);
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

  add(plugin) {
    this.app.log.info('plugin add', plugin&&plugin._id);
    if(!this._checkPlugin(plugin)) return;

    this._plugins.push(plugin);
    plugin.onPluginMount&&plugin.onPluginMount(this.app);
    this.app.event.emitSync(this.app._id, 'onPluginAdd', plugin);
  }

  remove(_id) {
    this.app.log.info('plugin remove', _id);
    let index = this._plugins.findIndex(v=>v._id===_id);
    if(index<0) return;
    let plugin = this._plugins[index];

    plugin.onPluginUnmount&&plugin.onPluginUnmount(this.app);
    this._plugins.splice(index,1);
    this.app.event.emitSync(this.app._id, 'onPluginRemove', name);
    this.app.event.off(name);
  }
}