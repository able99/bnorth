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
    classNamePre, stylePre, children, ...props
  } = BaseComponent(aprops, AspectRatio);
  
  stylePre = ratio?{paddingBottom: String(ratio*100)+'%', ...stylePre}:stylePre;
  classNamePre = {'position-relative': true, ...classNamePre};
  let innerClassNamePre = {'position-absolute offset-a-start square-full overflow-a-hidden': true};

  return (
    <Panel classNamePre={classNamePre} stylePre={stylePre} {...props} >
      <Panel classNamePre={innerClassNamePre} {...innerProps}>{children}</Panel>
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


Object.defineProperty(AspectRatio,"AspectRatio",{ get:function(){ return AspectRatio }, set:function(val){ AspectRatio = val }})
AspectRatio.isBnorth = true;
AspectRatio.defaultProps['b-precast'] = {};
export default AspectRatio;
