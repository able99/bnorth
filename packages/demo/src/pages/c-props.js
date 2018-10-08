import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel.PullRefresh'
import Prop from '../components/props'


let proplist = {
  'b-style': ['solid', 'hollow', 'plain', 'underline'],
  'b-theme': ['primary', 'alert', 'success'],
  'b-size': ['xs', 'sm', 'lg', 'xl'],
  'selected': undefined,
  'active': undefined,
  'disabled': undefined,
  'bc-margin-a': ['0', 'xs', 'sm', 'lg', 'xl'],
  'bc-padding-a': ['0', 'xs', 'sm', 'lg', 'xl'],
  'bc-border-radius': ['2', '5', '10', 'rounded'],
  'bc-border-set-a-': undefined,
}

let Component = aprops=>{
  let { page, stateCommonProps } = aprops;

  return (
    <View>
      <Panel main bc-bg-color-white bc-padding-a->
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