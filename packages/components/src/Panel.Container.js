/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';


function getSubComponentProps(
  i, length, containerProps, 
  {className, styletyle, ...props}={}, 
  {className:subPropsClassName, style:subPropsStyle, ...subProps}={},
  subGetClassName, subGetStyle, subGetProps
){
  return {
    style: {
      ...((subGetStyle&&subGetStyle(i, length, containerProps, props, subProps))||{}), 
      ...subPropsStyle, 
      ...styletyle,
    },
    className: classes(
      subGetClassName&&subGetClassName(i, length, containerProps, props, subProps),
      subPropsClassName,
      className,
    ),
    ...((subGetProps&&subGetProps(i, length, containerProps, props, subProps))||{}),
    ...subProps,
    ...props,
  };
}


class Container extends React.Component {
  render() {
    let {
      type, containerProps, itemComponent, itemProps, itemGetProps, itemGetClassName, itemGetStyle,
      component:Component=Panel, className, children, ...props
    } = parseProps(this.props);

    let classStr = 'position-relative overflow-a-hidden';

    let ai = 0;
    children = React.Children.toArray(children)
      .filter(v=>v)
      .map((v,i,a)=>{
        // if(typeof v !== 'object' || v.type!==Container.Item) return v;
        if(typeof v !== 'object' || v.props.notItem) return v;
        let itemObj = getSubComponentProps(ai++, a.length, containerProps, v.props, itemProps, itemGetClassName, itemGetStyle, itemGetProps);
        return <Container.Item key={v.key||a} type={type} component={itemComponent} {...itemObj} />;
      })

    if(type==='single'){
      children = children.filter(v=>v.props.selected);
    }else if(type==='justify'){
      classStr += ' flex-display-block flex-justify-around flex-align-stretch';
    }else {

    }

    return (
      <Component className={classes(classStr, className)} {...props}>
        {children}
      </Component>
    )
  }
}

Container.Item = aprops=>{
  let {
    type, 
    itemProps, itemGetProps, itemGetClassName, itemGetStyle,
    component:Component=Panel, className, ...props
  } = parseProps(aprops);
  let classStr = '';

  if(type==='single'){
    classStr += ' position-relative offset-a-start square-full overflow-a-hidden';
  }else if(type==='justify'){
    classStr += ' flex-sub-flex-extend';
  }else {

  }

  return <Component className={classes(classStr, className)} {...props} />
}


Panel.Container = Container;
export default Panel;
