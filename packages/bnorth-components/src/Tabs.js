/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React, {cloneElement} from 'react';
import { genCommonProps, genItemProps, cx } from './utils/props';
import Views from './Views';
import Button from './Button';


class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedKey: props.defaultSelectedKey||0};
  }

  render() {
    let {
      navProps:{className:navClassName, ...navProps}={}, getNavItemStyle, getNavItemClassName, 
      navItemProps={
        className: "text-truncate",
      }, 
      getNavItemProps=(i, size, componentProps)=>{
        let { eventKey=i } = componentProps;
        return {
          key: 'box-item-'+eventKey,
          onClick: ()=>{ this.setState({selectedKey:eventKey}); onAction&&onAction(eventKey); },
          selected: selectedKey===undefined?i===defaultSelectedKey:selectedKey===eventKey,
          disabled: componentProps.disabled,
        };
      }, 
      viewsProps:{className:viewsClassName, ...viewsProps}={}, 
      getViewsItemProps=(i, size, componentProps, parentProps)=>{
        let { eventKey=i } = componentProps;
        return {
          selected: selectedKey===undefined?i===defaultSelectedKey:selectedKey===eventKey,
        };
      },
      onAction, selectedKey=this.state.selectedKey, defaultSelectedKey, 
      component:Component='div', className, cTheme, cStyle='underline', cSize, children, ...props
    } = genCommonProps(this.props);
    children = React.Children.toArray(children).filter(v=>v);


    let classSet = {
      'flex-display-flex': true,
      'flex-direction-v': true,
      'flex-align-stretch': true,
    };

    let classSetNav = {
      'flex-sub-flex-none': true,
    };

    let classSetViews = {
      'flex-sub-flex-extend': true,
    };


    return (
      <Component className={cx(classSet, className)} {...props}>
        <Button.Group 
          cStyle={cStyle} cTheme={cTheme} cSize={cSize} separator justify
          className={cx(classSetNav, navClassName)} 
          {...navProps} >
          {children.map((v,i,arr)=>(<Button {...genItemProps(i, arr.length, v.props, navItemProps, getNavItemClassName, getNavItemProps, getNavItemStyle)}> {v.props.title}</Button>))}
        </Button.Group>
        <Views className={cx(classSetViews, viewsClassName)} {...viewsProps}>
          {children.map((v,i,arr)=>(
            cloneElement(v, genItemProps(i, arr.length, v.props, {}, null, getViewsItemProps, null) 
          )))}
        </Views>
      </Component>
    );
  }
}


Tabs.Item = Views.Item;
export default Tabs;