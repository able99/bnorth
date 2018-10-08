import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'
import NavBar from '@bnorth/components/lib/NavBar'


export default aprops=>{
  let { app } = aprops;

  return (
    <View>
      <Panel main>
        <NavBar>
          <NavBar.Item icon="left" iconProps={{defaultName: '<'}} onClick={()=>app.router.back()} />
          <NavBar.Title>Plugins</NavBar.Title>
        </NavBar>
      </Panel>
    </View>
  );
};