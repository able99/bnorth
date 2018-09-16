import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'
import TabBar from '@bnorth/components/lib/TabBar'


let items = [
  {title: '组件', key: 'components'}, 
  {title: '路由', key: 'router'},
  {title: '数据', key: 'data'},
  {title: '其他', key: 'plugins'},
];
export default props=>{
  let { app, route, children } = props;
  return (
    <View>
      <Panel main>
        {children[route.params.tab||'components']}
      </Panel>
      <TabBar b-style='solid' b-theme='primary' itemProps={{colorUnactiveOnTheme:'disable'}}>
        {items.map(v=>(
          <TabBar.Item 
            onClick={()=>app.router.replace(['/', v.key])}
            selected={route.params.tab?route.params.tab===v.key:v.key==='components'}
            key={v.key}
            title={v.title} />
        ))}
      </TabBar>
    </View>
  )
}