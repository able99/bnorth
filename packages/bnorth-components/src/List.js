/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React, {cloneElement} from 'react';
import { genCommonProps, cx, hascx } from './utils/props';
import Icon from './Icon';


let List = (aprops)=>{
  let {
    separatorInset,
    component: Component = 'ul', className, containerClassName, containerStyle ,cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);
 

  children = React.Children.toArray(children).filter(v=>v);
  let headers = children.filter(v=>v.props.part==='header');
  let footers = children.filter(v=>v.props.part==='footer');
  let items = children.filter(v=>v.props.part==='item'||!v.props.part);
  
  let classSet = {
  };

  let classSetInner = {
    [`padding-left${separatorInset&&separatorInset!==true?('-'+separatorInset):''}`]: separatorInset,
    'bg-color-white': !hascx(className, 'bg-color'),
    'border-set-v': items.length && !hascx(className, 'border'),
  }
    

  return (
    <Component className={cx(classSet, className)} {...props}>
      {headers.map((v,i,arr)=>cloneElement(v, {
        ...v.props, 
        ...{
          first: i===0,
          last: i===arr.length-1,
        }
      }))}
      <div className={cx(classSetInner)}>
        {items.map((v,i,arr)=>cloneElement(v, {
          ...v.props, 
          ...{
            first: !headers.length&&i===0,
            last: !footers.length&&i===arr.length-1,
            separatorInset,
          }
        }))}
      </div>
      {footers.map((v,i,arr)=>cloneElement(v, {
        ...v.props, 
        ...{
          first: i===0,
          last: i===arr.length-1,
        }
      }))}
    </Component>
  );
}


let ListItem = (aprops)=>{
  let {
    first, last, part, separatorInset,
    media, title, subTitle, desc, after, arrow, autoArrow=true, 
    mediaStyle,        afterStyle,        mainStyle,        subTitleStyle,        descStyle,        titleStyle,        arrayStyle, 
    mediaClassName='', afterClassName='', mainClassName='', subTitleClassName='', descClassName='', titleClassName='', arrayClassName='',
    component: Component = 'li', className, containerClassName, containerStyle,cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSetMeida = {
    'flex-sub-align-center': !mediaClassName.startsWith('flex-sub-align'),
    'margin-right': !mediaClassName.startsWith('margin'),
  };

  let classSetMain = {
    'width-full': true,
    'flex-sub-flex-extend': true,
    'flex-sub-align-center': !mainClassName.startsWith('flex-sub-align'),
  };

  let classSetAfter = {
    'flex-sub-align-center': !afterClassName.startsWith('flex-sub-align'),
    'margin-left': !afterClassName.startsWith('margin'),
    'text-color-light': !afterClassName.startsWith('text-color'),
  };
  
  let classSetArray = {
    'flex-sub-align-center': !arrayClassName.startsWith('flex-sub-align'),
  };

  let classSetTitle = {
    'flex-sub-flex-extend': true,
    'width-full': true,
  };

  let classSetSubTitle = {};

  let classSetDesc = {};
  
  let classSet = {
    'flex-display-flex': true,
    'flex-align-stretch': true,
    'padding': !hascx(className, 'padding'),
    'padding-left-0': separatorInset,
    'cursor-pointer': aprops.onClick||arrow,
    'border-set-bottom-border': part!=='header'&&part!=='footer'&&!last,
  };

  if(cStyle==='solid') {
    if(cTheme) {
      classSet['bg-color-'+cTheme] = true;
      classSet['text-color-white'] = true;
    }
  }else{
    if(cTheme) classSet['text-color-'+cTheme] = true;
  }

  
  return (
    <Component className={cx(classSet, className)} {...props}>
      {media?(<div style={mediaStyle} className={cx(classSetMeida, mediaClassName)}>{media}</div>):null}

      <div style={mainStyle} className={cx(classSetMain, mainClassName)}>
        {title?(<div style={titleStyle} className={cx(classSetTitle, titleClassName)}>{title}</div>):null}
        {subTitle?(<div style={subTitleStyle} className={cx(classSetSubTitle, subTitleClassName)}>{subTitle}</div>):null}
        {desc?(<div style={descStyle} className={cx(classSetDesc, descClassName)}>{desc}</div>):null}
        {children}
      </div>

      {after?(<div style={afterStyle} className={cx(classSetAfter, afterClassName)}>{after}</div>):null}

      {arrow||(autoArrow&&aprops.onClick)?(
      <div style={arrayStyle} className={cx(classSetArray, arrayClassName)}>
        {arrow&&arrow!==true?arrow:(<Icon cTheme="light" name={Icon.getName('right', '>')} />)}
      </div>
      ):null}
    </Component>
  );
}


List.Item = ListItem;
export default List;
 