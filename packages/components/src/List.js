/**
 * @module
 */
import React from 'react';
import BaseComponent from './BaseComponent';
import Panel, { PanelContainer } from './Panel';
import Icon from './Icon';


/**
 * 列表组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel~PanelContainer
 */
let List = aprops=>{
  let {
    separatorInset, hasTheme, header, footer, headerProps, footerProps, 
    children, ...props
  } = BaseComponent(aprops);

  return (
    <PanelContainer _containerProps={aprops} {...props}>
      {header?<Panel bc-border-set-bottom- bc-padding-a- itemPlain {...headerProps}>{header}</Panel>:null}
      {children}
      {footer?<Panel bc-border-set-top- bc-padding-a- itemPlain {...footerProps}>{footer}</Panel>:null}
    </PanelContainer>
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


Object.defineProperty(List,"List",{ get:function(){ return List }, set:function(val){ List = val }})
export default List;


// List Item
// ----------------

/**
 * 表格组件的条目，表格行组件,条目由多个部分组成
 * @component
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel~PanelContainerItem
 * @private
 */
let Item = aprops=>{
  let {
    itemIndex, itemCount, _containerProps:{separatorInset}, onClick, 
    media, mediaProps, mainProps, title, titleProps, subTitle, subTitleProps, desc, descProps, after, afterProps, arrow, arrowProps, autoArrow=true, 
    children, ...props
  } = BaseComponent(aprops, Item);

  let classNamePre = {
    'padding-a-': true,
    [`margin-left-${separatorInset&&separatorInset!==true?('-'+separatorInset):''}`]: separatorInset,
    'padding-left-0': separatorInset,
    'border-set-bottom-': itemIndex<itemCount-1,
  };

  return (
    <PanelContainer type="primary" align="center" b-style="white" classNamePre={classNamePre} onClick={onClick} {...props}>
      {media?(<Panel bc-line-height-0 bc-margin-right- {...mediaProps}>{media===true?undefined:media}</Panel>):null}
      <PanelContainer itemSelected {...mainProps}>
        {title?(<Panel {...titleProps}>{title===true?undefined:title}</Panel>):null}
        {subTitle?(<Panel {...subTitleProps}>{subTitle===true?undefined:subTitle}</Panel>):null}
        {desc?(<Panel {...descProps}>{desc===true?undefined:desc}</Panel>):null}
        {children}
      </PanelContainer>
      {after?(<Panel bc-line-height-0 {...afterProps}>{after===true?undefined:after}</Panel>):null}
      {arrow||(autoArrow&&onClick)?(<Panel component={Icon} name="right:>" {...arrowProps}>{arrow===true?undefined:arrow}</Panel>):null}
    </PanelContainer>
  );
}


Item.defaultProps = {}
Item.defaultProps['b-precast'] = {
  'bp-subTitle-bc-text-size': 'sm',
  'bp-desc-bc-text-size': 'sm',
  'bp-desc-bc-text-color': 'light',
  'bp-after-bc-text-size': 'sm',
  'bp-after-bc-text-color': 'light',
  'bp-arrow-bc-text-color': 'light',
}
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

Object.defineProperty(List,"Item",{ get:function(){ return Item }, set:function(val){ Item = val }})