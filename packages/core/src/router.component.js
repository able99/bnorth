/**
 * @module
 */
import React from 'react';
import createHistory from 'history/createHashHistory';
import { join } from 'path';
import PageLoading from './router.loading.js'
import PageError from './router.error.js'

let spe = '/';
let ParamSpe = ':';
let SubPageSpe = '|';
let ParamOptional = '?';
let PageSign = '#';

export default class RouterComponent extends React.Component {
  constructor(props) {
    super(props);
    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = this.props.app;
    /**
     * 模块的 id
     * @type {string}
     */
    this._id = this.app._id+'.router.component';
    this.props.app.router.component = this;
    this.state = { _pageInfos: [], _popLayerInfos: [] }

    /*!
     * 弹出层 id 的随机发生数
     */
    this._popLayerIdRandom = 0;
    this._states = {};
    /**
     * 设置导航时是否传递之前的查询字符串到新页面
     * @type {boolean}
     */
    this.passQuery = false;
    /**
     * 设置导航时是否传递之前的状态数据到新页面
     * @type {boolean}
     */
    this.passState = false;
    /**
     * 设置导航时是否传递之前的页面参数到新页面
     * @type {boolean}
     */
    this.passParams = false;
    /**
     * 设置页面进场动画是否显示白屏提高速度
     * @type {boolean}
     */
    this.transInBlank = true;
    /**
     * 设置页面离场动画是否显示白屏提高速度
     * @type {boolean}
     */
    this.transOutBlank = true;

    this.Page = this.app.context.consumerHoc(this.app.Page);
    this.PopLayer = this.app.context.consumerHoc(this.app.PopLayer);

    this._historyCount = 0;
    this._history = createHistory();
    this._history.listen((location, action)=>this._handleLocationChange(location, action));
    this._handleLocationChange(this._history.location, this._history.action);
  }

  _handleLocationChange(location, action) {
    this.props.app.log.debug('router location', location);
    // this._clearError();

    Object.keys(this._states).filter(v=>!location.pathname.startsWith(v)).forEach(v=>{delete this._states[v]});
    if(location.state) this._states[location.pathname] = location.state;

    location.query = {};
    location.search.slice(1).split('&').filter(v=>v).forEach(v=>{
      let vs = v.split('=');
      location.query[vs[0]] = decodeURIComponent(vs[1]);
    })

    if(action==='PUSH') this._historyCount++;
    if(action==='POP') this._historyCount = Math.max(--this._historyCount, 0);

    let pos = 0;
    let pathnames = [];
    while(pos<location.pathname.length-1) {
      let index = location.pathname.indexOf(spe, pos+1);
      index = index>=0?index:location.pathname.length;
      let sub = location.pathname.slice(pos+1, index);
      if((pos===0&&sub[0]===ParamSpe)||(this.props.app.router.getRouteByPageName(spe+sub.split(ParamSpe)[0]).length)) {
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
    
    if(location.ignore) {location.ignore = false; return}
    this._updateRouterInfo(location);
  };

  async _updateRouterInfo(location) {
    let router = this.props.app.router;
    if(!Object.keys(router.getRoutes()).length) return;

    let pathName = '';
    let _idPrev; 
    let params = {};
    let pageInfos = [];

    /* route */
    console.log(999);
    let isPop = this._history.action==='POP';
    let isFirst = this.state._pageInfos.length === 0;
    let prevActive = this.state._pageInfos[this.state._pageInfos.length-1];
    if(prevActive&&prevActive.isInactive) prevActive = undefined;

    let level = 0;
    for (let pagePathName of location.pathnames) {
      let isLast = pagePathName === location.pathnames[location.pathnames.length-1];
      
      pathName = join(pathName, decodeURIComponent(pagePathName));
      let [pageName, ...pageParams] = pagePathName.split(ParamSpe);
      let _id = PageSign+pathName;
      let pageInfo = { 
        _id, _idPrev, level, pageName, pathName, pagePathName, isSubPage: false, isActive: isLast,
        query: location.query, state: this._states[pathName], pageParams, hash: location.hash?location.hash.slice(1):'',
        subPageInfos: {}, 
      };
      let [routeName, routeDefine] = router.getRouteByPageName(pageInfo.pageName);
      if(!routeName||!routeDefine) return this.props.app.event.emit(this.app._id, 'onRouteErrorNoRoute', pageInfo.pageName, pageInfo, location);
      pageInfo.routeName = routeName;
      pageInfo.routeDefine = routeDefine;
      pageInfo.routeParams = routeName.split(ParamSpe).slice(1);

      pageInfo.params = this.passParams?{...params}:{};
      pageInfo.routeParams.forEach((v,i)=>{
        let optional = v.endsWith(ParamOptional);
        if(optional) v = v.slice(0, -1);
        if(!optional&&i>pageInfo.pageParams.length-1) return this.app.event.emit(this.app._id, 'onRouteErrorNoParam', v, pageInfo, location);
        
        pageInfo.params[v] = pageInfo.pageParams[i]?decodeURIComponent(pageInfo.pageParams[i]):null;
        if(this.passParams) params[v] = pageInfo.params[v];
      })


      let prevOne = this.state._pageInfos.find(vv=>vv._id===pageInfo._id);
      let isNew = !prevOne;
      let isPrevActive = prevActive&&pageInfo._id===prevActive._id&&!isLast;
      let isReactive = prevActive&&pageInfo._id!==prevActive._id&&isLast;
      let status;
      if(isFirst) {
        status = isLast?'normal':'waitting';
      }else if(isNew&&isLast){
        status = isPop?'popin':'pushin'
      }else if(isNew&&!isLast) {
        status = 'waitting';
      }else if(isPrevActive){
        status = isPop?'popout':'pushout';
      }else if(isReactive){
        status = 'popin'
      }else {
        status = isLast?'normal':'background';
      }
      pageInfo.status = status;
      console.log(pageInfo._id, status);


      let subNo = 0;
      for (let [k,v] of Array.isArray(routeDefine.subPages)?routeDefine.subPages.map((v,i)=>[v,v]):Object.entries(routeDefine.subPages||{})) {
        let subPageInfo = {...pageInfo};
        subPageInfo._idParent = subPageInfo._id;
        subPageInfo._idSubPage = k;
        subPageInfo.subNo = subNo;
        subPageInfo._id = subPageInfo._id + SubPageSpe + subPageInfo._idSubPage;
        subPageInfo.pageName = v;
        subPageInfo.isSubPage = true;
        subPageInfo.subPageInfos = {};
        let [routeNameSubPage, routeDefineSubPage] = router.getRouteByPageName(subPageInfo.pageName);
        if(!routeNameSubPage||!routeDefineSubPage) return this.props.app.event.emit(this.app._id, 'onRouteErrorNoRoute', subPageInfo.pageName, subPageInfo, location);
        
        subPageInfo.routeName = routeNameSubPage;
        subPageInfo.routeDefine = routeDefineSubPage;
        pageInfo.subPageInfos[subPageInfo._idSubPage] = subPageInfo;
        subNo++;
      }
      
      _idPrev = _id;
      level++;
      pageInfos.push(pageInfo);
    }

    /* match */
    for(let pageInfo of pageInfos) {
      let _block = await this.props.app.event.emit(this.props.app._id, 'onRouteMatch', pageInfo, location);
      if(_block) return router.block(_block);
    }

    /* inactive */
    if(prevActive) {
      prevActive.isActive = false;
      prevActive.isInactive = true;
      if(!pageInfos.find(v=>v._id===prevActive._id)) pageInfos.unshift(prevActive);
    }

    let poplayers = this.state._popLayerInfos;
    poplayers = poplayers.filter(v=>!v.options._idPage||pageInfos.find(v=>v._id===v.options._idPage));
    this.setState({_pageInfos: pageInfos});
  }

  _pageTransform() {
    let app = this.props.app;
    let router = app.router;
    let page = app.Page.getPage();
    let status = page&&page.status;
    if(status !== 'normal') requestAnimationFrame(()=>this._updateRouterInfo(this._history.location));
  }

  componentDidUpdate() {
    this._pageTransform();
  }

  componentDidCatch(error, info) {
    debugger
  }

  render() {
    let {_pageInfos, _popLayerInfos} = this.state;

    return (
      <React.Fragment>
        {_pageInfos.map(v=>(
          <this.Page key={v._id} {...v}>
            {Object.entries(v.subPageInfos).reduce((vv1, [kk2,vv2])=>{vv1[kk2]=(<this.Page key={vv2._id} {...vv2} />);return vv1},{})} 
          </this.Page>
        ))}
        {_popLayerInfos.map(v=><this.PopLayer key={v.options._id} {...v} />)}
      </React.Fragment>
    );
  }
}