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
    component: require('./pages/home').default,
    embeds: ['components', 'router', 'data', 'plugins' ],
  },
  'components': require('./pages/components').default,
  'router': require('./pages/router').default,
  'data': require('./pages/data').default,
  'plugins': require('./pages/plugins').default,
  'require_param:param1': PageInfo,
  'option_param:param1?': PageInfo,
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