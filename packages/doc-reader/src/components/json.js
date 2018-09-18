import React from 'react';
import Panel from '@bnorth/components/lib/Panel'


export default props=>{
  let { data } = props;
  return (
    <Panel main>
      {data}
    </Panel>
  )
}