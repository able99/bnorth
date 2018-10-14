/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';


let Panel = aprops=>{
  let {
    main, inline, selected, status,
    colorOnTheme='white', colorOnHollow='white',
    component:Component='div', className, style, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, ...props
  } = parseProps(aprops, Panel.props);

  let classStr = 'position-relative';
  let classSet = {
    'scrollable-a-': main,
    'flex-sub-flex-extend': main,
    'display-inlineblock': inline,
    'status-': status,
  }
  let styleSet = {};

  if(bSize) classSet['text-size-'+(bSize==='true'?'':bSize)] = true;
  if(bStyle==='solid') {
    if(bTheme) {
      classSet['bg-color-'+(bTheme==='true'?'':bTheme)] = true;
      classSet['border-set-a-'+(bTheme==='true'?'':bTheme)] = true;
      classSet['text-color-'+(colorOnTheme==='true'?'':colorOnTheme)] = true;
    }else{
      classSet['bg-color-component'] = true;
      classSet['border-set-a-component'] = true;
    }
  }else if(bStyle==='hollow') {
    if(bTheme) {
      classSet['border-set-a-'+(bTheme==='true'?'':bTheme)] = true;
      classSet['text-color-'+(bTheme==='true'?'':bTheme)] = true;
    }else{
      classSet['border-set-a-'] = true;
      if(colorOnHollow===false) {
        classSet['bg-none-'] = true;
      }else {
        classSet['bg-color-'+(colorOnHollow===true?'':colorOnHollow)] = true;
      }
    }
  }else if(bStyle==='underline') {
    classSet['bg-none-'] = true;
    classSet['border-none-top-'] = true;
    classSet['border-none-left-'] = true;
    classSet['border-none-right-'] = true;
    if(selected) {
      if(bTheme) classSet['text-color-'+(bTheme==='true'?'':bTheme)] = true;
      classSet['border-set-bottom-'+(bTheme==='true'?'':bTheme)] = true;
      classSet['border-width-bottom-2'] = true;
    }else{
      classSet['border-set-bottom-'] = true;
      classSet['border-width-bottom-2'] = true;
      styleSet['borderColor'] = 'transparent';
    }
  }else if(bStyle==='plain') {
    classSet['border-none-a-'] = true;
    classSet['bg-none-'] = true;
    if(bTheme) classSet['text-color-'+(bTheme==='true'?'':bTheme)] = true;
  }else {
    if(bTheme) classSet['text-color-'+(bTheme==='true'?'':bTheme)] = true;
  }

  return <Component className={classes(classStr, classSet, className)} style={{...styleSet, ...style}} {...props} />
}


export default Panel;
