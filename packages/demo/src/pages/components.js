import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'
import NavBar from '@bnorth/components/lib/NavBar'
import TabBar from '@bnorth/components/lib/TabBar'


let items = [
  {title: 'cs', key: 'c_components'}, 
  {title: 'list', key: 'c_list'},
  {title: 'props', key: 'c_props'},
  {title: 'plugins', key: 'c_plugins'},
];
export default props=>{
  let { app, route, children } = props;
  
  return (
    <View>
      <NavBar>
        <NavBar.Item icon="left" iconProps={{nameDefault: '<'}} onClick={()=>app.router.back()} />
        <NavBar.Title>Components</NavBar.Title>
      </NavBar>
      <Panel main>
        {children[route.params.tab||'c_components']}
      </Panel>
      <TabBar b-style='solid' b-theme='primary' colorUnselectedOnTheme="disable">
        {items.map(v=>(
          <TabBar.Item 
            onClick={()=>app.router.replace(['/components', v.key])}
            selected={route.params.tab?route.params.tab===v.key:v.key==='c_components'}
            key={v.key}
            icon="heart">
            {v.title}
          </TabBar.Item >
        ))}
      </TabBar>
    </View>
  )
}