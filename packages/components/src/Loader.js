/**
 * @module
 */
import React from 'react';
import '@bnorth/rich.css/css/kf.spin.css';
import '@bnorth/rich.css/css/kf.flyout.right.css';
import { animation, transform, transiton, transformOrigin } from '@bnorth/rich.css/lib/styles/animation';
import BaseComponent from './BaseComponent';
import Panel from './Panel';

 
/**
 * 进度显示组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
let Loader = aprops=>{
  let { type, types, timeoutTransition, timeoutAnimation, isProgress, progress, color, colorReverse, ...props } = BaseComponent(aprops, Loader);
  let component = types[type];
  if(!component) return null;

  return (
    <Panel 
      timeout={isProgress?timeoutTransition:timeoutAnimation} isProgress={isProgress} progress={progress} color={color} colorReverse={colorReverse}
      componentTransform={component} {...props} />
  );
}

Loader.defaultProps = {};
/**
 * 显示的样式，默认支持 line 和 circle，可以通过给 Loader.xxx 赋值，增加新的样式
 * @type {string}
 */
Loader.defaultProps.type = 'circle';
/**
 * 作为进度条时，进度改变时的渐变动画时间
 * @type {string}
 */
Loader.defaultProps.timeoutTransition = '250ms';
/**
 * 作为加载中等待动画时，帧动画时间
 * @type {string}
 */
Loader.defaultProps.timeoutAnimation = '2s';
/**
 * 设置为进度条或者是加载中等待动画
 * @type {boolean}
 */
Loader.defaultProps.isProgress = false;
/**
 * 作为进度条时，进度的百分比， 0-100
 * @type {number}
 */
Loader.defaultProps.progress = 0;
/**
 * 设置主颜色，一般不用设置，可以设置主题色
 * @type {string}
 */
Loader.defaultProps.color = 'currentColor';
/**
 * 设置辅助色，进度条的反色颜色，取值为 css 颜色
 * @type {string}
 */
Loader.defaultProps.colorReverse = 'lightgray';


Object.defineProperty(Loader,"Loader",{ get:function(){ return Loader }, set:function(val){ Loader = val }})
export default Loader;




/**
 * 进度显示组件的线性样式
 * @component 
 * @private
 * @augments BaseComponent
 * @augments module:Loader.Loader
 */
let Line = aprops=>{
  let {
    isProgress, progress, timeout, color, colorReverse,
    children, ...props
  } = BaseComponent(aprops, Line);

  let classNamePre = 'width-full height-1em position-relative';
  let stylePre = { background: colorReverse }

  return (
    <Panel classNamePre={classNamePre} stylePre={stylePre} {...props}>
      <Panel style={{width: (isProgress?progress:'10')+'%', height: '100%', left: '0', background: color, ...transiton(timeout), ...(!isProgress?animation('fly-out-right'):null)}}  />
      {children}
    </Panel>
  );
}

Line.defaultProps = {};

Object.defineProperty(Loader,"Line",{ get:function(){ return Line }, set:function(val){ Line = val }})



/**
 * 进度显示组件的圆环样式
 * @component 
 * @private
 * @augments BaseComponent
 * @augments module:Loader.Loader
 */
let Circle = aprops=>{
  let {
    isProgress, progress, timeout, color, colorReverse,
    children, ...props
  } = BaseComponent(aprops, Circle);

  let classNamePre = 'width-1em height-1em';

  return (
    <Panel component="svg" viewBox="0 0 100 100" classNamePre={classNamePre} {...props}>
      <circle cx="50" cy="50" r="40" strokeWidth="20" stroke={colorReverse} fill="none" />
      <circle cx="50" cy="50" r="40" strokeWidth="20" stroke={color} fill="none" 
        style={isProgress?{...transiton(timeout),...transform('rotate', '-90deg'),...transformOrigin()}:{...animation('spin'),...transformOrigin()}}
        strokeDasharray={isProgress?`${2.51*(progress||0)},251`:"150,251"}>
      </circle>
      {children}
    </Panel>
  );
}

Object.defineProperty(Loader,"Circle",{ get:function(){ return Circle }, set:function(val){ Circle = val }})

Circle.defaultProps = {};




Loader.defaultProps.types = {
  line: Line,
  circle: Circle,
}





/**
 * 加载动画小面板组件，扩展小面板组件，提供加载动画组件与面板内容混排的能力
 * @component
 * @mount Panel.Loader
 * @augments BaseComponent
 * @augments Panel.module:Container~Container
 */
export let PanelLoader = aprops=>{
  let { isProgress, progress, loaderProps, title, titleProps, children, ...props } = BaseComponent(aprops);

  return (
    <Panel.Container panelContainerProps={aprops} ctype="flex"  position="left" justify="center" align="center" {...props}>
      <Loader isProgress={isProgress} progress={progress} {...loaderProps} />
      {title||children?<Panel bc-text-truncate-1 {...titleProps} >{title}{children}</Panel>:null}
    </Panel.Container>
  );
}

PanelLoader.defaultProps = {};
/**
 * Loader 的属性, 参见 Loader
 * @attribute Panel.module:Loader~PanelLoader.loader*
 * @type {*}
 */
/**
 * 设置图标子组件的属性
 * @attribute Panel.module:Loader~PanelLoader.loaderProps
 * @type {object}
 */
/**
 * 设置文字，也可以使用 children
 * @attribute Panel.module:Loader~PanelLoader.title
 * @type {string}
 */
/**
 * 设置内容子组件的属性
 * @attribute Panel.module:Loader~PanelLoader.titleProps
 * @type {object}
 */

Object.defineProperty(Loader,"PanelLoader",{ get:function(){ return PanelLoader }, set:function(val){ PanelLoader = val }})





export let OverlayLoader = aprops=>{
  let { progress, top, height, ...props } = BaseComponent(aprops, OverlayLoader);

  let classNamePre = 'position-absolute offset-h-start width-full';

  return <Panel componentTransform={Loader} type="line" isProgress progress={progress} classNamePre={classNamePre} bs-top={top} bs-height={height} {...props} />
}

OverlayLoader.defaultProps = {}
OverlayLoader.defaultProps.top = 0;
OverlayLoader.defaultProps.height = 3;

Object.defineProperty(Loader,"OverlayLoader",{ get:function(){ return OverlayLoader }, set:function(val){ OverlayLoader = val }})






export let loader = {
  _id: 'loader',

  onPluginMount(app) {
    app.loader = {
      count: 0, 
      timeoutPrgress: '20000',
      timeoutSet: '200',
      reset: (progress=0, cb, aprops, aoptions)=>{
        let {content, props={}, options={}} = app.router.getPopLayerInfo(app.loader._id)||{};
        if(!content){
          app.loader._id = app.router.addPopLayer(
            <OverlayLoader timeout={app.loader.timeoutSet} isProgress progress={progress} />, 
            aprops, aoptions
          );
        }else{
          app.loader._id = app.router.addPopLayer(
            content, 
            {...props, ...aprops, progress, timeout: app.loader.timeoutSet}, 
            {...options, ...aoptions}
          );
        }

        setTimeout(()=>{
          let {content, props={}, options={}} = app.router.getPopLayerInfo(app.loader._id)||{};
          if(content){
            props.progress = 100;
            props.timeout = app.loader.timeoutPrgress;
            app.loader._id = app.router.addPopLayer(content, props, options);
            cb&&cb();
          }
        }, app.loader.timeoutSet);

        return app.loader._id;
      },
      show: ({options, ...props}={})=>{
        app.loader.count++;
        return app.loader.reset(0, null, props, options);
      },
      close: force=>{
        app.loader.count = force?0:Math.max(--app.loader.count,0);
        return app.loader.reset(app.loader.count?10:100, ()=>{
          if(!app.loader.count) {
            app.router.removePopLayer(app.loader._id); 
            app.loader._id = undefined; 
          }
        });
      },
    };

    app.loader._loader = app.render.loader;
    app.render.loader = (show, options)=>show?app.loader.show(options):app.loader.close();
  },

  onPluginUnmount(app) {
    app.render.loader = app.loader._loader;
    delete app.loader;
  },
}