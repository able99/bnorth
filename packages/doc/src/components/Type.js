import React from 'react';
import Panel from '@bnorth/components/lib/Panel';
import { trimModuleName } from '../utils';
import Link from './Link';

let types = ['boolean', 'string', 'number', 'object', 'Object', 'array', 'Array', '*', 'any', 'class', 'Class', 'function', 'promise', 'Error', 'event', 'component', 'element'];
export default props=>{
  let {app, type:{names=[]}={},variable,nullable,optional} = props;

  return (
    <Panel inline className="flex-display-inline flex-align-center">
      {variable?<Panel inline>[可变]</Panel>:null}
      {optional?<Panel inline>[可选]</Panel>:null}
      {nullable?<Panel inline>[可空]</Panel>:null}
      {nullable===false?<Panel inline>[必选]</Panel>:null}
      {names.map((v,i)=>{
        let isArray = v.startsWith('Array.<');
        v = isArray?v.slice(7,-1):v;
        let normal = types.includes(v);
        return (
          <React.Fragment key={i}>
            {i?<span>|</span>:null}
            <Link 
              app={app} bc-border-none-bottom- bc-text-decoration-underline={!normal}
              doc={{name: normal?v:v.split(':').slice(-1)[0], name: trimModuleName(v)+(isArray?'[]':''), longname:!normal&&v}} />
          </React.Fragment>
        )
      })}
    </Panel>
  )
}