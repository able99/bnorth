import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props'
import React from 'react';
import Panel from './Panel.Loader';
import Backdrop from './Backdrop';


export let Mask = aprops=>{
  let {
    loaderProps, mask=true,
    component:Component=Backdrop, className, ...props
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

export default {
  // plugin 
  // --------------------------------
  _id: 'mask',

  onPluginMount(app) {
    app.mask = {
      show: ({options={}, ...props}={})=>{
        let _id = app.mask._id||app.router.getViewId(options);
        options._id = _id;
        options.isModal = true;

        return app.mask._id = app.router.addView(<Mask /> , props, options);
      },

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