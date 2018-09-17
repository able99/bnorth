/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';


let Icon = aprops=>{
  let {
    name, nameDefault, src, chat, 
    component:Component, className, style, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);
  
  let classStr = 'display-inline width-1em height-1em';
  
  let classSet = [];
  if(bSize) classSet.push('text-size-'+(bSize===true?'':bSize));
  if(bTheme) classSet.push('text-color-'+(bTheme===true?'':bTheme));
  
  let styleSet = {};

  if(name) name = Icon._maps[name]||name;
  if(!Icon._names.includes(name)) {
    chat = nameDefault||name;
    name = undefined;
  }

  if(name) {
    if(!Component) Component = 'svg';
    styleSet = {strokeWidth: 0,stroke: 'currentColor',fill: 'currentColor'};
    props.dangerouslySetInnerHTML = {__html: `<use xlink:href="#${name}"></use>`};
  }else if(src) {
    if(!Component) Component = 'img';
    props.src = src;
    props.alt = '';
  }else if(chat) {
    if(!Component) Component = 'span';
    classSet.push('display-inlineblock text-align-center line-height-1em');
    props.children = chat[0];
  }else {
    return null;
  }

  return <Component style={{...styleSet, ...style}} className={cxm(classStr, classSet, className)} {...props} />
}


Icon._names = [];
Icon._maps = {};
Icon.appendSvgIcons = function(svgStr) {
  let x = document.createElement('x');
  x.innerHTML = svgStr;
  let svg = x.querySelector('svg');
  if(!svg) return;
  Icon._names = [...Icon._names, ...Array.from(svg.querySelectorAll('defs symbol')).map(v=>v.id)];
  return document.body.appendChild(svg);
}
Icon.appendMap = function(val, name) {
  if(!val) return;

  if(typeof val==='object') {
    Icon._maps = {...Icon._maps, ...val}
  }else{
    Icon._maps[name] = val;
  }
}


export default Icon;
