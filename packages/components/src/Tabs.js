/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cx, cxm } from './utils/props';
import Views from './Views';
import Button from './Button';


class Tabs extends React.Component {
  render() {
    let {
      onAction, selectedKey=this.state&&this.state.selectedKey, defaultSelectedKey=0, 
      buttonGroupProps={}, viewsProps={}, 
      component:Component='div', className, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, children, ...props
    } = genCommonProps(this.props);
    children = React.Children.toArray(children).filter(v=>v);

    let classStr = 'flex-display-block flex-direction-v flex-align-stretch';

    let handleAction = i=>{
      this.setState({selectedKey: i});
      onAction&&onAction(i);
    }

    return (
      <Component className={cxm(classStr, className)} {...props}>
        <Tabs.ButtonGroup 
          onAction={handleAction} selectedKey={selectedKey} defaultSelectedKey={defaultSelectedKey} 
          {...buttonGroupProps}>
          {children}
        </Tabs.ButtonGroup>
        <Tabs.Views 
          selectedKey={selectedKey} defaultSelectedKey={defaultSelectedKey} 
          {...viewsProps}>
          {children}
        </Tabs.Views>
      </Component>
    );
  }
}


Tabs.ButtonGroup = aprops=>{
  let {
    onAction, selectedKey, defaultSelectedKey,
    buttonProps={}, buttonGetClassName=Tabs.ButtonGroup.buttonGetClassName, buttonGetStyle=Tabs.ButtonGroup.buttonGetStyle, buttonGetProps=Tabs.ButtonGroup.buttonGetProps,
    component:Component=Button.Group, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'flex-sub-flex-none';
  buttonProps.className = cx(buttonProps.className, 'text-truncate');
  buttonProps['b-style'] = buttonProps['b-style']||'underline';

  return (
    <Component
      separator justify 
      buttonProps={buttonProps} buttonGetClassName={buttonGetClassName} buttonGetStyle={buttonGetStyle} buttonGetProps={buttonGetProps}
      className={cxm(classStr, className)} {...props}>
      {children.map((v,i)=>{
        let {eventKey, title, titleProps, onClick} = v.props;
        return (
          <Button 
            key={eventKey||i} 
            selected={selectedKey===undefined||selectedKey===null?i===defaultSelectedKey:selectedKey===i}
            onClick={e=>!(onAction&&onAction(i, eventKey))&&(onClick&&onClick(e))}
            {...titleProps}>
            {title}
          </Button>
        )
      })}
    </Component>
  )
}


Tabs.Views = aprops=>{
  let {
    onAction, selectedKey, defaultSelectedKey,
    viewProps={}, viewGetClassName=Tabs.Views.viewGetClassName, viewGetStyle=Tabs.Views.viewGetStyle, viewGetProps=Tabs.Views.viewGetProps,
    component:Component=Views, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'flex-sub-flex-extend';

  return (
    <Component 
      viewProps={viewProps} viewGetClassName={viewGetClassName} viewGetStyle={viewGetStyle} viewGetProps={viewGetProps}
      className={cxm(classStr, className)} {...props}>
      {children.map((v,i)=>{
        let {eventKey, title, titleProps, onClick, ...props} = v.props;
        return (
          <Views.Item 
            key={eventKey||i} 
            selected={selectedKey===undefined||selectedKey===null?i===defaultSelectedKey:selectedKey===i}
            {...viewProps} {...props}/>
        )
      })}
    </Component>
  )
}


Tabs.Item = Views.Item;


export default Tabs;