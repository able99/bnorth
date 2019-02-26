/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import { transform } from '@bnorth/rich.css/lib/styles/animation'
import BaseComponent from './BaseComponent';
import Panel from './Panel';


/**
 * 图标组件
 * 
 * 支持多种模式的图标和样式，包括 svg 字体库图标，图片图标，字符图标和形状图标，样式固定在字体大小的宽度和高度
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
let Icon = aprops=>{
  let {
    name, src, char, shape, rotate,
    component, ...props
  } = BaseComponent(aprops, Icon);
  
  let classNamePre = ['display-inline', 'width-1em', 'height-1em'];
  let stylePre = rotate?transform('rotate', String(rotate)+'deg'):{};

  if(name) {
    let [nameSvg, defaultNameSvg] = name.split(':');
    nameSvg = Icon._maps[nameSvg]||nameSvg;
    if(!Icon._names.includes(nameSvg)) { char = defaultNameSvg||nameSvg; nameSvg = undefined }
    name = nameSvg;
  }
  
  if(shape) {
    shape = Icon._shapes[shape]||shape;
  }

  if(name) {
    if(!component) component = 'svg';
    stylePre.strokeWidth = 0;
    stylePre.stroke = 'currentColor';
    stylePre.fill='currentColor';
    props.dangerouslySetInnerHTML = {__html: `<use xlink:href="#${name}"></use>`};
    props.children = null;
  }else if(src) {
    if(!component) component = 'img';
    props.src = src;
    props.alt = '';
  }else if(shape) {
    if(!component) component = 'svg';
    stylePre.strokeWidth = 0;
    stylePre.stroke = 'currentColor';
    stylePre.fill='currentColor';
    props.preserveAspectRatio = "none";
    props.viewBox = "0 0 100 100";
    props.children = typeof shape==='function'?shape():<path d={shape} />;
  }else if(char) {
    if(!component) component = 'span';
    classNamePre.push('display-inlineblock text-align-center line-height-1em');
    props.children = char[0];
  }else {
    classNamePre = [];
  }

  return <Panel component={component} classNamePre={classNamePre} stylePre={stylePre} {...props} />
}

Icon.defaultProps = {};
/**
 * 设置 svg 字体库图标的图标映射名称，如果设置没有 svg 图标时的默认字符，使用 : 分隔符，比如 name="star:^"
 * @attribute module:Icon.Icon.name
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




/**
 * 图标小面板组件，扩展小面板组件，提供图标组件与面板内容混排的能力
 * @component
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Container~Container
 */
let PanelIcon = aprops=>{
  let {
    selected, 
    name, src, char, shape, iconSelected, rotate, iconProps, 
    title, titleProps, 
    children, ...props
  } = BaseComponent(aprops, PanelIcon, {isContainer: true});

  return (
    <Panel.Container type="flex"  position="left" justify="center" align="center" selected={selected} {...props}>
      <Icon 
        name={name&&(selected&&iconSelected?iconSelected:name)}
        src={src&&(selected&&iconSelected?iconSelected:src)}
        char={char&&(selected&&iconSelected?iconSelected:char)}
        shape={shape&&(selected&&iconSelected?iconSelected:shape)}
        rotate={rotate}
        {...iconProps} />
      {title||children?<Panel bc-text-truncate-1- {...titleProps}>{title}{children}</Panel>:null}
    </Panel.Container>
  );
}

PanelIcon.defaultProps = {};
/**
 * Icon 的属性，参见 Icon
 * @attribute module:Icon~PanelIcon.icon*
 * @type {string}
 */
/**
 * 设置 icon，src，char 或 shape 在选中时的对应属性，不设置则选中不选中没有区别
 * @attribute module:Icon~PanelIcon.iconSelected
 * @type {string}
 */
/**
 * 设置图标子组件的属性
 * @attribute module:Icon~PanelIcon.iconProps
 * @type {object}
 */
/**
 * 设置标题内容，也可以使用 children
 * @attribute module:Icon~PanelIcon.title
 * @type {string}
 */
/**
 * 设置标题内容子组件的属性
 * @attribute module:Icon~PanelIcon.titleProps
 * @type {object}
 */

export { PanelIcon };