/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';


let Panel = aprops=>{
  let {
    main, inline,
    colorOnTheme='white',
    component:Component='div', className, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, ...props
  } = genCommonProps(aprops);

  let classStr = 'position-relative';

  let classSet = {
    'scrollable-a-': main,
    'flex-sub-flex-extend': main,
    'display-inlineblock': inline,
  }

  if(bSize) classSet['text-size-'+(bSize==='true'?'':bSize)] = true;
    
  if(bStyle==='solid'&&bTheme) {
    classSet['bg-color-'+(bTheme==='true'?'':bTheme)] = true;
    classSet['text-color-'+(colorOnTheme==='true'?'':colorOnTheme)] = true;
  }else if(bStyle==='solid'&&!bTheme) {
    classSet['bg-color-component'] = true;
  }else if(bStyle==='hollow'&&bTheme) {
    classSet['border-set-a-'+(bTheme==='true'?'':bTheme)] = true;
    classSet['text-color-'+(bTheme==='true'?'':bTheme)] = true;
  }else if(bStyle==='hollow'&&!bTheme) {
    classSet['border-set-a-'] = true;
  }{
    if(bTheme) classSet['text-color-'+(bTheme==='true'?'':bTheme)] = true;
  }
  
  return <Component className={cxm(classStr, classSet, className)} {...props} />
}


export default Panel;
