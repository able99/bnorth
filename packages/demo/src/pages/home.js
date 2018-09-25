import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'
import NavBar from '@bnorth/components/lib/NavBar'
import List from '@bnorth/components/lib/List'


export default props=>{
  let { app } = props;

  return (
    <View>
      <NavBar><NavBar.Title>Bnorth Demo</NavBar.Title></NavBar>
      <Panel main>
        <List>
          <List.Item 
            title="components" 
            desc="demo: all components and component props"
            descProps={{className: 'text-color-light'}}
            onClick={()=>app.router.push('components')} />
          <List.Item 
            title="router" 
            desc="demo: router and page manager"
            descProps={{className: 'text-color-light'}}
            onClick={()=>app.router.push('router')} />
          <List.Item 
            title="data" 
            desc="demo: data manager includes network data"
            descProps={{className: 'text-color-light'}}
            onClick={()=>app.router.push('data')} />
          <List.Item 
            title="plugins" 
            desc="demo: useful bnorth plugin list"
            descProps={{className: 'text-color-light'}}
            onClick={()=>app.router.push('plugins')} />
        </List>
      </Panel>
      <Panel bc-margin-a-xxl bc-text-color-light bc-border-set-top- bc-padding-top->
        <Panel bc-text-align-center>bnorth solution</Panel>
        <Panel bc-text-align-center>able99 xwan</Panel>
        <Panel bc-text-align-center>2018</Panel>
      </Panel>
    </View>
  );
};