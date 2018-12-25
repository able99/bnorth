import React from 'react';
import createHistory from 'history/createHashHistory';
import { join } from 'path';
import RouterComponent from './router.component.js'
import PageLoading from './router.loading.js'
import PageError from './router.error.js'


let spe = '/';
let ParamSpe = ':';
let SubPageSpe = '|';
let ParamOptional = '?';
let PageSign = '#';

/*
 * @class
 * ***流程***
 * 1. router 构建期间，监听app 启动事件，在onAppStartRouter 事件时，将RouterComponent 加入到app 根元素上；监听浏览器地址栏
 * 1. 用户通过navigator 函数(push, relace, back 等)操作，解析locationinfo，触发浏览器地址栏改变
 * 1. router 监听到地址栏变化后，解析url，产生pathinfos， 并发出render 事件, RouterComponnent
 */

export default class Router {
  // constructor
  // ----------------------------------------
  constructor(app) {
    this.app = app;
    this._id = app._id+'.router';

    this.RouterComponent = RouterComponent;
    this.PageLoading = PageLoading;
    this.PageError = PageError;

    this._routes = {}; // config routes for app 
    this._views = []; // current views on runtime
    this._pages = {}; // current pages on runtime
    this._pathinfos = []; // current location obj
    this._activeId = undefined;;
    this._focusId = undefined;
    this._states = {}; // current pathname state on runtime
    this._error = undefined;
    this._block = undefined;
    this._viewIdNum = 0;
    this._historyStackCount = 0;
    this.passQuery = false;
    this.passState = false;
    this.passParams = false;

    this.app.event.on(this.app._id, 'onPageAdd', (_id, page)=>{page&&this._addPage(_id, page)}, this._id);
    this.app.event.on(this.app._id, 'onPageRemove', (_id, page)=>{page&&this._removePage(_id)}, this._id);
    this.app.event.on(this.app._id, 'onAppStartRouter', ()=>(this.app.render.component = <this.RouterComponent app={this.app} />), this._id);
    this.app.event.on(this.app._id, 'onAppStartRender', ()=>{this._updateRender()}, this._id);
    this.app.event.on(this.app._id, 'onRouteErrorNoRoute', name=>this.error(`route name: ${name}`, 'no route error'), this._id);
    this.app.event.on(this.app._id, 'onRouteErrorNoParam', name=>this.error(`params name: ${name}`, 'miss require param error'), this._id);

    this.history = createHistory();
    this.history.listen((location, action)=>this._handleLocationChange(location, action));
    this._handleLocationChange(this.history.location, this.history.action);
  }

  destructor() {
    this.app.event.off(this._id);
  }

  // render
  // --------------------------------------
  _updateRender() {
    this.app.event.emit(this.app._id, 'onRouterUpdate');
  }

  // history
  // --------------------------------------
  _handleLocationChange(location, action) {
    this.app.log.info('router location', location);
    this._clearError();

    Object.keys(this._states).filter(v=>!location.pathname.startsWith(v)).forEach(v=>{delete this._states[v]});
    if(location.state) this._states[location.pathname] = location.state;

    location.query = {};
    location.search = location.search.slice(1).trim();
    location.search && location.search.split('&').forEach(v=>{
      let vs = v.split('=');
      location.query[vs[0]] = decodeURIComponent(vs[1]);
    })

    if(action==='PUSH') this._historyStackCount++;
    if(action==='POP') this._historyStackCount = Math.max(--this._historyStackCount, 0);

    let pos = 0;
    let pathnames = [];
    while(pos<location.pathname.length-1) {
      let index = location.pathname.indexOf(spe, pos+1);
      index = index>=0?index:location.pathname.length;
      let sub = location.pathname.slice(pos+1, index);
      if((pos===0&&sub[0]===ParamSpe)||(this.getRoute(spe+sub.split(ParamSpe)[0]).length)) {
        pathnames.push(spe+sub);
      }else if(pos===0){
        pathnames.push(spe);
        pathnames.push(sub);
      }else {
        pathnames.push(sub);
      }
      pos = index;
    }
    if(!pathnames.length) pathnames.push(spe);
    location.pathnames = pathnames;
    
    this._updatePathInfos(location);
  };

  // route manager
  // --------------------------------------
  setRoutes(routes) {
    this._routes = routes;
    Object.entries(this._routes||{}).forEach(([k,v])=>v.for&&this._addRouteNativator(k, v.for));
    this._updatePathInfos(this.history.location);
  }

  getRoutes() {
    return this._routes||{};
  }

  getRoute(name) {
    let route = Object.entries(this._routes).find(([k,v])=>k.split(':')[0]===name);
    return route?[route[0], typeof(route[1])==='function'?{component:route[1]}:route[1]]:[];
  }

  addRoute(name, route) {
    if(!name||!route) return;
    this._routes[name] = route;
    route.for&&this._addRouteNativator(name, route.for);
    this._updatePathInfos(this.history.location);
  }

  _addRouteNativator(routeName, forName) {
    let name = routeName&&routeName.split(ParamSpe[0]);
    this[`push${forName}`] = (...args)=>this.push([name, ...args]);
    this[`replace${forName}`] = (...args)=>this.replace([name, ...args]);
  }

  // router
  // --------------------------------------
  getStackCount() {
    return this._historyStackCount;
  }

  isRootPath() {
    return this.app.router._pathinfos[this.app.router._pathinfos.length-1].name==='/';
  }

  isFocus(_id) {
    return this._focusId === _id;
  }

  isActive(_id) {
    return this._activeId === _id;
  }

  /* parse locationinfo to pathinfo */
  async _updatePathInfos(location) {
    if(!Object.keys(this.getRoutes()).length) return;

    let fullPathName = '';
    let _idParent; 
    let params = {};
    let pathinfos = [];
    let focusId = undefined;
    let activeId = undefined;

    /* route */
    for (let pathname of location.pathnames) {
      fullPathName = join(fullPathName, decodeURIComponent(pathname));
      let [name, ...pathnameParams] = pathname.split(ParamSpe);
      let _id = PageSign+fullPathName;
      let pathinfo = { 
        _id, _idParent, 
        name, pathname, fullPathName, 
        query: location.query, state: this._states[fullPathName], pathnameParams,
        embeds: {}, viewItems: this.getPageViews(_id),
      };

      let [routeName, route] = this.getRoute(pathinfo.name);
      if(!routeName||!route) return this.app.event.emit(this.app._id, 'onRouteErrorNoRoute', pathinfo.name, pathinfo, location);
      
      pathinfo.routeName = routeName;
      pathinfo.route = route;
      pathinfo.routeParams = routeName.split(ParamSpe).slice(1);

      pathinfo.params = this.passParams?{...params}:{};
      pathinfo.routeParams.forEach((v,i)=>{
        let optional = v.endsWith(ParamOptional);
        if(optional) v = v.slice(0, -1);
        if(!optional&&i>pathinfo.pathnameParams.length-1) return this.app.event.emit(this.app._id, 'onRouteErrorNoParam', v, pathinfo, location);
        
        pathinfo.params[v] = pathinfo.pathnameParams[i]?decodeURIComponent(pathinfo.pathnameParams[i]):null;
        if(this.passParams) params[name] = pathinfo.params[v];  
      })

      for (let [k,v] of Array.isArray(route.embeds)?route.embeds.map(v=>[v,v]):Object.entries(route.embeds||{})) {
        let embed = {...pathinfo};
        embed._idParent = embed._id;
        embed._id = embed._id + SubPageSpe+v;
        embed.name = v;
        embed.embed = true;
        embed.embeds = {};
        embed.viewItems = this.getPageViews(embed._id);
        let [routeNameEmbed, routeEmbed] = this.getRoute(embed.name);
        if(!routeNameEmbed||!routeEmbed) return this.app.event.emit(this.app._id, 'onRouteErrorNoRoute', pathinfo.name, pathinfo, location);
        
        embed.routeName = routeNameEmbed;
        embed.route = routeEmbed;
        pathinfo.embeds[k] = embed;
      }
      
      _idParent = _id;
      pathinfos.push(pathinfo);
    }

    /* active & focus */
    let viewItems = this.getNoPageViews();
    let focusViewItem = Array.from(viewItems).reverse().find(v=>v.options.isModal);
    let activePageItem = pathinfos.slice(-1)[0];
    if(focusViewItem) focusId = focusViewItem.options._id;
    if(activePageItem) activeId = activePageItem._id;
    if(activePageItem && !focusId){
      let pageFocusViewItem = activePageItem.viewItems&&Array.from(activePageItem.viewItems).reverse().find(v=>v.options.isModal);
      if(pageFocusViewItem) { focusId = pageFocusViewItem.options.id }else{ focusId = activePageItem._id }
    }

    /* block */
    for(let pathinfo of pathinfos) {
      let _block = await this.app.event.emit(this.app._id, 'onRouteMatch', pathinfo, location);
      if(_block) return this.block(_block);
    }

    /* update */
    this._focusId = focusId;
    this._activeId = activeId;
    this._pathinfos = pathinfos;
    this._updateRender();
  }

  // error
  // ---------------------------------------
  error(message, title, data, _id) {
    this._error = {message, title, _id};
    this._updateRender();
  }

  _clearError() {
    this._error = null;
  }

  // pages
  // ---------------------------------------
  _addPage(_id, page) {
    this._pages[_id] = page;
  }
  
  _removePage(_id) {
    let page = this.getPage(_id);
    if(page) {
      this.removePageViews(page._id);
      delete this._pages[page._id];
    }
  }

  getPage(_id) {
    if(typeof _id === 'string') {
      return this._pages[_id];
    } else if(typeof _id === 'number') {
      return this._pages[Object.keys(this._pages)[_id]];
    } else if(_id===undefined){
      let keys = Object.keys(this._pages);
      return this._pages[keys[keys.length-1]];
    }
  }

  // views 
  // ----------------------------------------
  getViewId(options={}) {
    return options._id || `${++this._viewIdNum}@${options._idPage?options._idPage:'#'}`;
  }

  addView(content, props={}, options={}) {
    if(!content) return;
    options._id = this.getViewId(options);
    let view = this.getView(options._id);

    if(!view) {
      this._views.push({ content, props, options });
      options.onAdd && options.onAdd(options._id);
    }else{
      view.content = content;
      view.props = props;
      view.options = options;
    }
    
    this._updatePathInfos(this.history.location);
    return options._id;
  }

  removeView(_id) {
    let index = this._views.findIndex(v=>v.options._id===_id);
    if(index<0) return;

    this._views[index].options.onRemove && this._views[index].options.onRemove();
    this._views.splice(index, 1);
    this._updatePathInfos(this.history.location);
  }

  getView(_id) {
    return this._views.find(v=>v.options._id===_id);
  }

  getViews() {
    return this._views;
  }

  getNoPageViews() {
    return this._views.filter(({options})=>!options._idPage);
  }

  getPageViews(_id) {
    return this._views.filter(({options})=>options._idPage===_id);
  }

  removePageViews(_id) {
    this.getPageViews(_id).forEach(v=>this.removeView(v.options._id))
  }

  // router navigator
  // ----------------------------------------
  getLocationInfo(...args) {
    let query = {};
    let state;
    let pathnames = this._pathinfos.map(v=>v.pathname);

    let addPath = path=>path.split('/').forEach(v=>{
      if(v==='') {
        pathnames = ['/'];
      } else if(path==='..') {
        pathnames = pathnames.slice(0, -1);
      } else {
        pathnames.push(v);
      }
    });

    args.forEach(arg=>{
      if(Array.isArray(arg)) {
        addPath(arg.map((v,i)=>i?encodeURIComponent(v):v).join(':'));
      }else if(typeof arg==='object') {
        if(arg.query) query = arg.query;
        if(arg.state) state = arg.state;
      }else {
        addPath(String(arg));
      }
    })

    return {
      state:this.passState?{...this.history.location.state, ...state}:state,
      pathname: pathnames.map((v,i,a)=>i===0&&v==='/'&&a.length>1?'':v).join('/'),
      search: '?'+Object.entries(this.passQuery?{...this.history.location.query, ...query}:query).map(([k,v])=>k+'='+v).reduce((v1,v2)=>v1+(v1?'&':'')+v2,''),
    };
  }

  getPathName(...args) {
    return this.history.createHref(this.getLocationInfo(...args));
  }

  getUrl(...args) {
    return window.location.origin+window.location.pathname+window.location.search+this.getUrlPath(...args);
  }
  
  block(_block) {
    this.app.log.info('router block', _block);
    if(typeof _block==='function'){
      this._block = this.history.location;
      _block = _block(this.app);
      this._block = _block||this._block;
    }else{
      this._block = _block||this.history.location;
    }
    return true;
  }

  restore(location) {
    this.app.log.info('router restore', location);
    location||this._block?this.history.replace(location||this._block):this.replaceRoot();
    this._block = null;
    return true;
  }

  push(...args) {
    this.app.log.info('router push', args);
    this.history.push(this.getLocationInfo(...args));
    return true;
  }

  replace(...args) {
    this.app.log.info('router replace', args);
    this.history.replace(this.getLocationInfo(...args));
    return true;
  }

  back(step=1) {
    this.app.log.info('router back');
    this.history.go(-step);
    return true;
  }

  refresh() {
    this._clearError();
    this._updatePathInfos(this.history.location);
    return true;
  }

  pushRoot(...args) {
    this.push(['/', ...args]);
  }

  replaceRoot(...args) {
    this.replace(['/', ...args]);
  }
}

