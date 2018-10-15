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
    hasBg, hasSelection,
    textThemeOnBg='white', bgThemeOnHollow='white', textThemeOnBgSelected='white', textThemeOnBgUnselected='disable', textThemeUnselected='disable', 
    component:Component='div', className, style, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, ...props
  } = parseProps(aprops, Panel.props);
  if(hasBg===undefined) hasBg = bStyle==='solid'&&bTheme;
  if(hasSelection===undefined) hasSelection = bStyle==='underline';

  let classStr = 'position-relative';
  let classSet = {
    'scrollable-a-': main,
    'flex-sub-flex-extend': main,
    'display-inlineblock': inline,
    'status-': status,
  }
  let styleSet = {};

  let textTheme;
  if(hasSelection) textTheme = hasBg?(selected?textThemeOnBgSelected:textThemeOnBgUnselected):(selected?(bTheme||false):textThemeUnselected);
  if(!hasSelection) textTheme = hasBg?textThemeOnBg:bTheme;
  textTheme = textTheme?(textTheme===true?'':textTheme):false; 
  classSet['text-color-'+textTheme] = textTheme!==false;

  classSet['text-size-'+(bSize==='true'?'':bSize)] = bSize;

  if(bStyle==='solid') {
    let theme = bTheme?(bTheme===true?'':bTheme):(bTheme===false?false:'component');
    classSet['bg-color-'+theme] = theme!==false;
    classSet['border-set-a-'+theme] = theme!==false;
  }else if(bStyle==='hollow') {
    let theme = bTheme?(bTheme===true?'':bTheme):(bTheme===false?false:'');
    classSet['border-set-a-'+theme] = theme!==false;
    classSet[bgThemeOnHollow===false?'bg-none-':('bg-color-'+(bgThemeOnHollow===true?'':bgThemeOnHollow))] = true;
  }else if(bStyle==='underline') {
    let theme = bTheme?(bTheme===true?'':bTheme):(bTheme===false?false:'');
    classSet['bg-none-'] = true;
    classSet['border-none-top-'] = true;
    classSet['border-none-left-'] = true;
    classSet['border-none-right-'] = true;
    classSet['border-width-bottom-2'] = true;
    classSet['border-set-bottom-'+theme] = theme!==false;
    if(!selected) styleSet['borderColor'] = 'transparent';
  }else if(bStyle==='plain') {
    classSet['border-none-a-'] = true;
    classSet['bg-none-'] = true;
  }

  return <Component className={classes(classStr, classSet, className)} style={{...styleSet, ...style}} {...props} />
}


export default Panel;
