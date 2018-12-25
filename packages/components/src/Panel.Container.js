

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


class Container extends React.Component {
  render() {
    let {
      type, containerProps, itemProps, itemGetProps, itemGetClassName, itemGetStyle,
      component:Component=Panel, className, children, ...props
    } = parseProps(this.props, Panel.Container.props);

    let classStr = 'position-relative overflow-a-hidden';

    let ai = 0;
    children = React.Children.toArray(children)
      .filter(v=>v)
      .map((v,i,a)=>{
        if(typeof v !== 'object' || v.props.notItem) return v;
        return (
          <Container.Item 
            key={v.key||a} type={type} index={ai++} size={a.length}
            containerProps={containerProps} componentProps={v.props} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps} >
            {v}
          </Container.Item>
        );
      })

    if(type==='single'){
      // children = children.filter(v=>v.props.selected);
    }else if(type==='justify'){
      classStr += ' flex-display-block flex-justify-around flex-align-stretch';
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
    type, index, size, 
    containerProps, componentProps, itemProps, itemGetProps, itemGetClassName, itemGetStyle,
    children
  } = parseProps(aprops, Panel.Container.Item.props);
  
  let classStr = '';
  if(type==='single'){
    classStr += ' position-relative offset-a-start square-full overflow-a-hidden';
  }else if(type==='justify'){
    classStr += ' flex-sub-flex-extend';
  }

  let itemObj = getSubComponentProps(
    index, size, 
    classStr, null,
    containerProps, componentProps, itemProps, 
    itemGetClassName, itemGetStyle, itemGetProps
  );

  if(type==='single'&&!itemObj.selected) return null;
  
  return cloneElement(children, {...itemObj});
}


Panel.Container = Container;
export default Panel;
