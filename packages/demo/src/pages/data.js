import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'
import List from '@bnorth/components/lib/List'
import Button from '@bnorth/components/lib/Button'

export default props=>{
  let { app, page, stateData, stateInit, stateEvent, stateNetwork, stateValidate } = props;
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
          <List.Item 
            title="network-fetchOnStart-click fetch" 
            after={<Button cTheme="link" cStyle="plain" className="padding-0" onClick={()=>app.modal.show(JSON.stringify(stateNetwork), {role: 'alert'})}>show</Button>}
            onClick={()=>page.stateNetwork.fetch()} />
          <List.Item 
            title="network-update({a:1})" 
            onClick={()=>page.stateNetwork.update({a:1})} />
        </List>
        <List className="margin-top">
          <List.Item 
            title="validate-add tick-a:required,tick<3" 
            after={JSON.stringify(stateValidate)}
            onClick={()=>page.stateValidate.set('tick', (stateValidate.tick||0)+1)} />
          <List.Item 
            title="validate-delete a"
            onClick={()=>page.stateValidate.delete('a')} />
        </List>
      </Panel>
    </View>
  );
};