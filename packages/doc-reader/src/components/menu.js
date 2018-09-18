import React from 'react';
import Panel from '@bnorth/components/lib/Panel'


let MenuItem = props=>{
  let { app, title, src, level, subs=[] } = props;

  return (
    <Panel>
      <Panel bs-paddingLeft={level*16} b-theme="link" bc-padding-right- bc-padding-v-xs bc-cursor-pointer onClick={()=>app.router.push(['/',src])}>
        <strong >{title}</strong>
      </Panel>
      {subs.map((v,i)=>(
        <MenuItem app={app} key={i} {...v} index={i} level={(level||0)+1} />
      ))}
    </Panel>
  )
}

export default props=>{
  let { app, data } = props;
  return (
    <MenuItem app={app} {...data} index={0} level={0} />
  )
}