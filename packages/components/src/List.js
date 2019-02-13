/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import BaseComponent from './BaseComponent';
import Panel from './Panel';
import Icon from './Icon';


/**
 * 列表组件
 * @component 
 * @augments BaseComponent
 * @exportdefault
 */
let List = aprops=>{
  let {
    separatorInset, hasTheme,
    header, footer, headerProps, footerProps, 
    children, ...props
  } = BaseComponent(aprops, List, {isContainer: true});
  
  props.itemProps = { separatorInset, hasTheme }

  return (
    <Panel.Container {...props}>
      {header?<Panel bc-border-set-bottom- bc-padding-a- itemPlain {...headerProps}>{header}</Panel>:null}
      {children}
      {footer?<Panel bc-border-set-top- bc-padding-a- itemPlain {...footerProps}>{footer}</Panel>:null}
    </Panel.Container>
  );
}

List.defaultProps = {};
/**
 * 设置列表条目缩进，取值为 padding 的配置值，true 为使用默认配置值，参见 rich.css spacing
 * @attribute module:List.List.separatorInset
 * @type {boolean|string}
 */
/**
 * 设置列表的表头
 * @attribute module:List.List.header
 * @type {element|component}
 */
/**
 * 设置列表的脚注
 * @attribute module:List.List.footer
 * @type {element|component}
 */
/**
 * 设置列表的表头的属性
 * @attribute module:List.List.headerProps
 * @type {object}
 */
/**
 * 设置列表的脚注的属性
 * @attribute module:List.List.footerProps
 * @type {object}
 */
/*
 * 设置是否 List 组件各个部分有主题设置
 * @type {boolean}
 */
List.defaultProps.hasTheme = true;


export default List;


// List Item
// ----------------

/**
 * 表格组件的条目，表格行组件,条目由多个部分组成
 * @component
 * @augments BaseComponent
 * @augments Panel.module:Container~Item
 * @mount List.Item 
 * @private
 */
let Item = aprops=>{
  let {
    itemIndex, itemCount, separatorInset, hasTheme, onClick, 
    media, mediaProps, mainProps, title, titleProps, subTitle, subTitleProps, desc, descProps, after, afterProps, arrow, arrowProps, autoArrow=true, 
    component:Component=Panel, componentPanel, className, children, ...props
  } = BaseComponent(aprops, Item);

  let classSet = {
    'padding-a-': true,
    'bg-color-white': hasTheme,
    'status-': Boolean(onClick),
    [`margin-left-${separatorInset&&separatorInset!==true?('-'+separatorInset):''}`]: separatorInset,
    'padding-left-0': separatorInset,
    'cursor-pointer': onClick||arrow,
    'border-set-bottom-': itemIndex<itemCount-1,
  };

  return (
    <Component component={componentPanel} 
      type="primary" align="center" 
      className={classes(classSet, className)} onClick={onClick} {...props}>
      {media?(<Panel bc-margin-right- {...mediaProps}>{media===true?undefined:media}</Panel>):null}
      <Panel.Container itemSelected {...mainProps}>
        {title?(<Panel {...titleProps}>{title===true?undefined:title}</Panel>):null}
        {subTitle?(<Panel b-size={hasTheme&&"sm"} {...subTitleProps}>{subTitle===true?undefined:subTitle}</Panel>):null}
        {desc?(<Panel b-size={hasTheme&&"sm"} b-theme={hasTheme&&"light"} {...descProps}>{desc===true?undefined:desc}</Panel>):null}
        {children}
      </Panel.Container>
      {after?(<Panel b-size={hasTheme&&"sm"} b-theme={hasTheme&&"light"} {...afterProps}>{after===true?undefined:after}</Panel>):null}
      {arrow||(autoArrow&&onClick)?(<Panel component={Icon} name="right" nameDefault=">" b-size={hasTheme&&"sm"} b-theme={hasTheme&&"light"} {...arrowProps}>{arrow===true?undefined:arrow}</Panel>):null}
    </Component>
  );
}

Object.defineProperty(List,"Item",{ get:function(){ return Item }, set:function(val){ Item = val }})

Item.defaultProps = {};
/**
 * 参见 List
 * @attribute module:List~Item.separatorInset
 */
/**
 * 设置条目的媒体部分
 * @attribute module:List~Item.media
 * @type {element|cmponent}
 */
/**
 * 设置条目的媒体部分的属性
 * @attribute module:List~Item.mediaProps
 * @type {object}
 */
/**
 * 设置条目的主体部分
 * @attribute module:List~Item.main
 * @type {element|cmponent}
 */
/**
 * 设置条目的主体部分的属性
 * @attribute module:List~Item.mainProps
 * @type {object}
 */
/**
 * 设置条目的标题部分
 * @attribute module:List~Item.title
 * @type {element|cmponent}
 */
/**
 * 设置条目的标题部分的属性
 * @attribute module:List~Item.titleProps
 * @type {object}
 */
/**
 * 设置条目的副标题部分
 * @attribute module:List~Item.subTitle
 * @type {element|cmponent}
 */
/**
 * 设置条目的副标题部分的属性
 * @attribute module:List~Item.subTitleProps
 * @type {object}
 */
/**
 * 设置条目的描述部分
 * @attribute module:List~Item.desc
 * @type {element|cmponent}
 */
/**
 * 设置条目的描述部分的属性
 * @attribute module:List~Item.descProps
 * @type {object}
 */
/**
 * 设置条目的尾部部分
 * @attribute module:List~Item.desc
 * @type {element|cmponent}
 */
/**
 * 设置条目的尾部部分的属性
 * @attribute module:List~Item.descProps
 * @type {object}
 */
/**
 * 设置条目的箭头部分
 * @attribute module:List~Item.arrow
 * @type {element|cmponent}
 */
/**
 * 设置箭头部分是否自动显示，如果设置为真，则在有 onClick 时，自动显示箭头部分
 * @type {boolean}
 */
Item.defaultProps.autoArrow = true; 
/**
 * 参见 BaseComponent
 */
Item.defaultProps.component = Panel.Container;