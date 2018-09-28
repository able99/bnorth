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


let Field = aprops=>{
  let { 
    type, value=aprops.value===undefined&&aprops.hasOwnProperty('value')?'':aprops.value,
    containerProps, before, after, label, beforeProps, afterProps,
    ...props
  } = aprops;

  let ComponentField = Field._Types[type||'text'];
  if(!ComponentField) return null;

  ComponentField = <ComponentField b-style={before||after} bc-flex-sub-flex-extend={(before||after)&&true} type={type} value={value} {...props} />;
  if(!before&&!after) return ComponentField;

  return (
    <Field._Container 
      before={before} after={after} label={label} 
      beforeProps={beforeProps} afterProps={afterProps} 
      {...containerProps}>
      {ComponentField}
    </Field._Container>
  );
}

Field._Container = aprops=>{
  let { 
    inline, before, after, label, beforeProps, afterProps,
    component:Component=Panel, componentPanel=label&&'label', className, children, ...props
  } = aprops;

  let classStr = 'flex-align-center';
  let classSet = inline?'flex-display-inline':'flex-display-block';

  return (
    <Component component={componentPanel} className={cxm(classStr, classSet, className)} {...props}>
      {before?<Field._Container._Content {...beforeProps}>{before}</Field._Container._Content>:null}
      {children}
      {after?<Field._Container._Content {...afterProps}>{after}</Field._Container._Content>:null}
    </Component>
  );
}

Field._Container._Content = aprops=>{
  let { 
    component:Component=Panel, className, ...props
  } = aprops;

  let classStr = 'flex-sub-flex-none';

  return <Component className={cxm(classStr, className)} {...props} />;
}


Field._Normal = aprops=>{
  let {
    type, value,
    onPressEnter, onKeyPress,
    component:Component=Panel, componentPanel="input", className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'field transition outline-none appearance-none line-height-1 font-smoothing-antialiased vertical-align-middle bg-none- border-none-a-';

  let handleKeyPress = e=>{
    if(onPressEnter&&e.charCode===13){
      e.stopPropagation();
      e.preventDefault();
      onPressEnter(e.target.value); 
    }else{
      onKeyPress&&onKeyPress(e);
    }
  }

  if(Field._Normal._maps.includes(type)) {
    componentPanel = type;
    type=null;
  }

  return (
    <Component component={componentPanel}
      onKeyPress={handleKeyPress}
      type={type} value={value}
      className={cxm(classStr, className)} {...props}>
      {children}
    </Component>
  );
}

Field._Normal._maps = ['progress', 'select', 'textarea'];

Field._Static = aprops=>{
  let {
    type, value,
    component:Component=Panel, componentPanel="span", className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'line-height-1 vertical-align-middle';

  return (
    <Component component={componentPanel} className={cxm(classStr, className)} {...props}>
      {value||<pre className="margin-a-0 padding-a-0"> </pre>}
    </Component>
  );
}

Field._HiddenInput = aprops=>{
  let {
    component:Component='input', className, ...props
  } = genCommonProps(aprops);

  let classStr = 'visibility-hide display-none';

  return <Component className={cxm(classStr, className)} {...props} />;
  
}

Field._Switch = aprops=>{
  let {
    type, value, defaultValue, domValue, onClick, 
    Content, labelProps, inputProps, innerProps,
    component:Component=Panel, componentPanel='label', className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'switch-status transition outline-none appearance-none line-height-1 font-smoothing-antialiased vertical-align-middle bg-none- flex-sub-flex-extend';

  return (
    <Component component={componentPanel} onClick={(e)=>{e.stopPropagation();onClick&&onClick(e)}} className={cxm(classStr, className)} {...labelProps}>
      <Field._HiddenInput type={type} checked={value} defaultChecked={defaultValue} value={domValue} {...inputProps} />
      <Field._Switch._Inner {...innerProps}>
        <Field._Switch._Content component={Content} {...props} type={type} isOn>X</Field._Switch._Content>
        <Field._Switch._Content component={Content} {...props} type={type} >-</Field._Switch._Content>
      </Field._Switch._Inner>
    </Component>
  );
}

Field._Switch._Inner = aprops=>{
  let {
    component:Component=Panel, componentPanel='span', className, ...props
  } = genCommonProps(aprops);

  let classStr = 'status- position-relative';

  return <Component component={componentPanel} className={cxm(classStr, className)} {...props} />;
}

Field._Switch._Content = aprops=>{
  let {
    isOn,
    component:Component=Panel, className, ...props
  } = genCommonProps(aprops);

  let classStr = 'position-relative';
  let classSet = [isOn?'on-':'off-'];

  return <Component inline className={cxm(classStr, classSet, className)} {...props} isOn={isOn} />;
}


Field._Types = {};
Field._Types.text = Field._Normal;
Field._Types.textarea = Field._Normal;
Field._Types.select = Field._Normal;
Field._Types.progress = Field._Normal;
Field._Types.static = Field._Static;

Field._SwitchContentCheckRadio = aprops=>{
  let {
    type, isOn, name=aprops.isOn?'check':' ', nameDefault=aprops.isOn?'X':' ', 
    component:Component=Icon, ...props
  } = aprops;
  console.log(1111, isOn, name, type,props);

  return <Component bc-border-radius-rounded={!Boolean(type==='checkbox')} type={type}  name={name} nameDefault={nameDefault} {...props} b-style="hollow" />;
}
Field._Types.checkbox = aprops=>{
  return <Field._Switch Content={Field._SwitchContentCheckRadio} {...aprops} />
};
Field._Types.radio = Field._Types.checkbox;

Field._SwitchContentSwitch = aprops=>{
  let {
    component:Component=Panel, className, children, ...props
  } = aprops;

  let classStr = 'border-radius-rounded line-height-0';

  return (
    <Component b-style="hollow" className={cxm(classStr, className)}>
      <Field._SwitchContentSwitch.Item {...props} isPositive />
      <Field._SwitchContentSwitch.Item {...props} />
    </Component>
  )
}
Field._SwitchContentSwitch.Item = aprops=>{
  let {
    isOn, isPositive, 
    component:Component=Panel, 'b-theme':bTheme='component', className, children, ...props
  } = aprops;

  let classStr = 'border-radius-rounded width-1em height-1em';

  return <Component {...props} inline b-style="solid" b-theme={isPositive?(isOn?bTheme:'white'):(isOn?'white':'component')} className={cxm(classStr, className)}  />
}
Field._Types.switch = aprops=>{
  return <Field._Switch Content={Field._SwitchContentSwitch} {...aprops} type="checkbox" />
};

Field._Types.file = aprops=>{
  let {
    type, value, inputProps,
    component:Component=Panel, componentPanel="label", className, children, ...props
  } = genCommonProps(aprops);

  let classStr = 'line-height-1 vertical-align-middle';

  return (
    <Component component={componentPanel} className={cxm(classStr, className)} {...props}>
      <Field._HiddenInput type={type} value={value} {...inputProps} />
      {children}
    </Component>
  );
}


export default Field;
 