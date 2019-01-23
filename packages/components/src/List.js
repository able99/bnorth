/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel.Container';
import Icon from './Icon';


// List
// ----------------

/**
 * 列表组件
 * @component 
 * @augments BaseComponent
 * @exportdefault
 */
let List = aprops=>{
  let {
    separatorInset, header, footer, 
    innerProps, headerProps, footerProps, itemProps,
    component:Component, componentPanel, children, ...props
  } = parseProps(aprops, List.props);


  return (
    <Component component={componentPanel} {...props}>
      {header?<Header {...headerProps}>{header}</Header>:null}
      <Inner separatorInset={separatorInset} itemProps={itemProps} {...innerProps}>{children}</Inner>
      {footer?<Footer {...footerProps}>{footer}</Footer>:null}
    </Component>
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
 * 设置列表的条目容器的属性
 * @attribute module:List.List.innerProps
 * @type {object}
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
/**
 * 设置列表的条目的属性
 * @attribute module:List.List.itemProps
 * @type {object}
 */
/**
 * 参见 BaseComponent
 */
List.defaultProps.component = Panel;

export default List;

// List Header
// ----------------

/**
 * 表格组件的表格头部组件
 * @component
 * @augments BaseComponent
 * @mount List.Header 
 * @private
 */
let Header = aprops=>{
  let {
    component:Component, componentPanel, className, ...props
  } = parseProps(aprops, Header.props);

  let classStr = 'border-set-bottom- padding-a-';

  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}

Object.defineProperty(List,"Header",{ get:function(){ return Header }, set:function(val){ Header = val }})

Header.defaultProps = {};
/**
 * 参见 BaseComponent
 */
Header.defaultProps.component = Panel;

// List Footer
// ----------------

/**
 * 表格组件的表格页脚组件
 * @component
 * @augments BaseComponent
 * @mount List.Footer 
 * @private
 */
let Footer = aprops=>{
  let {
    component:Component, componentPanel, className, ...props
  } = parseProps(aprops, Footer.props);

  let classStr = 'border-set-top- padding-a-';

  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}

Object.defineProperty(List,"Footer",{ get:function(){ return Footer }, set:function(val){ Footer = val }})

Footer.defaultProps = {};
/**
 * 参见 BaseComponent
 */
Footer.defaultProps.component = Panel;

// List Inner
// ----------------

/**
 * 表格组件的表格行容器组件
 * @component
 * @augments BaseComponent
 * @augments Panel.module:Container~Container
 * @mount List.Inner 
 * @private
 */
let Inner = aprops=>{
  let {
    separatorInset,
    itemProps={}, itemGetClassName=Inner.itemGetClassName, itemGetStyle=Inner.itemGetStyle, itemGetProps=Inner.itemGetProps,
    component:Component, componentPanel, className, children, ...props
  } = parseProps(aprops, Inner.props);

  let classSet = {
    'bg-color-white': true,
    [`padding-left-${separatorInset&&separatorInset!==true?('-'+separatorInset):''}`]: separatorInset,
  }

  return (
    <Component 
      containerProps={aprops} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      component={componentPanel} className={classes(classSet, className)} {...props}>
      {children}
    </Component>
  )
}

Object.defineProperty(List,"Inner",{ get:function(){ return Inner }, set:function(val){ Inner = val }})

Inner.defaultProps = {};
/**
 * 参见 List
 * @attribute module:List~Inner.separatorInset
 */
/**
 * 参见 BaseComponent
 */
Inner.defaultProps.component = Panel.Container;

/**
 * 设置列表条目的属性
 */
Inner.itemGetProps = (index, size, containerProps, componentProps, itemProps)=>{
  return {
    part: 'item', 
    first: index===0, 
    last: index===size-1,
    separatorInset: containerProps.separatorInset,
  }
}


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
    first, last, separatorInset, onClick, 
    media, mediaProps, mainProps, title, titleProps, subTitle, subTitleProps, desc, descProps, after, afterProps, arrow, arrowProps, autoArrow=true, 
    component:Component=Panel, componentPanel, className, children, ...props
  } = parseProps(aprops, Item.props);

  let classStr = 'flex-display-block flex-align-stretch padding-a-';

  let classSet = {
    'status-': Boolean(onClick),
    'padding-left-0': separatorInset,
    'cursor-pointer': onClick||arrow,
    'border-set-bottom-': !last,
  };

  return (
    <Component component={componentPanel} className={classes(classStr, classSet, className)} onClick={onClick} {...props}>
      {media?(<Media {...mediaProps}>{media===true?undefined:media}</Media>):null}
      <Main {...mainProps}>
        {title?(<Title {...titleProps}>{title===true?undefined:title}</Title>):null}
        {subTitle?(<SubTitle {...subTitleProps}>{subTitle===true?undefined:subTitle}</SubTitle>):null}
        {desc?(<Desc {...descProps}>{desc===true?undefined:desc}</Desc>):null}
        {children}
      </Main>
      {after?(<After {...afterProps}>{after===true?undefined:after}</After>):null}
      {arrow||(autoArrow&&onClick)?(<Arrow {...arrowProps}>{arrow===true?undefined:arrow}</Arrow>):null}
    </Component>
  );
}

Object.defineProperty(List,"Item",{ get:function(){ return Item }, set:function(val){ Item = val }})

Item.defaultProps = {};
/**
 * 是否是第一个条目
 * @attribute module:List~Item.first
 * @type {boolean}
 */
/**
 * 是否是最后一个条目
 * @attribute module:List~Item.last
 * @type {boolean}
 */
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
Item.defaultProps.component = Panel;

// List Item Media
// ---------------- 

/**
 * 表格组件的媒体部分组件
 * @component
 * @augments BaseComponent
 * @mount List.Item.Media 
 * @private
 */
let Media = aprops=>{
  let {
    component:Component, componentPanel, className, ...props
  } = parseProps(aprops, Media.porps);

  let classStr = 'flex-sub-align-center flex-sub-flex-none margin-right-';

  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}

Object.defineProperty(List.Item,"Media",{ get:function(){ return Media }, set:function(val){ Media = val }})

Media.defaultProps = {};
/**
 * 参见 BaseComponent
 */
Media.defaultProps.component = Panel;


// List Item Main
// ---------------- 

/**
 * 表格组件的主体部分
 * @component
 * @augments BaseComponent
 * @mount List.Item.Main 
 * @private
 */
let Main = aprops=>{
  let {
    component:Component, componentPanel, className, ...props
  } = parseProps(aprops, Main.props);

  let classStr = 'width-full flex-sub-flex-extend flex-sub-align-center';
  
  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}

Object.defineProperty(List.Item,"Main",{ get:function(){ return Main }, set:function(val){ Main = val }})

Main.defaultProps = {};
/**
 * 参见 BaseComponent
 */
Main.defaultProps.component = Panel;

// List Item Title
// ---------------- 

/**
 * 表格组件的标题部分
 * @component
 * @augments BaseComponent
 * @mount List.Item.Title 
 * @private
 */
let Title = aprops=>{
  let {
    component:Component, componentPanel, ...props
  } = parseProps(aprops, Title.props);

  return <Component component={componentPanel} {...props} />;
}

Object.defineProperty(List.Item,"Title",{ get:function(){ return Title }, set:function(val){ Title = val }})

Title.defaultProps = {};
/**
 * 参见 BaseComponent
 */
Title.defaultProps.component = Panel;

// List Item SubTitle
// ---------------- 

/**
 * 表格组件的副标题部分
 * @component
 * @augments BaseComponent
 * @mount List.Item.SubTitle 
 * @private
 */
let SubTitle = aprops=>{
  let {
    component:Component, componentPanel, ...props
  } = parseProps(aprops, SubTitle.props);

  return <Component component={componentPanel} {...props} />;
}

Object.defineProperty(List.Item,"SubTitle",{ get:function(){ return SubTitle }, set:function(val){ SubTitle = val }})

SubTitle.defaultProps = {};
/**
 * 参见 BaseComponent
 */
SubTitle.defaultProps.component = Panel;

// List Item Desc
// ---------------- 

/**
 * 表格组件的描述部分
 * @component
 * @augments BaseComponent
 * @mount Lis.Itemt.Desc 
 * @private
 */
let Desc = aprops=>{
  let {
    component:Component, componentPanel, ...props
  } = parseProps(aprops, Desc.props);

  return <Component component={componentPanel} b-theme="light" {...props} />;
}

Object.defineProperty(List.Item,"Desc",{ get:function(){ return Desc }, set:function(val){ Desc = val }})

Desc.defaultProps = {};
/**
 * 参见 BaseComponent
 */
Desc.defaultProps.component = Panel;


// List Item After
// ---------------- 

/**
 * 表格组件的行尾部分
 * @component
 * @augments BaseComponent
 * @mount Lis.Item.After 
 * @private
 */
let After = aprops=>{
  let {
    component:Component, componentPanel, className, ...props
  } = parseProps(aprops, After.props);

  let classStr = 'flex-sub-align-center margin-left-';
  
  return <Component component={componentPanel} b-theme="light" className={classes(classStr, className)} {...props} />;
}

Object.defineProperty(List.Item,"After",{ get:function(){ return After }, set:function(val){ After = val }})

After.defaultProps = {};
/**
 * 参见 BaseComponent
 */
After.defaultProps.component = Panel;


// List Item Arrow
// ---------------- 

/**
 * 表格组件的指示箭头部分
 * @component
 * @augments BaseComponent
 * @mount Lis.Itemt.Arrow 
 * @private
 */
let Arrow = aprops=>{
  let {
    icon, iconDefault,
    component:Component, componentPanel=Icon, className, ...props
  } = parseProps(aprops, Arrow.props);

  let classStr = 'flex-sub-align-center flex-sub-flex-none';
  
  return <Component component={componentPanel} b-theme="light" name={icon} defaultName={iconDefault} className={classes(classStr, className)} {...props} />;
}

Object.defineProperty(List.Item,"Arrow",{ get:function(){ return Arrow }, set:function(val){ Arrow = val }})

Arrow.defaultProps = {};
/**
 * 箭头的图标
 * @type {string}
 */
Arrow.defaultProps.icon = 'right';
/**
 * 箭头的默认图标
 * @type {string}
 */
Arrow.defaultProps.iconDefault = '>';
/**
 * 参见 BaseComponent
 */
Arrow.defaultProps.component = Panel;

 