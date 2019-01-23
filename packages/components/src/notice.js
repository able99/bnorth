import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import AnimationCollapse from './AnimationCollapse';
import Panel from './Panel';
import Button from './Button';
import Icon from './Icon';


export let Container = aprops=>{
  let {
    component:Component=Panel, className, ...props
  } = parseProps(aprops, Container.props);

  let classStr = 'position-absolute offset-top-start offset-left-top width-full';
  
  return <Component className={classes(classStr, className)} />;
}

export let Notification = aprops=>{
  let {
    onDoClose, 
    transition:Transition=AnimationCollapse, transitionProps, onTransitionFinished,
    titleProps, hasClose, closeProps, iconProps, 
    component=Panel, className, children, ...props
  } = parseProps(aprops, Notification.props);

  let classStr = 'flex-display-block flex-align-center width-full';
  
  return (
    <Transition 
      component={component} 
      b-style="solid" b-theme="mask" 
      transitionProps={transitionProps} onTransitionFinished={onTransitionFinished} 
      className={classes(classStr, className)} {...props}>
      <div className="padding-a-">
      <Notification._Title {...titleProps}>{children}</Notification._Title>
      <Notification._Close onDoClose={onDoClose} {...closeProps}>{hasClose}</Notification._Close>
      </div>
    </Transition>
  );
}

Notification._Title = aprops=>{
  let {
    component:Component=Panel, className, ...props
  } = parseProps(aprops, Notification._Title.props);

  let classStr = 'text-weight- text-size-lg flex-sub-flex-extend';

  return <Component className={classes(classStr, className)} {...props} />;
}

Notification._Close = aprops=>{
  let {
    hasClose, onDoClose, iconProps,
    component:Component=Button, className, children, ...props
  } = parseProps(aprops, Notification._Close.props);
  if(!children) return null;

  children = children===true?<Icon name="close" defaultName="x" {...iconProps} />:children;
  let classStr = 'padding-h-sm padding-v-0 flex-sub-flex-none';

  return (
    <Component 
      b-style="plain" b-theme="white" 
      onClick={onDoClose} 
      className={classes(classStr, className)} {...props}>
      {children}
    </Component>
  );
}


export default {
  _id: 'notice',

  onPluginMount(app) {
    app.notice = {
      _timer: undefined,

      show: (message, { timeout=3000, options={}, ...props}={})=>{
        message = app.utils.message2String(message);
        if(!message) return;

        let _id = app.notice._id || app.router.genPopLayerId(options);
        options._id = _id;
        props.in = true;
        props.onDoClose = ()=>app.notice.close();
        props.children = message;

        if(app.notice._timer) window.clearTimeout(app.notice._timer);
        app.notice._timer = window.setTimeout(()=>app.notice.close(),timeout);

        return app.notice._id = app.router.addPopLayer(<Container><Notification /></Container> , props, options);
      },

      close: ()=>{
        if(app.notice._timer) { window.clearTimeout(app.notice._timer); app.notice._timer = undefined; }
        if(!app.notice._id) return;
        let {content, props={}, options={}} = app.router.getPopLayerInfo(app.notice._id)||{};
        if(!content) { app.notice._id = undefined; return; }

        props.in = false;
        props.onTransitionFinished = ()=>{ 
          app.router.removePopLayer(app.notice._id); 
          app.notice._id = undefined; 
        }

        return app.router.addPopLayer(content, props, options);
      },
    };

    app.notice._oldNotice = app.render.notice;
    app.notice._oldErrorNotice = app.render.errorNotice;
    app.render.notice = (message, options)=>app.notice.show(message, options);
    app.render.error = (message, options={})=>app.notice.show(message, {...options, 'b-theme': options['b-theme']||'alert'});
  },

  onPluginUnmount(app) {
    app.render.notice = app.notice._oldNotice;
    app.render.error = app.notice._oldErrorNotice;
    delete app.notice;
  },
}