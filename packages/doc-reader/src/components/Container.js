import React from 'react';
import ReactMarkdown from 'react-markdown';
import Panel from '@bnorth/components/lib/Panel';
import List from '@bnorth/components/lib/List';
import Section from './Section';
import Params from './Params';
import Link from './Link';
import Type from './Type';


let Container = aprops=>{
  let {app, name, doc, doclets, type, isSub, ...props} = aprops;
  let isGlobal = type==='global';
  let isModule = type==='module';
  if(isGlobal) doc = {name: 'Global', longname: 'Global'}
  doc = doc||doclets.find(v=>v.longname===name&&((isModule&&v.kind==='module')||(!isModule&&v.kind!=='module')));
  if(!doc) return null;
  let isClass = doc.kind==='class';
  let isComponent = doc.kind==='component';
  let isPlugin = doc.kind==='plugin';
  let docs = [];
  if(isGlobal) docs = doclets.filter(v=>v.scope==='global');
  if(isModule) docs = doclets.filter(v=>v.memberof===name);
  if(isClass) docs = doclets.filter(v=>v.memberof===name);
  if(isComponent) docs = doclets.filter(v=>v.memberof===name);
  if(isPlugin) docs = doclets.filter(v=>v.memberof===name);

  let see = doc.see;
  let typedefs = docs.filter(v=>v.kind==='typedef');
  let members = docs.filter(v=>v.kind==='member');
  let constants = docs.filter(v=>v.kind==='constant');
  let vars = docs.filter(v=>v.kind==='var');
  let functions = docs.filter(v=>v.kind==='function');
  let components = docs.filter(v=>v.kind==='component');
  let classes = docs.filter(v=>v.kind==='class');
  let classnames = docs.filter(v=>v.kind==='classname');
  let plugins = docs.filter(v=>v.kind==='plugin');
  let attributes = docs.filter(v=>v.kind==='attribute');
  let constructor = isClass&&{ name: 'new '+doc.name+'()', description: doc.description, params: doc.params, }
  let properties = doc.properties||[];
  let params = (!isClass&&doc.params)||[];
  let returns = doc.returns||[];
  let defaults = doc.defaultvalue;

  return (
    <Panel {...props}>
      <Section title={
          <Panel>
            {isSub&&doc.scope&&doc.scope!=='global'&&doc.scope!=='instance'&&doc.kind!=='attribute'?<span>[{doc.scope}]</span>:null}
            {doc.access?<span>[{doc.access}]</span>:null}
            {!isSub&&doc.kind?<span>[{doc.kind}]</span>:null}
            {isSub&&doc.async?<span>[同步]</span>:null}
            <Panel inline>{isSub||doc.kind==='module'?doc.name.replace(/^exports\./i,''):doc.longname.replace(/^module:/i,'')}</Panel>
            {!isSub&&doc.exportdefault?<Panel inline>(exports)</Panel>:null}
            {isSub&&doc.kind==='function'?<Panel inline>()</Panel>:null}
            {isSub&&(doc.kind==='member'||doc.kind==='attribute')?<Panel inline>:<Type app={app} type={doc.type} /></Panel>:null}
          </Panel>
        } 
        type={isSub?'sub':'main'}>
        <List.Item desc={<ReactMarkdown source={isClass?doc.classdesc:doc.description} />}/>
        {doc.examples&&doc.examples.map((v,i)=>(
          <List.Item key={i} title="Example:"><ReactMarkdown source={v} /></List.Item>
        ))}
      </Section>

      {see?(
        <Section title="参见" type="section">
          {see.map(v=>(
            <Link key={v} app={app} doc={{name: v, longname: v}} />
          ))}
        </Section>
      ):null}

      {typedefs.length?(
        <Section title="Typedef" type="section">
          {typedefs.map(v=>(
            <Link key={v.longname} app={app} doc={v} />
          ))}
        </Section>
      ):null}

      {classes.length?(
        <Section title="Classes" type="section">
          {classes.map(v=>(
            <Link key={v.longname} app={app} doc={v} />
          ))}
        </Section>
      ):null}

      {plugins.length?(
        <Section title="Plugins" type="section">
          {plugins.map(v=>(
            <Link key={v.longname} app={app} doc={v} />
          ))}
        </Section>
      ):null}

      {components.length?(
        <Section title="Components" type="section">
          {components.map(v=>(
            <Link key={v.longname} app={app} doc={v} />
          ))}
        </Section>
      ):null}

      {classnames.length?(
        <Section title="Classnames" type="section">
          {classnames.map(v=>(
            <List.Item key={v.longname} ><Container app={app} doc={v} isSub /></List.Item>
          ))}
        </Section>
      ):null}

      {constructor?(
        <Section title="Constructor" type="section">
          <List.Item><Container app={app} doc={constructor} isSub /></List.Item>
        </Section>
      ):null}

      {members.length?(
        <Section title="Members" type="section">
          {members.map(v=>(
            <List.Item key={v.longname} ><Container app={app} doc={v} isSub /></List.Item>
          ))}
        </Section>
      ):null}

      {constants.length?(
        <Section title="Constants" type="section">
          {constants.map(v=>(
            <List.Item key={v.longname} ><Container app={app} doc={v} isSub /></List.Item>
          ))}
        </Section>
      ):null}

      {vars.length?(
        <Section title="Vars" type="section">
          {vars.map(v=>(
            <List.Item key={v.longname} ><Container app={app} doc={v} isSub /></List.Item>
          ))}
        </Section>
      ):null}

      {properties.length?(
        <Section title="Properties" type="key">
          <List.Item>
            <Params 
              app={app}   
              data={properties} />
          </List.Item>
        </Section>
      ):null}

      {attributes.length?(
        <Section title="Attributes" type="section">
          {attributes.map(v=>(
            <List.Item key={v.longname} ><Container app={app} doc={v} isSub /></List.Item>
          ))}
        </Section>
      ):null}

      {functions.length?(
        <Section key="functions" title="Methods:" type="section">
          {functions.map(v=>(
            <List.Item key={v.longname}><Container app={app} doc={v} isSub /></List.Item>
          ))}
        </Section>
      ):null}
      
      {params.length?(
        <Section title="Params" type="key">
          <List.Item>
            <Params 
              app={app}   
              data={params} />
          </List.Item>
        </Section>
      ):null}

      {returns.length?(
        <Section title="Returns" type="key">
          {returns.map((v,i)=>(
            <List.Item 
              key={v.longname||i} 
              title={<Type app={app} type={v.type}/>}
              desc={<ReactMarkdown source={v.description} />}>
            </List.Item>
          ))}
        </Section>
      ):null}

      {defaults?(
        <Section title="Default" type="key">
          <List.Item><pre><code>{defaults[0]==='{'||defaults[0]==='['?JSON.stringify(JSON.parse(defaults),null,2):defaults}</code></pre></List.Item>
        </Section>
      ):null}
    </Panel>
    
  )
}

export default Container;