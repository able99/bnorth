/**
 * @module
 */
import React from 'react';
import { transform } from '@bnorth/rich.css/lib/styles/animation'
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';

/**
 * 页面的根组件，也可以不使用该组件作为根组件
 * @component 
 * @exportdefault
 */
let View = aprops=>{
  let {
    landscape, container,
    component:Component, componentPanel, className, style, children, ...props
  } = parseProps(aprops);

  let classStr = 'position-relative offset-a-start square-full overflow-a-hidden flex-display-block flex-direction-v bg-color-view';
  let styleSet = {};
  if(landscape && container.clientHeight>container.clientWidth) { styleSet = {
    width: container.clientHeight,
    height: container.clientWidth,
    top: (container.clientHeight - container.clientWidth) / 2,
    left: (container.clientWidth - container.clientHeight) / 2,
    ...transform('rotate', '90deg'),
  }}
  
  return (
    <Component 
      component={componentPanel} 
      data-container style={{...styleSet, ...style}} className={classes(classStr, className)} {...props}>
      {children}
    </Component>
  );
}

View.defaultProps = {
  /**
   * 开启横屏模式
   * @type {boolean}
   */
  landscape: undefined,
  /**
   * 页面的容器，为横屏时计算宽度使用
   * @type {element}
   * @default document.body
   */
  container: document.body,
  /**
   * 实际对应组件
   * @type {element|component}
   * @default Panel
   */
  component: Panel, 
  /**
   * 当实际组件为 panel 时，设置 panel 的对应组件
   * @type {(element|component)}
   */
  componentPanel: undefined,
}

export default View;