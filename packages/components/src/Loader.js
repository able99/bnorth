/**
 * @module
 */
import React from 'react';
import { transiton } from '@bnorth/rich.css/lib/styles/animation';
import classes from '@bnorth/rich.css/lib/classes'; 
import BaseComponent from './BaseComponent';
import Panel from './Panel';

 
/**
 * 进度显示组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
let Loader = aprops=>{
  let { type, types, timeoutTransition, timeoutAnimation, isProgress, progress, color, colorReverse, ...props } = BaseComponent(aprops, Loader);
  let component = types[type];
  if(!component) return null;

  return (
    <Panel 
      timeout={isProgress?timeoutTransition:timeoutAnimation} isProgress={isProgress} progress={progress} color={color} colorReverse={colorReverse}
      componentTransform={component} {...props} />
  );
}

Loader.defaultProps = {};
/**
 * 显示的样式，默认支持 line 和 circle，可以通过给 Loader.xxx 赋值，增加新的样式
 * @type {string}
 */
Loader.defaultProps.type = 'circle';
/**
 * 作为进度条时，进度改变时的渐变动画时间
 * @type {string}
 */
Loader.defaultProps.timeoutTransition = '250ms';
/**
 * 作为加载中等待动画时，帧动画时间
 * @type {string}
 */
Loader.defaultProps.timeoutAnimation = '2s';
/**
 * 设置为进度条或者是加载中等待动画
 * @type {boolean}
 */
Loader.defaultProps.isProgress = false;
/**
 * 作为进度条时，进度的百分比， 0-100
 * @type {number}
 */
Loader.defaultProps.progress = 0;
/**
 * 设置主颜色，一般不用设置，可以设置主题色
 * @type {string}
 */
Loader.defaultProps.color = 'currentColor';
/**
 * 设置辅助色，进度条的反色颜色，取值为 css 颜色
 * @type {string}
 */
Loader.defaultProps.colorReverse = 'lightgray';


Object.defineProperty(Loader,"Loader",{ get:function(){ return Loader }, set:function(val){ Loader = val }})
export default Loader;




/**
 * 进度显示组件的线性样式
 * @component 
 * @private
 * @augments BaseComponent
 * @augments module:Loader.Loader
 */
let Line = aprops=>{
  let {
    isProgress, progress, timeout, color, colorReverse,
    className, children, ...props
  } = BaseComponent(aprops, Line);

  let classStr = 'width-full height-1em';

  return (
    <svg preserveAspectRatio="none" viewBox="0 0 100 5" className={classes(classStr, className)} {...props}>
      <line 
        x1="0" y1="2" x2="100" y2="2" strokeWidth="5" stroke={colorReverse} fill="none" />
      <line 
        x1="0" y1="2" x2="100" y2="2" strokeWidth="5" stroke={color} fill="none" 
        style={isProgress?transiton(timeout):null}
        strokeDasharray={isProgress?`${progress},100`:'10,100'}>
        {!isProgress?<animate attributeName="stroke-dashoffset" values="0;-90;0" dur={timeout} repeatCount="indefinite" />:null}
      </line>
      {children}
    </svg>
  );
}

Line.defaultProps = {};

Object.defineProperty(Loader,"Line",{ get:function(){ return Line }, set:function(val){ Line = val }})



/**
 * 进度显示组件的圆环样式
 * @component 
 * @private
 * @augments BaseComponent
 * @augments module:Loader.Loader
 */
let Circle = aprops=>{
  let {
    isProgress, progress, timeout, color, colorReverse,
    className, children, ...props
  } = BaseComponent(aprops, Circle);

  let classStr = 'width-1em height-1em';

  return (
    <svg viewBox="0 0 100 100"  className={classes(classStr, className)} {...props}>
      <circle 
        cx="50" cy="50" r="40" strokeWidth="20" stroke={colorReverse} fill="none" />
      <circle 
        cx="50" cy="50" r="40" strokeWidth="20" stroke={color} fill="none" 
        transform="rotate(-90,50,50)" 
        style={isProgress?transiton(timeout):null}
        strokeDasharray={isProgress?`${2.51*(progress||0)},251`:"50,251"}>
        {!isProgress?<animate attributeName="stroke-dashoffset" from="0" to="-251" dur={timeout} repeatCount="indefinite" />:null}
      </circle>
      {children}
    </svg>
  );
}

Object.defineProperty(Loader,"Circle",{ get:function(){ return Circle }, set:function(val){ Circle = val }})

Circle.defaultProps = {};




Loader.defaultProps.types = {
  line: Line,
  circle: Circle,
}





/**
 * 加载动画小面板组件，扩展小面板组件，提供加载动画组件与面板内容混排的能力
 * @component
 * @mount Panel.Loader
 * @augments BaseComponent
 * @augments Panel.module:Container~Container
 */
export let PanelLoader = aprops=>{
  let { isProgress, progress, loaderProps, title, titleProps, children, ...props } = BaseComponent(aprops);

  return (
    <Panel.Container _containerProps={aprops} type="flex"  position="left" justify="center" align="center" {...props}>
      <Loader isProgress={isProgress} progress={progress} {...loaderProps} />
      {title||children?<Panel bc-text-truncate-1 {...titleProps} >{title}{children}</Panel>:null}
    </Panel.Container>
  );
}

PanelLoader.defaultProps = {};
/**
 * Loader 的属性, 参见 Loader
 * @attribute Panel.module:Loader~PanelLoader.loader*
 * @type {*}
 */
/**
 * 设置图标子组件的属性
 * @attribute Panel.module:Loader~PanelLoader.loaderProps
 * @type {object}
 */
/**
 * 设置文字，也可以使用 children
 * @attribute Panel.module:Loader~PanelLoader.title
 * @type {string}
 */
/**
 * 设置内容子组件的属性
 * @attribute Panel.module:Loader~PanelLoader.titleProps
 * @type {object}
 */

Object.defineProperty(Loader,"PanelLoader",{ get:function(){ return PanelLoader }, set:function(val){ PanelLoader = val }})