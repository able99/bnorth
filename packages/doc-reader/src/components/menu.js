import React from 'react';
import Panel from '@bnorth/components/lib/Panel';
import { getDocName } from '../utils'
import Link from './Link';
import Section from './Section';


let categories = [{title: 'Modules', kind: 'module'}, {title: 'Components', kind: 'component'}, {title: 'Classes', kind: 'class'}, {title: 'Typedefs', kind: 'typedef'}, {title: 'Classnames', kind: 'classname'}, {title: 'Plugins', kind: 'plugin'}]
export default aprops=>{
  let {app, doclets, ...props} = aprops;

  return (
    <Panel bc-border-set-a- bc-scrollable-y- {...props}>
      <Section type="menu">
        <Link app={app} doc={{name:"Home", longname:"home"}} type="" />
      </Section>
      <Section type="menu">
        <Link app={app} doc={{name:"Global", longname:"global"}} type="global" />
      </Section>
      {categories.map(v=>{
        let docs = doclets.filter(vv=>vv.kind===v.kind&&vv.access!=='private');
        return docs.length?(
          <Section key={v.title} title={v.title} type="menu">
            {docs.map(vv=>(
              <Link 
                key={vv.longname} app={app} 
                doc={{name: getDocName(vv), longname: vv.longname, exportdefault: vv.exportdefault}} 
                type={v.kind==='global'||v.kind==='module'?v.kind:'type'} />
            ))}
          </Section>
        ):null;
      })}
    </Panel>
  )
}