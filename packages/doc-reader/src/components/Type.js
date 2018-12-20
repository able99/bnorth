import React from 'react';
import Panel from '@bnorth/components/lib/Panel';

let types = ['string', 'number', 'object', 'array'];
export default aprops=>{
  let {app, data} = aprops;
  if(!data) return null;
  return data.names
    .map((v,i,a)=>{
      return types.includes(v)?(
        <Panel key={i} inline>{i?'|':''}{v}</Panel>
      ):(
        <Panel 
          key={i} 
          inline bc-cursor-pointer bc-text-decoration-underline 
          onClick={()=>app.router.push(['/', v])}>
          {i?'|':''}{v.split(':').slice(-1)[0]}
        </Panel>
      );
    })
}