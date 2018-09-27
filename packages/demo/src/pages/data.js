import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'
import NavBar from '@bnorth/components/lib/NavBar'
import List from '@bnorth/components/lib/List'
import Button from '@bnorth/components/lib/Button'

let Component = props=>{
  let { app, page, stateData, stateInit, stateEvent, stateNetwork, stateValidate } = props;
  return (
    <View>
      <Panel main>
        <NavBar>
          <NavBar.Item icon="left" iconProps={{nameDefault: '<'}} onClick={()=>app.router.back()} />
          <NavBar.Title>Data</NavBar.Title>
        </NavBar>
        <List bc-margin-bottom->
          <List.Item part="header">state</List.Item>
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

        <List bc-margin-bottom->
          <List.Item part="header">plugin: Request</List.Item>
          <List.Item 
            title="network-fetchOnStart-click fetch" 
            onClick={()=>page.stateNetwork.fetch()} />
          <List.Item 
            title="network-update({a:1})" 
            onClick={()=>page.stateNetwork.update({a:1})} />
          <List.Item part="footer">
            <Button 
              className="padding-0" 
              onClick={()=>app.modal.show(JSON.stringify(stateNetwork),{role: 'popup', title: 'show data', hasTitleClose: true})}>
              show data
            </Button>
          </List.Item>
        </List>

        <List bc-margin-bottom->
          <List.Item part="header">plugin: validate</List.Item>
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

let Controller = app=>({
  stateInit: { initialization: {tick: 111} },
  stateEvent: { },
  onStateUpdated_stateEvent: (data, prevData)=>{app.notice.show(`${JSON.stringify(prevData)}->${JSON.stringify(data)}`)},

  stateNetwork: {state: app.Request, fetchOnStart: true,},

  stateValidate: {state: app.Validate, initialization: {a: 1}, rules: {a: 'required'} },
});


Component.controller = Controller;
export default Component;