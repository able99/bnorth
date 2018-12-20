import React from 'react';
import ReactMarkdown from 'react-markdown';
import Panel from '@bnorth/components/lib/Panel';
import List from '@bnorth/components/lib/List';
import Section from './Section';
import Params from './Params';
import Link from './Link';
import Type from './Type';


let Container = aprops=>{
  let {app, name, doc, stateDocs, isSub, fromModule, kind, ...props} = aprops;
  doc = doc||(name&&stateDocs.find(v=>v.longname===name));
  if(!doc) return null;
  if(kind) doc.kind = kind;
  let docs = name&&stateDocs.filter(v=>doc.isGlobal?v.scope==='global':v.memberof===name);
  let typedefs = name?docs.filter(v=>v.kind==='typedef'):[];
  let members = name?docs.filter(v=>v.kind==='member'):[];
  let functions = name?docs.filter(v=>v.kind==='function'):[];
  let components = name?docs.filter(v=>v.kind==='component'):[];
  let classes = name?docs.filter(v=>v.kind==='classes'):[];
  let attributes = name?docs.filter(v=>v.kind==='attribute'):[];
  let properties = doc.properties||[];
  let params = (!name&&doc.params)||[];
  let returns = (!name&&doc.returns)||[];
  let defaults = (!name)&&doc.defaultvalue;

  return (
    <Panel {...props}>
      <Section title={
          <Panel>
            {isSub&&doc.scope&&fromModule&&doc.scope!=='global'&&doc.scope!=='static'?<span>[{doc.scope}]</span>:null}
            {isSub&&doc.scope&&!fromModule&&doc.scope!=='instance'&&doc.kind!=='attribute'?<span>[{doc.scope}]</span>:null}
            {doc.kind==='module'?<span>[</span>:null}
            {doc.kind==='component'?<span>{'<'}</span>:null}
            {doc.kind==='typedef'?<span>type:</span>:null}
            {doc.kind==='class'?<span>class:</span>:null}
            <Panel inline>{isSub||doc.kind==='module'?doc.name:doc.longname.replace(/^module:/i,'')}</Panel>
            {doc.kind==='module'?<span>]</span>:null}
            {doc.kind==='component'?<span>{'>'}</span>:null}
            {doc.kind==='function'?<Panel inline>()</Panel>:null}
            {doc.kind==='member'?<Panel inline>:<Type app={app} data={doc.type} /></Panel>:null}
          </Panel>
        } 
        type={isSub?'sub':'main'}>
        <List.Item desc={<ReactMarkdown source={doc.classdesc||doc.description} />}/>
        {doc.examples&&doc.examples.map(v=>(
          <List.Item title="Example:" titleProps={{className: 'border-set-bottom-'}} className="bg-color-component margin-top- padding-a- padding-left- border-set-a-"><ReactMarkdown source={v} /></List.Item>
        ))}
      </Section>

      {typedefs.length?(
        <Section title="Typedef" type="section">
          {typedefs.map(v=>(
            <Link key={v.longname} app={app} name={v.name} longname={v.longname} desc={v.description} />
          ))}
        </Section>
      ):null}

      {classes.length?(
        <Section title="Classes" type="section">
          {classes.map(v=>(
            <Link key={v.longname} app={app} name={v.name} longname={v.longname} desc={v.classdesc} />
          ))}
        </Section>
      ):null}

      {components.length?(
        <Section title="Components" type="section">
          {components.map(v=>(
            <Link key={v.longname} app={app} name={v.name} longname={v.longname} desc={v.classdesc} />
          ))}
        </Section>
      ):null}

      {members.length||properties.length?(
        <Section title="Members:" type="section">
          {members.map(v=>(
            <List.Item key={v.longname} ><Container app={app} doc={v} isSub fromModule={doc.kind==='module'} /></List.Item>
          ))}
          {properties.map((v,i)=>(
            <List.Item key={v.longname||i} ><Container app={app} doc={v} kind="member" isSub /></List.Item>
          ))}
        </Section>
      ):null}

      {attributes.length?(
        <Section title="Attributes:" type="section">
          {attributes.map(v=>(
            <List.Item key={v.longname} ><Container app={app} doc={v} isSub fromModule={doc.kind==='module'} /></List.Item>
          ))}
        </Section>
      ):null}

      {functions.length?(
        <Section key="functions" title="Methods:" type="section">
          {functions.map(v=>(
            <List.Item key={v.longname}><Container app={app} doc={v} isSub fromModule={doc.kind==='module'} /></List.Item>
          ))}
        </Section>
      ):null}
      
      {params.length?(
        <Section title="Params:" type="key">
          <List.Item>
            <Params 
              app={app}   
              data={(params||[]).map(v=>({
                name: v.name, type: v.type, desc: v.description, 
              }))} />
          </List.Item>
        </Section>
      ):null}

      {returns.length?(
        <Section title="Returns:" type="key">
          {returns.map((v,i)=>(
            <List.Item 
              key={v.longname||i} 
              title={<Panel>return: <Type app={app} data={v.type}/></Panel>}
              desc={<ReactMarkdown source={v.description} />}>
            </List.Item>
          ))}
        </Section>
      ):null}

      {defaults?(
        <Section title="Default:" type="key">
          <List.Item>{defaults}</List.Item>
        </Section>
      ):null}
    </Panel>
    
  )
}

export default Container;