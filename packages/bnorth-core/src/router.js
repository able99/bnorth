import React, { cloneElement } from 'react';
import createHistory from 'history/createHashHistory';
import { join } from 'path';


/*
-1.lasy loader 
-2.page error
-3.no match
4.navigator
5.param,query
6.page view
7.embeds
*/
let PageLoading = props=>{
  return (
    <div style={{padding: 8}}>loading...</div>
  )
}

let PageError = props=>{
  let { app, match:{params:{title, msg}={}}={} } = props;
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
        params[items[i]||i] = encodeURIComponent(path);
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

      let embeds = [];
      (route.embeds||[]).forEach(vv=>{
        if(!router.routes[vv]){ 
          app.render.panic('router nomatch', vv);
          return;
        }
        embeds.push({ 
          name: '#'+join(parentName,v)+'|'+vv, parentName: '#'+join(parentName,v), 
          route: router.routes[vv], params: [], active: true,  embed,
          views: [] 
        });
      })

      pageItems.push({ 
        name: '#'+join(parentName,routeName), parentName: '#'+parentName, 
        route, params, viewItems: [], embeds 
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
    if(focusView) focusView.options.$focus = true;
    let activePage = pageItems.slice(-1)[0];
    if(activePage) {
      activePage.active = true;
      if(!focusView){
        let pageFocusView = Array.from(activePage.viewItems).reverse().find(v=>v.options.$isModal);
        if(pageFocusView) {
          pageFocusView.options.$focus = true;
        }else{
          activePage.focus = true;
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

    return (
      <React.Fragment>
        {this.pageItems.map(({name, parentName, route, params, active, focus, embed, viewItems, embeds})=>{
          let props = { app, key: name, name, route: { ...route, parentName, params, active, focus, embed }, views: viewItems, embeds};
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
        })}
        {this.viewItems.map(({id, content:Component, options:{$pageName, $isContentComponent, $isModal, $isRef, $focus, ...restOptions}={}})=>{
          let props = {
            ...$isContentComponent?{}:Component.porps,
            ...restOptions,
            key: id,
            ['data-app']: app,
            ['data-view-$id']: id,
            ['data-$pageName']: $pageName,
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
    this._historyStackCount = 0,

    this.history = createHistory();
    this.unlisten = this.history.listen((location, action)=>{
      app.log.info('router location', location);
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
      ...{'err': {name: 'err', component: Router.PageError}},
      ...routes
    };
    this[`goErr`] = (msg, title, options)=>this.push('/err', app.utils.message2String(msg), app.utils.message2String(title));
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
  addView(content, options={}) {
    if(!content) return;
    options.$id = options.$id || `${++this._viewIdNum}@${options.$pageName?options.$pageName:'#'}`;
    this.views[options.$id] = { content, options, $id: options.$id };
    this.update();
    return options.$id;
  }

  removeView($id) {
    delete this.views[$id];
    this.update();
  }

  getView($id) {
    return this.views[$id];
  }

  // router navigator
  // ----------------------------------------
  _pathinfoParse(...args) {
    let pathinfo = {};
    let pathnames = [];
    let query = {};
    let hash = [];

    args.forEach(v=>{
      if(typeof v === 'object') {
        if(v.pathname) pathnames.push(v.pathname);
        if(v.query) query = {...query, ...v.query};
        if(v.hash) hash = [...hash, ...v.hash];
        pathinfo = {...pathinfo, v}
      }else {
        pathnames.push(String(v));
      }
    });

    pathinfo.pathname = undefined;
    pathinfo.search = undefined;
    pathinfo.hash = undefined;
    return [pathinfo, pathnames, query, hash];
  }

  _pathinfoTrans([pathinfo, pathnames, query, hash]) {
    let prevPathname;
    let upCount = pathnames.filter(v=>v==='..').length;
    if(pathnames.find(v=>v.startsWith('/')||v.startsWith('http'))){
      prevPathname = '';
    }else{
      let pages = Object.values(this.app.router.pages);
      let lastPage = pages.slice(upCount?-upCount:-1)[0];
      prevPathname = lastPage&&lastPage.match.url||'';
    }
    
    let pathname = pathinfo.pathname || join(prevPathname,...pathnames);
    let search = pathinfo.pathname || Object.entries(query).map(([k,v])=>k+'='+v).join('&');
    hash = pathinfo.hash || hash.join();
    let key = pathinfo.key;
    let state = pathinfo.state;
    return { pathname, search, hash, key, state };
  }

  restore(location) {
    app.log.info('router restore');
    location||this.location?this.history.replace(location||this.location):this.goRoot();
  }

  push(...args) {
    app.log.info('router push');
    return this.history.push(this._pathinfoTrans(this._pathinfoParse(...args)))
  }

  replace(...args) {
    app.log.info('router replace');
    return this.history.replace(this._pathinfoTrans(this._pathinfoParse(...args)))
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