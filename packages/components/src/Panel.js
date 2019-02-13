/**
 * @module
 */
import React, { cloneElement } from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import { transform } from '@bnorth/rich.css/lib/styles/animation'; 
import BaseComponent from './BaseComponent';
import Touchable from './Touchable';

// Panel
// ------------------------------

/**
 * 小面板组件，基本的布局单位，其他组件一般使用该组件做基本组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
let Panel = aprops=>{
  if(aprops.componentTranform) {
    let ComponentTranform = aprops.componentTranform;
    return <ComponentTranform {...{...aprops, componentTranform:undefined}} />
  }

  let {
    main, inline, selected, status, hasBg, hasSelection, itemIndex, itemCount, itemSelect, itemPlain,
    textThemeOnBg, bgThemeOnHollow, textThemeOnBgSelected, textThemeOnBgUnselected, textThemeUnselected, 
    component:Component="div", className, style, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, ...props
  } = BaseComponent(aprops, Panel);
  if(hasBg===undefined) hasBg = bStyle==='solid'&&bTheme;
  if(hasSelection===undefined) hasSelection = bStyle==='underline';

  let classStr = 'position-relative';
  let classSet = {
    'scrollable-a-': main,
    'flex-sub-flex-extend': main,
    'display-inlineblock': inline,
    'status-': status,
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
    classSet[bgThemeOnHollow===false?'bg-none-':('bg-color-'+(bgThemeOnHollow===true?'':bgThemeOnHollow))] = true;
  }else if(bStyle==='underline') {
    let theme = bTheme?(bTheme===true?'':bTheme):(bTheme===false?false:'');
    classSet['bg-none-'] = true;
    classSet['border-none-top-'] = true;
    classSet['border-none-left-'] = true;
    classSet['border-none-right-'] = true;
    classSet['border-width-bottom-2'] = true;
    classSet['border-set-bottom-'+theme] = theme!==false;
    if(!selected) styleSet['borderColor'] = 'transparent';
  }else if(bStyle==='plain') {
    classSet['border-none-top-'] = true;
    classSet['border-none-bottom-'] = true;
    classSet['border-none-left-'] = true;
    classSet['border-none-right-'] = true;
    classSet['bg-none-'] = true;
  }

  return <Component className={classes(classStr, classSet, className)} style={{...styleSet, ...style}} {...props} />
}

Panel.defaultProps = {};
/**
 * 设置为主模式，将开启 flex extend 样式和滚动样式
 * @attribute module:Panel.Panel.main
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
 * 设置为响应点击状态
 * @attribute module:Panel.Panel.status
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


export default Panel;







// Container
// --------------------

const positionToDirection = { left: 'h', right: 'hv', top: 'v', bottom: 'vv' }

/**
 * 扩展小面板组件，提供了容器的能力，可管理子组件,
 * 
 * 容器内的子组件会被容器进行属性设置，如果希望特殊子组件不接受容器组件设置，子组件需要包含 noItem 属性
 * @component
 * @mount Panel.Container
 * @augments BaseComponent
 * @augments module:Panel.Panel
 */
let Container = class extends React.Component {
  render() {
    let {
      type, containerProps, inline, position, direction, justify, align, wrap,
      content, selectedIndex=0, countToShow=1, onSelect, 
      separator:SeparatorComponent, separatorProps, 
      itemProps, itemGetProps=Container.itemGetProps, itemGetClassName=Container.itemGetClassName, itemGetStyle=Container.itemGetStyle,
      component:Component, className, children, ...props
    } = BaseComponent(this.props, Container);

    let classStr = 'position-relative overflow-a-hidden';
    let classSet = {};

    if(SeparatorComponent===true) SeparatorComponent = Separator;

    children = React.Children.toArray(children).filter(v=>v);
    children = !SeparatorComponent?children:children.reduce((v1,v2,i,a)=>{
      if(!SeparatorComponent) return a;
      if(i>0)v1.push(<SeparatorComponent key={'sep'+i} itemPlain {...separatorProps} />)
      v1.push(v2);
      return v1;
    },[])

    let aindex = children.findIndex(v=>typeof v==='object'&&v.props.itemSelected);
    selectedIndex = aindex>=0?aindex:selectedIndex;
    let itemCount = children.filter(v=>((typeof v)==='object'&&!v.props.itemPlain)).length;
    let itemIndex = -1;
    children = React.Children.toArray(children).map(v=>{
      if(typeof v !== 'object' || v.props.itemPlain) return v;
      itemIndex++;
      return (
        <Item separator={SeparatorComponent} {...getSubComponentProps(
          type, selectedIndex, containerProps||{}, 
          itemIndex, itemCount, v.props, itemProps, itemGetClassName, itemGetStyle, itemGetProps
        )}>
          {v}
        </Item>
      );
    })

    if(type==='single'){
      children = children.filter(v=>v.props.itemSelected);
      props.inline = inline;
    }else if(type==='justify'){
      classSet = {
        ['flex-display-'+(inline?'inline':'block')]: true,
        'flex-justify-around': true, 
        'flex-align-stretch': true,
      }
    }else if(type==='primary'){
      classSet = {
        ['flex-display-'+(inline?'inline':'block')]: true,
        'flex-align-center': true,
      }
    }else if(type==='flex'){
      classSet = {
        ['flex-display-'+(inline?'inline':'block')]: true,
      }
    }else if(type==='scroll') {
      let childrenPlain = children.filter(v=>((typeof v)==='object'&&v.props.itemPlain));
      let childrenItem = children.filter(v=>((typeof v)==='object'&&!v.props.itemPlain));
      children = (
        <React.Fragment>
          <InnerScroll countToShow={countToShow} selectedIndex={selectedIndex} onSelect={onSelect}>{childrenItem}</InnerScroll>
          {childrenPlain}
        </React.Fragment>
      );
    }

    if(position) direction = positionToDirection[position];
    let classSetFlex = {
      ['flex-direction-'+direction]: direction,
      ['flex-justify-'+justify]: justify,
      ['flex-align-'+align]: align,
      ['flex-wrap-'+wrap]: wrap,
    }
    
    return <Component className={classes(classStr, classSet, classSetFlex, className)} {...props}>{children}</Component>;
  }
}

Object.defineProperty(Panel,"Container",{ get:function(){ return Container }, set:function(val){ Container = val }})

Container.defaultProps = {}
/**
 * 设置子组件的排列类型，包括：
 * 
 * - single： 仅 selected 属性为真的子组件显示
 * - justify： 平分组件
 * - primary: 仅 subTypePrimary 属性的子组件扩展，其他组件保持不延展不压缩
 * - flex: 普通 flex 布局
 * 
 * @attribute Panel.module:Container~Container.type
 * @type {string}
 */
/**
 * 设置组件的 flex direction 属性，参见 rich.css
 * @attribute Panel.module:Container~Container.direction
 * @type {string}
 */
/**
 * 设置组件的 flex justify 属性，参见 rich.css
 * @attribute Panel.module:Container~Container.justify
 * @type {string}
 */
/**
 * 设置组件的 flex align 属性，参见 rich.css
 * @attribute Panel.module:Container~Container.align
 * @type {string}
 */
/**
 * 设置组件的 flex wrap 属性，参见 rich.css
 * @attribute Panel.module:Container~Container.wrap
 * @type {string}
 */
/**
 * 统一设置子组件的属性
 * @attribute Panel.module:Container~Container.itemProps
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
 * @attribute Panel.module:Container~Container.itemGetClassName
 * @type {Panel.module:Container~ItemGetClassNameCallback}
 */
/**
 * 设置默认的获取子组件的样式类的回到函数
 * @member Panel.module:Container~Container.itemGetClassName
 * @type {Panel.module:Container~ItemGetClassNameCallback}
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
 * @attribute Panel.module:Container~Container.itemGetStyle
 * @type {Panel.module:Container~ItemGetStyleCallback}
 */
/**
 * 设置默认的子组件的样式对象的回调函数
 * @member Panel.module:Container~Container.itemGetStyle
 * @type {Panel.module:Container~ItemGetStyleCallback}
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
 * @attribute Panel.module:Container~Container.itemGetProps
 * @type {Panel.module:Container~ItemGetPropsCallback}
 */
/**
 * 设置默认的获取子组件的属性的回调函数
 * @member Panel.module:Container~Container.itemGetProps
 * @type {Panel.module:Container~ItemGetPropsCallback}
 * @static
 */
Container.defaultProps.component = Panel;


// Panel Container Item
// ------------------------------

function getSubComponentProps(
  type, selectedIndex, containerProps, 
  itemIndex, itemCount, 
  {key, className, style, ...componentProps}={}, 
  {className:itemClassName, style:itemStyle, ...itemProps}={},
  itemGetClassName, itemGetStyle, itemGetProps
){
  return {
    key:key||itemIndex, type, itemIndex, itemCount, itemSelected: selectedIndex===itemIndex,
    style: {
      ...((itemGetStyle&&itemGetStyle(itemIndex, itemCount, containerProps, componentProps, itemProps))||{}), 
      ...itemStyle, 
      ...style,
    },
    className: classes(
      itemGetClassName&&itemGetClassName(itemIndex, itemCount, containerProps, componentProps, itemProps),
      itemClassName,
      className,
    ),
    ...((itemGetProps&&itemGetProps(itemIndex, itemCount, containerProps, componentProps, itemProps))||{}),
    ...itemProps,
    ...componentProps,
  };
}

/**
 * 带容器能力的小面板组件的子组件
 * @component 
 * @mount Panel.Container.Item
 * @augments BaseComponent
 */
let Item = aprops=>{
  let {
    type, separator, itemSelected, itemPlain, index, size, containerProps, 
    className, children, ...props
  } = BaseComponent(aprops, Item);

  let classStr = '';
  let classSet = {};

  if(type==='single'){
    classStr = 'position-relative offset-a-start square-full overflow-a-hidden';
  }else if(type==='justify'){
    classStr = 'flex-sub-flex-extend';
  }else if(type==='primary'){
    classStr = itemSelected?'flex-sub-flex-extend':'flex-sub-flex-none';
  }else if(type==='scroll'){
    classStr = 'flex-sub-flex-extend height-full';
  }

  classSet = {
    'border-none-right-': index<size-1,
    'border-none-a-': separator,
    'bg-none-': separator,
  }

  return cloneElement(children, {className: classes(classStr, classSet, className), ...props});
}

Object.defineProperty(Panel.Container,"Item",{ get:function(){ return Item }, set:function(val){ Item = val }})

Item.defaultProps = {}
/**
 * 参见 Container
 * @attribute Panel.module:Container~Item.type
 */
/**
 * 组件在容器中的索引
 * @attribute Panel.module:Container~Item.index
 * @type {number}
 */
/**
 * 容器中子组件的数量
 * @attribute Panel.module:Container~Item.size
 * @type {number}
 */
/**
 * 容器组件的属性
 * @attribute Panel.module:Container~Item.containerProps
 * @type {object}
 */



// Inner Scroll
// ------------------------

/**
 * 淡入淡出动画组件的内容组件，用来包裹具体淡入淡出内容
 * @component 
 * @private
 * @augments BaseComponent
 * @augments module:Panel.Panel
 * @mount AnimationSlider.InnerScroll
 */
let InnerScroll = class extends React.Component {
  handlePanStart(event, element) {
    let { countToShow, children } = this.props;
    this.size = element.clientWidth*countToShow/children.length;
  }
  handlePan(event, element) {
    this.setState({offset: event.deltaX});
  }

  handlePanEnd(event, element) {
    let { selectedIndex, countToShow, onSelect, children } = this.props;
    this.setState({offset: undefined},()=>{
      if(onSelect) {
        let aindex = selectedIndex - Math.round((event.deltaX*children.length)/(countToShow*element.clientWidth));
        aindex = Math.min(aindex, children.length-1);
        aindex = Math.max(aindex, 0);
        if(selectedIndex!==aindex) onSelect(aindex);
      }
    });
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
/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~InnerScroll.countToShow
 */
/**
 * 参见 AnimationSlider
 * @attribute module:AnimationSlider~InnerScroll.selectedIndex
 */
InnerScroll.defaultProps.component = Touchable;



// Button Group Separator
// -------------------------

/**
 * 按钮组的分隔条组件
 * @component
 * @augments BaseComponent
 * @mount Button.Group.Separator
 * @private
 */
let Separator = aprops=>{
  let { 
    component:Component, panelComponent, subTypeNotItem, className, ...props
  } = BaseComponent(aprops, Separator);

  let classStr = 'flex-sub-flex-none flex-display-inline flex-align-center flex-justify-center';

  return (
    <Component 
      component={panelComponent} 
      inline b-theme='border' b-size='lg'
      className={classes(classStr,className)} {...props}>
      <span>|</span>
    </Component>
  );
}

Object.defineProperty(Panel.Container,"Separator",{ get:function(){ return Separator }, set:function(val){ Separator = val }})

Separator.defaultProps = {}
/**
 * 设置映射组件
 */
Separator.defaultProps.component = Panel;

