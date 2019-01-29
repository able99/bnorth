/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel.Container';
import Button from './Button';


// Tabs
// -------------------

/**
 * 标签页组件
 * @component 
 * @augments BaseComponent
 * @exportdefault
 */
class Tabs extends React.Component {
  constructor(props){
    super(props);
    this.state = {selected: props.defaultSelected||0};
  }

  _handleAction = (i,event,props)=>{
    this.setState({selected: i});
    this.props.onAction&&this.props.onAction(i, event, props);
  }

  render() {
    let {
      onAction, selected=this.state.selected, defaultSelected, 
      navProps, containerProps, 
      component:Component=Panel, componentPanel, className, children, ...props
    } = parseProps(this.props, Tabs.props);

    children = React.Children.toArray(children).filter(v=>v);

    let classStr = 'flex-display-block flex-direction-v flex-align-stretch';

    return (
      <Component component={componentPanel} className={classes(classStr, className)} {...props}>
        <Nav onAction={this._handleAction} selected={selected} {...navProps}>
          {children}
        </Nav>
        <Container onAction={this._handleAction} selected={selected} {...containerProps}>
          {children}
        </Container>
      </Component>
    );
  }
}

Tabs.defaultProps = {}
/**
 * @callback TabsActionCallback
 * @param {number} i - 标签的索引
 * @param {*} event - 标签的事件名称
 * @param {object} props - 标签的属性
 * @returns {boolean} 返回为真，将阻止导航条组件的点击事件
 */
/**
 * 设置标签页页面切换的动作回调函数
 * @attribute module:Tabs.Tabs.onAction
 * @type {module:Tabs~TabsActionCallback}
 */
/**
 * 设置标签页当前选中索引
 * @attribute module:Tabs.Tabs.selected
 * @type {number}
 */
/**
 * 设置标签页默认的选中索引
 * @attribute module:Tabs.Tabs.defaultSelected
 * @type {number}
 */
/**
 * 设置标签页的标签导航组件的属性
 * @attribute module:Tabs.Tabs.navProps
 * @type {object}
 */
/**
 * 设置标签页的标签内容容器组件的属性
 * @attribute module:Tabs.Tabs.containerProps
 * @type {object}
 */
/**
 * 设置映射组件
 */
Tabs.defaultProps.component = Panel;

export default Tabs;


// Tabs Nav
// -------------------

/**
 * 标签页的导航条组件，标签页组件内部使用，不直接使用，可替换或者定制
 * @component
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainer
 * @mount Tabs.Nav 
 * @private
 */
let Nav = aprops=>{
  let {
    onAction, selected,
    itemProps={}, itemGetClassName=Nav._itemGetClassName, itemGetStyle=Nav._itemGetStyle, itemGetProps=Nav._itemGetProps,
    component:Component, componentPanel, className, children, ...props
  } = parseProps(aprops, Nav.props);

  let classStr = 'flex-sub-flex-none';

  itemProps.className = classes('text-truncate', itemProps.className);
  itemProps['b-style'] = itemProps['b-style']||'underline';

  return (
    <Component
      component={componentPanel}
      separator justify 
      containerProps={aprops} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      className={classes(classStr, className)} {...props}>
      {children.map((v,i)=>(
        <Button 
          key={v.key||i} selected={selected===i}
          onClick={e=>!(onAction&&onAction(i, v.props.event, v.props))&&(props.onClick&&props.onClick(e))}>
          {v.props.title}
        </Button>
      ))}
    </Component>
  )
}

Object.defineProperty(Tabs,"Nav",{ get:function(){ return Nav }, set:function(val){ Nav = val }})

Nav.defaultProps = {};
/**
 * 设置标签页页面切换的动作回调函数
 * @attribute module:Tabs~Nav.onAction
 * @type {module:Tabs~TabsActionCallback}
 */
/**
 * 设置标签页当前选中索引
 * @attribute module:Tabs~Nav.selected
 * @type {number}
 */
/**
 * 设置映射组件
 */
Nav.defaultProps.component = Button.Group;


// Tabs Container
// ----------------------

/**
 * 标签页容器组件，标签页组件内部使用，不直接使用，可替换或者定制
 * @component 
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainer
 * @mount Tabs.Container
 * @private
 */
let Container = aprops=>{
  let {
    onAction, type, selected:index,
    itemProps, itemGetClassName=Container.itemGetClassName, itemGetStyle=Container.itemGetStyle, itemGetProps=Container.itemGetProps,
    component:Component, componentPanel, className, children, ...props
  } = parseProps(aprops, Container.props);

  let classStr = 'flex-sub-flex-extend height-full';

  return (
    <Component 
      component={componentPanel}
      index={index} type={type} containerProps={aprops} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      className={classes(classStr, className)} {...props}>
      {children.map((v,i)=><Item key={v.key||i} {...v.props} />)}
    </Component>
  )
}

Object.defineProperty(Tabs,"Container",{ get:function(){ return Container }, set:function(val){ Container = val }})

Container.defaultProps = {};
/**
 * 组件的排列类型
 */
Container.defaultProps.type = 'scroll';
/**
 * 设置标签页页面切换的动作回调函数
 * @attribute module:Tabs~Container.onAction
 * @type {module:Tabs~TabsActionCallback}
 */
/**
 * 设置标签页当前选中索引
 * @attribute module:Tabs~Container.selected
 * @type {number}
 */
/*
 * 设置映射组件
 */
Container.defaultProps.component = Panel.Container;

Container.itemGetProps = (i, length, {selected}={})=>{
  return {
    selected: selected===i,
  }
}

// Tabs Container Item
// -------------------

/**
 * 标签页容器组件的子组件，标签页组件内部使用，不直接使用，可替换或者定制
 * @component 
 * @augments BaseComponent
 * @augments Panel.module:Container~PanelContainerItem
 * @mount Tabs.Item
 */
let Item = aprops=>{
  let { 
    title, event,
    component:Component, ...props
  } = aprops;

  return <Component {...props} />;
};

Object.defineProperty(Tabs,"Item",{ get:function(){ return Item }, set:function(val){ Item = val }})

Item.defaultProps = {};
/**
 * 设置标签页的标签的唯一的事件编码
 * @attribute module:Tabs~Item.event
 * @type {string}
 */
/**
 * 设置显示在标签页的导航组件的对应的标签中的内容
 * @attribute module:Tabs~Item.title
 * @type {string|component|element}
 */
/**
 * 设置显示在标签页的容器组件的对应的标签的内容
 * @attribute module:Tabs~Item.children
 * @type {string|component|element}
 */
/*
 * 设置映射组件
 */
Item.defaultProps.component = Panel;
