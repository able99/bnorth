import React from 'react';

export default {
  '/': {
    component: require('./pages/home'),
    controller: require('./pages/_home'),
  },
  'a': {
    component: props=><div>page a</div>,
  },
  'b': {
    component: props=><div>page b</div>,
  },
  'c': {
    loader: ()=>{
      return new Promise((resolve,reject)=>setTimeout(()=>{
        return {
          component: props=><div>page c</div>,
        }
      },5000));
    }
  }
}