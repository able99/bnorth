import React from 'react';
import List from '@bnorth/components/lib/List';


export default aprops=>{
  let {app, title, type, ...props} = aprops;
  
  let bSize;
  let isUnderLine;

  if(type==='main') {
    bSize = '2x';
    isUnderLine = true;
  }else if(type==='section'){
    bSize = 'xxl';
    isUnderLine = true;
  }else if(type==='sub') {
    bSize = 'lg';
    isUnderLine = false;
  }else if(type==='menu') {
    bSize = 'lg';
    isUnderLine = true;
  }else if(type==='key'){
    bSize = '';
    isUnderLine = false;
  }

  return (
    <List 
      header={title} 
      headerProps={{
        'b-size': bSize, 
        'className': 'text-weight-bold',
        'bc-border-none-bottom-': !isUnderLine,
      }} 
      bc-margin-bottom-2x separatorInset
      {...props} />
  );
}