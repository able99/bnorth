import React from 'react';
import Panel from '@bnorth/components/lib/Panel'
import List from '@bnorth/components/lib/List'
import Icon from '@bnorth/components/lib/Icon'


let Component = aprops=>{
  let {page, stateData} = aprops;
  return (
    <Panel>
      a={stateData.count}
      b={stateData.count1}
      <List>
        <List.Item onClick={()=>page.actionAdd()} media mediaProps={{component: Icon, name: 'left', 'b-size': '3x'}} title="name" desc="enterprise"/>
      </List>
    </Panel>
  );
};

Component.controller = (app, page)=>({
  actionAdd() {
    page.stateData.set('count', 1)
    page.stateData.set('count1', 2)
  }
})

export default Component;
