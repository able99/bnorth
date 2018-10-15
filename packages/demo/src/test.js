import React from 'react';
import TabBar from '@bnorth/components/lib/TabBar'


export default aprops=>{
  let {page, stateData} = aprops;
  return (
    <div className="padding-a- border-set-a-alert">
      <TabBar itemProps={{'b-theme':'primary', 'b-style':'solid'}}>
        {[['left','<'],['right','>']].map(([name, defaultName],i)=>(
          <TabBar.Item 
            key={name}
            icon={name} iconProps={{defaultName}} 
            onClick={()=>page.stateData.set('index', i)}
            selected={i===(stateData.index||0)}>
            {name}
          </TabBar.Item >
        ))}
      </TabBar>
    </div>
  );
};
