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
  handleAction = i=>{
    this.setState({selectedKey: i});
    this.props.onAction&&this.props.onAction(i);
  }

  render() {
    let {
      onAction, selectedKey=this.state&&this.state.selectedKey, defaultSelectedKey=0, 
      navProps, containerProps, 
      component:Component=Panel, className, children, ...props
    } = parseProps(this.props);

    children = React.Children.toArray(children).filter(v=>v);

    let classStr = 'flex-display-block flex-direction-v flex-align-stretch';

    return (
      <Component className={classes(classStr, className)} {...props}>
        <Tabs.Nav onAction={this.handleAction} selectedKey={selectedKey} defaultSelectedKey={defaultSelectedKey} {...navProps}>
          {children}
        </Tabs.Nav>
        <Tabs.Container onAction={this.handleAction} selectedKey={selectedKey} defaultSelectedKey={defaultSelectedKey} {...containerProps}>
          {children}
        </Tabs.Container>
      </Component>
    );
  }
}


Tabs.Nav = aprops=>{
  let {
    onAction, selectedKey, defaultSelectedKey,
    itemProps={}, itemGetClassName=Tabs.Nav.itemGetClassName, itemGetStyle=Tabs.Nav.itemGetStyle, itemGetProps=Tabs.Nav.itemGetProps,
    component:Component=Button.Group, className, children, ...props
  } = parseProps(aprops);

  let classStr = 'flex-sub-flex-none';

  itemProps.className = classes('text-truncate', itemProps.className);
  itemProps['b-style'] = itemProps['b-style']||'underline';

  return (
    <Component
      separator justify 
      containerProps={aprops} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      className={classes(classStr, className)} {...props}>
      {children}
    </Component>
  )
}

Tabs.Nav.itemGetProps = (i, length, {onClick, onAction, selectedKey, defaultSelectedKey}={}, {eventKey}={})=>{
  return {
    key: eventKey||i, 
    selected: selectedKey===undefined||selectedKey===null?i===defaultSelectedKey:selectedKey===i,
    onClick:e=>!(onAction&&onAction(i, eventKey))&&(onClick&&onClick(e)),
  }
}


Tabs.Container = aprops=>{
  let {
    onAction, selectedKey, defaultSelectedKey,
    type='single', itemProps, itemComponent, itemGetClassName=Tabs.Container.itemGetClassName, itemGetStyle=Tabs.Container.itemGetStyle, itemGetProps=Tabs.Container.itemGetProps,
    component:Component=Panel.Container, className, children, ...props
  } = parseProps(aprops);

  let classStr = 'flex-sub-flex-extend';

  return (
    <Component 
      type={type} containerProps={aprops} itemComponent={itemComponent} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      className={classes(classStr, className)} {...props}>
      {children}
    </Component>
  )
}

Tabs.Container.itemGetProps = (i, length, {selectedKey, defaultSelectedKey}={}, {eventKey}={}, subProps)=>{
  return {
    key: eventKey||i, 
    selected: selectedKey===undefined||selectedKey===null?i===defaultSelectedKey:selectedKey===i,
  }
}


Tabs.Item = Panel.Container.Item;
export default Tabs;