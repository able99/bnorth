import React from 'react';
import ReactMarkdown from 'react-markdown';
import List from '@bnorth/components/lib/List';


export default aprops=>{
  let {app, name, longname, desc, ...props} = aprops;

  return (
    <List.Item 
      autoArrow={false} 
      onClick={()=>app.router.push(['/', longname])} 
      title={name||longname} desc={<ReactMarkdown source={desc} />} {...props} />
  );
}