import React, { cloneElement } from 'react';
import createHistory from 'history/createHashHistory';
import { join } from 'path';


/*
-1.lasy loader 
-2.page error
-3.no match
-4.navigator
-5.param,
-5.query
-6.page view
-7.embeds
8.block
9.goXXX
*/

let PageLoading = props=><div style={{padding: 8}}>loading...</div>;

let PageError = props=>{
  let { app, title, message } = props;

  return (
    <div style={{padding: 8}}>
      <div> error: <a style={{padding: 4}} onClick={()=>app.router.back()}>[back]</a> <a style={{padding: 4}} onClick={()=>app.router.replaceRoot()}>[home]</a> </div>
      <h3>{title}</h3>
      <hr/>
      <p>{message}</p>
    </div>
  )
}

class RouterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.errorItem;
    this.pageItems = [];
    this.viewItems = [];
  }

  _renderView({content:Component, props, options:{_id, isContentComponent}}) {
    let aprops = {
      ...isContentComponent?{}:Component.porps,
      ...props,
      key: _id,
    }
    return isContentComponent?<Component {...aprops} />:(typeof Component==='object'&&Component.type?cloneElement(Component, aprops):Component);
  }

  _renderPage({_id, _idParent, routeName, routePattern, route, params, query, active, focus, embed, viewItems, embeds}){
    Object.keys(embeds).forEach(v=>{
      embeds[v] = this._renderPage(embeds[v]);
    })
    let props = { app, key: _id, _id, route: { ...route,routeName, routePattern,  _idParent, params, query, active, focus, embed }, views: viewItems, embeds};

    if(route.loader){
      route.loader(app).then(v=>{
        Object.assign(route, v, {loader: null});
        this._handleRouterUpdate();
      })
      return <Router.PageLoading key={_id} />;
    }else if(typeof route.component==='function'){
      return <app.Page {...props} />;
    }else{
      return <Router.PageError key={_id} app={app} message="wrong component" />
    }
  }

  _getPathnameRouteInfo(pathname, routes) {
    let paths = pathname.split(':');
    let match = Object.entries(routes).find(([k,v])=>k.split(':')[0]===paths[0]);
    if(!match) return [];
    let items = match[0].split(':');
    let routeName = items[0];
    let routePattern = match;
    items = items.slice(1);
    paths = paths.slice(1);
    if(items.filter(v=>!v.endsWith('?')).length>paths.length) return [];
    items = items.map(v=>v.endsWith('?')?v.slice(0,-1):v);
    let route = match[1];

    let params = {};
    paths.forEach((path,i)=>{
      params[items[i]||i] = decodeURIComponent(path);
    })

    return { routeName, routePattern, params, route };
  }

  _getPathnameErrorInfo(pathname){
    if(pathname.startsWith('/error')){
      let paths = pathname.split(':');
      return {
        message: decodeURIComponent(paths[1]),
        title: decodeURIComponent(paths[2]),
        back: decodeURIComponent(paths[3]),
        data: decodeURIComponent(paths.slice(4)),
      }
    }
  }

  _update({errorItem, pageItems=[], viewItems=[]}={}) {
    let focusId = undefined;
    let focusViewItem = Array.from(viewItems).reverse().find(v=>v.options.isModal);
    let activePageItem = pageItems.slice(-1)[0];

    if(focusViewItem) focusId = focusViewItem.options._id;

    if(activePageItem) {
      activePageItem.active = true;
      Object.values(activePageItem.embeds).forEach(v=>v.active=true);
    }

    if(activePageItem && !focusId){
      let pageFocusViewItem = Array.from(activePageItem.viewItems).reverse().find(v=>v.options.isModal);
      if(pageFocusViewItem) {
        focusId = pageFocusViewItem.options.id;
      }else{
        activePageItem.focus = true;
        focusId = activePageItem._id; 
      }
    }


    this.props.app.router.setFocusId(focusId);
    this.setState({errorItem, pageItems, viewItems});
  }

  _handleRouterUpdate() {
    let app = this.props.app;
    let router = app.router;
    let history = router.history;

    // error
    let errorItem = this._getPathnameErrorInfo(history.location.pathname);
    if(errorItem || !Object.keys(router.getRoutes()).length) return this.setState({errorItem});

    // page
    let pathname = '';
    let pageItems = [];
    for (let v of history.location.pathnames) {
      let { routeName, routePattern, params, route } = this._getPathnameRouteInfo(v, router.getRoutes());
      if(!routeName){ app.render.panic(v, {title:'router nomatch'}); return; }

      let _id = '#'+join(pathname,routeName);
      let _idParent = '#'+pathname;
      let embeds = {};
      for (let [kk,vv] of Array.isArray(route.embeds)?route.embeds.map(v=>[v,v]):Object.entries(route.embeds||{})) {
        let { route:routeEmebed } = this._getPathnameRouteInfo(vv, router.getRoutes());
        if(!routeEmebed){ app.render.panic('router nomatch', vv); return; }
        let _idEmbed = _id+'|'+vv;
        let _idParentEmbed = _id;

        embeds[kk] = { 
          _id: _idEmbed, _idParent: _idParentEmbed, route: routeEmebed, params: {}, query: history.location.query, viewItems: router.getPageViews(_idEmbed).map(vvv=>({...vvv})), embeds: {}, 
        }
      }

      pageItems.push({ 
        _id, _idParent, routeName, routePattern, route, params, query: history.location.query, viewItems: router.getPageViews(_id).map(vv=>({...vv})), embeds
      });

      pathname = join(pathname,v);
    }

    // top view
    let viewItems = router.getNoPageViews().map(v=>({...v}));
    

    // update
    return this._update({pageItems, viewItems});
  }

  componentDidMount() {
    this.eventOffRouterUpdate = this.props.app.event.on(this.props.app._id, 'onRouterUpdate', ()=>this._handleRouterUpdate());
  }

  componentWillUnmount() {
    this.eventOffRouterUpdate();
  }

  render() {
    let {errorItem, pageItems=[], viewItems=[]} = this.state||{};
    return (
      <React.Fragment>
        {errorItem&&<Router.PageError app={this.props.app} {...errorItem}/>}
        {!errorItem&&pageItems.map(v=>this._renderPage(v))}
        {!errorItem&&viewItems.map(v=>this._renderView(v))}
      </React.Fragment>
    );
  }
}


export default class Router {
  // constructor
  // ----------------------------------------
  constructor(app) {
    this.app = app;
    this._routes = {};
    this._views = [];
    this._pages = {};
    this._viewIdNum = 0;
    this._historyStackCount = 0;
    this._focusId;

    this._initEvent();
    this._initHistory();
    this._initRoute();
  }

  _initEvent() {
    this.app.event.on(this.app._id, 'onPageAdd', (_id, page)=>{page&&!page.props.route.embed&&this._addPage(_id, page)});
    this.app.event.on(this.app._id, 'onPageRemove', (_id, page)=>{page&&!page.props.route.embed&&this._removePage(_id)});
    this.app.event.on(this.app._id, 'onAppStartRouter', ()=>(this.app.render.component = <Router.RouterComponent app={this.app} />));
    this.app.event.on(this.app._id, 'onAppStartRender', ()=>{this.update()});
  }

  _initHistory() {
    let handleLocationChange = (location, action)=>{
      this.app.log.info('router location', location);

      location.query = {};
      location.search && location.search.slice(1).split('&').forEach(v=>{
        let vs = v.split('=');
        location.query[vs[0]] =  vs[1];
      })

      let pathname = location.pathname;
      if(pathname[0]==='/') pathname=(pathname[1]===':'?'#':'#/')+pathname.slice(1);
      location.pathnames = pathname.split('/').filter(v=>v);
      location.pathnames[0]&&location.pathnames[0][0]==='#'&&(location.pathnames[0]='/'+location.pathnames[0].slice(1));

      if(action==='PUSH') this._historyStackCount++;
      if(action==='POP') this._historyStackCount = Math.max(--this._historyStackCount, 0);

      this.update();
    };

    this.history = createHistory();
    this.history.listen((location, action)=>handleLocationChange(location, action));
    handleLocationChange(this.history.location, this.history.action);
  }

  _initRoute() {
    this._genRouteMethod('/');
    this._genRouteMethod('/error');
  }

  
  // route
  // --------------------------------------
  setRoutes(routes) {
    this._routes = routes;
    Object.keys(routes||{}).forEach(v=>v&&this._genRouteMethod(v.split(':')[0]));
    this.update();
  }

  getRoutes() {
    return this._routes||{};
  }

  addRoute(name, route) {
    if(!name||!route) return;
    this._routes[name] = route;
    this._genRouteMethod(name.split(':')[0]);
    this.update();
  }

  update() {
    this.app.event.emit(this.app._id, 'onRouterUpdate');
  }

  _genRouteMethod(path) {
    if(!path) return;
    let name = path==='/'?'Root':this.app.utils.captilaze(path[0]==='/'?path.slice(1):path);
    this['push'+name] = (...args)=>this.push([path, ...args]);
    this['replace'+name] = (...args)=>this.replace([path, ...args]);
  }
  
  // focus
  // ---------------------------------------
  setFocusId(_id) {
    this.app.log.info('router focus', _id);
    this._focusId = _id;
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
    
    this.update();
    return options._id;
  }

  removeView(_id) {
    let index = this._views.findIndex(v=>v.options._id===_id);
    if(index<0) return;

    this._views[index].options.onRemove && this._views[index].options.onRemove();
    this._views.splice(index, 1);
    this.update();
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
    let pathnames = Array.from(this.history.location.pathnames);

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
  

  restore(location) {
    app.log.info('router restore');
    location||this.location?this.history.replace(location||this.location):this.replaceRoot();
  }

  push(...args) {
    app.log.info('router push', args);
    return this.history.push(this._getLocation(...args));
  }

  replace(...args) {
    app.log.info('router replace', args);
    return this.history.replace(this._getLocation(...args));
  }

  back(step=1) {
    app.log.info('router back');
    return this.history.go(-step);
  }
}


Router.RouterComponent = RouterComponent;
Router.PageLoading = PageLoading;
Router.PageError = PageError;