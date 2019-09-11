/**
 * @module
 */
import React, { cloneElement } from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import { transform } from '@bnorth/rich.css/lib/styles/animation'; 
import BaseComponent, { domIsMouse, domFindNode, domPassiveSupported } from './BaseComponent';


/**
 * 小面板组件，基本的布局单位，其他组件一般使用该组件做基本组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 */
let Panel = aprops=>{
  if(aprops.component&&aprops.component.isBnorth) { 
    let {component:Component, ...props} = aprops; 
    return <Component {...props} /> 
  }

  let {
    active, selected, disabled, 
    onClick, btn,
    main, page, full, inline, 
    panelContainerProps, panelItemIndex, panelItemCount, panelItemSelected, panelItemPlain, 
    'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, 
    classNamePre, classNameExt, stylePre, styleExt, className, style, 
    panelThemeProps:{sensitiveBg, sensitiveSelect, textOnBg, bgOnHollow, textOnBgSelected, textOnBgUnselected, textUnselected},
    refWrap, component:Component=aprops.componentPanel||"div", componentPanel,...props
  } = BaseComponent(aprops, Panel);
  if(sensitiveBg===undefined) sensitiveBg = bStyle==='solid'&&bTheme;
  if(sensitiveSelect===undefined) sensitiveSelect = bStyle==='underline';
  if(page) props['data-dock'] = true;

  let classSetPre = {
    'offset-a-start square-full overflow-a-hidden': full,
    [page?'flex-display-inline':'display-inlineblock']: inline,
    [(!inline?'flex-display-block':'') + ' flex-direction-v bg-color-view']: page,
    'scrollable-a- flex-sub-flex-extend': main,
  }
  let styleSetPre = {};
  let classSet = {};
  let styleSet = {};

  let textTheme;
  if(sensitiveSelect) textTheme = sensitiveBg?(selected?textOnBgSelected:textOnBgUnselected):(selected?(bTheme||''):textUnselected);
  if(!sensitiveSelect) textTheme = sensitiveBg?textOnBg:bTheme;
  textTheme = textTheme?(textTheme===true?'':textTheme):false; 
  classSetPre['text-color-'+textTheme] = textTheme!==false;
  classSetPre['text-size-'+(bSize==='true'?'':bSize)] = bSize;
  if(bStyle==='solid') {
    let theme = bTheme?(bTheme===true?'':bTheme):(bTheme===false?false:'component');
    classSetPre['bg-color-'+theme] = theme!==false;
    classSetPre['border-set-a-'+theme] = theme!==false;
  }else if(bStyle==='hollow') {
    let theme = bTheme?(bTheme===true?'':bTheme):(bTheme===false?false:'');
    classSetPre['border-set-a-'+theme] = theme!==false;
    classSetPre[bgOnHollow===false?'bg-none-':('bg-color-'+(bgOnHollow===true?'':bgOnHollow))] = true;
  }else if(bStyle==='underline') {
    let theme = bTheme?(bTheme===true?'':bTheme):(bTheme===false?false:'');
    classSetPre['border-none-top- border-none-left- border-none-right- bg-none-'] = true;
    classSetPre['border-width-bottom-2'] = true;
    classSetPre['border-set-bottom-'+theme] = theme!==false;
    if(!selected) styleSetPre['borderColor'] = 'transparent';
  }else if(bStyle==='white') {
    classSetPre['bg-color-white'] = true;
  }else if(bStyle==='mask') {
    classSetPre['bg-color-mask'] = true;
  }else if(bStyle==='plain') {
    classSetPre['border-none-top- border-none-bottom- border-none-left- border-none-right- bg-none-'] = true;
  }

  Object.entries(props).forEach(([k,v])=>{
    if(k.startsWith('bs-')){
      delete props[k]; 
      if(v===false||v===undefined||v===null) return; 
      let name = k.slice(3);
      styleSet[name] = v;
    }else if(k.startsWith('bc-')){
      delete props[k]; 
      if(v===false||v===undefined||v===null) return; 
      let name = k.slice(3); 
      classSet[name+(v===true?'':('-'+v))] = true;
    }else if(k.startsWith('bf-')){
      delete props[k]; 
      if(!v) return; 
      let name = k.slice(3); 
      name = BaseComponent.styleFunctions[name]; 
      if(!name) return;
      Object.assign(styleSet, Array.isArray(v)?name(...v):name(v));
    }
  })

  if(onClick) props.onClick = onClick;
  if(refWrap) props.ref = refWrap;
  if(active) classSet['active'] = true;
  if(selected) classSet['selected'] = true;
  if(disabled) classSet['disabled'] = true;
  if(onClick&&(btn!==false)) classSet['cursor-pointer'] = true;
  if((onClick&&(!btn&&btn!==false))||btn===true) classSet['btn'] = true;
  // if(onClick&&(btn!==false)) {
  //   props['onTouchStart'] = e=>{e.currentTarget.classList.add(!btn||btn===true?'active':btn);onTouchStart&&onTouchStart(e)}
  //   props['onTouchEnd'] = e=>{e.currentTarget.classList.remove(!btn||btn===true?'active':btn);onTouchEnd&&onTouchEnd(e)}; 
  //   props['onTouchCancel'] = e=>{e.currentTarget.classList.remove(!btn||btn===true?'active':btn);onTouchCancel&&onTouchCancel(e)}; 
  // } else {
  //   if(aprops.hasOwnProperty('onTouchStart')) props.onTouchStart = onTouchStart;
  //   if(aprops.hasOwnProperty('onTouchEnd')) props.onTouchEnd = onTouchEnd;
  //   if(aprops.hasOwnProperty('onTouchCancel')) props.onTouchCancel = onTouchCancel;
  // }

  return <Component 
    className={classes(classSetPre, classNamePre, classSet, className, classNameExt)} 
    style={{...styleSetPre, ...stylePre, ...styleSet, ...style, ...styleExt}} 
    {...props} />
}

Panel.defaultProps = {};
Panel.defaultProps.panelThemeProps = {
  sensitiveBg: undefined, // 设置为有背景状态
  sensitiveSelect: undefined, // 设置为字体主题响应是否选中状态 
  textUnselected: 'disable',  // 设置文本主题，在无背景和在未选择状态下
  textOnBg: 'white', // 设置文本主题，在有背景的面板上时 
  textOnBgSelected: 'white',  // 设置文本主题，在有背景和在选择状态下 
  textOnBgUnselected: 'disable', // 设置文本主题，在有背景和在未选择状态下
  bgOnHollow: 'white',  // 设置背景主题，在镂空样式时
}
/**
 * 设置为主模式，将开启 flex extend 样式和滚动样式
 * @attribute module:Panel.Panel.page
 * @type {boolean}
 */
/**
 * 设置为主模式，将开启 flex extend 样式和滚动样式
 * @attribute module:Panel.Panel.main
 * @type {boolean}
 */
/**
 * 设置为主模式，将开启 flex extend 样式和滚动样式
 * @attribute module:Panel.Panel.full
 * @type {boolean}
 */
/**
 * 设为为 inline 模式，将开启 display inline 样式
 * @attribute module:Panel.Panel.inline
 * @type {boolean}
 */
/**
 * 设置为选中状态，
 * @attribute module:Panel.Panel.selected
 * @type {boolean}
 */
/**
 * 设置样式主题，根据 richcss color 的设置
 * @attribute module:Panel.Panel.b-theme
 * @type {string}
 */
/**
 * 设置样式风格，包括 plain，solid，hollow，underline
 * @attribute module:Panel.Panel.b-style
 * @type {string}
 */
/**
 * 设置样式尺寸，设置文本的字体大小，根据 richcss textSize 的配置
 * @attribute module:Panel.Panel.b-size
 * @type {string}
 */
/**
 * 设置组件的样式对象，将属性名去掉 bs- 前缀，和属性值，追加到组件的样式对象中
 * 
 * @attribute module:Panel.Panel.bs-xxx
 * @type {number|string} 
 * @example
 * ```jsx
 * <Panel bs-width="50%" style={{height: '50%'}} /> // style: { widht: 50%, height: 50% }
 * ```
 */
/**
 * 设置样式类
 * 
 * - 当属性值为 true 时，将当前属性名，去掉 bc- 前缀，追加到组件的样式类属性中
 * - 当属性值为数字或字符串时，将去掉 bc- 前缀的属性名和属性值用 - 连接后，追加到组件的样式类属性中
 * - 当属性值不为真时，没有任何作用
 * 
 * @attribute module:Panel.Panel.bc-xxx
 * @type {boolean|string|number} 
 * @example
 * ```jsx
 * <Panel bc-text-size="lg" bc-text-weight-={true} className="text-color-primary" /> // className: 'text-color-primary text-size-lg text-weight-'
 * ```
 */
/**
 * 执行样式函数，并将结果设置到组件的样式对象。将属性名去掉 bs- 前缀作为函数名称，从样式函数集合中获取函数，将属性值(为数组时，作为展开参数)作为参数，执行并将结果追加到组件的样式对象中
 * 
 * @attribute module:Panel.Panel.bf-xxx
 * @type {number|string|array} 
 * @example
 * ```jsx
 * import { backgroundImage } from '@bnorth/rich.css/lib/styles/background';
 * import { addFunctions } from '@bnorth/components/lib/utils/props';
 * addFunctions({ backgroundImage });
 * 
 * export default props=>{
 *   return <Panel bf-background={'bg.jpg'} /> // style: {backgroundImage: url(bg.jpg)}
 * }
 * ```
 */

Object.defineProperty(Panel,"Panel",{ get:function(){ return Panel }, set:function(val){ Panel = val }})
export default Panel;








const positionToDirection = { left: 'h', right: 'hv', top: 'v', bottom: 'vv' }
/**
 * 扩展小面板组件，提供了容器的能力，可管理子组件,
 * 
 * 容器内的子组件会被容器进行属性设置，如果希望特殊子组件不接受容器组件设置，子组件需要包含 panelItemPlain 属性
 * @component
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
export let PanelContainer = class extends React.Component {
  render() {
    let {
      ctype, selectedIndex, countToShow, onSelectedChange, panelContainerProps, 
      inline, position, direction, justify, align, wrap, separator, separatorProps, noOverlap,
      genPanelItemProps, panelItemProps, getPanelItemProps, getPanelItemClassName, getPanelItemStyle,
      classNamePre, children, ...props
    } = BaseComponent(this.props, PanelContainer);

    children = React.Children.toArray(children).filter(v=>v);
    children = !separator?children:children.reduce((v1,v2,i,a)=>{
      if(i>0)v1.push(<Panel key={'sep'+i} panelItemPlain inline b-theme='border' b-size='lg' classNamePre={'flex-sub-flex-none flex-display-inline flex-align-center flex-justify-center'} {...separatorProps}><span>|</span></Panel>)
      v1.push(v2);
      return v1;
    },[])

    let aindex = children.findIndex(v=>typeof v==='object'&&v.props.panelItemSelected);
    selectedIndex = aindex>=0?aindex:selectedIndex;
    let panelItemCount = children.filter(v=>((typeof v)==='object'&&!v.props.panelItemPlain)).length;
    let panelItemIndex = -1;
    children = children.map(v=>typeof v !== 'object' || v.props.panelItemPlain?v:(<PanelItem {...genPanelItemProps(
      ctype, selectedIndex, panelContainerProps, 
      ++panelItemIndex, panelItemCount, v.props, panelItemProps, getPanelItemClassName, getPanelItemStyle, getPanelItemProps
    )}>{v}</PanelItem>))

    let classSetPre = { 'overflow-a-hidden': true };

    if(ctype==='single'){
      children = children.filter(v=>v.props.panelItemSelected);
      props.inline = inline;
    }else if(ctype==='justify'){
      classSetPre = { ...classSetPre,
        ['flex-display-'+(inline?'inline':'block')]: true,
        'flex-justify-around flex-align-stretch': true, 
      }
    }else if(ctype==='primary'){
      classSetPre = { ...classSetPre,
        ['flex-display-'+(inline?'inline':'block')]: true,
        'flex-align-center': true,
      }
    }else if(ctype==='flex'){
      classSetPre = { ...classSetPre,
        ['flex-display-'+(inline?'inline':'block')]: true,
      }
    }else if(ctype==='scroll') {
      children = (
        <React.Fragment>
          <InnerScroll countToShow={countToShow} selectedIndex={selectedIndex} onSelectedChange={onSelectedChange}>{children.filter(v=>((typeof v)==='object'&&!v.props.panelItemPlain))}</InnerScroll>
          {children.filter(v=>((typeof v)==='object'&&v.props.panelItemPlain))}
        </React.Fragment>
      );
    }

    if(position) direction = positionToDirection[position];
    classSetPre = { ...classSetPre,
      ['flex-direction-'+direction]: direction,
      ['flex-justify-'+justify]: justify,
      ['flex-align-'+align]: align,
      ['flex-wrap-'+wrap]: wrap,
    }
    
    return <Panel classNamePre={classes(classSetPre, classNamePre)} {...props}>{children}</Panel>;
  }
}

PanelContainer.isBnorth = true;
PanelContainer.defaultProps = {}
/**
 * 设置子组件的排列类型，包括：
 * 
 * - single： 仅 selected 属性为真的子组件显示
 * - justify： 平分组件
 * - primary: 仅 subTypePrimary 属性的子组件扩展，其他组件保持不延展不压缩
 * - flex: 普通 flex 布局
 * - scroll: 滑动布局
 * 
 * @attribute module:Panel~PanelContainer.ctype
 * @type {string}
 */
PanelContainer.defaultProps.selectedIndex = 0;
PanelContainer.defaultProps.countToShow = 1;
/**
 * 设置组件的 flex direction 属性，参见 rich.css
 * @attribute module:Panel~PanelContainer.direction
 * @type {string}
 */
/**
 * 设置组件的 flex justify 属性，参见 rich.css
 * @attribute module:Panel~PanelContainer.justify
 * @type {string}
 */
/**
 * 设置组件的 flex align 属性，参见 rich.css
 * @attribute module:Panel~PanelContainer.align
 * @type {string}
 */
/**
 * 设置组件的 flex wrap 属性，参见 rich.css
 * @attribute module:Panel~PanelContainer.wrap
 * @type {string}
 */
/**
 * 统一设置子组件的属性
 * @attribute module:Panel~PanelContainer.panelItemProps
 * @type {object}
 */
/**
 * 获取子组件样式类的回调函数
 * @callback ItemGetClassNameCallback
 * @param {object} panelItemProps - 子组件属性
 * @param {object} containerProps - 容器组件的属
 * @returns {string|object|array} 样式字符串，样式对象或者样式类数组，具体参见 rich.css classes 函数
 */
/**
 * 设置获取子组件的样式类的回到函数
 * @attribute module:Panel~PanelContainer.getPanelItemClassName
 * @type {module:Panel~ItemGetClassNameCallback}
 */
/**
 * 获取子组件样式对象的回调函数
 * @callback ItemGetStyleCallback
 * @param {object} panelItemProps - 子组件属性
 * @param {object} containerProps - 容器组件的属
 * @returns {object} 样式表对象
 */
/**
 * 设置子组件的样式对象的回调函数
 * @attribute module:Panel~PanelContainer.getPanelItemStyle
 * @type {module:Panel~ItemGetStyleCallback}
 */
/**
 * 获取子组件属性的回调函数
 * @callback ItemGetPropsCallback
 * @param {object} panelItemProps - 子组件属性
 * @param {object} containerProps - 容器组件的属性
 * @returns {object} 属性对象
 */
/**
 * 设置获取子组件的属性的回调函数
 * @attribute module:Panel~PanelContainer.getPanelItemProps
 * @type {module:Panel~ItemGetPropsCallback}
 */

/**
 * 子组件属性计算函数
 * panelItemProps < props < |getPanelItemXXX<panelItemProps<props| < getPanelItemProps
 */
PanelContainer.defaultProps.genPanelItemProps = function(
  type, selectedIndex, panelContainerProps, panelItemIndex, panelItemCount, 
  {className, style, ...props}={}, 
  {className: panelItemClassName, style: panelItemStyle, ...panelItemProps}={},
  getPanelItemClassName, getPanelItemStyle, getPanelItemProps
){
  let ret = {
    key:panelItemIndex, 
    panelContainerType: type, panelContainerProps, panelItemIndex, panelItemCount, panelItemSelected: selectedIndex===panelItemIndex,
    ...panelItemProps,
    ...props,
  }
  ret.style = {...((getPanelItemStyle&&getPanelItemStyle(ret, panelContainerProps))||{}), ...panelItemStyle, ...style};
  ret.className = classes(getPanelItemClassName&&getPanelItemClassName(ret, panelContainerProps), panelItemClassName, className);
  return {...ret, ...((getPanelItemProps&&getPanelItemProps(ret, panelContainerProps))||{})}
}

Object.defineProperty(Panel,"Container",{ get:function(){ return PanelContainer }, set:function(val){ PanelContainer = val }})








/**
 * 带容器能力的小面板组件的子组件
 * @component 
 */
export let PanelItem = aprops=>{
  let {
    panelContainerType, panelContainerProps={}, panelItemIndex, panelItemCount, panelItemSelected, panelItemPlain, 
    className, children, ...props
  } = BaseComponent(aprops, PanelItem);

  if(panelItemPlain) return children;

  let classSet = [];
  if(panelContainerType==='single') classSet.push('offset-a-start square-full overflow-a-hidden');
  if(panelContainerType==='justify') classSet.push('flex-sub-flex-extend');
  if(panelContainerType==='primary') classSet.push(panelItemSelected?'flex-sub-flex-extend':'flex-sub-flex-none');
  if(panelContainerType==='scroll') classSet.push('flex-sub-flex-extend height-full');
  if(panelContainerProps.noOverlap&&panelItemIndex<panelItemCount-1) classSet.push('border-none-right-');

  return cloneElement(children, {className: classes(classSet, className), panelContainerProps, panelItemIndex, panelItemCount, panelItemSelected, panelItemPlain, ...props});
}

PanelItem.isBnorth = true;
PanelItem.defaultProps = {}
/**
 * 容器组件的组织类型
 * @attribute module:Panel~PanelItem.panelContainerType
 */
/**
 * 组件在容器中的索引
 * @attribute module:Panel~PanelItem.panelItemIndex
 * @type {number}
 */
/**
 * 容器中子组件的数量
 * @attribute module:Panel~PanelItem.panelItemCount
 * @type {number}
 */
/**
 * 组件为容器中选中组件
 * @attribute module:Panel~PanelItem.panelItemSelected
 * @type {boolean}
 */
/**
 * 组件不接受容器管理
 * @attribute module:Panel~PanelItem.panelItemPlain
 * @type {boolean}
 */
/**
 * 容器组件的属性
 * @attribute module:Panel~PanelItem.panelContainerProps
 * @type {object}
 */

Object.defineProperty(Panel,"ContainerItem",{ get:function(){ return PanelItem }, set:function(val){ PanelItem = val }})








/**
 * 容器内部的滑动组件
 * @component 
 * @private
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments module:Touchable.Touchable
 */
let InnerScroll = class extends React.Component {
  componentDidMount() {
    let { countToShow,selectedIndex, children } = this.props;
    let node = domFindNode(this);
    this.size = node.clientWidth*countToShow/children.length;
    let val = -(this.size/countToShow)*(selectedIndex%children.length);
    node.scrollableLeft = -val;
    node.scrollableWidth = node.clientWidth;
    
    if(domIsMouse) {
      domFindNode(this).addEventListener("mousedown", event=>{ this.mark = false }, true);
      domFindNode(this).addEventListener("click", event=>{ if(this.mark) { event.stopPropagation(); this.mark = false } }, true);
    } 
  }

  componentDidUpdate() {
    let { selectedIndex, countToShow, children } = this.props;
    let node = domFindNode(this);
    this.size = node.clientWidth*countToShow/children.length;

    let val = -(this.size/countToShow)*(selectedIndex%children.length);
    node.scrollableLeft = -val;
    node.scrollableWidth = node.clientWidth;
  }

  handleStart(e) {
    let { selectedIndex, countToShow, onSelectedChange, children } = this.props;
    let node = domFindNode(this);
    let x = domIsMouse?e.clientX:e.touches[0].clientX;
    let y = domIsMouse?e.clientY:e.touches[0].clientY;
    let offsetX, offsetY, moved, ignore;

    if(!node.scrollable) {
      node.scrollable = 'x';
      node.scrollableWidth = node.clientWidth*children.length;
      node.scrollableLeft = selectedIndex * node.clientWidth;
    }

    let handleMove = e=>{
      offsetX = (domIsMouse?e.clientX:e.touches[0].clientX) - x;
      offsetY = (domIsMouse?e.clientY:e.touches[0].clientY) - y;

      if(ignore===undefined) {
        if(Math.abs(offsetY)>Math.abs(offsetX)) { handleEnd(); return; }
        ignore = false;
      }
      
      moved = true;
      let val = -(this.size/countToShow)*(selectedIndex%children.length)+(offsetX||0);
      val = Math.min(0, val);
      val = Math.max(-(children.length-1)*this.size, val);
      let style = transform('translate3D', val+'px', 0, 0);
      Object.entries(style).forEach(([k,v])=>node.style[k]=v)
      node.scrollableLeft = -val;

      if((selectedIndex===0&&offsetX>0)||(selectedIndex===(children.length-1)&&offsetX<0)){

      }else{
        e.stopPropagation();
        // e.preventDefault();
      }
    }

    let handleEnd = e=>{
      node.removeEventListener(domIsMouse?'mousemove':'touchmove', handleMove);
      node.removeEventListener(domIsMouse?'mouseup':'touchend', handleEnd);
      (!domIsMouse)&&node.removeEventListener('touchcancel', handleEnd);

      if(!moved) return;

      let val = -(this.size/countToShow)*(selectedIndex%children.length);
      let style = transform('translate3D', val+'px', 0, 0);
      Object.entries(style).forEach(([k,v])=>node.style[k]=v)
      node.scrollableLeft = -val;

      if(onSelectedChange) {
        let aindex = selectedIndex - Math.round(((offsetX||0)*children.length)/(countToShow*node.clientWidth));
        aindex = Math.min(aindex, children.length-1);
        aindex = Math.max(aindex, 0);
        if(selectedIndex!==aindex) onSelectedChange(aindex, children[aindex].props);
      }

      if(domIsMouse) this.mark = true;
    }

    let eventOption = domPassiveSupported()?{passive: true}:false;
    node.addEventListener(domIsMouse?'mousemove':'touchmove', handleMove, eventOption);
    node.addEventListener(domIsMouse?'mouseup':'touchend', handleEnd, eventOption);
    (!domIsMouse)&&node.addEventListener('touchcancel', handleEnd, eventOption);
  }

  render() {
    let { countToShow, selectedIndex, onSelectedChange, children, ...props } = BaseComponent(this.props, InnerScroll);

    children = React.Children.toArray(children);

    let classNamePre = 'flex-display-block flex-align-stretch height-full transition-set- overflow-x-hidden';
    let stylePre = {
      width: `${100/countToShow*children.length}%`,
      ...transform('translateX', (-(this.size/countToShow)*(selectedIndex%children.length))+'px'),
    }

    return <Panel {...{[domIsMouse?'onMouseDown':'onTouchStart']:e=>this.handleStart(e)}} classNamePre={classNamePre} stylePre={stylePre} {...props}>{children}</Panel> 
  }
}

InnerScroll.isBnorth = true;
InnerScroll.defaultProps = {};

Object.defineProperty(Panel,"InnerScroll",{ get:function(){ return InnerScroll }, set:function(val){ InnerScroll = val }})
