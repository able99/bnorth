/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React ,{ cloneElement } from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';
import Icon from './Icon';


let List = aprops=>{
  let {
    separatorInset, header, footer, 
    innerProps, headerProps, footerProps, itemProps,
    component:Component=Panel, componentPanel, children, ...props
  } = parseProps(aprops, List.props);

  children = React.Children.toArray(children).filter(v=>v).map((v,i,a)=>cloneElement(v, {
    key: v.key||i,
    ...v.props,
    part: 'item', 
    first: i===0, 
    last: i===a.length-1,
    separatorInset,
    ...itemProps
  }));

  return (
    <Component component={componentPanel} {...props}>
      {header?<List._Header {...headerProps}>{header}</List._Header>:null}
      <List._Inner separatorInset={separatorInset} {...innerProps}>
        {children}
      </List._Inner>
      {footer?<List._Footer {...footerProps}>{footer}</List._Footer>:null}
    </Component>
  );
}

List._Header = aprops=>{
  let {
    component:Component=Panel, componentPanel, className, ...props
  } = parseProps(aprops, List._Header.props);

  let classStr = 'border-set-bottom- padding-a-';

  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}

List._Footer = aprops=>{
  let {
    component:Component=Panel, componentPanel, className, ...props
  } = parseProps(aprops, List._Footer.props);

  let classStr = 'border-set-top- padding-a-';

  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}

List._Inner = aprops=>{
  let {
    separatorInset,
    component:Component=Panel, componentPanel, className, children, ...props
  } = parseProps(aprops, List._Inner.props);

  let classSet = {
    'bg-color-white': true,
    [`padding-left-${separatorInset&&separatorInset!==true?('-'+separatorInset):''}`]: separatorInset,
  }

  return <Component component={componentPanel} className={classes(classSet, className)} {...props}>{children}</Component>
}

List.Item = aprops=>{
  let {
    first, last, separatorInset, onClick, 
    media, mediaProps, mainProps, title, titleProps, subTitle, subTitleProps, desc, descProps, after, afterProps, arrow, arrowProps, autoArrow=true, 
    component:Component=Panel, componentPanel, className, children, ...props
  } = parseProps(aprops, List.Item.props);

  let classStr = 'flex-display-block flex-align-stretch padding-a-';

  let classSet = {
    'status-': Boolean(onClick),
    'padding-left-0': separatorInset,
    'cursor-pointer': onClick||arrow,
    'border-set-bottom-': !last,
  };

  return (
    <Component component={componentPanel} className={classes(classStr, classSet, className)} onClick={onClick} {...props}>
      {media?(<List.Item._Media {...mediaProps}>{media===true?undefined:media}</List.Item._Media>):null}
      <List.Item._Main {...mainProps}>
        {title?(<List.Item._Title {...titleProps}>{title===true?undefined:title}</List.Item._Title>):null}
        {subTitle?(<List.Item._SubTitle {...subTitleProps}>{subTitle===true?undefined:subTitle}</List.Item._SubTitle>):null}
        {desc?(<List.Item._Desc {...descProps}>{desc===true?undefined:desc}</List.Item._Desc>):null}
        {children}
      </List.Item._Main>
      {after?(<List.Item._After {...afterProps}>{after===true?undefined:after}</List.Item._After>):null}
      {arrow||(autoArrow&&onClick)?(<List.Item._Arrow {...arrowProps}>{arrow===true?undefined:arrow}</List.Item._Arrow>):null}
    </Component>
  );
}

List.Item._Media = aprops=>{
  let {
    component:Component=Panel, componentPanel, className, ...props
  } = parseProps(aprops, List.Item._Media.porps);

  let classStr = 'flex-sub-align-center flex-sub-flex-none margin-right-';

  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}

List.Item._Main = aprops=>{
  let {
    component:Component=Panel, componentPanel, className, ...props
  } = parseProps(aprops, List.Item._Main.props);

  let classStr = 'width-full flex-sub-flex-extend flex-sub-align-center';
  
  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}

List.Item._Title = aprops=>{
  let {
    component:Component=Panel, componentPanel, ...props
  } = parseProps(aprops, List.Item._Title.props);

  return <Component component={componentPanel} {...props} />;
}

List.Item._SubTitle = aprops=>{
  let {
    component:Component=Panel, componentPanel, ...props
  } = parseProps(aprops, List.Item._SubTitle.props);

  return <Component component={componentPanel} {...props} />;
}

List.Item._Desc = aprops=>{
  let {
    component:Component=Panel, componentPanel, ...props
  } = parseProps(aprops, List.Item._Desc.props);

  return <Component component={componentPanel} b-theme="light" {...props} />;
}

List.Item._After = aprops=>{
  let {
    component:Component=Panel, componentPanel, className, ...props
  } = parseProps(aprops, List.Item._After.props);

  let classStr = 'flex-sub-align-center margin-left-';
  
  return <Component component={componentPanel} b-theme="light" className={classes(classStr, className)} {...props} />;
}

List.Item._Arrow = aprops=>{
  let {
    component:Component=Panel, componentPanel=Icon, className, ...props
  } = parseProps(aprops, List.Item._Arrow.props);

  let classStr = 'flex-sub-align-center flex-sub-flex-none';
  
  return <Component component={componentPanel} b-theme="light" name='right' defaultName='>' className={classes(classStr, className)} {...props} />;
}


export default List;
 