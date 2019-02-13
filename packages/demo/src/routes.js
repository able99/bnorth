import React from 'react';


let PageInfo = props=>{
  let { app, route } = props;

  return (
    <div className="scrollable-y- padding-a-">
      <h3><button onClick={()=>app.router.back()}>back</button>page info</h3>
      <hr />
      {Object.entries(route).map(([k,v])=>{
        if(k==='subPageInfos'||k==='popLayerInfos') return null;
        if(k==='subPages') return <div>subPages: {Object.keys(v)}</div>;
        if(k==='popLayers') return <div>popLayers count: {v.length}</div>;
        return <div>{k}: {JSON.stringify(v)}</div>;
      })}
      <hr />
      <div className="margin-top-">
        <h4>navigator</h4>
        <button className="padding-a-xxs margin-bottom-" onClick={()=>app.router.push(['pageinfo', 'pp1'])}>push pageinfo pp1</button>
        <button className="padding-a-xxs margin-bottom-" onClick={()=>app.router.push('pageinfo', {query:{a:'qq1'}})}>push pageinfo query:|a:qq1</button>
        <button className="padding-a-xxs margin-bottom-" onClick={()=>app.router.push('pageinfo', {state:{a:'ss1'}})}>push pageinfo state:|a:ss1</button>
      </div>
    </div>
  )
}

export default {
  '/': require('./pages/home').default,
  '/test': require('./test').default,
  'components:component?': {component: require('./pages/components').default, title: 'components'},
  // 'components:tab?': {
  //   title: false,
  //   component: require('./pages/components').default,
  //   subPages: ['c_components', 'c_list', 'c_props', 'c_plugins' ],
  // },
  // 'c_components': {component: require('./pages/c-components').default, title: 'components show'},
  // 'c_list': {component: require('./pages/c-list').default, title: 'list show'},
  // 'search:keyword:pageid': require('./pages/search').default,
  // 'c_props': require('./pages/c-props').default,
  // 'c_plugins': require('./pages/c-plugins').default,

  // 'router': require('./pages/router').default,
  // 'require_param:param1': PageInfo,
  // 'option_param:param1?': PageInfo,
  // 'pageinfo:subparam1?': PageInfo,
  // 'dynamic': {
  //   loader: ()=>{
  //     return new Promise(resolve=>setTimeout(()=>{resolve({component: ()=><div>page c</div> })},1000));
  //   }
  // },

  // 'data': require('./pages/data').default,

  // 'plugins': require('./pages/plugins').default,
}