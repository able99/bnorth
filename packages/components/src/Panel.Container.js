/**
 * 扩展 Panel 组件，将组件挂载到 Panel 组件上
 * @module 
 */
import React, { cloneElement } from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';


function getSubComponentProps(
  index, size, 
  componentClassName, componentStyle,
  containerProps, 
  {className, style, ...componentProps}={}, 
  {className:itemClassName, style:itemStyle, ...itemProps}={},
  itemGetClassName, itemGetStyle, itemGetProps
){
  return {
    style: {
      ...componentStyle,
      ...((itemGetStyle&&itemGetStyle(index, size, containerProps, componentProps, itemProps))||{}), 
      ...itemStyle, 
      ...style,
    },
    className: classes(
      componentClassName,
      itemGetClassName&&itemGetClassName(index, size, containerProps, componentProps, itemProps),
      itemClassName,
      className,
    ),
    ...((itemGetProps&&itemGetProps(index, size, containerProps, componentProps, itemProps))||{}),
    ...itemProps,
    ...componentProps,
  };
}


// Panel Container
// -----------------------

/**
 * 扩展小面板组件，提供了容器的能力，可管理子组件,
 * 
 * 容器内的子组件会被容器进行属性设置，如果希望特殊子组件不接受容器组件设置，子组件需要包含 noItem 属性
 * @component
 * @mount Panel.Container
 * @augments BaseComponent
 */
let Container = class extends React.Component {
  render() {
    let {
      type, inline,
      direction, justify, align, wrap,
      containerProps, itemProps, 
      itemGetProps=Container.itemGetProps, itemGetClassName=Container.itemGetClassName, itemGetStyle=Container.itemGetStyle,
      component:Component, className, children, ...props
    } = parseProps(this.props, Container.props);

    let classStr = 'position-relative overflow-a-hidden';
    let classSet = {};

    children = React.Children.toArray(children).filter(v=>v);
    let containerItemCount = children.filter(v=>((typeof v)==='object'&&!v.props.subTypeNotItem)).length;
    let containerItemIndex = -1;
    children = React.Children.toArray(children).map((v,i,a)=>{
      if(typeof v !== 'object' || v.props.subTypeNotItem) return v;
      containerItemIndex++;

      let countProps = getSubComponentProps(
        containerItemIndex, containerItemCount, '', {}, containerProps, v.props, 
        itemProps, itemGetClassName, itemGetStyle, itemGetProps
      );

      return <Item key={v.key||containerItemIndex} type={type} index={containerItemIndex} size={containerItemCount} {...countProps}>{v}</Item>;
    })

    if(type==='single'){
      children = children.filter(v=>v.props.selected);
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
    }

    let classSetFlex = {
      ['flex-direction-'+direction]: direction,
      ['flex-justify-'+justify]: justify,
      ['flex-align-'+align]: align,
      ['flex-wrap-'+wrap]: wrap,
    }
    
    return (
      <Component className={classes(classStr, classSet, classSetFlex, className)} {...props}>
        {children}
      </Component>
    )
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
/**
 * 设置映射组件
 */
Container.defaultProps.component = Panel;


// Panel Container Item
// ------------------------------

/**
 * 带容器能力的小面板组件的子组件
 * @component 
 * @mount Panel.Container.Item
 * @augments BaseComponent
 */
let Item = aprops=>{
  let {
    type, subTypePrimary, subTypeNotItem, index, size, containerProps, 
    className, children, ...props
  } = parseProps(aprops, Item.props);

  let classStr = '';
  if(type==='single'){
    classStr = 'position-relative offset-a-start square-full overflow-a-hidden';
  }else if(type==='justify'){
    classStr = 'flex-sub-flex-extend';
  }else if(type==='primary'){
    classStr = subTypePrimary?'flex-sub-flex-extend':'flex-sub-flex-none';
  }

  return cloneElement(children, {className: classes(classStr, className), ...props});
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


export default Panel;
