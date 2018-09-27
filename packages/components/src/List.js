/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import Panel from './Panel';
import Icon from './Icon';


let List = aprops=>{
  let {
    separatorInset, innerProps={},
    itemProps={},
    component:Component='ul', 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);
  children = React.Children.toArray(children).filter(v=>v);

  let headers = children.filter(v=>v.props.part==='header');
  let footers = children.filter(v=>v.props.part==='footer');
  let items = children.filter(v=>v.props.part==='item'||!v.props.part);

  return (
    <Component {...props}>
      {headers.map((v,i,a)=>(
        <List.Item 
          key={v.key} {...v.props} 
          first={i===0} last={i===a.length-1}
          {...itemProps} />
      ))}
      <List._Inner separatorInset {...innerProps}>
        {items.map((v,i,a)=>(
          <List.Item 
            key={v.key} {...v.props} 
            part='item' first={i===0} last={i===a.length-1}
            separatorInset
            {...itemProps} />
        ))}
      </List._Inner>
      {footers.map((v,i,a)=>(
        <List.Item 
          key={v.key} {...v.props} 
          first={i===0} last={i===a.length-1}
          {...itemProps} />
      ))}
    </Component>
  );
}

List._Inner = aprops=>{
  let {
    separatorInset,
    component:Component=Panel, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'bg-color-white';
  let classSet = {
    [`padding-left-${separatorInset&&separatorInset!==true?('-'+separatorInset):''}`]: separatorInset,
  }

  return <Component className={cxm(classStr, classSet, className)} {...props}>{children}</Component>
}

List.Item = aprops=>{
  let {
    first, last, part, separatorInset, onClick, 
    colorActiveOnTheme='white',
    media, mediaProps, mainProps, title, titleProps, subTitle, subTitleProps, desc, descProps, after, afterProps, arrow, arrowProps, arrowIconProps, autoArrow=true, 
    component:Component='li', className, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'flex-display-block flex-align-stretch padding-a-';

  let classSet = {
    'status-': Boolean(onClick),
    'padding-left-0': separatorInset,
    'cursor-pointer': aprops.onClick||arrow,
    'border-set-bottom-': (part==='item'&&!last)||(part==='header'&&(last||!first)),
    'border-set-top-': (part==='footer'&&(first||!last)),
  };
  if(bSize) classSet['text-size-'+(bSize===true?'':bSize)] = true;
  if(bStyle==='solid'&&bTheme) {
    classSet['bg-color-'+(bTheme===true?'':bTheme)] = true;
    classSet['text-color-'+colorActiveOnTheme] = true;
  }else if(bStyle==='solid'&&!bTheme) {
    classSet['bg-color-component'] = true;
  }else {
    if(bTheme) classSet['text-color-'+(bTheme===true?'':bTheme)] = true;
  }

  return (
    <Component className={cxm(classStr, classSet, className)} onClick={onClick} {...props}>
      {media?(<List.Item._Media {...mediaProps}>{media}</List.Item._Media>):null}
      <List.Item._Main {...mainProps}>
        {title?(<List.Item._Title {...titleProps}>{title}</List.Item._Title>):null}
        {subTitle?(<List.Item._SubTitle {...subTitleProps}>{subTitle}</List.Item._SubTitle>):null}
        {desc?(<List.Item._Desc {...descProps}>{desc}</List.Item._Desc>):null}
        {children}
      </List.Item._Main>
      {after?(<List.Item._After {...afterProps}>{after}</List.Item._After>):null}
      {arrow||(autoArrow&&aprops.onClick)?(<List.Item._Arrow arrowIconProps={arrowIconProps} {...afterProps}>{arrow}</List.Item._Arrow>):null}
    </Component>
  );
}

List.Item._Media = aprops=>{
  let {
    component:Component=Panel, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'flex-sub-align-center flex-sub-flex-none';

  return <Component className={cxm(classStr, className)} {...props}>{children}</Component>;
}

List.Item._Main = aprops=>{
  let {
    component:Component=Panel, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'width-full flex-sub-flex-extend flex-sub-align-center';
  
  return <Component className={cxm(classStr, className)} {...props}>{children}</Component>;
}

List.Item._Title = aprops=>{
  let {
    component:Component=Panel, children, ...props
  } = genCommonProps(aprops);

  return <Component {...props}>{children}</Component>;
}

List.Item._SubTitle = aprops=>{
  let {
    component:Component=Panel, children, ...props
  } = genCommonProps(aprops);

  return <Component {...props}>{children}</Component>;
}

List.Item._Desc = aprops=>{
  let {
    component:Component=Panel, children, ...props
  } = genCommonProps(aprops);

  return <Component {...props}>{children}</Component>;
}

List.Item._After = aprops=>{
  let {
    component:Component=Panel, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'flex-sub-align-center';
  
  return <Component b-theme="light" className={cxm(classStr, className)} {...props}>{children}</Component>;
}

List.Item._Arrow = aprops=>{
  let {
    arrowIconProps,
    component:Component=Panel, className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'flex-sub-align-center flex-sub-flex-none line-height-0';
  
  return (
    <Component b-theme="light" className={cxm(classStr, className)} {...props}>
      {!children||children===true?<Icon name='right' nameDefault='>' {...arrowIconProps}/>:children}
    </Component>
  )
}


export default List;
 