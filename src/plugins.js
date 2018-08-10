/**
 * app 的插件管理器模块
 * @class
 */
export default class Plugins {
  constructor(app) {
    this.app = app;
    this._plugins = [];
  }

  _checkPlugin(plugin) {
    if(!plugin) return;
    
    if(!plugin.pluginName) plugin.pluginName = 'noname';
    if(!plugin.pluginDependence) plugin.pluginDependence = [];
    if(this._plugins.find(v=>v.pluginName===plugin.pluginName)) {
      this.app.log.error('plugin dup', plugin.pluginName);
      this.app.render.critical(plugin.pluginName, {title:'plugin dup'});
      return;
    }
    for(let dependence of (Array.isArray(plugin.pluginDependence)?plugin.pluginDependence:[plugin.pluginDependence])) {
      if(!this._plugins.find(v=>v.pluginName===dependence)) {
        this.app.log.error('plugin nodeps', plugin.pluginName, dependence);
        this.app.render.critical(`no dependence plugin: ${plugin.pluginName} - ${dependence}`, {title:'plugin nodeps'});
        return;
      }
    }
    return true;
  }

  add(plugin) {
    this._checkPlugin(plugin);
    this.app.log.info('plugin add', plugin.pluginName);

    this._plugins.push(plugin);
    plugin.onPluginMount && plugin.onPluginMount(this.app);
    Object.entries(plugin).forEach(([k,v])=>{
      if(k.indexOf('on')===0 && k !== 'onPluginMount' && k !== 'onPluginUnmount'){ 
        this.app.event.on(this.app,k,v,plugin.pluginName);
      }
    })

    this.app.event.emitSync(this.app, 'onPluginAdd', plugin);
  }

  remove(name) {
    this.app.log.info('plugin remove', name);
    let index = this._plugins.findIndex(v=>v.pluginName===name);
    if(index>=0) {
      let plugin = this._plugins[index];
      plugin && plugin.onPluginUnmount && plugin.onPluginUnmount(this.app);
      Object.entries(plugin).forEach(([k,v])=>{
        if(k.indexOf('on')===0){ 
          this.app.event.off(v);
        }
      })
      this._plugins.splice(index,1);
      this.app.event.emitSync(this.app, 'onPluginRemove', name);
      this.app.event.off(name);
    }
  }
}