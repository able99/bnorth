/**
 * @module
 */
import React from 'react';
import { createHashHistory } from 'history';
import { join } from 'path';


export default class RouterComponent extends React.Component {
  constructor(props) {
    super(props);
    /**
     * App 的实例
     * @type {module:app.App}
     */
    this.app = RouterComponent.app;
    /**
     * 模块的 id
     * @type {string}
     */
    this._id = this.app._id+'.router.component';
    this.state = { pageInfos: [], poplayerInfos: [] }
    this.app.router.component = this;
    
    this.spePage = '/';
    this.prePage = '#';
    this.preSubPage = '|';
    this.speParams = ':';
    this.optionalParams = '?';
    this._locationStates = {};
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

    this.Page = this.app.context.consumerHoc(this.app.Page);
    this.Poplayer = this.app.context.consumerHoc(this.app.Poplayer);

    this.historyCount = 0;
    this.history = createHashHistory();
    this.history.listen((location, action)=>this._handleLocationChange());
    this._handleLocationChange();
  }

  _handleLocationChange() {
    let location=this.history.location;
    let action=this.history.action;
    RouterComponent.app.event.emit(RouterComponent.app._id, 'onLocationChange', location, action);

    Object.keys(this._locationStates).filter(v=>!location.pathname.startsWith(v)).forEach(v=>{delete this._locationStates[v]});
    if(location.state) this._locationStates[location.pathname] = location.state;

    location.query = {};
    location.search.slice(1).split('&').filter(v=>v).forEach(v=>{ let vs = v.split('='); location.query[vs[0]] = decodeURIComponent(vs[1]) })

    if(action==='PUSH') this.historyCount++;
    if(action==='POP') this.historyCount = Math.max(--this.historyCount, 0);

    let pos = 0;
    let pathnames = [];
    while(pos<location.pathname.length-1) {
      let index = location.pathname.indexOf(this.spePage, pos+1);
      index = index>=0?index:location.pathname.length;
      let sub = location.pathname.slice(pos+1, index);
      if((pos===0&&sub[0]===this.speParams)||(RouterComponent.app.router.getRouteByPageName(this.spePage+sub.split(this.speParams)[0]).length)) {
        pathnames.push(this.spePage+sub);
      }else if(pos===0){
        pathnames.push(this.spePage);
        pathnames.push(sub);
      }else {
        pathnames.push(sub);
      }
      pos = index;
    }
    if(!pathnames.length) pathnames.push(this.spePage);
    location.pathnames = pathnames;
    
    if(location.ignore) {location.ignore = false} else {this._updateRouterInfo()}
  };

  async _updateRouterInfo() {
    let location = this.history.location;
    let router = RouterComponent.app.router;
    if(!Object.keys(router.getRoutes()).length) return;

    let pathName = '';
    let _idPrev; 
    let params = {};
    let pageInfos = [];
    let isPop = this.history.action==='POP';
    let isFirst = this.state.pageInfos.length === 0;
    let prevActive = this.state.pageInfos[this.state.pageInfos.length-1];
    if(prevActive&&prevActive.isInactive) prevActive = undefined;
    let level = 0;

    for (let pagePathName of location.pathnames) {
      let isLast = pagePathName === location.pathnames[location.pathnames.length-1];
      pathName = join(pathName, decodeURIComponent(pagePathName));
      let [pageName, ...pageParams] = pagePathName.split(this.speParams);
      let _id = this.prePage+pathName;

      let pageInfo = { 
        _id, _idPrev, level, pageName, pathName, pagePathName, isSubPage: false, isActive: isLast,
        query: location.query, state: this._locationStates[pathName], pageParams, hash: location.hash?location.hash.slice(1):'',
        subPageInfos: {}, 
      };
      let [routeName, routeDefine] = router.getRouteByPageName(pageInfo.pageName);
      if(!routeName||!routeDefine) return RouterComponent.app.event.emit(RouterComponent.app._id, 'onRouteError', pageInfo.pageName, pageInfo, location);
      pageInfo.routeName = routeName;
      pageInfo.routeDefine = routeDefine;
      pageInfo.routeParams = routeName.split(this.speParams).slice(1);
      pageInfo.params = this.passParams?{...params}:{};
      pageInfo.routeParams.forEach((v,i)=>{
        let optional = v.endsWith(this.optionalParams);
        if(optional) v = v.slice(0, -1);
        if(!optional&&i>pageInfo.pageParams.length-1) return this.app.event.emit(RouterComponent.app._id, 'onRouteError', v, pageInfo, location);
        
        pageInfo.params[v] = pageInfo.pageParams[i]?decodeURIComponent(pageInfo.pageParams[i]):null;
        if(this.passParams) params[v] = pageInfo.params[v];
      })

      let prevOne = this.state.pageInfos.find(vv=>vv._id===pageInfo._id);
      let isNew = !prevOne;
      let isPrevActive = prevActive&&pageInfo._id===prevActive._id&&!isLast;
      let isReactive = isLast&&prevOne&&(!prevActive||pageInfo._id!==prevActive._id);
      if(isFirst) { pageInfo.status = isLast?'normal':'waitting';
      }else if(isNew&&isLast){ pageInfo.status = isPop?'popin':'pushin'
      }else if(isNew&&!isLast) { pageInfo.status = 'waitting';
      }else if(isPrevActive){ pageInfo.status = isPop?'popout':'pushout';
      }else if(isReactive){ pageInfo.status = 'popin'
      }else { pageInfo.status = isLast?'normal':'background'; }

      let subNo = 0;
      for (let [k,v] of Array.isArray(routeDefine.subPages)?routeDefine.subPages.map((v,i)=>[v,v]):Object.entries(routeDefine.subPages||{})) {
        let subPageInfo = {...pageInfo};
        subPageInfo._idParent = subPageInfo._id;
        subPageInfo._idSubPage = k;
        subPageInfo.subNo = subNo;
        subPageInfo._id = subPageInfo._id + this.preSubPage + subPageInfo._idSubPage;
        subPageInfo.pageName = v;
        subPageInfo.isSubPage = true;
        subPageInfo.subPageInfos = {};
        let [routeNameSubPage, routeDefineSubPage] = router.getRouteByPageName(subPageInfo.pageName);
        if(!routeNameSubPage||!routeDefineSubPage) return RouterComponent.app.event.emit(RouterComponent.app._id, 'onRouteError', subPageInfo.pageName, subPageInfo, location);
        
        subPageInfo.routeName = routeNameSubPage;
        subPageInfo.routeDefine = routeDefineSubPage;
        pageInfo.subPageInfos[subPageInfo._idSubPage] = subPageInfo;
        subNo++;
      }
      
      _idPrev = _id;
      level++;
      pageInfos.push(pageInfo);
    }

    if(prevActive&&!this._isTransforming()) {
      let aprevActive = pageInfos.find(v=>v._id===prevActive._id);
      if(aprevActive) {
        aprevActive.isActive = false;
        aprevActive.isInactive = true;
      }else{
        if(this.app.Page.getPage(prevActive._id)._onWillClose) {
          let canClose = await this.app.Page.getPage(prevActive._id)._onWillClose();
          if(!canClose) {this._location.ignore=true;return this.history.push(this._location)}
        }
        prevActive.isActive = false;
        prevActive.isInactive = true;
        prevActive.status = isPop?'popout':'pushout';
        pageInfos.unshift(prevActive);
      }
    }

    for(let pageInfo of pageInfos) {
      if(pageInfo.isInactive) continue;
      let _block = await RouterComponent.app.event.emit(RouterComponent.app._id, 'onRouteMatch', pageInfo, location);
      if(_block) return router.block(_block);
    }

    this.setState({error: null, pageInfos: pageInfos, poplayerInfos: this.state.poplayerInfos.filter(v=>!v.options._idPage||pageInfos.find(vv=>vv._id===v.options._idPage))});
    this._location = this.history.location;
  }

  _isTransforming() {
    return this.state.pageInfos[this.state.pageInfos.length-1].status.includes('in');
  }

  _pageTransform() {
    let page = RouterComponent.app.Page.getPage();
    let status = page&&page.status;
    if(status !== 'normal') {
      this._isPageTransforming = true;
      requestAnimationFrame(()=>{
        this._isPageTransforming = false;
        this._updateRouterInfo(this.history.location);
      });
    }
  }

  componentDidUpdate() {
    !this.state.error&&this._pageTransform();
  }

  componentDidCatch(error, info) {
    this.setState({error: {message: error, data: info}});
  }

  shouldComponentUpdate() {
    return !this._isPageTransforming;
  }

  render() {
    let {pageInfos, poplayerInfos, error} = this.state;

    return (
      <React.Fragment>
        {error?<RouterComponent.app.router.ComponentError RouterError {...error} />:null}
        {!error&&pageInfos.map(v=>(
          <this.Page key={v._id} {...v}>
            {Object.entries(v.subPageInfos).reduce((vv1, [kk2,vv2])=>{vv1[kk2]=(<this.Page key={vv2._id} {...vv2} />);return vv1},{})} 
          </this.Page>
        ))}
        {!error&&poplayerInfos.map(v=><this.Poplayer key={v.options._id} {...v} />)}
      </React.Fragment>
    );
  }
}