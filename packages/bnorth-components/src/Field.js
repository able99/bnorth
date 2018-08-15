/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React, {cloneElement} from 'react';
import { genCommonProps, cx, hascx } from './utils/props';
import Icon from './Icon';
import Button from './Button';


let Field = (aprops)=>{
  let {
    type, cTheme, cStyle, cSize, 
    before, after, label, beforeProps, afterProps, containerProps={},
    ...props
  } = genCommonProps(aprops);
  let {
    component:ContainerComponent='label', className:containerClassName, ...acontainerProps
  } = genCommonProps(containerProps);


  let hasContainer = before||after||label;
  let Component;
  if(type==='switch') {
    Component = Field.TypeSwitch; 
  }else if(type==='checkbox' || type==='radio') {
    Component = Field.TypeCheckRadio;
  }else if(type==='static') {
    Component = Field.TypeStatic;
  }else if(type==='number') {
    Component = Field.TypeNumber;
  }else if(type==='file') {
    Component = Field.TypeFile;
  }else{
    Component = Field.TypeNormal;
  }
  let field = <Component type={type} hasContainer={hasContainer} cTheme={cTheme} cStyle={cStyle} cSize={cSize} {...props} />;


  if(hasContainer) {
    let classSetContainer = {
      'overflow-hidden': true,
      'flex-display-flex': !hascx(containerClassName, 'flex-display'),
      'flex-align-center': !hascx(containerClassName, 'flex-align'),
      ['text-size'+cSize]: cSize,    
    };
  
    if(cStyle==='solid') {
      classSetContainer['bg-color-'+(cTheme||'component')] = true;
      classSetContainer['border-set-'+(cTheme||'component')] = true;
    }else if(cStyle==='hollow') {
      classSetContainer['bg-none'] = true;
      classSetContainer['border-set-'+(cTheme||'component')] = true;
    }else if(cStyle==='underline') {
      classSetContainer['border-set-bottom-'+(cTheme||'component')] = true;
    }else{
      classSetContainer['text-color-'+cTheme] = cTheme;
    }
  
    return <ContainerComponent className={cx(classSetContainer,containerClassName)} {...acontainerProps}>{before}{field}{after}</ContainerComponent>;
  }else{
    return field;
  }
}


Field.TypeNormal = aprops=>{
  let {
    hasContainer,
    type='text', value=aprops.value===undefined&&aprops.hasOwnProperty('value')?'':aprops.value,
    onPressEnter, onKeyPress,
    component:Component='input', className, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'field': true,
    'transition': true, 
    'outline-none': true, 
    'appearance-none': true, 
    'line-height-1': true, 
    'font-smoothing-antialiased': true, 
    'vertical-align-middle': true,     
    'bg-none': !hascx(className, 'bg-color'), 
    'flex-sub-flex-extend': hasContainer,
    ['text-size-'+cSize]: cSize,    
    'border-none': !hascx(className, 'border'),
  }

  if(type==='progress' || type==='select' || type==='textarea') {
    Component = type;
    type=null;
  }
  // border : 'select','progress', 'file'


  return (
    <Component
      onKeyPress={e=>{
        if(onPressEnter&&e.charCode===13){
          e.stopPropagation();
          e.preventDefault();
          onPressEnter(e.target.value); 
        }else{
          onKeyPress&&onKeyPress(e);
        }
      }}
      type={type} value={value}
      className={cx(classSet, className)} {...props}>
      {children}
    </Component>
  );
}

Field.TypeStatic = (aprops)=>{
  let {
    hasContainer,
    value,
    component:Component='span', className, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'line-height-1': true, 
    'font-smoothing-antialiased': true, 
    'vertical-align-middle': true,     
    'flex-sub-flex-extend': hasContainer,
    ['text-size-'+cSize]: cSize,  
  }


  return (
    <Component className={cx(classSet, className)} {...props}>
      {value}
      {children}
    </Component>
  );
}

Field.TypeFile = (aprops)=>{
  let {
    hasContainer,
    value,
    component:Component='label', className, style, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'transition': true, 
    'line-height-1': true, 
    'font-smoothing-antialiased': true, 
    'vertical-align-middle': true,     
    'bg-none': !hascx(className, 'bg-color'), 
    'flex-sub-flex-extend': hasContainer,
    ['text-size-'+cSize]: cSize,    
    'border-none': !hascx(className, 'border'),
    'position-relative': !hascx(className, 'position'),
  }
  
  let classSetInput = {
    'outline-none': true, 
    'appearance-none': true, 
    'position-absolute': true,
    'visibility-hide': true,
    'display-none': true,
  }

  let styleSetInput = {
    left: 0,
    top: 0,
  }


  return (
    <Component className={cx(classSet, className)} style={style}>
      {children}
      <input type="file" className={cx(classSetInput)} style={styleSetInput} {...props} />
    </Component>
  );
}

Field.TypeNumber = (aprops)=>{
  let {
    hasContainer,
    value, onChange, max, min,
    component:Component='input', className, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'line-height-1': true, 
    'font-smoothing-antialiased': true, 
    'vertical-align-middle': true,     
    'flex-sub-flex-extend': true,
    'width-full': true,
    ['text-size-'+cSize]: cSize,  
    'border-none': true,
    'text-align-center': true,
  }

  let classSetInner = {
    'flex-display-flex': true,
    'flex-sub-flex-extend': hasContainer,
    ['text-size-'+cSize]: cSize,  
    'border-set': true,
  }

  let classSetButton = {
    'flex-sub-flex-none': true,
    ['text-size-'+cSize]: cSize,  
    'padding-v-xs': true,
    'padding-h': true,
  }

  let sub = ()=>{
    let ret = Math.max((value-1)||0, min||0);
    if(onChange && ret!==value) onChange(ret);
  }

  let add = ()=>{
    let ret = Math.min((value+1)||1, (max!==undefined||max!==null)?max:Number.MAX_SAFE_INTEGER);
    if(onChange && ret!==value) onChange(ret);
  }


  return (
    <span className={cx(classSetInner)}>
      <Button className={cx(classSetButton)} onClick={()=>sub()}>-</Button>
      <Component className={cx(classSet, className)} {...props} value={value} onChange={e=>onChange&&onChange(e.target.value)} />
      <Button className={cx(classSetButton)} onClick={()=>add()}>+</Button>
    </span>
  );
}

Field.TypeCheckRadio = (aprops)=>{
  let {
    hasContainer,
    type, defaultValue, value=aprops.value===undefined?aprops.value:Boolean(aprops.value), domValue, 
    contentOn, contentOff, onClick, contentOnProps, contentOffProps,
    component:Component='input', style, className, cTheme, cStyle, cSize, children, ...props
  } = genCommonProps(aprops);


  let classSetLabel = {
    'switch-status': true,
    'transition': true, 
    'outline-none': true, 
    'appearance-none': true, 
    'line-height-1': true, 
    'font-smoothing-antialiased': true, 
    'vertical-align-middle': true,     
    'bg-none': !hascx(className, 'bg-color'), 
    'flex-sub-flex-extend': hasContainer,
    ['text-size-'+cSize]: cSize,    
  }

  let classSetInput = {
    'visibility-hide': true,
    'display-none': true,
  }

  let classSetInner = {
    'status': true,
    'position-relative': true,
    'padding-xs': true,
  }


  return (
    <label onClick={(e)=>{e.stopPropagation();onClick&&onClick(e)}} style={style} className={cx(classSetLabel, className)} >
      <Component type={type} defaultChecked={defaultValue}  checked={value} value={domValue} className={cx(classSetInput)} {...props}/>
      <span className={cx(classSetInner)}>
        <Field.TypeCheckRadio.On content={contentOn} {...contentOnProps} />
        <Field.TypeCheckRadio.Off content={contentOff} {...contentOffProps} />
      </span>
    </label>
  );
}

Field.TypeCheckRadio.On = aprops=>{
  let {
    content, component:Component=Icon, name=Icon.getName('check', 'X'), rounded=true, className, cTheme, cStyle='hollow', ...props
  } = aprops;


  if(content) {
    return cloneElement(content,Object.assign({},content.props,{className: cx('on', content.props.className)}))
  }else{
    let classSet = {
      'padding-sm': true,
    }
    return <Component name={name} rounded={rounded} cTheme={cTheme} cStyle={cStyle} className={cx('on', classSet)} {...props}/>;
  }
}

Field.TypeCheckRadio.Off = aprops=>{
  let {
    content, component:Component=Icon, name=Icon.getName('check', 'X'), rounded=true, style, className, cTheme='border', cStyle='hollow', ...props
  } = aprops;


  if(content) {
    return cloneElement(content,Object.assign({},content.props,{className: cx('off', content.props.className)}))
  }else{
    let classSet = {
      'padding-sm': true,
    }
    let styleSet = {
      'color': 'transparent',
      ...style,
    }
    return <Component name={name} rounded={rounded} cTheme={cTheme} cStyle={cStyle} style={styleSet} className={cx('off', classSet)} {...props}/>;
  }
}

Field.TypeSwitch = aprops=>{
  let { cTheme } = aprops;

  let classSetStatusOffContent = {
    'off': true,
    'bg-color-white': true,
    'border-radius-rounded': true,
    'border-set-component': true,
    'width-em': true,
    'height-em': true,
  }

  let classSetStatusOnContent = {
    'on': true,
    'bg-color-white': true,
    ['border-'+(cTheme||'component')]: true, 
    'border-radius-rounded': true,
    'width-em': true,
    'height-em': true,
  }

  let classSetStatusOn = {
    'on': true, 
    'width-em-2-0': true,
    'height-em': true,
    ['bg-color-'+(cTheme||'component')]: true, 
    'border-radius-rounded': true,
    'text-align-right': true,
  }

  let classSetStatusOff = {
    'off': true, 
    'width-em-2-0': true,
    'height-em': true,
    'bg-color-component': true, 
    'border-radius-rounded': true,
    'text-align-left': true,
  }
  
  return (
    <Field.TypeCheckRadio 
      {...aprops} 
      contentOn={
        <span className={cx(classSetStatusOn)}>
          <span className={cx(classSetStatusOnContent)} />
        </span>
      } 
      contentOff={
        <span className={cx(classSetStatusOff)}>
          <span className={cx(classSetStatusOffContent)} />
        </span>
      } 
      type="checkbox" />
  );
}


export default Field;
 