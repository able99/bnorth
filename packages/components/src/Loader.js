/**
 * @module
 */
import React from 'react';
import '@bnorth/rich.css/css/animation.css';
import '@bnorth/rich.css/css/kf.spin.css';
import '@bnorth/rich.css/css/kf.flyout.right.css';
import { animation, transform, transiton, transformOrigin } from '@bnorth/rich.css/lib/styles/animation';
import { afSpin } from '@bnorth/rich.css/lib/styles/animationFrame';
import BaseComponent from './BaseComponent';
import AnimationFrame from './AnimationFrame';
import Panel from './Panel';
import Backdrop from './Backdrop';


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
      component={component} {...props} />
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
Loader.isBnorth = true;
Loader.defaultProps['b-precast'] = {}
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
    classNamePre, stylePre, children, ...props
  } = BaseComponent(aprops, Line);

  classNamePre = {'width-full height-1em position-relative': true, ...classNamePre}
  stylePre = { background: colorReverse, ...stylePre }

  return (
    <Panel classNamePre={classNamePre} stylePre={stylePre} {...props}>
      <Panel style={{width: (isProgress?progress:'10')+'%', height: '100%', left: '0', background: color, ...transiton(timeout), ...(!isProgress?animation('fly-out-right'):null)}}  />
      {children}
    </Panel>
  );
}

Line.defaultProps = {};

Object.defineProperty(Loader,"Line",{ get:function(){ return Line }, set:function(val){ Line = val }})
Line.isBnorth = true;
Line.defaultProps['b-precast'] = {}

/**
 * 进度显示组件的圆环样式
 * @component 
 * @private
 * @augments BaseComponent
 * @augments module:Loader.Loader
 */
let Circle = class extends React.Component{
  render() {
    let {
      isProgress, progress, timeout, color, colorReverse,
      classNamePre, children, ...props
    } = BaseComponent(this.props, Circle);

    classNamePre = { 'width-1em height-1em': true, ...classNamePre }

    return (
      <Panel component="svg" viewBox="0 0 100 100" classNamePre={classNamePre} {...props}>
        <circle cx="50" cy="50" r="40" strokeWidth="20" stroke={colorReverse} fill="none" />
        <AnimationFrame play={!isProgress} frameFunc={afSpin}>
          <circle cx="50" cy="50" r="40" strokeWidth="20" stroke={color} fill="none" 
            style={isProgress?{...transiton(timeout),...transform('rotate', '-90deg'),...transformOrigin()}:{...transformOrigin()}}
            strokeDasharray={isProgress?`${2.51*(progress||0)},251`:"150,251"}>
          </circle>
        </AnimationFrame>
        {children}
      </Panel>
    );
  }
}

Circle.defaultProps = {};

Object.defineProperty(Loader,"Circle",{ get:function(){ return Circle }, set:function(val){ Circle = val }})
Circle.isBnorth = true;
Circle.defaultProps['b-precast'] = {}

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
  let { 
    isProgress, progress, loaderProps, title, titleProps, 
    children, ...props 
  } = BaseComponent(aprops);

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
PanelLoader.isBnorth = true;
PanelLoader.defaultProps['b-precast'] = {}





  
export let LoaderPopLayer = aprops=>{
  let { progress, timeout, 'b-theme':bTheme="primary", top, height, innerProps, poplayer, ...props } = BaseComponent(aprops, LoaderPopLayer);
  
  return (
    <Panel bc-position-absolute bc-offset-h-start bc-width-full bs-top={top} bs-height={height} {...props}>
      <Panel b-style="solid" b-theme={bTheme} bc-height-full bs-width={(progress||0)+'%'} style={transiton(timeout, {property: 'width'})} />
    </Panel>
  )
}

LoaderPopLayer.defaultProps = {}
LoaderPopLayer.defaultProps.top = 0;
LoaderPopLayer.defaultProps.height = 3;
LoaderPopLayer.defaultProps.timeout = '1s';

Object.defineProperty(Loader,"LoaderPopLayer",{ get:function(){ return LoaderPopLayer }, set:function(val){ LoaderPopLayer = val }})
LoaderPopLayer.isBnorth = true;
LoaderPopLayer.defaultProps['b-precast'] = {}



export let loader = (app, options={})=>({
  _id: 'loader',

  onPluginMount(app) {
    app.loader = {
      count: 0, 
      timeout: options.timeout||20000,
      reset: (progress=0, props, options)=>{
        if(app.loader.timer) {window.clearTimeout(app.loader.timer); app.loader.timer=null}
        app.loader._id = app.PopLayer.addPopLayer(LoaderPopLayer, {...props, progress}, {...options, _id: app.loader._id});

        if(progress>100&&!app.loader.count) {
          app.PopLayer.removePopLayer(app.loader._id); 
          app.loader._id = undefined; 
        } else if(progress>100&&app.loader.count) {
          if(app.loader.timer) {window.clearTimeout(app.loader.timer); app.loader.timer=null}
        }else {
          app.loader.timer = window.setTimeout(()=>app.loader.reset(progress+100000/app.loader.timeout), 1000);
        }
      },
      show: (props, options)=>{
        app.loader.count++;
        return app.loader.reset(0, props, options);
      },
      close: force=>{
        app.loader.count = force?0:Math.max(--app.loader.count,0);
        return app.loader.reset(app.loader.count?10:100);
      },
    };

    app.loader._loader = app.render.loader;
    app.render.loader = (show, ...args)=>show?app.loader.show(...args):app.loader.close();
  },

  onPluginUnmount(app) {
    app.render.loader = app.loader._loader;
    delete app.loader;
  },
})





export let PullDownPopLayer = aprops=>{
  let { progress, height=100, poplayer, children, ...props } = BaseComponent(aprops, PullDownPopLayer);
  if(!progress||progress<0) return null;
  children = typeof(children)==='function'?children(poplayer):children;

  return (
    <Panel 
      bc-padding-a- bc-bg-color-white bc-border-set-a- bc-border-radius-rounded bc-line-height-0 bc-position-absolute bc-offset-left-center bc-pointer-events-none bs-left="50%" 
      bs-top={Math.min(height, progress)} style={typeof(progress)!=='string'&&{...transform('rotate', progress*(360/height)%360+'deg')}} bc-transiton-set- 
      bc-animation-name-spin={Boolean(typeof(progress)==='string'&&progress>=height)} bc-animation-iteration-count-infinite bc-animation-duration-1000
      {...props}>
      {children||<svg 
        version="1.1" viewBox="0 0 1024 1024" preserveAspectRatio="none" stroke="currentcolor" fill="currentcolor"
        bs-width="1em" bs-height="1em" className="display-inline width-1em height-1em">
        <path d="M1024 384h-384l143.53-143.53c-72.53-72.526-168.96-112.47-271.53-112.47s-199 39.944-271.53 112.47c-72.526 72.53-112.47 168.96-112.47 271.53s39.944 199 112.47 271.53c72.53 72.526 168.96 112.47 271.53 112.47s199-39.944 271.528-112.472c6.056-6.054 11.86-12.292 17.456-18.668l96.32 84.282c-93.846 107.166-231.664 174.858-385.304 174.858-282.77 0-512-229.23-512-512s229.23-512 512-512c141.386 0 269.368 57.326 362.016 149.984l149.984-149.984v384z" />
      </svg>}
    </Panel>
  )
}

PullDownPopLayer.defaultProps = {}

Object.defineProperty(Loader,"PullDownPopLayer",{ get:function(){ return PullDownPopLayer }, set:function(val){ PullDownPopLayer = val }})
PullDownPopLayer.isBnorth = true;
PullDownPopLayer.defaultProps['b-precast'] = {}



export let pulldown = {
  _id: 'pulldown',

  onPluginMount(app) {
    app.pulldown = {
      show: (progress, props, options)=>{
        if(progress<15) return;
        if(typeof(progress)==='string'&&progress<100) { 
          return app.pulldown.close(); 
        }else {
          return app.pulldown._id = app.PopLayer.addPopLayer(PullDownPopLayer, {...props, progress}, {...options, _id: app.pulldown._id});
        }
      },
      close: ()=>{
        app.PopLayer.removePopLayer(app.pulldown._id); 
        app.pulldown._id = undefined; 
      },
    };
  },

  onPluginUnmount(app) {
    delete app.pulldown;
  },
}





/**
 * 蒙层组件
 * @component
 * @augments BaseComponent
 * @export
 */
export let MaskPopLayer = aprops=>{
  let { loaderProps, classNamePre, children, poplayer, ...props } = BaseComponent(aprops, MaskPopLayer);
  children = typeof(children)==='function'?children(poplayer):children;

  classNamePre = { 'flex-display-block flex-direction-v flex-justify-center flex-align-center': true, ...classNamePre }

  return (
    <Panel component={Backdrop} classNamePre={classNamePre} {...props}>
      <Panel component={PanelLoader} position='top' {...loaderProps}>{children}</Panel>
    </Panel>
  )
}

MaskPopLayer.defaultProps = {};
/**
 * 设置 蒙层中间的 loader 组件的参数
 * @attribute module:loader.MaskPopLayer.loaderProps
 * @type {object}
 */

Object.defineProperty(MaskPopLayer,"MaskPopLayer",{ get:function(){ return MaskPopLayer }, set:function(val){ MaskPopLayer = val }})
MaskPopLayer.isBnorth = true;
MaskPopLayer.defaultProps['b-precast'] = {
  'b-theme': 'white',
};



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
     * @memberof module:loader.mask
     * @param {element|component|string|number?} content - 显示内容
     * @param {object?} props - 弹出层属性
     * @param {object?} options - 弹出层配置
     * @returns {string} 弹出层 id
     */
    app.mask.show = (content, props, options)=>{
      return app.mask._id = app.router.addPopLayer(MaskPopLayer, {children: content, ...props}, {isModal: true, ...options, _id: app.mask._id});
    }

    /**
     * 关闭蒙层
     * @memberof module:loader.mask
     */
    app.mask.close = ()=>{
      let {content, props={}, options} = app.router.getPopLayerInfo(app.mask._id)||{};
      if(!content) { app.mask._id = undefined; return }
      props.rewind = true;
      props.onFinished = ()=>{ app.router.removePopLayer(app.mask._id); app.mask._id = undefined }
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