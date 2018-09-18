import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'


export default props=>{
  let { app, route, children } = props;
  return (
    <View>
      <Panel main>
        menu
        <a href='../demo/index.html'>demo</a>
      </Panel>
    </View>
  )
}