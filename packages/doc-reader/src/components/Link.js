import React from 'react';
import List from '@bnorth/components/lib/List';


export default aprops=>{
  let {app, doc={}, type="type", noScope, noAccess, ...props} = aprops;

  return (
    <List.Item 
      autoArrow={false} b-theme="link" 
      onClick={doc.longname?(()=>doc.longname.startsWith('http')?(window.location.href=doc.longname):app.router.push(['/'+type, doc.longname])):null} 
      media={
        <span>
          {!noAccess&&doc.access?<span>[{doc.access}]</span>:null}
          {!noScope&&doc.scope&&doc.scope!=='static'?<span>[{doc.scope}]</span>:null}
        </span>
      }
      title={doc.name||doc.longname} mainProps={{className: 'flex-sub-flex-none width-full- scrollable-x-'}}
      after={doc.exportdefault?'(exports)':''}
      {...props} />
  );
}