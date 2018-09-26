/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import Panel from './Panel.Container';


let Button = aprops=>{
  console.log(99,aprops);
  let {
    selected, underLineProps={},
    colorOnTheme='white',
    component:Component='button', className, 'b-theme':bTheme, 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);

  let classStr = ' outline-none- appearance-none- font-smoothing-antialiased- transition-set-';
  classStr += ' vertical-align-middle position-relative line-height-1 cursor-pointer text-align-center padding-a-xl';

  let classSet = [];
  if(bSize!==undefined) classSet.push('text-size-'+(bSize===true?'':bSize));
  if(bStyle==='hollow'&&bTheme) {
    classSet.push('bg-none-a-');
    classSet.push('border-set-'+(bTheme===true?'primary':bTheme));
    classSet.push('text-color-'+(bTheme===true?'primary':bTheme));
  }else if(bStyle==='hollow'&&!bTheme) {
    classSet.push('bg-none-a-');
    classSet.push('border-set-');
  }else if(bStyle==='underline') {
    classSet.push('border-none-a-');
    if(bTheme) classSet.push('text-color-'+(bTheme===true?'primary':bTheme));
    classSet.push('button-active');
  }else if(bStyle==='plain') {
    classSet.push('bg-none-a-');
    classSet.push('border-none-a-');
    if(bTheme) classSet.push('text-color-'+(bTheme===true?'primary':bTheme));
  }else if(bTheme){
    classSet.push('bg-color-'+(bTheme===true?'primary':bTheme));
    classSet.push('border-set-'+(bTheme===true?'primary':bTheme));
    if(colorOnTheme) classSet.push('text-color-'+(colorOnTheme===true?'':colorOnTheme));
  }else {
    classSet.push('bg-color-component');
    classSet.push('border-set-component');
  }
  
  return (
    <Component className={cxm(classStr, classSet, className)} {...props}>
      {children}
      {bStyle==='underline'?(
        <Button.UnderLine selected={selected} b-theme={bTheme} b-style={bStyle} b-size={bSize} {...underLineProps} />
      ):null}
    </Component>
  );
}

Button.UnderLine = aprops=>{
  let {
    selected, 
    component:Component='div', className, style, 'b-theme':bTheme='component', 'b-style':bStyle, 'b-size':bSize, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'position-absolute offset-left-start offset-right-start offset-bottom-start transition-set- pointer-events-none';
 
  let styleSet = {};
  styleSet.height = 2;

  let classSet = [];
  classSet.push('opacity-'+(selected?'1':'0'));
  classSet.push('bg-color-'+(bTheme===true?'':bTheme));

  return (
    <Component style={{...styleSet, ...style}} className={cxm(classStr, classSet, className)} {...props}/>
  );
}


Button.Group = aprops=>{
  let {
    stacked, justify, separator, 
    separatorProps={},
    itemComponent=Button, itemProps, itemGetClassName=Button.Group.itemGetClassName, itemGetStyle=Button.Group.itemGetStyle, itemGetProps=Button.Group.itemGetProps,
    component:Component=Panel.Container, children, ...props
  } = genCommonProps(aprops);

  children = React.Children.toArray(children)
    .filter(v=>v)
    .map((v,i)=><Component.Item key={v.key||i} {...v.props} />)
    .reduce((v1,v2,i,a)=>{
      if(!separator||stacked) return a;
      if(i>0)v1.push(<Button.Group.Separator key={'sep'+i} i={i} length={a.length} {...separatorProps} />)
      v1.push(v2);
      return v1;
    },[])

  return (
    <Component 
      type={justify?"justify":""} containerProps={aprops} itemComponent={itemComponent} itemProps={itemProps} itemGetClassName={itemGetClassName} itemGetStyle={itemGetStyle} itemGetProps={itemGetProps}
      {...props}>
      {children}
    </Component>
  )
}

Button.Group.itemGetClassName=(i, length, {stacked, justify, separator}={})=>{
  return {
    'border-none-right': !stacked&&!i>=length-1,
    'border-none-left': separator&&!i===0,
    'border-none-bottom': stacked&&!i>=length-1,
    'flex-sub-flex-extend': justify,
    'width-full': stacked,
  };
}

Button.Group.Separator = aprops=>{
  let { 
    component:Component=Panel, className, style, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'flex-sub-flex-none bg-color-border margin-v-xl';

  let styleSet = {};
  styleSet.width = 1;

  return <Component inline b-style='solid' b-theme='border' style={{...styleSet, ...style}} className={cxm(classStr,className)} {...props}>&nbsp;</Component>;
}


export default Button;
