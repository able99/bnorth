import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import Panel from './Panel';


export default (aprops) => {
  let {
    mask,
    component:Component=Panel, className, ...props
  } = genCommonProps(aprops);

  let classStr = 'position-absolute square-full offset-left-start offset-top-start overflow-a-hidden';

  let classSet = {
    ['bg-color-'+(mask===true?'mask':mask)]: mask,
  };

  return <Component className={cxm(classStr,classSet,className)} {...props} />
}