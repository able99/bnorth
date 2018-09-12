/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React,{ cloneElement } from 'react';
import { genCommonProps, genItemProps, hascx, cx } from './utils/props';


let Button = aprops=>{
  let {
    selected, underLineProps={},
    component:Component='button', className, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'outline-none': true,
    'appearance-none': true,
    'font-smoothing-antialiased': true,
    'vertical-align-middle': true,
    'position-relative': !hascx(className, 'position'),
    'transition': true,
    'line-height-1': true,
    'cursor-pointer': true,
    'text-align-center': !hascx(className, 'text-align'),
    'padding-xl': !hascx(className, 'padding'),
    'button-active': cStyle==='underline',
  };
 
  classSet[`text-size-${cSize}`] = cSize;
  
  if(cStyle==='hollow'){
    classSet['bg-none'] = !hascx(className, 'bg-color');
    
    if(cTheme){
      classSet['border-set-'+cTheme] = true;
      classSet['text-color-'+cTheme] = true;
    }else{
      classSet['border-set-border'] = true;
      classSet['text-color-normal'] = true;
    }
  }else if(cStyle==='underline'){
    classSet['border-none'] = true;
    classSet['text-color-'+cTheme] = cTheme;
  }else if(cStyle==='plain'){
    classSet['bg-none'] = true;
    classSet['border-none'] = true;

    if(cTheme){
      classSet['text-color-'+cTheme] = true;
    }
  }else{
    if(cTheme){
      classSet['bg-color-'+cTheme] = true;
      classSet['border-set-'+cTheme] = true;
      classSet['text-color-white'] = true;
    }else{
      classSet['bg-color-component'] = true;
      classSet['border-set-component'] = true;
      classSet['text-color-normal'] = true;
    }
  }

  
  return (
    <Component className={cx(classSet, className)} {...props}>
      {children}
      <Button.UnderLine selected={selected} cTheme={cTheme} cStyle={cStyle} cSize={cSize} {...underLineProps} />
    </Component>
  );
}

Button.UnderLine = aprops=>{
  let {
    selected, cTheme, cStyle, cSize, style, className, ...props
  } = genCommonProps(aprops);


  let classSet = {};
  classSet['position-absolute'] = true;
  classSet['offset-start-left'] = true;
  classSet['offset-start-right'] = true;
  classSet['offset-start-bottom'] = true;
  classSet['bg-color-'+(cTheme||'component')] = true;
  classSet['transition'] = true;
  classSet['pointer-events-none'] = true;
  classSet['opacity-'+(selected?'1':'0')] = true;

  let styleSet = {
    height: 2,
  }


  return (
    <div style={{...styleSet, ...style}} className={cx(classSet, className)} {...props}/>
  );
}


let ButtonGroup = aprops=>{
  let {
    stacked, justify, separator, 
    separatorProps={},
    buttonProps={}, getButtonClassName=(i, size, componentProps, className)=>({
      'border-none-right': !stacked&&!i>=size-1,
      'border-none-left': separator&&!i===0,
      'border-none-bottom': stacked&&!i>=size-1,
      'flex-sub-flex-extend': justify,
      'width-full': stacked,
    }), getButtonProps, getButtonStyle,
    component:Component='span', className, cTheme, cSize, cStyle, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'flex-display-flex': justify&&!hascx(className, 'flex-display'),
    'flex-align-stretch': justify&&!hascx(className, 'flex-align'),
    'display-inline-block': stacked&&!hascx(className, 'display'),
  };
  

  return (
    <Component className={cx(classSet, className)} {...props}>
      {React.Children.toArray(children)
      .filter(v=>v)
      .map((v,i, arr)=>cloneElement(v, {
        cTheme, cSize, cStyle,
        ...genItemProps(i, arr.length, v.props, buttonProps, getButtonClassName, getButtonProps, getButtonStyle)
      }))
      .reduce((v1,v2,i,arr)=>{
        if(!separator||stacked) return arr;
        if(i>0)v1.push(<ButtonGroup.Separator key={'sep'+i} i={i} {...separatorProps} />)
        v1.push(v2);
        return v1;
      },[])}
    </Component>
  );
}

ButtonGroup.Separator = aprops=>{
  let { i, className, ...props } = genCommonProps(aprops);


  let classSet = {
    'width-1': true,
    'display-inline-block': true,
    'flex-sub-flex-none': true,
    'bg-color-border': className.startsWith('bg-color')<0,
    'margin-v-xl': className.indexOf('margin')<0,
  };


  return (
    <span className={cx(classSet,className)} {...props}>&nbsp;</span>
  );
}



Button.Group = ButtonGroup;
export default Button;
