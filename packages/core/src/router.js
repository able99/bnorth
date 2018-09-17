import React, { cloneElement } from 'react';
import createHistory from 'history/createHashHistory';
import { join } from 'path';


let PageLoading = props=>{
  return (
    <div style={{padding: 8}}>loading...</div>
  )
}

let PageError = props=>{
  let { app, data } = props;
  return ( 
    <div style={{padding: 8}}> 
      <div> 
        <span>error</span> 
        <a style={{padding: 4}} onClick={()=>app.router.back()}>[back]</a> 
        <a style={{padding: 4}} onClick={()=>app.router.replaceRoot()}>[home]</a> 
      </div> 
      <h3>{data.errorRoute?data.errorRoute:data.params[1]}</h3> 
      <hr/> 
      <p>{data.errorRoute?data.name:data.params[0]}</p> 
    </div>
  )
}

class RouterComponent extends React.Component {
  componentDidMount() {
    this.eventOffRouterUpdate = this.props.app.event.on(this.props.app._id, 'onRouterUpdate', ()=>this.forceUpdate());
  }

  componentWillUnmount() {
    this.eventOffRouterUpdate();
  }

  _renderPage({
    _id, _idParent, 
    paramObj, query, embed, viewItems, embeds,
    routeName, route, 
  }, activeId, focusId){
    let embedsPage = {};
    Object.entries(embeds).map(([k,v])=>embedsPage[k]=this._renderPage(v, activeId, focusId));

    let props = { 
      app: this.props.app, key: _id, _id, 
      route: { ...route,routeName,  _idParent, params: paramObj, query, active: embed?_idParent===activeId:_id===activeId, focus, embed }, 
      views: viewItems, embeds: embedsPage,
    };

    if(route.loader){
      route.loader(app).then(v=>{
        Object.assign(route, v, {loader: null});
        this._handleRouterUpdate();
      })
      return <Router.PageLoading key={_id} />;
    }else if(typeof route.component==='function'){
      return <app.Page {...props} />;
    }else{
      return <Router.PageError key={_id} app={app} data={{errorRoute: "wrong component"}} />
    }
  }

  _renderView({content:Component, props, options:{_id, isContentComponent}}) {
    let aprops = { ...isContentComponent?{}:Component.porps, ...props, key: _id };
    return isContentComponent?<Component {...aprops} />:(typeof Component==='object'&&Component.type?cloneElement(Component, aprops):Component);
  }

  render() {
    let {_pathinfos, _errorInfo, _activeId, _focusId} = this.props.app.router;
    let viewItems = this.props.app.router.getNoPageViews().map(v=>({...v}));
    
    if(!_errorInfo) {
      return (
        <React.Fragment>
          {_pathinfos.map(v=>this._renderPage(v, _activeId, _focusId))}
          {viewItems.map(v=>this._renderView(v, _activeId, _focusId))}
        </React.Fragment>
      );
    }else{
      return <Router.PageError app={this.props.app} data={_errorInfo} />;
    }
  }
}


export default class Router {
  // constructor
  // ----------------------------------------
  constructor(app) {
    this.app = app;
    this._id = app._id+'.router';
    this._routes = {};
    this._views = [];
    this._pages = {};
    this._pathinfos = [];
    this._errorInfo;
    this._activeId;
    this._focusId;
    this._blockLocation;
    this._viewIdNum = 0;
    this._historyStackCount = 0;

    this.app.event.on(this.app._id, 'onPageAdd', (_id, page)=>{page&&this._addPage(_id, page)}, this._id);
    this.app.event.on(this.app._id, 'onPageRemove', (_id, page)=>{page&&this._removePage(_id)}, this._id);
    this.app.event.on(this.app._id, 'onAppStartRouter', ()=>(this.app.render.component = <Router.RouterComponent app={this.app} />), this._id);
    this.app.event.on(this.app._id, 'onAppStartRender', ()=>{this._updateRender()}, this._id);

    this._initHistory();
    this._initRoute();
  }

  destructor() {
    this.app.event.off(this._id);
  }

  _updateRender() {
    this.app.event.emit(this.app._id, 'onRouterUpdate');
  }

  // route
  // --------------------------------------
  _initHistory() {
    let handleLocationChange = (location, action)=>{
      this.app.log.info('router location', location);
      this._updateQuerys(location);
      this._updateStack(action, location);
      this._updatePathInfos(location);
    };

    this.history = createHistory();
    this.history.listen((location, action)=>handleLocationChange(location, action));
    handleLocationChange(this.history.location, this.history.action);
  }

  _updateStack(action, location) {
    if(action==='PUSH') this._historyStackCount++;
    if(action==='POP') this._historyStackCount = Math.max(--this._historyStackCount, 0);
  }
  
  getStackCount() {
    return this._historyStackCount;
  }

  isRootPath() {
    return app.router._pathinfos[app.router._pathinfos.length-1].name==='/';
  }

  _updateQuerys(location) {
    location.query = {};
    location.search && location.search.slice(1).split('&').forEach(v=>{
      let vs = v.split('=');
      location.query[vs[0]] = vs[1];
    })
  }

  async _updatePathInfos(location) {
    if(!Object.keys(this.getRoutes()).length) return;
    let pathname = location.pathname;
    let spe = '/';
    let paramSpe = ':';
    let subPageSpe = '|';
    let paramOptional = '?';
    let errorTag = '/error';
    let pageSign = '#';
    let pos = 0;
    let pathinfos = [];
    let errorInfo = null;
    let focusId = undefined;
    let activeId = undefined;

    /* pathname parse*/
    while(pos<pathname.length-1) {
      let index = pathname.indexOf(spe, pos+1);
      index = index>=0?index:pathname.length;
      let sub = pathname.slice(pos+1, index);

      if(pos===0&&(sub[0]===paramSpe||(spe+sub).startsWith(errorTag)||this.getRoute(spe+sub.split(paramSpe)[0]).length)) {
        pathinfos.push(spe+sub);
      }else if(pos===0){
        pathinfos.push(spe);
        pathinfos.push(sub);
      }else {
        pathinfos.push(sub);
      }

      pos = index;
    }
    if(!pathinfos.length) pathinfos.push(spe);

    /* route */
    let fullPath = '';
    pathinfos = pathinfos.map((v,i,r)=>{
      let vs = v.split(paramSpe);

      let aFullPath = join(fullPath, v);
      let _id = pageSign+aFullPath;
      let ret = { 
        name: vs[0], params: vs.slice(1), path: v, fullPath: aFullPath, 
        _id, _idParent: pageSign+fullPath, 
        embeds: {}, paramObj: {}, query: location.query, viewInfos: this.getPageViews(_id),
      };
      fullPath = ret.fullPath;

      let [routeName, route] = this.getRoute(ret.name);
      if(ret.name===errorTag) {
        ret.errorPage = true;
        !errorInfo&&(errorInfo=ret);
        return;
      }else{
        ret.routeName = routeName;
        ret.route = route;
        if(!ret.routeName||!ret.route) { ret.errorRoute = 'no route'; !errorInfo&&(errorInfo=ret); return ret }
      }

      (Array.isArray(route.embeds)?route.embeds.map(vv=>[vv,vv]):Object.entries(route.embeds||{})).map(([kk,vv])=>{
        let _idEmbed = ret._id+subPageSpe+vv;
        let retEmbed = { 
          name: vv, params: ret.params, path: ret.path, fullPath: ret.fullPath, 
          _id: _idEmbed, _idParent: ret._id, 
          embed: true, embeds: {}, paramObj: ret.paramObj, query: ret.query, viewInfos: this.getPageViews(_idEmbed),
        };

        let [routeNameEmbed, routeEmbed] = this.getRoute(retEmbed.name);
        retEmbed.routeName = routeNameEmbed;
        retEmbed.route = routeEmbed;
        if(!retEmbed.routeName||!retEmbed.route) {retEmbed.errorRoute = 'no route';!errorInfo&&(errorInfo=ret)} 

        ret.embeds[kk] = retEmbed;
      });

      let routeParams = routeName.split(paramSpe).slice(1);
      if(routeParams.filter(vv=>!vv.endsWith(paramOptional)).length>ret.params.length) { 
        ret.errorRoute = 'miss require param'; 
        !errorInfo&&(errorInfo=ret);
      }else{
        ret.params.forEach((vv,ii)=>{
          let name = routeParams[ii]?(routeParams[ii].endsWith(paramOptional)?routeParams[ii].slice(0,-1):routeParams[ii]):ii;
          ret.paramObj[name] = decodeURIComponent(vv);
        })
      }

      return ret;
    });

    /* active & focus */
    let viewItems = this.getNoPageViews();
    let focusViewItem = Array.from(viewItems).reverse().find(v=>v.options.isModal);
    let activePageItem = pathinfos.slice(-1)[0];
    if(focusViewItem) focusId = focusViewItem.options._id;
    if(activePageItem) activeId = activePageItem._id;
    if(activePageItem && !focusId){
      let pageFocusViewItem = activePageItem.viewItems&&Array.from(activePageItem.viewItems).reverse().find(v=>v.options.isModal);
      if(pageFocusViewItem) {
        focusId = pageFocusViewItem.options.id;
      }else{
        focusId = activePageItem._id;
      }
    }


    for(let pathinfo of pathinfos) {
      let blockInfo = await this.app.event.emitSync(this.app._id, 'onRouteMatch', pathinfo, location);
      if(blockInfo) return this.block(blockInfo);
    }
    this._focusId = focusId;
    this._activeId = activeId;
    this._pathinfos = pathinfos;
    this._errorInfo = errorInfo;
    this._updateRender();
  }

  _initRoute() {
    this._genRouteMethod('/');
    this._genRouteMethod('/error');
  }

  _genRouteMethod(path) {
    if(!path) return;
    let name = path==='/'?'Root':this.app.utils.captilaze(path[0]==='/'?path.slice(1):path);
    this['push'+name] = (...args)=>this.push([path, ...args]);
    this['replace'+name] = (...args)=>this.replace([path, ...args]);
  }

  setRoutes(routes) {
    this._routes = routes;
    Object.keys(routes||{}).forEach(v=>v&&this._genRouteMethod(v.split(':')[0]));
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
    this._genRouteMethod(name.split(':')[0]);
    this._updatePathInfos(this.history.location);
  }

  isFocus(_id) {
    return this._focusId === _id;
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
    this.getPageViews(_id).forEach(v=>this.removeView(v._id))
  }

  // router navigator
  // ----------------------------------------
  _getLocation(...args) {
    let passQuery;
    let query = {};
    let pathnames = this._pathinfos.map(v=>v.path);

    let addPath = path=>{
      path.split('/').forEach(v=>{
        if(v==='') {
          pathnames = ['/'];
        } else if(path==='..') {
          pathnames = pathnames.slice(0, -1);
        } else {
          pathnames.push(v);
        }
      });
    }

    args.forEach(arg=>{
      if(Array.isArray(arg)) {
        addPath(arg.map((v,i)=>i?encodeURIComponent(v):v).join(':'));
      }else if(typeof arg==='object') {
        if(arg.query) query = {...query, ...arg.query}
        if(arg.passQuery!==undefined) passQuery = arg.passQuery;
      }else {
        addPath(String(arg));
      }
    })

    //pathname, search, hash, key, state
    return {
      pathname: pathnames.map((v,i,a)=>i===0&&v==='/'&&a.length>1?'':v).join('/'),
      search: '?'+Object.entries(passQuery?{...location.query, ...query}:query).map(([k,v])=>k+'='+v).reduce((v1,v2)=>v1+'&'+v2,''),
    };
  }
  

  block(blockInfo) {
    app.log.info('router block', blockInfo);
    this._blockLocation = this.history.location;
    if(typeof blockInfo==='function') blockInfo(this.app);
    return true;
  }

  restore(location) {
    app.log.info('router restore', location);
    location||this._blockLocation?this.history.replace(location||this._blockLocation):this.replaceRoot();
    this._blockLocation = null;
    return true;
  }

  push(...args) {
    app.log.info('router push', args);
    this.history.push(this._getLocation(...args));
    return true;
  }

  replace(...args) {
    app.log.info('router replace', args);
    this.history.replace(this._getLocation(...args));
    return true;
  }

  back(step=1) {
    app.log.info('router back');
    this.history.go(-step);
    return true;
  }

  refresh() {
    this._updatePathInfos(this.history.location);
    return true;
  }
}


Router.RouterComponent = RouterComponent;
Router.PageLoading = PageLoading;
Router.PageError = PageError;