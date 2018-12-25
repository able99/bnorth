import React from 'react';
import List from '@bnorth/components/lib/List';


export default aprops=>{
  let {app, doc={}, type="type", ...props} = aprops;

  return (
    <List.Item 
      autoArrow={false} b-theme="link" 
      onClick={doc.longname?(()=>app.router.push(['/'+type, doc.longname])):null} 
      media={doc.access?`[${doc.access}]`:''}
      title={doc.name||doc.longname} mainProps={{className: 'flex-sub-flex-none width-full- scrollable-x-'}}
      after={doc.exportdefault?'(exports)':''}
      {...props} />
  );
}