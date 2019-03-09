import React from 'react';
import Panel from '@bnorth/components/lib/Panel';
import TabBar from '@bnorth/components/lib/TabBar';
import NavBar from '@bnorth/components/lib/NavBar';
import listGener from '../components/listgener'


let items = [
  {title: 'cs', key: 'tabx0', icon: 'view_comfy'}, 
  {title: 'list', key: 'tabx1', icon: 'format_list_bulleted'},
  {title: 'props', key: 'tabx2', icon: 'settings'},
  {title: 'plugins', key: 'tabx3', icon: 'extension'},
];

export let Tabx = props=>{
  let { route } = props;
  return (
    <Panel full page>
      <NavBar bc-border-set-bottom-><NavBar.Title>{route._idSubPage}</NavBar.Title></NavBar>
      <Panel main bc-bg-color-white>{listGener(50, {pre: route._idSubPage})}</Panel>
      <Panel bc-border-set-top- bc-padding-a- bc-text-align-center>footer</Panel>
    </Panel>
  )
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
