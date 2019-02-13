/**
 * @module
 */
import React from 'react';
import BaseComponent from './BaseComponent';
import Panel from './Panel';

/**
 * 设置纵横比，内容显示在 inner 中
 * @component
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
let AspectRatio = aprops=>{
  let {
    ratio, innerProps,
    children, ...props
  } = BaseComponent(aprops, AspectRatio);
  
  let stylePre = ratio&&{paddingBottom: String(ratio*100)+'%'};
  let classNamePre = 'position-absolute offset-a-start square-full overflow-a-hidden';

  return (
    <Panel stylePre={stylePre} {...props} >
      <Panel classNamePre={classNamePre} {...innerProps}>{children}</Panel>
    </Panel>
  );
}

AspectRatio.defaultProps = {};
/**
 * 设置纵横比
 * @attribute module:AspectRatio.AspectRatio.ratio
 * @type {number|string}
 */
/**
 * 设置组件实际显示内容的内部组件的属性
 * @attribute module:AspectRatio.AspectRatio.innerProps
 * @type {object}
 */

export default AspectRatio;
