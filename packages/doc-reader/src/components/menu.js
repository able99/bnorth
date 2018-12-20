import React from 'react';
import Panel from '@bnorth/components/lib/Panel';
import Link from './Link';
import Section from './Section';


let categories = [{title: 'Modules', kind: 'module'}, {title: 'Components', kind: 'component'}, {title: 'Classes', kind: 'class'}, {title: 'Typedefs', kind: 'typedef'}]
export default aprops=>{
  let {app, stateDocs, ...props} = aprops;

  return (
    <Panel bc-border-set-a- bc-scrollable-y- {...props}>
      {categories.map(v=>{
        let docs = stateDocs.filter(vv=>vv.kind===v.kind);
        return docs.length?(
          <Section key={v.title} title={v.title} type="menu">
            {docs.map(vv=>(
              <Link key={vv.longname} app={app} name={vv.longname.replace(/^module:/i,'')} longname={vv.longname} />
            ))}
          </Section>
        ):null;
      })}
    </Panel>
  )
}