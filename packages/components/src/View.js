/**
 * @module
 */
import React from 'react';
import { transform } from '@bnorth/rich.css/lib/styles/animation'
import classes from '@bnorth/rich.css/lib/classes'; 
import BaseComponent from './BaseComponent';
import Panel from './Panel';


// View
// ------------------------------

/**
 * 页面根组件，非强制使用作为根组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
let View = aprops=>{
  let { landscape, container, ...props } = BaseComponent(aprops, View);

  let classNamePre = 'position-relative offset-a-start square-full overflow-a-hidden flex-display-block flex-direction-v bg-color-view';
  let stylePre = (landscape && container.clientHeight>container.clientWidth)?{ 
    width: container.clientHeight,
    height: container.clientWidth,
    top: (container.clientHeight - container.clientWidth) / 2,
    left: (container.clientWidth - container.clientHeight) / 2,
    ...transform('rotate', '90deg'),
  }:{};
  
  return <Panel data-container stylePre={stylePre} classNamePre={classNamePre} {...props} />;
}

View.defaultProps = {}
/**
 * 设置为横屏模式
 * @attribute module:View.View.landscape
 * @type {boolean}
 */
/**
 * 设置页面的容器，横屏时以容器为参照横屏旋转
 * @type {element}
 */
View.defaultProps.container = document.body;

export default View;