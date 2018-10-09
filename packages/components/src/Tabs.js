/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel.Container';
import Button from './Button';


class Tabs extends React.Component {
  constructor(props){
    super(props);
    this.state = {selected: props.defaultSelected||0};
  }

  _handleAction = i=>{
    this.setState({selected: i});
    this.props.onAction&&this.props.onAction(i);
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
        <Tabs._Nav onAction={this._handleAction} selected={selected} {...navProps}>
          {children}
        </Tabs._Nav>
        <Tabs._Container onAction={this._handleAction} selected={selected} {...containerProps}>
          {children}
        </Tabs._Container>
      </Component>
    );
  }
}


Tabs._Nav = aprops=>{
  let {
    onAction, selected,
    itemProps={}, itemGetClassName=Tabs._Nav._itemGetClassName, itemGetStyle=Tabs._Nav._itemGetStyle, itemGetProps=Tabs._Nav._itemGetProps,
    component:Component=Button.Group, componentPanel, className, children, ...props
  } = parseProps(aprops, Tabs._Nav.props);

  let classStr = 'flex-sub-flex-none';

  itemProps.className = classes('text-truncate', itemProps.className);
  itemProps['b-style'] = itemProps['b-style']||'underline';

  return (
    <Component
      component={componentPanel}
      separator justify 
      containerProps={aprops} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      className={classes(classStr, className)} {...props}>
      {children}
    </Component>
  )
}

Tabs._Nav._itemGetProps = (i, length, {onAction, selected}={}, props)=>{
  return {
    selected: selected===i,
    onClick:e=>!(onAction&&onAction(i, props))&&(props.onClick&&props.onClick(e)),
  }
}


Tabs._Container = aprops=>{
  let {
    onAction, selected,
    type='single', itemProps, itemComponent, itemGetClassName=Tabs._Container._itemGetClassName, itemGetStyle=Tabs._Container._itemGetStyle, itemGetProps=Tabs._Container._itemGetProps,
    component:Component=Panel.Container, componentPanel, className, children, ...props
  } = parseProps(aprops, Tabs._Container.props);

  let classStr = 'flex-sub-flex-extend';

  return (
    <Component 
      component={componentPanel}
      type={type} containerProps={aprops} itemComponent={itemComponent} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      className={classes(classStr, className)} {...props}>
      {children}
    </Component>
  )
}

Tabs._Container._itemGetProps = (i, length, {selected}={})=>{
  return {
    selected: selected===i,
  }
}


Tabs.Item = Panel.Container.Item;
export default Tabs;