import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';


export default (aprops) => {
  let {
    mask,
    component:Component=Panel, className, ...props
  } = parseProps(aprops);

  let classStr = 'position-absolute square-full offset-left-start offset-top-start overflow-a-hidden';

  let classSet = {
    ['bg-color-'+(mask===true?'mask':mask)]: mask,
  };

  return <Component className={classes(classStr,classSet,className)} {...props} />
}