/**
 * @module
 */
import React from 'react';
import BaseComponent, { domFindNode } from './BaseComponent';
import Panel, { PanelContainer } from './Panel';
import Icon from './Icon';


/**
 * 表单控件组件，是对 input 的包装，除 Field 属性外支持 input 标准属性
 * @component
 * @augments BaseComponent
 * @exportdefault
 */
let Field = aprops=>{
  let { types, before, after, label, beforeProps, afterProps, containerProps, ...props } = aprops;
  if(props.hasOwnProperty('value')&&props.value===undefined) props.value = '';
  let ComponentField = types[aprops.type]||types.text;
  if(!ComponentField) return null;

  if(before||after) { props['b-style'] = 'plain'; props['panelItemSelected'] = true }
  let component = <ComponentField {...props} />
  if(!before&&!after) return component;

  return <PanelContainer component={label&&'label'} ctype="primary" {...containerProps}>{before?<Panel {...beforeProps}>{before}</Panel>:null}{component}{after?<Panel {...afterProps}>{after}</Panel>:null}</PanelContainer>
}

Field.defaultProps = {}
/**
 * 设置控件组件的类型，支持 html input type 以及自定义的类型，参见 Field 的成员，默认使用 text 对应的类型
 * @attribute module:Field.Field.type
 * @type {string}
 */
/**
 * 设置前置内容，将开启组模式，在容器中显示前置后置内容和表单控件组件
 * @attribute module:Field.Field.before
 * @type {component|element|string|number}
 */
/**
 * 设置后置内容，将开启组模式，在容器中显示前置后置内容和表单控件组件
 * @attribute module:Field.Field.after
 * @type {component|element|string|number}
 */
/**
 * 设置容器为 label 元素
 * @attribute module:Field.Field.label
 * @type {boolean}
 */
/**
 * 设置前置内容的组件的属性
 * @attribute module:Field.Field.beforeProps
 * @type {object}
 */
/**
 * 设置后置内容的组件的属性
 * @attribute module:Field.Field.afterProps
 * @type {object}
 */
/**
 * 设置容器组件的属性
 * @attribute module:Field.Field.containerProps
 * @type {object}
 */


Object.defineProperty(Field,"Field",{ get:function(){ return Field }, set:function(val){ Field = val }})
export default Field;







/**
 * 表单控件的一般类型组件
 * @component
 * @mount Field.Normal
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments input
 * @private
 */
let Normal = class extends React.Component {
  componentDidMount() {
    this.input = domFindNode(this);
    this.input.value = this.props.value||'';
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(this.props.value !== this.input.value) this.input.value = this.props.value||'';
  }
  
  render() { 
    let {
      type, value, typesToElement, onChange, pattern, patterns, patternName,
      onEnterPress, onKeyPress, 
      component="input", children, ...props
    } = BaseComponent(this.props, Normal);
    if(typesToElement.includes(type)) { component = type; type = null }else{ children = undefined }
    if(patternName) pattern = patterns[patternName];

    let classNamePre = {
      'field transition outline-none appearance-none line-height-1 font-smoothing-antialiased vertical-align-middle': true,
      'bg-none- border-none-a-': !this.props['b-style'],
    }

    return <Panel 
      component={component} type={type} 
      onChange={(this.props.hasOwnProperty('value')&&onChange&&pattern&&(e=>{if(!RegExp(pattern).test(e.target.value)) e.target.value = value; onChange(e)}))||onChange}
      onKeyPress={e=>{ if(onEnterPress&&e.charCode===13){ e.stopPropagation(); e.preventDefault(); onEnterPress(e.target.value) }else{ onKeyPress&&onKeyPress(e) } }} 
      classNamePre={classNamePre} {...props}>
      {children}
    </Panel>
  }
}

Normal.defaultProps = {};
/**
 * 当控件在焦点情况下输入回车时触发
 * @attribute module:Field~Normal.onEnterPress
 * @type {function}
 */
      
/**
 * 映射数组，数组内的 input type 直接映射为对应元素，例如：
 * <Field type="textarea" /> => <textarea></textarea>
 */
Normal.defaultProps.typesToElement = ['progress', 'select', 'textarea'];
Normal.defaultProps.patterns = {number: "^\\d*$", float: '^\\d*(.\\d*)?$', float2: '/^\\d*(.\\d{0,2})?$/'}; /* eslint-disable no-useless-escape */

Object.defineProperty(Field,"Normal",{ get:function(){ return Normal }, set:function(val){ Normal = val }})







/**
 * 表单控件的显示静态文本的组件，用于与其他表单组件达到一致样式
 * @component
 * @mount Field.Static
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 * @augments input
 * @private
 */
let Static = aprops=>{
  let { type, value, ...props } = BaseComponent(aprops, Static);

  let classNamePre = 'line-height-1 vertical-align-middle';

  return (
    <Panel component="span" classNamePre={classNamePre} {...props}>
      {value||<pre className="margin-a-0 padding-a-0"> </pre>}
    </Panel>
  );
}

Static.defaultProps = {};

Object.defineProperty(Field,"Static",{ get:function(){ return Static }, set:function(val){ Static = val }})







/**
 * 表单控件的隐藏组件，使用 label 组件套住该组件，用于改变默认组件的样式
 * @component
 * @mount Field.HiddenInput
 * @augments BaseComponent
 * @private
 */
let HiddenInput = aprops=>{
  let props = BaseComponent(aprops, HiddenInput);

  let classNamePre = 'visibility-hide display-none';

  return <Panel component="input" classNamePre={classNamePre} {...props} />;
}

HiddenInput.defaultProps = {};

Object.defineProperty(Field,"HiddenInput",{ get:function(){ return HiddenInput }, set:function(val){ HiddenInput = val }})






/**
 * 表单控件组件的文件选择控件实现的组件
 * @component
 * @mount Field.File
 * @augments BaseComponent
 * @private
 */
let File = aprops=>{
  let {
    type, value, inputProps, disabled, onClick, onChange, 
    children, ...props
  } = BaseComponent(aprops, File);

  let classNamePre = 'line-height-1 vertical-align-middle';

  return (
    <Panel component="label" classNamePre={classNamePre} disabled={disabled} {...props}>
      <HiddenInput type={type} value={value} disabled={disabled} onClick={onClick} onChange={onChange} {...inputProps} />
      {children}
    </Panel>
  );
}

File.defaultProps = {};
/**
 * 设置隐藏的 input 的容器的属性
 * @attribute module:Field~File.inputProps
 * @type {object}
 */

Object.defineProperty(Field,"File",{ get:function(){ return File }, set:function(val){ File = val }})







/**
 * 表单控件的2态组件，用于实现 checkbox 等具有 checked 属性类型的组件，实现了2种状态切换的功能
 * 
 * 对该组件设置的其他属性，将设置到 content 组件上
 * @component
 * @mount Field.CheckState
 * @augments BaseComponent
 * @private
 */
let CheckState = aprops=>{
  let {
    type, value, defaultValue, domValue, disabled, onClick, onChange, 
    inputProps, innerProps, statusProps, statusCheckedProps, statusUncheckedProps, 
    children, ...props
  } = BaseComponent(aprops, CheckState);

  let classNamePre = 'check-status line-height-0 display-inlineblock vertical-align-middle';
  let classNamePreInner = 'check-status-inner position-relative line-height-0 display-inlineblock';

  return (
    <Panel component="label" classNamePre={classNamePre} {...props}>
      <HiddenInput type={type} checked={value} defaultChecked={defaultValue} value={domValue} disabled={disabled} onChange={onChange} {...inputProps} />
      <Panel component="span" classNamePre={classNamePreInner} {...innerProps}>
        <Panel type={type} disabled={disabled} classNameExt="check-status-checked" {...statusProps} {...statusCheckedProps} />
        <Panel type={type} disabled={disabled} classNameExt="check-status-unchecked" {...statusProps} {...statusUncheckedProps} />
      </Panel>
      {children}
    </Panel>
  );
}

CheckState.defaultProps = {};
/**
 * 
 * @attribute module:Field~CheckState.value
 * @type {boolean}
 */
/**
 * 
 * @attribute module:Field~CheckState.defaultValue
 * @type {boolean}
 */
/**
 * 设置 input dom 的 value 属性
 * @attribute module:Field~CheckState.domValue
 * @type {string}
 */
/**
 * 设置隐藏的 input 的容器的属性
 * @attribute module:Field~CheckState.inputProps
 * @type {object}
 */
/**
 * 设置2态内容的容器的属性
 * @attribute module:Field~CheckState.innerProps
 * @type {object}
 */

Object.defineProperty(Field,"CheckState",{ get:function(){ return CheckState }, set:function(val){ CheckState = val }})




 

/**
 * 表单控件的对应的 checkbox 组件，基于2态组件实现
 * @component
 * @mount Field.Checkbox
 * @augments BaseComponent
 * @private
 */
let Checkbox = aprops=>{
  let { disabled, ...props } = BaseComponent(aprops, Checkbox);

  return <CheckState 
    b-style="hollow" bg-color-component={disabled}
    bp-status-component={Icon} bp-statusChecked-name="check:X" bp-statusUnchecked-name=" "
    disabled={disabled} {...props} />
};

Object.defineProperty(Field,"Checkbox",{ get:function(){ return Checkbox }, set:function(val){ Checkbox = val }})


/**
 * 表单控件的对应的 radio 组件，基于2态组件实现
 * @component
 * @mount Field.Radio
 * @augments BaseComponent
 * @private
 */
let Radio = aprops=>{
  let { disabled, ...props } = BaseComponent(aprops, Radio);

  return <CheckState 
    b-style="hollow" bg-color-component={disabled} bc-border-radius-rounded
    bp-status-component={Icon} bp-statusChecked-name="check:X" bp-statusUnchecked-name=" "
    disabled={disabled} {...props} />
};

Object.defineProperty(Field,"Radio",{ get:function(){ return Radio }, set:function(val){ Radio = val }})






/**
 * 表单控件的开关组件，基于2态组件实现
 * @component
 * @mount Field.Switch
 * @augments BaseComponent
 * @private
 */
let Switch = aprops=>{
  let { disabled, 'b-theme':bTheme='component', ...props } = BaseComponent(aprops, Switch);

  let classNamePreItem = 'border-radius-rounded width-1em height-1em';

  return <CheckState 
    b-style="hollow" bg-color-component={disabled} bc-border-radius-rounded
    bp-statusChecked-children={
      <React.Fragment>
        <Panel inline b-style="solid" b-theme={bTheme} classNamePre={classNamePreItem} bs-zIndex="10" />
        <Panel inline b-style="solid" b-theme="white" classNamePre={classNamePreItem} bs-marginLeft="-0.3em" />
      </React.Fragment>
    }
    bp-statusUnchecked-children={
      <React.Fragment>
        <Panel inline b-style="solid" b-theme="white" classNamePre={classNamePreItem} />
        <Panel inline b-style="solid" b-theme="component" classNamePre={classNamePreItem} bs-marginLeft="-0.3em" />
      </React.Fragment>
    }
    disabled={disabled} {...props} type="checkbox" />
};

Object.defineProperty(Field,"Switch",{ get:function(){ return Switch }, set:function(val){ Switch = val }})






Field.defaultProps.types = {
  text: Normal,
  static: Static,
  file: File,
  checkbox: Checkbox,
  radio: Radio,
  switch: Switch,
}