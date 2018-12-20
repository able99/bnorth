import React from 'react';
import ReactMarkdown from 'react-markdown';
import View from '@bnorth/components/lib/View';
import Panel from '@bnorth/components/lib/Panel';
import Menu from '../components/Menu'
import Container from '../components/Container'


let Component = props=>{
  let { app, stateDocs:{package:packageObj, readme, doclets=[]}, route:{params:{name}} } = props;

  return (
    <View bc-bg-color-white bc-padding-a- bc-flex-direction-h>
      <Panel main>
        {name?<Container app={app} name={name} stateDocs={doclets} />:null}
        {!name?(
          <ReactMarkdown source={readme} />
        ):null}
        {!name&&packageObj?(
          <Panel className="margin-a- padding-a- text-align-center" b-theme="light">
            <Panel inline>
              <Panel>{packageObj.name}</Panel>
              <Panel>Ver:{packageObj.version}</Panel>
              <Panel>auth{packageObj.auth}</Panel>
            </Panel>
          </Panel>
        ):null}
      </Panel>
      <Menu app={app} name={name} stateDocs={doclets} bs-width={250} bc-margin-left- />
    </View>
  )
}

Component.controller = (app,page)=>{
  return {
    stateDocs: app.plugins.getByName('docs').stateDocs._id,
  }
}

export default Component;