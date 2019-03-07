import React from 'react';
import Panel from '@bnorth/components/lib/Panel';
import TabBar from '@bnorth/components/lib/TabBar';


let items = [
  {title: 'cs', key: 'tab1', icon: 'view_comfy'}, 
  {title: 'list', key: 'tab2', icon: 'format_list_bulleted'},
  {title: 'props', key: 'tab3', icon: 'settings'},
  {title: 'plugins', key: 'tab4', icon: 'extension'},
];

export let Tab1 = aprops=>{
  return 1;
}

export let Tabx = aprops=>{
  return 234;
}

export default props=>{
  let { children } = props;

  return (
    <Panel page full>
      <TabBar bc-flex-sub-flex-extend position="bottom" bp-nav-bp-panelItem-position="top" bp-nav-bc-padding-v- bp-nav-bc-border-set-top->
        {items.map(v=>(
          <TabBar.Item key={v.key} title={v.title} name={v.icon}>
            {children[v.key]}
          </TabBar.Item>
        ))}
      </TabBar>
    </Panel>
  )
}
