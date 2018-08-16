import React, { cloneElement } from 'react';
import createHistory from 'history/createHashHistory';
import { join } from 'path';


class RouterComponent extends React.Component {
  _handleRouterUpdate() {
    console.log('_handleRouterUpdate');
    let app = this.props.app;
    let router = app.router;
    let history = router.history;
    let routes = router.routes;
    let { pathname } = history.location;
    let pathRoutes = [];
    let pages = [];
    let Page = app.Page;
    let View = app.View;
    let views = [];
    let parentName = '';
    

    // view
    // -----------
    Object.entries(router.views||{}).forEach(([k, {content, options={}}],i,a)=>{
      let last = i>=a.length-1;
      
      let view = (
        <View
          {...options}
          app={app} key={k}>
          {content}
        </View>
      )

      views.push(view);
    });
    

    // page
    // -----------
    ['/', ...pathname.split('/').filter(v=>v)].forEach(v=>{
      if(v.startsWith('$')){
        let pathRoute = pathRoutes[pathRoutes.length-1];
        if(pathRoute&&pathRoute.params) pathRoute.params.push(v.slice(1));
      }else{
        pathRoutes.push({
          name: v,
          params: [],
        })
      }
    })

    pathRoutes.forEach((v, i, a)=>{
      let route = routes[v.name];
      if(!route){
        return;
      }

      let last = i>=a.length-1;
      let key = join(parentName, v.name);
      let pname = '#'+key;
      parentName = key;
      let ppathname = v;

      let views = [];//this.renderViews(key);
      let embeds = [];

      let page = (
        <Page
          name={pname} 
          route={route} 
          active={last}
          match={{
            active: last,
          }}
          views={views}
          app={app} key={pname}>
          {embeds}
        </Page>
      );

      pages.push(page);
    });

    
    this.views = views;
    this.pages = pages;
    this.forceUpdate();
  }

  componentDidMount() {
    this.eventOffRouterUpdate = this.props.app.event.on(this.props.app, 'onRouterUpdate', ()=>this._handleRouterUpdate());
  }

  componentWillUnmount() {
    this.eventOffRouterUpdate();
  }

  render() {
    return <React.Fragment>{this.pages}{this.views}</React.Fragment>
  }
}


export default class Router {
  // constructor
  // ----------------------------------------
  constructor(app) {
    this.app = app;
    this.routes = {};
    this.views = {};
    this._pages = {};
    this._views = {};
    this._viewRefNum = 0;
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
    this.app.event.on(this.app, 'onPageAdd', (name, page)=>page&&!page.props.embed&&this._addPage(name, page));
    this.app.event.on(this.app, 'onPageRemove', (name, page)=>page&&!page.props.embed&&this._removePage(name));
    this.app.event.on(this.app, 'onAppStartRouter', ()=>(this.app.render.component = <RouterComponent app={this.app} />));
  }

  update() {
    this.app.event.emit(this.app, 'onRouterUpdate');
  }
  

  // pages
  // ---------------------------------------
  _addPage(name, page) {
    this._pages[name] = page;
  }
  
  _removePage(name) {
    let page = this.getPage(name);
    if(page) {
      this.removePageViews(page.name);
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
    let { page, $ref:ref } = options;
    ref = ref || `${++this._viewRefNum}@${page?page.name:'#'}`;
    options.$ref = ref;
    this.views[ref] = { content, options };
    this.update();
    return ref;
  }

  removeView(ref) {
    delete this.views[ref];
    this.update();
  }

  getView(ref) {
    return this.views[ref];
    this.update();
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
