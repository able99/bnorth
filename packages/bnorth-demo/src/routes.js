import React from 'react';

export default {
  '/': {
    component: require('./pages/home'),
    controller: require('./pages/_home'),
  },
  'require_param:param1': {
    component: props=><div>page require_param {JSON.stringify(props.route.params)}</div>,
  },
  'option_param:param1?:param2?': {
    component: props=><div>page option_param {JSON.stringify(props.route.params)}</div>,
  },
  'b': {
    component: props=><div>page b</div>,
  },
  'c': {
    loader: ()=>{
      return new Promise((resolve,reject)=>setTimeout(()=>{
        resolve({
          component: props=><div>page c</div>,
        })
      },1000));
    }
  }
}