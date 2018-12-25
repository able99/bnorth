import React from 'react';
import View from '@bnorth/components/lib/View';
import Panel from '@bnorth/components/lib/Panel';
import Menu from '../components/Menu'
import Container from '../components/Container'


let Component = props=>{
  let { app, stateDocs:{doclets=[]}={}, route:{name:type , params:{name}} } = props;
  
  return (
    <View bc-bg-color-white bc-padding-a- bc-flex-direction-h>
      <Panel main>
        <Container app={app} name={name} doclets={doclets} type={type} />
      </Panel>
      <Menu app={app} name={name} doclets={doclets} bs-width={250} bc-margin-left- />
    </View>
  )
}

Component.controller = (app,page)=>({
  stateDocs: app.router.getPage(page.props.route._idParent).stateDocs._id,
})

export default Component;