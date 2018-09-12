import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'
import List from '@bnorth/components/lib/List'

export default props=>{
  let { app } = props;
  return (
    <View>
      <Panel main>
        <List>
          <List.Item title="dynamic" onClick={()=>app.router.push('dynamic')} />
        </List>
        <List className="margin-top">
          <List.Item title="require:param1" after="p1" onClick={()=>app.router.push(['require_param', 'p1'])} />
          <List.Item title="require:param1" after="p1, p2" onClick={()=>app.router.push(['require_param', 'p1', 'p2'])} />
          <List.Item title="require:param1" after="none" onClick={()=>app.router.push('require_param')} />
        </List>
        <List className="margin-top">
          <List.Item title="option_param:param1?" after="p1" onClick={()=>app.router.push(['option_param', 'p1'])} />
          <List.Item title="option_param:param1?" after="p1, p2" onClick={()=>app.router.push(['option_param', 'p1', 'p2'])} />
          <List.Item title="option_param:param1?" after="none" onClick={()=>app.router.push('option_param')} />
        </List>
      </Panel>
    </View>
  );
};