import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'
import List from '@bnorth/components/lib/List'


export default props=>{
  let { app } = props;

  return (
    <View>
      <Panel main>
        <List>
          <List.Item 
            title="components" 
            onClick={()=>app.router.push('components')} />
          <List.Item 
            title="router" 
            onClick={()=>app.router.push('router')} />
          <List.Item 
            title="data" 
            onClick={()=>app.router.push('data')} />
          <List.Item 
            title="plugins" 
            onClick={()=>app.router.push('plugins')} />
        </List>
      </Panel>
    </View>
  );
};