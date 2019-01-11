/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';


// Panel
// ------------------------------

/**
 * 小面板组件，基本的布局单位，其他组件一般使用该组件做基本组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
let Panel = aprops=>{
  let {
    main, inline, selected, status, hasBg, hasSelection,
    textThemeOnBg, bgThemeOnHollow, textThemeOnBgSelected, textThemeOnBgUnselected, textThemeUnselected, 
    component:Component, className, style, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, ...props
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
    classSet['border-none-top-'] = true;
    classSet['border-none-bottom-'] = true;
    classSet['border-none-left-'] = true;
    classSet['border-none-right-'] = true;
    classSet['bg-none-'] = true;
  }

  return <Component className={classes(classStr, classSet, className)} style={{...styleSet, ...style}} {...props} />
}

Panel.defaultProps = {};
/**
 * 设置为主模式，将开启 flex extend 样式和滚动样式
 * @attribute module:Panel.Panel.main
 * @type {boolean}
 */
/**
 * 设为为 inline 模式，将开启 display inline 样式
 * @attribute module:Panel.Panel.inline
 * @type {boolean}
 */
/**
 * 设置为选中状态，
 * @attribute module:Panel.Panel.selected
 * @type {boolean}
 */
/**
 * 设置为响应点击状态
 * @attribute module:Panel.Panel.status
 * @type {boolean}
 */
/**
 * 设置为有背景状态
 * @attribute module:Panel.Panel.hasBg
 * @type {boolean}
 */
/**
 * 设置为有响应选中状态
 * @attribute module:Panel.Panel.hasSelection
 * @type {boolean}
 */
/**
 * 设置文本主题，在有背景的面板上时
 * @type {string}
 */
Panel.defaultProps.textThemeOnBg = 'white';
/**
 * 设置背景主题，在镂空样式时
 * @type {string}
 */
Panel.defaultProps.bgThemeOnHollow = 'white'; 
/**
 * 设置文本主题，在有背景和在选择状态下
 * @type {string}
 */
Panel.defaultProps.textThemeOnBgSelected = 'white';
/**
 * 设置文本主题，在有背景和在未选择状态下
 * @type {string}
 */
Panel.defaultProps.textThemeOnBgUnselected = 'disable'; 
/**
 * 设置文本主题，在无背景和在未选择状态下
 * @type {string}
 */
Panel.defaultProps.textThemeUnselected = 'disable';
/**
 * 设置样式主题，根据 richcss color 的设置
 * @attribute module:Panel.Panel.b-theme
 * @type {string}
 */
/**
 * 设置样式风格，包括 plain，solid，hollow，underline
 * @attribute module:Panel.Panel.b-style
 * @type {string}
 */
/**
 * 设置样式尺寸，设置文本的字体大小，根据 richcss textSize 的配置
 * @attribute module:Panel.Panel.b-size
 * @type {string}
 */
/**
 * 设置映射组件
 */
Panel.defaultProps.component = 'div';


export default Panel;
