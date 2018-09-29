import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'


let Component = props=>{
  let { route } = props;
  
  return (
    <View>
      <Panel main>
       {JSON.stringify(route.params)}
      </Panel>
    </View>
  )
};


Component.controller = {
}


export default Component;