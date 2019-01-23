/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import { transform } from '@bnorth/rich.css/lib/styles/animation'
import parseProps from './utils/props';
import Panel from './Panel';


/**
 * 图标组件
 * 
 * 支持多种模式的图标和样式，包括 svg 字体库图标，图片图标，字符图标和形状图标，样式固定在字体大小的宽度和高度
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
let Icon = aprops=>{
  let {
    name, defaultName, src, char, shape, rotate,
    component:Component, componentPanel, className, style, children, ...props
  } = parseProps(aprops, Icon.props);
  
  let classStr = 'display-inline';
  let classSet = ['width-1em', 'height-1em'];
  let styleSet = rotate?transform('rotate', String(rotate)+'deg'):{};

  if(shape) shape = Icon._shapes[shape]||shape;
  if(name) name = Icon._maps[name]||name;
  if(name&&!Icon._names.includes(name)) {
    char = defaultName||name;
    name = undefined;
  }

  if(name) {
    if(!componentPanel) componentPanel = 'svg';
    styleSet.strokeWidth = 0;
    styleSet.stroke = 'currentColor';
    styleSet.fill='currentColor';
    props.dangerouslySetInnerHTML = {__html: `<use xlink:href="#${name}"></use>`};
  }else if(src) {
    if(!componentPanel) componentPanel = 'img';
    props.src = src;
    props.alt = '';
  }else if(shape) {
    if(!componentPanel) componentPanel = 'svg';
    styleSet.strokeWidth = 0;
    styleSet.stroke = 'currentColor';
    styleSet.fill='currentColor';
    props.preserveAspectRatio = "none";
    props.viewBox = "0 0 100 100";
    props.children = typeof shape==='function'?shape():<path d={shape} />;
  }else if(char) {
    if(!componentPanel) componentPanel = 'span';
    classSet.push('display-inlineblock text-align-center line-height-1em');
    props.children = char[0];
  }else {
    classSet = [];
    props.children = children;
  }

  return <Component component={componentPanel} style={{...styleSet, ...style}} className={classes(classStr, classSet, className)} {...props} />
}

Icon.defaultProps = {};
/**
 * 设置 svg 字体库图标的图标映射名称
 * @attribute module:Icon.Icon.name
 * @type {string}
 */
/**
 * 设置 svg 字体库图片映射失败时，默认的字符图标字符
 * @attribute module:Icon.Icon.defaultName
 * @type {string}
 */
/**
 * 设置图片图片的图片路径
 * @attribute module:Icon.Icon.src
 * @type {string}
 */
/**
 * 设置字符图标的字符，需要是单字符
 * @attribute module:Icon.Icon.char
 * @type {string}
 */
/**
 * 设置图形图标的图形函数名称或者图形的 svg path 路径
 * @attribute module:Icon.Icon.shape
 * @type {string}
 */
/**
 * 设置浮动的容器。
 * @attribute module:Icon.Icon.rotate
 * @type {string}
 */
/**
 * 参见 BaseComponent
 */
Icon.defaultProps.component = Panel;

/**
 * svg 图标名字数组
 */
Icon._names = [];
/**
 * svg 图标的名称映射
 */
Icon._maps = {};
/**
 * 图形图标的图形函数与图形路径映射
 */
Icon._shapes = {
  triangle: 'M50 10 L90 90 L10 90 Z',
};

/**
 * 将 svg 字体库文件内容生成字体库元素和字体库名称数组
 * @param {string} - svg 字体库文件内容
 */
Icon.appendSvgIcons = function(svgStr) {
  let x = document.createElement('x');
  x.innerHTML = svgStr;
  let svg = x.querySelector('svg');
  if(!svg) return;
  Icon._names = [...Icon._names, ...Array.from(svg.querySelectorAll('defs symbol')).map(v=>v.id)];
  return document.body.appendChild(svg);
}
/**
 * 设置字体库名称映射
 * @param {string|object} - 字体库映射对象或者单个映射的值
 * @param {string} - 单个映射的名称，val 为 object 时，该参数无意义
 */
Icon.appendMap = function(val, name) {
  if(!val) return;

  if(typeof val==='object') {
    Icon._maps = {...Icon._maps, ...val}
  }else{
    Icon._maps[name] = val;
  }
}




export default Icon;
