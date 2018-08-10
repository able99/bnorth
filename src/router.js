import React, { cloneElement } from 'react';
import createHistory from 'history/createHashHistory';
import pathToRegexp from "path-to-regexp";
import { join } from 'path';


const patternCache = {};
const cacheLimit = 10000;
let cacheCount = 0;

const compilePath = (pattern, options) => {
  const cacheKey = `${options.end}${options.strict}${options.sensitive}`;
  const cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});

  if (cache[pattern]) return cache[pattern];

  const keys = [];
  const re = pathToRegexp(pattern, keys, options);
  const compiledPattern = { re, keys };

  if (cacheCount < cacheLimit) {
    cache[pattern] = compiledPattern;
    cacheCount++;
  }

  return compiledPattern;
};

const matchPath = (pathname, options = {}, parent) => {
  if (typeof options === "string") options = { path: options };

  const { path, exact = false, strict = false, sensitive = false } = options;

  if (path == null) return parent;

  const { re, keys } = compilePath(path, { end: exact, strict, sensitive });
  const match = re.exec(pathname);

  if (!match) return null;

  const [url, ...values] = match;
  const isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path, // the path pattern used to match
    url: path === "/" && url === "" ? "/" : url, // the matched portion of the URL
    isExact, // whether or not we matched exactly
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {})
  };
};


class PageLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.route||{};
  }

  componentDidMount() {
    let { dcomponent, dcontroller } = this.state;
    if(typeof dcomponent === 'function') {
      dcomponent().then(v=>this.setState({component: v, dcomponent: undefined}));
    }
    if(typeof dcontroller === 'function') {
      dcontroller().then(v=>this.setState({controller: v, dcontroller: undefined}));
    }
  }

  render() {
    let { children, ...props } = this.props;
    let { dcomponent, dcontroller, ...route } = this.state;
    
    return (dcomponent||dcontroller)
      ?(<div>...</div>)
      :cloneElement( children, {
        ...children&&children.props,
        ...props,
        route,route:props.route/* TODO: dynamic*/,
      });
  }
}

class RouterComponent extends React.Component {
  componentDidMount() {
    this.eventOffRouterComponentUpdate = this.props.app.event.on(this.props.app, 'onRouterComponentUpdate', (pages, views)=>{
      this.pages = pages;
      this.views = views;
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.eventOffRouterComponentUpdate();
  }

  render() {
    return <React.Fragment>{this.pages}{this.views}</React.Fragment>
  }
}

let PageError = props=>{
  let { app, match:{params:{title, msg}={}}={} } = props;
  return (
    <div style={{padding: 8}}>
      <h3>出错啦:{title}</h3>
      <hr/>
      <a style={{padding: 4}} onClick={()=>app.router.back()}>回前页</a>
      <a style={{padding: 4}} onClick={()=>app.router.goRoot()}>回首页</a>
      <hr/>
      <p>{msg}</p>
    </div>
  )
}

export default class Router {
  // constructor
  // ----------------------------------------
  constructor(app) {
    this.app = app;
    this._routes;
    this.routes = {};
    this.pages = {};
    this.views = {};
    this._viewRef = 0;
    this.focusRef;
    this.historyStackCount = 0,

    this.history = createHistory();
    this.unlisten = this.history.listen((location, action)=>{
      app.log.info('router location', location);
      if(action==='PUSH') this.historyStackCount++;
      if(action==='POP') this.historyStackCount = Math.max(--this.historyStackCount, 0);
      this._handleLocationRouterUpdate();
    });
    this.app.event.on(this.app, 'onAppStartRender', ()=>this._handleLocationRouterUpdate());
    this.app.event.on(this.app, 'onPageAdd', (name, page)=>page&&!page.props.embed&&this.addPage(name, page));
    this.app.event.on(this.app, 'onPageRemove', (name, page)=>page&&!page.props.embed&&this.removePage(name));
    this.app.event.on(this.app, 'onAppStartRouter', ()=>(this.app.render.component = <RouterComponent app={this.app} />));
  }

  // routes
  // ----------------------------------------
  setRoutes(routes, render) {
    app.log.info('router routes', routes);
    if(!routes) return;

    let hasErrorRoute;
    let parseRoutes = (routes, parentName)=>{
      Object.entries(routes||{}).forEach(([k,v])=>{
        let name = v.name&&(v.name===true?k:v.name);
        let pathname = join(parentName, k);
        if(name) this[`go${app.utils.captilaze(name)}`] = replace=>replace?this.replace(pathname):this.push(pathname);
        if(name==='err') hasErrorRoute = true;
        if(v.routes&&typeof v.routes==='object') parseRoutes(v.routes, pathname);
      })
    }
    parseRoutes(routes, '');

    if(!hasErrorRoute) {
      this._routes = {
        ...{ '/err/:msg?/:title?': { name: 'err', component: Router.PageError, } },
        ...routes
      };
      this[`goErr`] = (msg, title, options)=>this.push('/err', app.utils.message2String(msg), app.utils.message2String(title));
    }else{
      this._routes = routes;
    }
    

    render && this.app.event.emit(this.app, 'onRouterComponentUpdate', ret, this.renderViews());
  }

  async _handleLocationRouterUpdate(aroutes) {
    if(aroutes) this._routes = aroutes;
    let { pathname } = this.history.location;
    let routes = this._routes||{};
    let ret = [];
    let parent = '';
    let params = {};
    this.focusRef = undefined;
    

    while(pathname!==parent) {
      let isMatch;

      if(typeof routes === 'string') routes = this.app.utils.pathGet(this._routes, routes.split('|').reduce((v1,v2)=>`${v1}[${'"'+v2+'"'}].routes`,''));
      if(typeof routes !== 'object') routes={};

      for(let [k,v] of Object.entries(routes)) {
        if(k.includes(':')&&v.routes){
          for(let [kk,vv] of Object.entries(v.routes)) {
            let tmpK = k.slice(0, k.indexOf(':'));
            if(matchPath(pathname, {path: join(parent, tmpK, kk)})){ k =  tmpK; break; }
          }
        }
        let key = join(parent,k);
        let pathinfo = matchPath(pathname, {path: key});
        if(!pathinfo) continue;
        params = {...params, ...pathinfo.params};
        let match = {params, url: pathinfo.url};

        let redirect = (v.onEnter&&v.onEnter(key, v, match)) || await this.app.event.emitSync(this.app, 'onRouterEnter', key, v, match);
        if(redirect) {
          this.location = this.history.location;
          (typeof(redirect)==='function')?redirect():this.history.replace(redirect);
          return;
        }

        let pageViews = this.renderViews(key);

        let embeds = Object.entries(v.embeds||{}).map(([kk,vv])=>{
          let embedKey = key + kk;
          return (
            <this.app.Page 
              app={this.app} key={embedKey} name={'#'+embedKey} embed={kk}
              route={{...vv, ...{name:vv.name||kk, pathname: key}}} 
              match={match}
              views={this.renderViews(embedKey)}/>
          );
        });

        let page = (
          <PageLoader app={this.app} key={key} name={'#'+key} 
            route={{...v, ...{name:v.name||k, pathname: key}}} 
            match={match}
            views={pageViews}>
            <this.app.Page>{embeds}</this.app.Page>
          </PageLoader>
        );

        ret.push(page);
        parent = pathinfo.url;
        isMatch = true;
        routes = v.routes||{};
        break;
      }

      if(!isMatch&&this.history.location.pathname!=='/') {
        this.app.log.error('router nomatch', pathname);
        this.goRoot(true);
        break;
      }
    }


    let views = this.renderViews();
    let viewModal = views.reverse().find(v=>v&&v.props['data-bnorth-modal']);
    let activePage = ret[ret.length-1];
    let activePageViews = activePage?activePage.props.views:[];
    let activePageViewsModal = activePageViews.reverse().find(v=>v&&v.props['data-bnorth-modal']);

    if(viewModal) {
      for(let i in views) if(views[i]===viewModal) {
        views[i] = cloneElement(viewModal, {'data-bnorth-focus': true});
        this.focusRef = {viewName:views[i].props['data-bnorth-viewname'], pageName:views[i].props['data-bnorth-pagename']};
        break;
      }
    }else if(activePageViewsModal){
      for(let i in activePageViews) if(activePageViews[i]===activePageViewsModal) {
        activePageViews[i] = cloneElement(activePageViewsModal, {'data-bnorth-focus': true});
        this.focusRef = {viewName:activePageViews[i].props['data-bnorth-viewname'], pageName:activePageViews[i].props['data-bnorth-pagename']};
        break;
      }
    }
    
    if(activePage){
      ret[ret.length-1] = cloneElement(activePage, {
        active: true,
        focus: !viewModal && !activePageViewsModal,
      });
      if(!this.focusRef) this.focusRef = {pageName: ret[ret.length-1].props.name};
    }


    this.app.event.emit(this.app, 'onRouterComponentUpdate', ret, views);
  }

  // pages
  // ----------------------------------------
  addPage(name, page) {
    this.pages[name] = page;
  }

  removePage(name) {
    let page = this.getPage(name);
    if(page) {
      this.removePageViews(page.name);
      delete this.pages[page.name];
    }
  }

  getPage(name) {
    if(typeof name === 'string') {
      return this.pages[name];
    } else if(typeof name === 'number') {
      return this.pages[Object.keys(this.pages)[name]];
    } else if(name===undefined){
      let keys = Object.keys(this.pages);
      return this.pages[keys[keys.length-1]];
    }
  }

  // views 
  // ----------------------------------------
  addView(view, {'data-bnorth-ref':_ref='',...options}={}) {
    if(!view) return;

    if(_ref) {
      let refs = _ref.split('@#');
      if(refs.length===2){
        options['data-bnorth-viewname'] = refs[0];
        options['data-bnorth-pagename'] = refs[1];
      }
    }
    options['data-bnorth-pagename'] = options['data-bnorth-pagename']||'';
    options['data-bnorth-viewname'] = options['data-bnorth-viewname']||`\$${++this._viewRef}`;
    _ref = `${options['data-bnorth-viewname']}@#${options['data-bnorth-pagename']}`; 
    options['data-bnorth-ref'] = _ref;

    this.views[_ref] = !this.views[_ref]?{ view, options }:{view, options:{...this.views[_ref].options,...options}};
    this._handleLocationRouterUpdate();

    return _ref;
  }

  removeView(ref) {
    delete this.views[ref];
    this._handleLocationRouterUpdate();
  }

  removePageViews(pageName) {
    this.getPageViews(pageName).forEach(([k,v])=>(delete this.views[k]));
    this._handleLocationRouterUpdate();
  }

  getView(ref) {
    return this.views[ref];
  }

  getPageViews(pageName) {
    return Object.entries(this.views).filter(([k,{options={}}={}])=>options['data-bnorth-pagename']===pageName);
  }

  renderViews(pageName='') {
    return this.getPageViews(pageName).map(([k,v])=>{
      let { view, options }=v||{};
      let props = {
        ...options, 
        key: k,
        ref: e=>e&&(v.ref=e),
      }
      //if(view && view.__proto__ instanceof React.Component.constructor) props[ref] = e=>e&&(v.ref=e);

      if(typeof view === 'object' && view.type) {
        return cloneElement(view, props);
      }else if(typeof view === 'function'){
        return <view {...props} />;
      }else{
        delete props.ref;
        return view;
      }
    });
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


Router.PageError = PageError;