import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel.PullRefresh'
import Prop from '../components/props'


let proplist = {
  'b-style': ['solid', 'hollow', 'plain'],
  'b-theme': ['primary', 'alert', 'success'],
  'b-size': ['xs', 'sm', 'lg', 'xl'],
}

let Component = aprops=>{
  let { page, stateCommonProps } = aprops;

  return (
    <View>
      <Panel main>
        {Object.entries(proplist).map(([k,v])=><Prop key={k} title={k} option={v} state={page.stateCommonProps} stateData={stateCommonProps} />)}
      </Panel>
    </View>
  );
};


let Controller = app=>({
  stateCommonProps: app.plugins.getByName(app._id).stateCommonProps._id,
});


Component.controller = Controller;
export default Component;