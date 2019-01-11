/**
 * @module
 */
import React from 'react';
import parseProps from './utils/props';
import Panel from './Panel';


/**
 * 留白组件
 * @component 
 * @augments BaseComponent
 * @exportdefault
 */
let Space = (aprops)=>{
  let {
    count=1, stacked,
    component:Component=Panel, children, ...props
  } = parseProps(aprops, Space.props);

  return (
    <Component inline {...props}>
      <pre className="margin-a-0 padding-a-0">{Array(Number(count)).fill(stacked?'\n':' ')}</pre>
      {children}
    </Component>
  );
}

Space.defaultProps = {}
/**
 * 留白的数量，横向时为字符的数量，纵向时为行的数量
 * @type {number}
 */
Space.defaultProps.count = 1;
/**
 * 设置为堆叠模式，即纵向留白
 * @attribute module:Space.Space.stacked
 * @type {boolean}
 */

export default Space;