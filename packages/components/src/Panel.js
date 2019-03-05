/**
 * @module
 */
import React, { cloneElement } from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import { transform } from '@bnorth/rich.css/lib/styles/animation'; 
import BaseComponent, { domIsMouse, domFindNode } from './BaseComponent';
import Touchable from './Touchable';

// Panel
// ------------------------------

/**
 * 小面板组件，基本的布局单位，其他组件一般使用该组件做基本组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 */
let Panel = aprops=>{
  if(aprops.componentTransform) { let {componentTransform:ComponentTransform, ...tporps} = aprops; return <ComponentTransform {...tporps} /> }

  let {
    main, page, full, inline, 
    itemIndex, itemCount, itemSelected, itemPlain, _containerProps,
    selected, hasBg, hasSelection, textThemeOnBg, bgThemeOnHollow, textThemeOnBgSelected, textThemeOnBgUnselected, textThemeUnselected, 
    'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, 
    component:Component="div", className, style, ...props
  } = BaseComponent(aprops, Panel);
  if(hasBg===undefined) hasBg = bStyle==='solid'&&bTheme;
  if(hasSelection===undefined) hasSelection = bStyle==='underline';

  if(page) props['data-dock'] = true;

  let classSet = {
    'position-relative': true,
    'offset-a-start square-full overflow-a-hidden': full,
    [page?'flex-display-inline':'display-inlineblock']: inline,
    [(!inline?'flex-display-block':'') + ' flex-direction-v bg-color-view']: page,
    'scrollable-a flex-sub-flex-extend': main,
  }
  let styleSet = {};

  let textTheme;
  if(hasSelection) textTheme = hasBg?(selected?textThemeOnBgSelected:textThemeOnBgUnselected):(selected?(bTheme||false):textThemeUnselected);
  if(!hasSelection) textTheme = hasBg?textThemeOnBg:bTheme;
  textTheme = textTheme?(textTheme===true?'':textTheme):false; 
  classSet['text-color-'+textTheme] = textTheme!==false;
  classSet['text-size-'+(bSize==='true'?'':bSize)] = bSize;

  if(bStyle==='solid') {
    let theme = bTheme?(bTheme===true?'':bTheme):(bTheme===false?false:'component');
    classSet['bg-color-'+theme] = theme!==false;
    classSet['border-set-a-'+theme] = theme!==false;
  }else if(bStyle==='hollow') {
    let theme = bTheme?(bTheme===true?'':bTheme):(bTheme===false?false:'');
    classSet['border-set-a-'+theme] = theme!==false;
    classSet[bgThemeOnHollow===false?'bg-none':('bg-color-'+(bgThemeOnHollow===true?'':bgThemeOnHollow))] = true;
  }else if(bStyle==='underline') {
    let theme = bTheme?(bTheme===true?'':bTheme):(bTheme===false?false:'');
    classSet['border-none-top border-none-left border-none-right bg-none'] = true;
    classSet['border-width-bottom-2'] = true;
    classSet['border-set-bottom-'+theme] = theme!==false;
    if(!selected) styleSet['borderColor'] = 'transparent';
  }else if(bStyle==='white') {
    classSet['bg-color-white'] = true;
  }else if(bStyle==='mask') {
    classSet['bg-color-mask'] = true;
  }else if(bStyle==='plain') {
    classSet['border-none-top border-none-bottom border-none-left border-none-right bg-none'] = true;
  }

  return <Component className={classes(classSet, className)} style={{...styleSet, ...style}} {...props} />
}

Panel.defaultProps = {};
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
 * 设置为有背景状态
 * @attribute module:Panel.Panel.hasBg
 * @type {boolean}
 */
/**
 * 设置为有响应选中状态
 * @attribute module:Panel.Panel.hasSelection
 * @type {boolean}
 */
/**
 * 设置文本主题，在有背景的面板上时
 * @type {string}
 */
Panel.defaultProps.textThemeOnBg = 'white';
/**
 * 设置背景主题，在镂空样式时
 * @type {string}
 */
Panel.defaultProps.bgThemeOnHollow = 'white'; 
/**
 * 设置文本主题，在有背景和在选择状态下
 * @type {string}
 */
Panel.defaultProps.textThemeOnBgSelected = 'white';
/**
 * 设置文本主题，在有背景和在未选择状态下
 * @type {string}
 */
Panel.defaultProps.textThemeOnBgUnselected = 'disable'; 
/**
 * 设置文本主题，在无背景和在未选择状态下
 * @type {string}
 */
Panel.defaultProps.textThemeUnselected = 'disable';
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

Object.defineProperty(Panel,"Panel",{ get:function(){ return Panel }, set:function(val){ Panel = val }})
export default Panel;







// Container
// --------------------

const positionToDirection = { left: 'h', right: 'hv', top: 'v', bottom: 'vv' }

/**
 * 扩展小面板组件，提供了容器的能力，可管理子组件,
 * 
 * 容器内的子组件会被容器进行属性设置，如果希望特殊子组件不接受容器组件设置，子组件需要包含 itemPlain 属性
 * @component
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
export let PanelContainer = class extends React.Component {
  render() {
    let {
      type, inline, position, direction, justify, align, wrap,
      selectedIndex=0, countToShow=1, onSelectedChange, 
      separator, separatorProps, noOverlap,
      itemProps, itemGetProps, itemGetClassName, itemGetStyle,
      component:Component, className, children, ...props
    } = BaseComponent(this.props, PanelContainer);

    let classSet = {
      'position-relative overflow-a-hidden': true,
    };

    children = React.Children.toArray(children).filter(v=>v);
    children = !separator?children:children.reduce((v1,v2,i,a)=>{
      if(i>0)v1.push(<Panel key={'sep'+i} itemPlain inline b-theme='border' b-size='lg' classNamePre={'flex-sub-flex-none flex-display-inline flex-align-center flex-justify-center'} {...separatorProps}><span>|</span></Panel>)
      v1.push(v2);
      return v1;
    },[])
    let aindex = children.findIndex(v=>typeof v==='object'&&v.props.itemSelected);
    selectedIndex = aindex>=0?aindex:selectedIndex;
    let itemCount = children.filter(v=>((typeof v)==='object'&&!v.props.itemPlain)).length;
    let itemIndex = -1;
    children = React.Children.toArray(children).map(v=>typeof v !== 'object' || v.props.itemPlain?v:(<PanelContainerItem {...PanelContainer.genSubProps(
      type, selectedIndex, this.props, 
      ++itemIndex, itemCount, v.props, itemProps, itemGetClassName, itemGetStyle, itemGetProps
    )}>{v}</PanelContainerItem>))

    if(type==='single'){
      children = children.filter(v=>v.props.itemSelected);
      props.inline = inline;
    }else if(type==='justify'){
      classSet = { ...classSet,
        ['flex-display-'+(inline?'inline':'block')]: true,
        'flex-justify-around flex-align-stretch': true, 
      }
    }else if(type==='primary'){
      classSet = { ...classSet,
        ['flex-display-'+(inline?'inline':'block')]: true,
        'flex-align-center': true,
      }
    }else if(type==='flex'){
      classSet = {
        ...classSet,
        ['flex-display-'+(inline?'inline':'block')]: true,
      }
    }else if(type==='scroll') {
      let childrenPlain = children.filter(v=>((typeof v)==='object'&&v.props.itemPlain));
      let childrenItem = children.filter(v=>((typeof v)==='object'&&!v.props.itemPlain));
      children = (
        <React.Fragment>
          <InnerScroll countToShow={countToShow} selectedIndex={selectedIndex} onSelectedChange={onSelectedChange}>{childrenItem}</InnerScroll>
          {childrenPlain}
        </React.Fragment>
      );
    }

    if(position) direction = positionToDirection[position];
    classSet = {
      ...classSet,
      ['flex-direction-'+direction]: direction,
      ['flex-justify-'+justify]: justify,
      ['flex-align-'+align]: align,
      ['flex-wrap-'+wrap]: wrap,
    }
    
    return <Component className={classes(classSet, className)} {...props}>{children}</Component>;
  }
}

PanelContainer.defaultProps = {}
/**
 * 设置子组件的排列类型，包括：
 * 
 * - single： 仅 selected 属性为真的子组件显示
 * - justify： 平分组件
 * - primary: 仅 subTypePrimary 属性的子组件扩展，其他组件保持不延展不压缩
 * - flex: 普通 flex 布局
 * 
 * @attribute module:Panel~PanelContainer.type
 * @type {string}
 */
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
 * @attribute module:Panel~PanelContainer.itemProps
 * @type {object}
 */
/**
 * 获取子组件样式类的回调函数
 * @callback ItemGetClassNameCallback
 * @param {number} index - 子组件的索引
 * @param {number} size - 子组件数量
 * @param {object} containerProps - 容器组件的属性
 * @param {object} componentProps - 子组件的属性
 * @param {object} itemProps - 将增加的子组件属性
 * @returns {string|object|array} 样式字符串，样式对象或者样式类数组，具体参见 rich.css classes 函数
 */
/**
 * 设置获取子组件的样式类的回到函数
 * @attribute module:Panel~PanelContainer.itemGetClassName
 * @type {module:Panel~ItemGetClassNameCallback}
 */
/**
 * 设置默认的获取子组件的样式类的回到函数
 * @member module:Panel~PanelContainer.itemGetClassName
 * @type {module:Panel~ItemGetClassNameCallback}
 */
/**
 * 获取子组件样式对象的回调函数
 * @callback ItemGetStyleCallback
 * @param {number} index - 子组件的索引
 * @param {number} size - 子组件数量
 * @param {object} containerProps - 容器组件的属性
 * @param {object} componentProps - 子组件的属性
 * @param {object} itemProps - 将增加的子组件属性
 * @returns {object} 样式表对象
 */
/**
 * 设置子组件的样式对象的回调函数
 * @attribute module:Panel~PanelContainer.itemGetStyle
 * @type {module:Panel~ItemGetStyleCallback}
 */
/**
 * 设置默认的子组件的样式对象的回调函数
 * @member module:Panel~PanelContainer.itemGetStyle
 * @type {module:Panel~ItemGetStyleCallback}
 */
/**
 * 获取子组件属性的回调函数
 * @callback ItemGetPropsCallback
 * @param {number} index - 子组件的索引
 * @param {number} size - 子组件数量
 * @param {object} containerProps - 容器组件的属性
 * @param {object} componentProps - 子组件的属性
 * @param {object} itemProps - 将增加的子组件属性
 * @returns {object} 属性对象
 */
/**
 * 设置获取子组件的属性的回调函数
 * @attribute module:Panel~PanelContainer.itemGetProps
 * @type {module:Panel~ItemGetPropsCallback}
 */
/**
 * 设置默认的获取子组件的属性的回调函数
 * @member module:Panel~PanelContainer.itemGetProps
 * @type {module:Panel~ItemGetPropsCallback}
 * @static
 */
PanelContainer.defaultProps.component = Panel;

/**
 * 子组件属性计算函数
 * @member
 */
PanelContainer.genSubProps = function(
  type, selectedIndex, containerProps, 
  itemIndex, itemCount, 
  {key, className, style, ...componentProps}={}, 
  {className:itemClassName, style:itemStyle, ...itemProps}={},
  itemGetClassName, itemGetStyle, itemGetProps
){
  let ret = {
    key:key||itemIndex, 
    _type: type, _containerProps: containerProps._containerProps, itemIndex, itemCount, itemSelected: selectedIndex===itemIndex,
    ...componentProps,
    ...itemProps,
  }

  ret.style = {
    ...((itemGetStyle&&itemGetStyle(ret, containerProps))||{}), 
    ...itemStyle, 
    ...style,
  };
  ret.className = classes(
    itemGetClassName&&itemGetClassName(ret, containerProps),
    itemClassName,
    className,
  );
  
  return {
    ...ret,
    ...((itemGetProps&&itemGetProps(ret, containerProps))||{}),
  }
}

Object.defineProperty(Panel,"Container",{ get:function(){ return PanelContainer }, set:function(val){ PanelContainer = val }})




// Panel Container Item
// ------------------------------

/**
 * 带容器能力的小面板组件的子组件
 * @component 
 */
export let PanelContainerItem = aprops=>{
  let {
    _type, _containerProps={}, itemIndex, itemCount, itemSelected, itemPlain, 
    className, children, ...props
  } = BaseComponent(aprops, PanelContainerItem);

  if(itemPlain) return children;

  let classSet = [];
  if(_type==='single') classSet.push('position-relative offset-a-start square-full overflow-a-hidden');
  if(_type==='justify') classSet.push('flex-sub-flex-extend');
  if(_type==='primary') classSet.push(itemSelected?'flex-sub-flex-extend':'flex-sub-flex-none');
  if(_type==='scroll') classSet.push('flex-sub-flex-extend height-full');
  if(_containerProps.noOverlap&&itemIndex<itemCount-1) classSet.push('border-none-right');
  if(_containerProps.separator) classSet.push('border-none-a bg-none');

  return cloneElement(children, {className: classes(classSet, className), _containerProps, itemIndex, itemCount, itemSelected, itemPlain, ...props});
}

PanelContainerItem.defaultProps = {}
/**
 * 容器组件的组织类型
 * @attribute module:Panel~PanelContainerItem.type
 */
/**
 * 容器组件是否有分隔要求 
 * @attribute module:Panel~PanelContainerItem.separator
 */
/**
 * 组件在容器中的索引
 * @attribute module:Panel~PanelContainerItem.itemIndex
 * @type {number}
 */
/**
 * 容器中子组件的数量
 * @attribute module:Panel~PanelContainerItem.itemCount
 * @type {number}
 */
/**
 * 组件为容器中选中组件
 * @attribute module:Panel~PanelContainerItem.itemSelected
 * @type {boolean}
 */
/**
 * 组件不接受容器管理
 * @attribute module:Panel~PanelContainerItem.itemPlain
 * @type {boolean}
 */
/**
 * 容器组件的属性
 * @attribute module:Panel~PanelContainerItem.containerProps
 * @type {object}
 */

Object.defineProperty(Panel,"ContainerItem",{ get:function(){ return PanelContainerItem }, set:function(val){ PanelContainerItem = val }})







// Inner Scroll
// ------------------------

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
    domIsMouse && domFindNode(this).addEventListener("click", event=>{
      if(this.mark) { event.stopPropagation(); this.mark = false }
    },true)
  }

  handlePanStart(event, element) {
    let { countToShow, children } = this.props;
    this.size = element.clientWidth*countToShow/children.length;
  }
  handlePan(event, element) {
    this.setState({offset: event.deltaX});
  }

  handlePanEnd(event, element) {
    let { selectedIndex, countToShow, onSelectedChange, children } = this.props;
    this.setState({offset: undefined},()=>{
      if(onSelectedChange) {
        let aindex = selectedIndex - Math.round((event.deltaX*children.length)/(countToShow*element.clientWidth));
        aindex = Math.min(aindex, children.length-1);
        aindex = Math.max(aindex, 0);
        if(selectedIndex!==aindex) onSelectedChange(aindex, children[aindex].props);
      }
    });
    this.mark = true 
  }

  render() {
    let {
      countToShow, selectedIndex,
      component:Component, className, style, children, ...props
    } = BaseComponent(this.props, InnerScroll);
    let { offset } = this.state||{};

    children = React.Children.toArray(children);

    let classStr = 'flex-display-block flex-align-stretch height-full transition-set-';
    let styleSet = {
      width: `${100/countToShow*children.length}%`,
      ...transform('translateX', isNaN(offset)
        ?-100/children.length*(selectedIndex%children.length)+'%'
        :(-(this.size/countToShow)*(selectedIndex%children.length)+(offset||0))+'px'
      ),
      ...style,
    }

    return (
      <Component 
        direction="horizontal" recognizers={{'pan':{enable: true}}} 
        onPanStart={this.handlePanStart.bind(this)} onPan={this.handlePan.bind(this)} onPanEnd={this.handlePanEnd.bind(this)} onPanCancel={this.handlePanEnd.bind(this)}
        className={classes(classStr, className)} style={styleSet} {...props}>
        {children}
      </Component>
    );
  }
}

InnerScroll.defaultProps = {};
InnerScroll.defaultProps.component = Touchable;

Object.defineProperty(Panel,"InnerScroll",{ get:function(){ return InnerScroll }, set:function(val){ InnerScroll = val }})
