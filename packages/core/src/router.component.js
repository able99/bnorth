import React, { cloneElement } from 'react';


export default class RouterComponent extends React.Component {
  componentDidMount() {
    this.eventOffRouterUpdate = this.props.app.event.on(this.props.app._id, 'onRouterUpdate', ()=>this.forceUpdate());
  }

  componentWillUnmount() {
    this.eventOffRouterUpdate();
  }

  _renderPage({
    _id, _idParent, 
    name, pathname, fullPathName,
    query, state, params, routeParams, pathnameParams,
    viewItems, embeds, embed,
    routeName, route, 
  }, activeId, focusId){

    let { app } = this.props;

    let embedsPage = {};
    Object.entries(embeds).map(([k,v])=>embedsPage[k]=this._renderPage(v, activeId, focusId));

    let props = { 
      app, key: _id, 
      _id, 
      route: { 
        ...route,
        name, routeName, pathname, fullPathName, _idParent, 
        query, state, params, pathnameParams,
        active: embed?_idParent===activeId:_id===activeId, embed 
      }, 
      views: viewItems.map(v=>this._renderView(v)), embeds: embedsPage,
    };

    if(route.loader){
      route.loader(app).then(v=>{
        Object.assign(route, v, {loader: null});
        this.forceUpdate();
      })
      return <app.router.PageLoading key={_id} />;
    }else if(typeof route.component==='function'){
      return <app.Page {...props} />;
    }else{
      return <app.router key={_id} app={app} data={{errorRoute: "wrong component"}} />
    }
  }

  _renderView({content:Component, props, options:{_id, isContentComponent}}) {
    let aprops = { ...isContentComponent?{}:Component.porps, ...props, key: _id };
    return isContentComponent?<Component {...aprops} />:(typeof Component==='object'&&Component.type?cloneElement(Component, aprops):Component);
  }

  render() {
    let { app } = this.props;
    let {_pathinfos, _error, _activeId, _focusId} = app.router;
    let viewItems = app.router.getNoPageViews().map(v=>({...v}));
    
    if(!_error) {
      return (
        <React.Fragment>
          {_pathinfos.map(v=>this._renderPage(v, _activeId, _focusId))}
          {viewItems.map(v=>this._renderView(v, _activeId, _focusId))}
        </React.Fragment>
      );
    }else{
      return <app.router.PageError app={app} data={_error} />;
    }
  }
}