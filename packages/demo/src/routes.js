import React from 'react';


let PageInfo = props=>{
  let { name, route:{params, query, parentName}={} } = props;

  return (
    <div>
      <h3>{name}</h3>
      <p>parentName: {parentName}</p>
      <div className="margin-top">
        <h4>params</h4>
        <div>{JSON.stringify(params)}</div>
        <h4>query</h4>
        <div>{JSON.stringify(query)}</div>
      </div>
    </div>
  )
}

export default {
  '/:tab?': {
    component: require('./pages/home'),
    embeds: ['components', 'router', 'data', 'plugins' ],
  },
  'components': {
    component: require('./pages/components'),
  },
  'router': {
    component: require('./pages/router'),
  },
  'data': {
    component: require('./pages/data'),
    controller: require('./pages/_data'),
  },
  'plugins': {
    component: require('./pages/plugins'),
  },
  'require_param:param1': {
    component: PageInfo,
  },
  'option_param:param1?': {
    component: PageInfo,
  },
  'dynamic': {
    loader: ()=>{
      return new Promise((resolve)=>setTimeout(()=>{
        resolve({
          component: ()=><div>page c</div>,
        })
      },1000));
    }
  }
}