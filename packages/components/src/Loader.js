/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';

 
let Loader = aprops=>{
  let {
    type='circle', 
    'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, ...props
  } = genCommonProps(aprops);

  let Component = Loader['_'+type];
  if(!Component) return null;

  let classSet = [];
  if(bSize) classSet.push('text-size-'+(bSize===true?'':bSize));
  if(bTheme) classSet.push('text-color-'+(bTheme===true?'':bTheme));

  return <Component classSet={classSet} {...props}/>
}

Loader._line = aprops=>{
  let {
    isProgress, progress, timeout='2s', color="currentColor", colorReverse='lightgray',
    classSet, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'width-full height-1em';

  return (
    <svg preserveAspectRatio="none" viewBox="0 0 100 5" className={cxm(classStr, classSet, className)} {...props}>
      <line 
        x1="0" y1="2" x2="100" y2="2" strokeWidth="5" stroke={colorReverse} fill="none" />
      <line 
        x1="0" y1="2" x2="100" y2="2" strokeWidth="5" stroke={color} fill="none" 
        className={isProgress?"transition-set-":null}
        strokeDasharray={isProgress?`${2.51*(progress||0)},251`:'10,100'}>
        {!isProgress?<animate attributeName="stroke-dashoffset" values="0;-90;0" dur={timeout} repeatCount="indefinite" />:null}
      </line>
      {children}
    </svg>
  );
}

Loader._circle = aprops=>{
  let {
    isProgress, progress, timeout='2s', color="currentColor", colorReverse='lightgray',
    classSet, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'width-1em height-1em';

  return (
    <svg viewBox="0 0 100 100"  className={cxm(classStr, classSet, className)} {...props}>
      <circle 
        cx="50" cy="50" r="40" strokeWidth="15" stroke={colorReverse} fill="none" />
      <circle 
        cx="50" cy="50" r="40" strokeWidth="15" stroke={color} fill="none" 
        transform="matrix(0,-1,1,0,0,100)" 
        className={isProgress?"transition-set-":null}
        strokeDasharray={isProgress?`${2.51*(progress||0)},251`:"10,251"}>
        {!isProgress?<animate attributeName="stroke-dashoffset" from="0" to="-251" dur={timeout} repeatCount="indefinite" />:null}
      </circle>
      {children}
    </svg>
  );
}


export default Loader;
