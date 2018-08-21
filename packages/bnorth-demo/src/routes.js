import React from 'react';

export default {
  '/:tab?': {
    component: require('./pages/home'),
    controller: require('./pages/_home'),
    embeds: { components:'components', router:'router', data:'data', plugins:'plugins' },
  },
  'components': {
    component: require('./pages/components'),
  },
  'router': {
    component: require('./pages/router'),
  },
  'data': {
    component: require('./pages/data'),
  },
  'plugins': {
    component: require('./pages/plugins'),
  },
  'require_param:param1': {
    component: props=><div>page require_param {JSON.stringify(props.route.params)}</div>,
  },
  'option_param:param1?': {
    component: props=><div>page option_param {JSON.stringify(props.route.params)}</div>,
  },
  'dynamic': {
    loader: ()=>{
      return new Promise((resolve,reject)=>setTimeout(()=>{
        resolve({
          component: props=><div>page c</div>,
        })
      },1000));
    }
  }
}