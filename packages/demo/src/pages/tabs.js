import React from 'react';
import Panel from '@bnorth/components/lib/Panel';
import TabBar from '@bnorth/components/lib/TabBar';
import NavBar from '@bnorth/components/lib/NavBar';
import listGener from '../components/listgener'


let items = [
  {title: 'tabx0', key: 'tabx0', icon: 'view_comfy'}, 
  {title: 'tabx1', key: 'tabx1', icon: 'format_list_bulleted'},
  {title: 'tabx2', key: 'tabx2', icon: 'settings'},
  {title: 'tabx3', key: 'tabx3', icon: 'extension'},
];

export let Tabx = props=>{
  let { app, route } = props;
  return (
    <Panel full page>
      <NavBar bc-border-set-bottom-><NavBar.Item name="left" onClick={()=>app.router.back()} /><NavBar.Title>{route._idSubPage}</NavBar.Title></NavBar>
      
      <TabBar bc-flex-sub-flex-extend bp-container-bp-panelItem-className="scrollable-y-" 
        bp-container-bp-panelItem-data-b-pulldown 

        bp-container-bp-panelItem-onScroll={e=>{
          console.log(111, e.currentTarget.pulldown);
          if(e.currentTarget.pulldown)app.loader.pulldown.show(e.currentTarget.pulldown)}
          }>
        <TabBar.Item title="tab1">
          {listGener(50, {pre: route._idSubPage, clickable: true})}
        </TabBar.Item>
        <TabBar.Item title="tab2">
          {listGener(50, {pre: route._idSubPage, clickable: true})}
        </TabBar.Item>
      </TabBar>
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
