

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
      {children.map((v,i)=>(
        <Component.Item 
          key={v.key||i} selected={selected===i}
          onClick={e=>!(onAction&&onAction(i, v.props.event, v.props))&&(props.onClick&&props.onClick(e))}>
          {v.props.title}
        </Component.Item>
      ))}
    </Component>
  )
}

Tabs._Container = aprops=>{
  let {
    onAction, 
    type='single', 
    itemProps, itemGetClassName=Tabs._Container._itemGetClassName, itemGetStyle=Tabs._Container._itemGetStyle, itemGetProps=Tabs._Container._itemGetProps,
    component:Component=Panel.Container, componentPanel, className, children, ...props
  } = parseProps(aprops, Tabs._Container.props);

  let classStr = 'flex-sub-flex-extend';

  return (
    <Component 
      component={componentPanel}
      type={type} containerProps={aprops} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      className={classes(classStr, className)} {...props}>
      {children.map((v,i)=><Tabs._Container._Item key={v.key||i} {...v.props} />)}
    </Component>
  )
}

Tabs._Container._Item = aprops=>{
  let { 
    title, event,
    component:Component=Panel, ...props} = aprops;

  return <Component {...props} />;
};

Tabs._Container._itemGetProps = (i, length, {selected}={})=>{
  return {
    selected: selected===i,
  }
}


Tabs.Item = Tabs._Container._Item;
export default Tabs;