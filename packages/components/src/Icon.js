/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';


let Icon = aprops=>{
  let {
    name, defaultName, src, char, 
    component:Component=Panel, componentPanel, className, style, children, ...props
  } = parseProps(aprops, Icon.props);
  
  let classStr = 'display-inline width-1em height-1em';
  let classSet = [];
  let styleSet = {};

  if(name) name = Icon._maps[name]||name;
  if(name&&!Icon._names.includes(name)) {
    char = defaultName||name;
    name = undefined;
  }

  if(name) {
    if(!componentPanel) componentPanel = 'svg';
    styleSet = {strokeWidth: 0,stroke: 'currentColor',fill: 'currentColor'};
    props.dangerouslySetInnerHTML = {__html: `<use xlink:href="#${name}"></use>`};
  }else if(src) {
    if(!componentPanel) componentPanel = 'img';
    props.src = src;
    props.alt = '';
  }else if(char) {
    if(!componentPanel) componentPanel = 'span';
    classSet.push('display-inlineblock text-align-center line-height-1em');
    props.children = char[0];
  }else {
    return null;
  }

  return <Component component={componentPanel} style={{...styleSet, ...style}} className={classes(classStr, classSet, className)} {...props} />
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
