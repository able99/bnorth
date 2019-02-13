/**
 * 提供了蒙层组件和蒙层插件
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import BaseComponent from './BaseComponent'
import Panel from './Panel';
import Backdrop from './Backdrop';
import './Loader';


/**
 * 蒙层组件
 * @component
 * @augments BaseComponent
 * @export
 */
let Mask = aprops=>{
  let {
    loaderProps, mask,
    component:Component, className, ...props
  } = BaseComponent(aprops, Mask);

  let classStr = 'flex-display-block flex-direction-v flex-justify-center flex-align-center text-color-white';

  return (
    <Component 
      mask={mask}
      className={classes(classStr, className)} {...props}>
      <Panel.Loader position='top' {...loaderProps} />
    </Component>
  )
}
Mask.defaultProps = {};
/**
 * 设置 蒙层中间的 loader 组件的参数
 * @attribute module:mask.Mask.loaderProps
 * @type {object}
 */
/**
 * 设置 Backdrop 的 mask 属性
 * @type {boolean}
 */
Mask.defaultProps.mask = true;
/**
 * 渲染为该组件
 * @type {component|element}
 */
Mask.defaultProps.component = Backdrop;


/**
 * 提供了对蒙层的显示和控制的能力，同时修改了 app.render.mask 的默认行为
 * @plugin mask
 * @exportdefault
 */
let mask = {
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
    app.mask.show = ({options={}, ...props}={})=>{
      let _id = app.mask._id||app.router.genPopLayerId(options);
      options._id = _id;
      options.isModal = true;

      return app.mask._id = app.router.addPopLayer(<Mask /> , props, options);
    }

    /**
     * 关闭蒙层
     * @memberof module:mask.mask
     */
    app.mask.close = ()=>{
      let {content, props={}, options={}} = app.router.getPopLayerInfo(app.mask._id)||{};
      if(!content) { app.mask._id = undefined; return }

      props.in = false;
      props.onTransitionFinished = ()=>{ 
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


export { Mask }
export default mask;