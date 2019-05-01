/**
 * 提供了蒙层组件和蒙层插件
 * @module
 */
import React from 'react';
import BaseComponent from './BaseComponent'
import Panel from './Panel';
import Backdrop from './Backdrop';
import { PanelLoader } from './Loader';


/**
 * 蒙层组件
 * @component
 * @augments BaseComponent
 * @export
 */
let Mask = aprops=>{
  let { 
    loaderProps, 
    classNamePre, children, ...props 
  } = BaseComponent(aprops, Mask);

 classNamePre = { 
   'flex-display-block flex-direction-v flex-justify-center flex-align-center': true,
   ...classNamePre,
 }

  return (
    <Panel component={Backdrop} classNamePre={classNamePre} {...props}>
      <PanelLoader position='top' {...loaderProps}>{children}</PanelLoader>
    </Panel>
  )
}

Mask.defaultProps = {};
/**
 * 设置 蒙层中间的 loader 组件的参数
 * @attribute module:mask.Mask.loaderProps
 * @type {object}
 */

Object.defineProperty(Mask,"Mask",{ get:function(){ return Mask }, set:function(val){ Mask = val }})
Mask.isBnorth = true;
Mask.defaultProps['b-precast'] = {
  'b-theme': 'white',
};
export default Mask;






/**
 * 提供了对蒙层的显示和控制的能力，同时修改了 app.render.mask 的默认行为
 * @plugin mask
 * @exportdefault
 */
export let mask = {
  // plugin 
  // --------------------------------
  _id: 'mask',

  onPluginMount(app) {
    /**
     * 挂载在 App 实例上的蒙层操作对象
     * @memberof module:mask.mask
     */
    app.mask = {};
    
    /**
     * 显示蒙层
     * @memberof module:mask.mask
     * @param {object?} options - 参数
     * @returns {string} 弹出层 id
     */
    app.mask.show = (Content, {options={}, ...props}={})=>{
      options._id = app.mask._id||app.router.genPopLayerId(options);
      if(!options.hasOwnProperty('isModal')) options.isModal = true; 

      return app.mask._id = app.router.addPopLayer(typeof Content==='function'?props=><Mask {...props.props}><Content {...props}/></Mask>:<Mask>{Content}</Mask> , props, options);
    }

    /**
     * 关闭蒙层
     * @memberof module:mask.mask
     */
    app.mask.close = ()=>{
      let {content, props={}, options={}} = app.router.getPopLayerInfo(app.mask._id)||{};
      if(!content) { app.mask._id = undefined; return }

      props.in = false;
      props.onFinished = ()=>{ 
        app.router.removePopLayer(app.mask._id); 
        app.mask._id = undefined; 
      }

      return app.router.addPopLayer(content, props, options);
    }

    app.mask._oldMask = app.render.mask;
    app.render.mask = (show, options)=>show?app.mask.show(options):app.mask.close();
  },

  onPluginUnmount(app) {
    app.render.mask = app.mask._oldMask;
    delete app.mask;
  },
}