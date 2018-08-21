import React, { cloneElement } from 'react';
import createHistory from 'history/createHashHistory';
import { join } from 'path';


/*
-1.lasy loader 
-2.page error
-3.no match
-4.navigator
5.param,query
6.page view
7.embeds
8.block
9.goXXX
*/
let PageLoading = props=>{
  return (
    <div style={{padding: 8}}>loading...</div>
  )
}

let PageError = props=>{
  let { app, route:{params:{title, msg}={}}={} } = props;
  return (
    <div style={{padding: 8}}>
      <div> error: <a style={{padding: 4}} onClick={()=>app.router.back()}>[back]</a> <a style={{padding: 4}} onClick={()=>app.router.goRoot()}>[home]</a> </div>
      <div>{title}</div>
      <hr/>
      <p>{msg}</p>
    </div>
  )
}

class RouterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.pageItems = [];
    this.viewItems = [];
  }

  _handleRouterUpdate() {
    let app = this.props.app;
    let router = app.router;
    let history = router.history;
    let pageItems = [];
    let viewItems = [];
    let parentName = '';

    let getPageByName = pageName=>{
      for(let i of pageItems) {
        if(i.name===pageName) return i;
        if(i.embeds) for(let ii of i.embeds) {
          if(ii.name===pageName) return i;
        }
      }
    }

    let getRoute = pathname=>{
      let paths = pathname.split(':');
      let match = Object.entries(router.routes).find(([k,v])=>k.split(':')[0]===paths[0]);
      if(!match) return [];
      let items = match[0].split(':');
      let routeName = items[0];
      items = items.slice(1);
      paths = paths.slice(1);
      if(items.filter(v=>!v.endsWith('?')).length>paths.length) return [];
      items = items.map(v=>v.endsWith('?')?v.slice(0,-1):v);
      let route = match[1];

      let params = {};
      paths.forEach((path,i)=>{
        params[items[i]||i] = decodeURIComponent(path);
      })
      return { routeName, params, route };
    }
    
    // page
    ((history.location.pathname[1]===':'?'':'/')+history.location.pathname).split(/(?<!^)\//).filter(v=>v).forEach(v=>{
      let { routeName, params, route } = getRoute(v);
      if(!routeName){ 
        app.render.panic('router nomatch', v);
        return;
      }

      let embeds = {};
      Object.entries(route.embeds||{}).forEach(([kk,vv])=>{
        let { route:routeEmebed } = getRoute(vv);
        if(!routeEmebed){ app.render.panic('router nomatch', vv); return; }
        embeds[kk] = { 
          name: '#'+join(parentName,v)+'|'+vv, parentName: '#'+join(parentName,v), 
          route: routeEmebed, params: [], query: history.location.query, 
          embeds: {}, views: [] 
        }
      })

      pageItems.push({ 
        name: '#'+join(parentName,routeName), parentName: '#'+parentName, 
        route, params, query: history.location.query, viewItems: [], embeds
      });

      parentName = join(parentName,v);
    })

    // view
    Object.entries(router.views||{})
    .forEach(([id, {content={}, options={}}])=>{
      let item = { id, content, options };
      let pageName = options.$pageName;
      if(pageName){
        let page = getPageByName(pageName);
        if(page) page.viewItems.push(item);
      }else{
        viewItems.push(item);
      }
    });

    // focus
    let focusView = viewItems.find(v=>v.options.$isModal)
    if(focusView) {
      focusView.options.$focus = true;
      router.focusName = focusView.id;
    }
    let activePage = pageItems.slice(-1)[0];
    if(activePage) {
      activePage.active = true;
      if(!focusView){
        let pageFocusView = Array.from(activePage.viewItems).reverse().find(v=>v.options.$isModal);
        if(pageFocusView) {
          pageFocusView.options.$focus = true;
          router.focusName = pageFocusView.id;
        }else{
          activePage.focus = true;
          Object.values(activePage.embeds).forEach(v=>v.active=true);
          router.focusName = activePage.name; 
        }
      }
    }

    // update
    this.pageItems = pageItems;
    this.viewItems = viewItems;
    return this.forceUpdate();
  }

  componentDidMount() {
    this.eventOffRouterUpdate = this.props.app.event.on(this.props.app, 'onRouterUpdate', ()=>this._handleRouterUpdate());
  }

  componentWillUnmount() {
    this.eventOffRouterUpdate();
  }

  render() {
    let app = this.props.app;

    let renderPage = ({name, parentName, route, params, query, active, focus, embed, viewItems, embeds})=>{
      Object.keys(embeds).forEach(v=>{
        embeds[v] = renderPage(embeds[v]);
      })
      let props = { app, key: name, name, route: { ...route, parentName, params, query, active, focus, embed }, views: viewItems, embeds};

      if(route.loader){
        route.loader(app).then(v=>{
          Object.assign(route, v, {loader: null});
          this._handleRouterUpdate();
        })
        return <Router.PageLoading key={name} />;
      }else if(typeof route.component==='function'){
        return <app.Page key={name} {...props} />;
      }else{
        return <Router.PageError message="wrong component" />
      }
    }

    return (
      <React.Fragment>
        {this.pageItems.map(v=>renderPage(v))}
        {this.viewItems.map(({id, content:Component, options:{$pageName, $isContentComponent, $id, $isModal, $isRef, $focus, $onAdd, $onRemove, ...restOptions}={}})=>{
          let props = {
            ...$isContentComponent?{}:Component.porps,
            ...restOptions,
            key: id,
            ['data-bn-app']: app,
            ['data-bn-id']: id,
            ['data-bn-page-name']: $pageName,
          }
          return $isContentComponent?<Component {...props} />:(typeof Component==='object'&&Component.type?cloneElement(Component, props):Component);
        })}
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
    this.views = {};
    this._pages = {};
    this._viewIdNum = 0;
    this._historyStackCount = 0;
    this.focusName;

    this.history = createHistory();
    this.unlisten = this.history.listen((location, action)=>{
      app.log.info('router location', location);
      location.query = {};
      if(location.search) {
        location.search.slice(1).split('&').forEach(v=>{
          let vs = v.split('=');
          location.query[vs[0]] =  vs[1];
        })
      }
      if(action==='PUSH') this._historyStackCount++;
      if(action==='POP') this._historyStackCount = Math.max(--this._historyStackCount, 0);
      this.update();
    });
    this.app.event.on(this.app, 'onAppStartRender', ()=>{
      this.update();
    });
    this.app.event.on(this.app, 'onPageAdd', (name, page)=>{page&&!page.props.route.embed&&this._addPage(name, page)});
    this.app.event.on(this.app, 'onPageRemove', (name, page)=>{page&&!page.props.route.embed&&this._removePage(name)});
    this.app.event.on(this.app, 'onAppStartRouter', ()=>(this.app.render.component = <Router.RouterComponent app={this.app} />));
  }

  update() {
    this.app.event.emit(this.app, 'onRouterUpdate');
  }

  set routes(routes) {
    this._routes = {
      ...{'err:msg?:title?': {name: 'err', component: Router.PageError}},
      ...routes
    };
    this[`goErr`] = (msg, title, options)=>this.push(['/err', app.utils.message2String(msg), app.utils.message2String(title)]);
  }

  get routes() {
    return this._routes;
  }
  

  // pages
  // ---------------------------------------
  _addPage(name, page) {
    this._pages[name] = page;
  }
  
  _removePage(name) {
    let page = this.getPage(name);
    if(page) {
      Object.entries(this.views).forEach(([id, {options:{$pageName}}])=>$pageName===name&&this.removeView(id));
      delete this._pages[page.name];
    }
  }

  getPage(name) {
    if(typeof name === 'string') {
      return this._pages[name];
    } else if(typeof name === 'number') {
      return this._pages[Object.keys(this._pages)[name]];
    } else if(name===undefined){
      let keys = Object.keys(this._pages);
      return this._pages[keys[keys.length-1]];
    }
  }

  // views 
  // ----------------------------------------
  getViewId(options={}) {
    return options.$id || `${++this._viewIdNum}@${options.$pageName?options.$pageName:'#'}`;
  }

  addView(content, options={}) {
    if(!content) return;
    options.$id = this.getViewId(options);
    this.views[options.$id] = { content, options, $id: options.$id };
    options.$onAdd && options.$onAdd(options.$id);
    this.update();
    return options.$id;
  }

  removeView($id) {
    let { options={} } = this.getView($id);
    options.$onRemove && options.$onRemove(options.$id);
    delete this.views[$id];
    this.update();
  }

  getView($id) {
    return this.views[$id];
  }

  // router navigator
  // ----------------------------------------
  _getLocation(...args) {
    let location = this.history.location;
    let passQuery;
    let query = {};
    let paths = ((location.pathname[1]===':'?'':'/')+location.pathname).split(/(?<!^)\//).filter(v=>v);

    let addPath = path=>{
      path.split('/').forEach(v=>{
        if(v==='') {
          paths = ['/'];
        } else if(path==='..') {
          paths = paths.slice(0, -1);
        } else {
          paths.push(v);
        }
      });
    }

    args.forEach(arg=>{
      let type = typeof arg;
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
      pathname: paths.map((v,i)=>i===0&&v==='/'?'':v).join('/'),
      search: '?'+Object.entries(passQuery?{...location.query, ...query}:query).map(([k,v])=>k+'='+v).reduce((v1,v2)=>v1+'&'+v2,''),
    };
  }
  

  restore(location) {
    app.log.info('router restore');
    location||this.location?this.history.replace(location||this.location):this.goRoot();
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

  goRoot(replace) {
    let pathinfo = '/';
    replace?this.replace(pathinfo):this.push(pathinfo);
  }
}


Router.RouterComponent = RouterComponent;
Router.PageLoading = PageLoading;
Router.PageError = PageError;