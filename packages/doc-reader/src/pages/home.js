import React from 'react';
import ReactMarkdown from 'react-markdown';
import View from '@bnorth/components/lib/View';
import Panel from '@bnorth/components/lib/Panel';
import Menu from '../components/Menu'


let Component = props=>{
  let { app, stateDocs:{package:packageObj, readme, doclets=[]}={}, route:{active,params:{name}} } = props;
  
  return !active?null:(
    <View bc-bg-color-white bc-padding-a- bc-flex-direction-h>
      <Panel main>
        {readme?(
          <ReactMarkdown source={readme} />
        ):null}
        {packageObj?(
          <Panel className="margin-a- padding-a- text-align-center border-set-top-" b-theme="light">
            <Panel inline>
              <Panel>{packageObj.name}</Panel>
              <Panel>Ver:{packageObj.version}</Panel>
              <Panel>author:{packageObj.author}</Panel>
              <Panel>homepage:{packageObj.homepage}</Panel>
              <Panel>license:{packageObj.license}</Panel>
            </Panel>
          </Panel>
        ):null}
      </Panel>
      <Menu app={app} name={name} doclets={doclets} bs-width={250} bc-margin-left- />
    </View>
  )
}

Component.controller = (app,page)=>({
  stateDocs: {
    state: app.Request, fetchOnStart: true,
    url: './docs.json',
    onStateUpdated: data=>{app.doc = data}
  },
})

export default Component;