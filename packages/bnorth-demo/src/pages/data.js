import React from 'react';
import View from 'bnorth-components/lib/View'
import Panel from 'bnorth-components/lib/Panel'
import List from 'bnorth-components/lib/List'

export default props=>{
  let { page, stateData, stateInit, stateEvent } = props;
  return (
    <View>
      <Panel main>
        <List>
          <List.Item 
            title="data - add tick" 
            after={JSON.stringify(stateData)}
            onClick={()=>page.stateData.set('tick', (stateData.tick||0)+1)} />
          <List.Item 
            title="init - add tick" 
            after={JSON.stringify(stateInit)}
            onClick={()=>page.stateInit.set('tick', (stateInit.tick||0)+1)} />
          <List.Item 
            title="event - add tick" 
            after={JSON.stringify(stateEvent)}
            onClick={()=>page.stateEvent.set('tick', (stateEvent.tick||0)+1)} />
        </List>
        <List className="margin-top">
        </List>
      </Panel>
    </View>
  );
};