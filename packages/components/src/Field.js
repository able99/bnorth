/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
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
  let { before, after, label, beforeProps, afterProps, containerProps, ...props } = aprops;
  if(props.hasOwnProperty('value')&&props.value===undefined) props.value = '';
  let ComponentField = Field[aprops.type]||Field.text;
  if(!ComponentField) return null;

  let component = <ComponentField b-style={(before||after)&&'plain'} itemSelected={Boolean(before||after)} {...props} />
  if(!before&&!after) return component;

  return (
    <PanelContainer component={label&&'label'} type="primary" {...containerProps}>
      {before?<Panel {...beforeProps}>{before}</Panel>:null}
      {component}
      {after?<Panel {...afterProps}>{after}</Panel>:null}
    </PanelContainer>
  );
}

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

export default Field;







/**
 * 表单控件的一般类型组件
 * @component
 * @mount Field.Normal
 * @augments BaseComponent
 * @private
 */
let Normal = class extends React.Component {
  _updateValue() {
    this.input.value = this.props.value||'';
  }

  handleKeyPress(e) {
    let { onPressEnter, onKeyPress } = this.props;

    if(onPressEnter&&e.charCode===13){
      e.stopPropagation();
      e.preventDefault();
      onPressEnter(e.target.value); 
    }else{
      onKeyPress&&onKeyPress(e);
    }
  }

  componentDidMount() {
    this.input = domFindNode(this);
    this._updateValue();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(this.props.value !== prevProps.value) this._updateValue();
  }
  
  render() { 
    let {
      type, value,
      onPressEnter, onKeyPress, 
      component, children, ...props
    } = BaseComponent(this.props, Normal);

    let classNamePre = {
      'field transition outline-none appearance-none- line-height-1 font-smoothing-antialiased vertical-align-middle': true,
      'bg-none- border-none-a-': !this.props['b-style'],
    }

    if(Normal.typesToElement&&Normal.typesToElement.includes(type)) { component = type; type=null }else{ children = undefined }
    return <Panel component={component} type={type} onKeyPress={this.handleKeyPress} classNamePre={classNamePre} {...props}>{children}</Panel>
  }
}

Normal.defaultProps = {};
/**
 * 参见 Field
 * @attribute module:Field~Normal.type
 */
/**
 * 控件的值
 * @attribute module:Field~Normal.value
 * @type {string}
 */
/**
 * 当控件在焦点情况下输入回车时触发
 * @attribute module:Field~Normal.onPressEnter
 * @type {function}
 */
Normal.defaultProps.component = 'input';
      
/**
 * 映射数组，数组内的 input type 直接映射为对应元素，例如：
 * <Field type="textarea" /> => <textarea></textarea>
 * @member
 */
Normal.typesToElement = ['progress', 'select', 'textarea'];

Object.defineProperty(Field,"Normal",{ get:function(){ return Normal }, set:function(val){ Normal = val }})







/**
 * 表单控件的显示静态文本的组件，用于与其他表单组件达到一致样式
 * @component
 * @mount Field.Static
 * @augments BaseComponent
 * @private
 */
let Static = aprops=>{
  let {
    type, value,
    ...props
  } = BaseComponent(aprops, Static);

  let classNamePre = 'line-height-1 vertical-align-middle';

  return (
    <Panel classNamePre={classNamePre} {...props}>
      {value||<pre className="margin-a-0 padding-a-0"> </pre>}
    </Panel>
  );
}

Object.defineProperty(Field,"Static",{ get:function(){ return Static }, set:function(val){ Static = val }})

Static.defaultProps = {};
/**
 * 参见 Field
 * @attribute module:Field~Static.type
 */
/**
 * 显示的静态文本
 * @attribute module:Field~Static.value
 * @type {string}
 */
Static.defaultProps.component = 'span';






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
HiddenInput.defaultProps.component = 'input';

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
    type, value, 
    inputProps, disabled, onClick, onChange, 
    children, ...props
  } = BaseComponent(aprops, File);

  let classNamePre = 'line-height-1 vertical-align-middle';

  return (
    <Panel classNamePre={classNamePre} disabled={disabled} {...props}>
      <HiddenInput type={type} value={value} disabled={disabled} onClick={onClick} onChange={onChange} {...inputProps} />
      {children}
    </Panel>
  );
}

File.defaultProps = {};
/**
 * 浏览器的文件对象
 * @attribute module:Field~File.value
 * @type {file}
 */
/**
 * 设置隐藏的 input 的容器的属性
 * @attribute module:Field~File.inputProps
 * @type {object}
 */
File.defaultProps = {};
File.defaultProps.component = 'label';

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
    type, value, defaultValue, content, 
    domValue, disabled, onClick, onChange, 
    CheckStateProps, statusCheckedProps, statusUncheckedProps, inputProps, innerProps,
    children, ...props
  } = BaseComponent(aprops, CheckState);

  let classNamePre = 'check-status line-height-1 vertical-align-middle bg-none-';
  let classNamePreInner = 'check-status-inner position-relative';
  let classNamePreContent = 'position-relative';

  return (
    <Panel component="label" classNamePre={classNamePre} {...CheckStateProps}>
      <HiddenInput type={type} checked={value} defaultChecked={defaultValue} value={domValue} disabled={disabled} onChange={onChange} {...inputProps} />
      <Panel component="span" classNamePre={classNamePreInner} {...innerProps}>
        <Panel type={type} disabled={disabled} classNamePre={classNamePreContent} classNameExt="check-status-checked" children="X1" {...props} {...statusCheckedProps} />
        <Panel type={type} disabled={disabled} classNamePre={classNamePreContent} classNameExt="check-status-unchecked" children="-1" {...props} {...statusUncheckedProps} />
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
 * 设置2态内容
 * @attribute module:Field~CheckState.content
 * @type {string}
 */
/**
 * 设置设置2态组件的属性
 * @attribute module:Field~CheckState.labelProps
 * @type {object}
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

  props.component = Icon;
  props.CheckStateProps = {
    'b-style': 'hollow',
    'bc-bg-color-component': disabled,
  };
  props['bp-statusChecked-name'] = 'check';
  props['bp-statusUnchecked-name'] = ' ';
  return <CheckState disabled={disabled} {...props} />
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

  props.component = Icon;
  props.CheckStateProps = {
    'b-style': 'hollow',
    'bc-bg-color-component': disabled,
    'bc-border-radius-rounded': true,
  };
  props['bp-statusChecked-name'] = 'check';
  props['bp-statusUnchecked-name'] = ' ';
  return <CheckState disabled={disabled} {...props} />
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

  props.CheckStateProps = {
    'b-style': 'hollow',
    'bc-bg-color-component': disabled,
    'bc-border-radius-rounded': true,
    'line-height-0': true,
  };

  let classNamePre = 'border-radius-rounded width-1em height-1em';
  props.statusCheckedProps = {
    children: (
      <React.Fragment>
        <Panel inline b-style="solid" b-theme={bTheme} classNamePre={classNamePre} />
        <Panel inline b-style="solid" b-theme="white" classNamePre={classNamePre} />
      </React.Fragment>
    )
  };
  props.statusUncheckedProps = {
    children: (
      <React.Fragment>
        <Panel inline b-style="solid" b-theme="white" classNamePre={classNamePre} />
        <Panel inline b-style="solid" b-theme={bTheme} classNamePre={classNamePre} />
      </React.Fragment>
    )
  };
  return <CheckState disabled={disabled} {...props} type="checkbox" />
};

Object.defineProperty(Field,"Switch",{ get:function(){ return Switch }, set:function(val){ Switch = val }})




/**
 * 控件组件支持的的类型，对应一般的类型以及默认类型
 * @member module:Field.Field.text
 * @default Field.Normal
 */
Object.defineProperty(Field,"text",{ get:function(){ return Field.Normal }})
/**
 * 控件组件支持的的类型，对应静态类型，该类型为表单组提供一致的组件和样式
 * @member module:Field.Field.static
 * @default Field.Static
 */
Object.defineProperty(Field,"static",{ get:function(){ return Field.Static }})
/**
 * 控件组件支持的的类型，对应 input checkbox 标准类型
 * @member module:Field.Field.checkbox
 * @default Field.Checkbox
 */
Object.defineProperty(Field,"checkbox",{ get:function(){ return Field.Checkbox }})
/**
 * 控件组件支持的的类型，对应 switch 类型，实现了开关按钮
 * @member module:Field.Field.radio
 * @default Field.Radio
 */
Object.defineProperty(Field,"radio",{ get:function(){ return Field.Radio }})
/**
 * 控件组件支持的的类型，对应 input switch 标准类型
 * @member module:Field.Field.switch
 * @default Field.Switch
 */
Object.defineProperty(Field,"switch",{ get:function(){ return Field.Switch }})
/**
 * 控件组件支持的的类型，对应 input file 标准类型
 * @member module:Field.Field.file
 * @default Field.File
 */
Object.defineProperty(Field,"file",{ get:function(){ return Field.File }})
