/**
 * 提供了蒙层组件和蒙层插件
 * @module
 */
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props'
import React from 'react';
import Panel from './Panel.Loader';
import Backdrop from './Backdrop';


/**
 * 蒙层组件
 * @component
 */
export let Mask = aprops=>{
  let {
    loaderProps, mask,
    component:Component, className, ...props
  } = parseProps(aprops, Mask.props);

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
 * @memberof module:mask.Mask
 * @type {object}
 */
Mask.defaultProps.loaderProps = undefined;
/**
 * 设置 Backdrop 的 mask 属性
 * @memberof module:mask.Mask
 * @type {boolean}
 */
Mask.defaultProps.mask = true;
/**
 * 渲染为该组件
 * @memberof module:mask.Mask
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
    app.mask = {
      /**
       * 显示蒙层
       * @memberof module:mask.mask
       * @mount app.mask.show
       * @param {object?} options - 参数
       * @returns {string} 弹出层 id
       */
      show: ({options={}, ...props}={})=>{
        let _id = app.mask._id||app.router.getViewId(options);
        options._id = _id;
        options.isModal = true;

        return app.mask._id = app.router.addView(<Mask /> , props, options);
      },

      /**
       * 关闭蒙层
       * @memberof module:mask.mask
       * @mount app.mask.close
       */
      close: ()=>{
        let {content, props={}, options={}} = app.router.getView(app.mask._id)||{};
        if(!content) { app.mask._id = undefined; return }

        props.in = false;
        props.onTransitionFinished = ()=>{ 
          app.router.removeView(app.mask._id); 
          app.mask._id = undefined; 
        }

        return app.router.addView(content, props, options);
      },
    };

    app.mask._oldMask = app.render.mask;
    app.render.mask = (show, options)=>show?app.mask.show(options):app.mask.close();
  },

  onPluginUnmount(app) {
    app.render.mask = app.mask._oldMask;
    delete app.mask;
  },
}

export default mask;