import React from 'react';


let PageInfo = props=>{
  let { app, name, route:{params, query, state, parentName}={} } = props;

  return (
    <div>
      <h3>{name}</h3>
      <p>parentName: {parentName}</p>
      <div className="margin-top">
        <h4>params</h4>
        <div>{JSON.stringify(params)}</div>
        <h4>query</h4>
        <div>{JSON.stringify(query)}</div>
        <h4>state</h4>
        <div>{JSON.stringify(state)}</div>
        <button onClick={()=>app.router.push(['pageinfo', 'pp1'])}>push pageinfo pp1</button>
      </div>
    </div>
  )
}

export default {
  '/': require('./pages/home').default,
  '/test': require('./test').default,

  'components:tab?': {
    component: require('./pages/components').default,
    embeds: ['c_components', 'c_list', 'c_props', 'c_plugins' ],
  },
  'c_components': require('./pages/c-components').default,
  'c_list': require('./pages/c-list').default,
  'search:keyword:pageid': require('./pages/search').default,
  'c_props': require('./pages/c-props').default,
  'c_plugins': require('./pages/c-plugins').default,

  'router': require('./pages/router').default,
  'require_param:param1': PageInfo,
  'option_param:param1?': PageInfo,
  'pageinfo:subparam1?': PageInfo,
  'dynamic': {
    loader: ()=>{
      return new Promise((resolve)=>setTimeout(()=>{
        resolve({
          component: ()=><div>page c</div>,
        })
      },1000));
    }
  },

  'data': require('./pages/data').default,

  'plugins': require('./pages/plugins').default,
}