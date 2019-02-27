/**
 * @module
 */
import React from 'react';
import BaseComponent from './BaseComponent';
import Panel from './Panel';


/**
 * 留白组件
 * @component 
 * @augments BaseComponent
 * @exportdefault
 */
let Space = (aprops)=>{
  let { count, stacked, children, ...props } = BaseComponent(aprops, Space);

  return (
    <Panel inline {...props}>
      <pre className="margin-a-0 padding-a-0">{Array(Number(count)).fill(stacked?'\n':' ')}</pre>
      {children}
    </Panel>
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


Object.defineProperty(Space,"Space",{ get:function(){ return Space }, set:function(val){ Space = val }})
export default Space;