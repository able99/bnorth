import React from 'react';
import Panel from '@bnorth/components/lib/Panel'


export default aprops=>{
  return (
    <Panel full page>
      <Panel main data-b-edge-shadow>{Array(100).fill(0).map((v,i)=><Panel>{i}</Panel>)}</Panel>
    </Panel>
    
  )
}