/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import { domFindNode } from './utils/dom';
import parseProps from './utils/props';
import Panel from './Panel.Container';
import Icon from './Icon';


// Filed
// ------------------

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

  return (
    <Container before={before} after={after} label={label} beforeProps={beforeProps} afterProps={afterProps} {...containerProps}>
      <ComponentField b-style={(before||after)&&'plain'} subTypePrimary={Boolean(before||after)} {...props} />
    </Container>
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


/**
 * 表单控件组件的容器，只有设置了 before 或者 after 属性时，才会启动容器模式
 * @component
 * @mount Field.Container
 * @augments BaseComponent
 * @private
 */
let Container = aprops=>{
  if(!aprops.before&&!aprops.after) return aprops.children;
  let { 
    before, after, label, beforeProps, afterProps,
    component:Component, componentPanel=label&&'label', children, ...props
  } = parseProps(aprops, Container.props);


  return (
    <Component component={componentPanel} type="primary" {...props}>
      {before?<Content {...beforeProps}>{before}</Content>:null}
      {children}
      {after?<Content {...afterProps}>{after}</Content>:null}
    </Component>
  );
}

Object.defineProperty(Field,"Container",{ get:function(){ return Container }, set:function(val){ Container = val }})

Container.defaultProps = {};
/**
 * 设置容器是否使用 inline 模式
 * @attribute module:Field~Container.inline
 * @type {boolean}
 */
/**
 * 参见 Field
 * @attribute module:Field~Container.before
 */
/**
 * 参见 Field
 * @attribute module:Field~Container.after
 */
/**
 * 参见 Field
 * @attribute module:Field~Container.label
 */
/**
 * 参见 Field
 * @attribute module:Field~Container.beforeProps
*/
/**
 * 参见 Field
 * @attribute module:Field~Container.afterProps
 */
/**
 * 参见 BaseComponent
 */
Container.defaultProps.component = Panel.Container;

/**
 * 表单控件组件的容器的前置和后置的内容组件
 * @component
 * @mount Field.Container.Content
 * @augments BaseComponent
 * @private
 */
let Content = aprops=>{
  let { 
    component:Component, componentPanel, ...props
  } = parseProps(aprops, Content.props);

  return <Component component={componentPanel} {...props} />;
}

Object.defineProperty(Field.Container,"Content",{ get:function(){ return Content }, set:function(val){ Content = val }})

Content.defaultProps ={};
/**
 * 参见 BaseContainer
 */
Content.defaultProps.component = Panel;






// Type: Normal
// --------------------

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
      component:Component, componentPanel, className, children, ...props
    } = parseProps(this.props, Normal.props);

    let classStr = 'field transition outline-none appearance-none- line-height-1 font-smoothing-antialiased vertical-align-middle';
    let classSet = this.props['b-style']?'':'bg-none- border-none-a-';

    let handleKeyPress = e=>{
      if(onPressEnter&&e.charCode===13){
        e.stopPropagation();
        e.preventDefault();
        onPressEnter(e.target.value); 
      }else{
        onKeyPress&&onKeyPress(e);
      }
    }

    if(Normal.typesToElement&&Normal.typesToElement.includes(type)) {
      componentPanel = type;
      type=null;
    }else{
      children = undefined;
    }

    return (
      <Component 
        type={type} onKeyPress={handleKeyPress}
        component={componentPanel} className={classes(classStr, classSet, className)} {...props}>
        {children}
      </Component>
    );
  }
}

Object.defineProperty(Field,"Normal",{ get:function(){ return Normal }, set:function(val){ Normal = val }})

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
/**
 * 参见 BaseComponent
 */
Normal.defaultProps.component = Panel;
/**
 * 参见 BaseComponent
 */
Normal.defaultProps.componentPanel = 'input';
      
/**
 * 映射数组，数组内的 input type 直接映射为对应元素，例如：
 * <Field type="textarea" /> => <textarea></textarea>
 * @member
 */
Normal.typesToElement = ['progress', 'select', 'textarea'];


// Type: Static
// --------------------

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
    component:Component, componentPanel, className, children, ...props
  } = parseProps(aprops, Static.props);

  let classStr = 'line-height-1 vertical-align-middle';

  return (
    <Component component={componentPanel} className={classes(classStr, className)} {...props}>
      {value||<pre className="margin-a-0 padding-a-0"> </pre>}
    </Component>
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
/**
 * 参见 BaseComponent
 */
Static.defaultProps.component = Panel;
/**
 * 参见 BaseComponent
 */
Static.defaultProps.componentPanel = 'span';


// Type: Hidden 
// --------------------

/**
 * 表单控件的隐藏组件，使用 label 组件套住该组件，用于改变默认组件的样式
 * @component
 * @mount Field.HiddenInput
 * @augments BaseComponent
 * @private
 */
let HiddenInput = aprops=>{
  let {
    component:Component, className, ...props
  } = parseProps(aprops, HiddenInput.props);

  let classStr = 'visibility-hide display-none';

  return <Component className={classes(classStr, className)} {...props} />;
  
}

Object.defineProperty(Field,"HiddenInput",{ get:function(){ return HiddenInput }, set:function(val){ HiddenInput = val }})

HiddenInput.defaultProps = {};
/**
 * 参见 BaseComponent
 */
HiddenInput.defaultProps.component = 'input';


// Type: CheckState 
// --------------------

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
    CheckStateProps, inputProps, innerProps,
    component:Component=Panel, componentPanel='label', className, children, ...props
  } = parseProps(aprops, CheckState.props);

  let classStr = 'check-status transition outline-none appearance-none line-height-1 font-smoothing-antialiased vertical-align-middle bg-none-';

  return (
    <Component component={componentPanel} onClick={(e)=>{e.stopPropagation();onClick&&onClick(e)}} className={classes(classStr, className)} {...CheckStateProps}>
      <HiddenInput type={type} checked={value} defaultChecked={defaultValue} value={domValue} disabled={disabled} onChange={onChange} {...inputProps} />
      <CheckStateInner {...innerProps}>
        <CheckStateContent component={content} {...props} type={type} disabled={disabled} isChecked>X</CheckStateContent>
        <CheckStateContent component={content} {...props} type={type} disabled={disabled}>-</CheckStateContent>
      </CheckStateInner>
    </Component>
  );
}

Object.defineProperty(Field,"CheckState",{ get:function(){ return CheckState }, set:function(val){ CheckState = val }})

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
/**
 * 参见 BaseComponent
 */
CheckState.defaultProps.component = Panel;
/**
 * 参见 BaseComponent
 */
CheckState.defaultProps.componentPanel = 'label';



/**
 * 表单控件的2态组件的状态内容的容器组件
 * @component
 * @mount Field.CheckState.Inner
 * @augments BaseComponent
 * @private
 */
let CheckStateInner = aprops=>{
  let {
    component:Component, componentPanel='span', className, ...props
  } = parseProps(aprops, CheckStateInner.props);

  let classStr = 'check-status-inner position-relative';

  return <Component component={componentPanel} className={classes(classStr, className)} {...props} />;
}

Object.defineProperty(Field.CheckState,"Inner",{ get:function(){ return CheckStateInner }, set:function(val){ CheckStateInner = val }})

CheckStateInner.defaultProps = {};
/**
 * 参见 BaseComponent
 */
CheckStateInner.defaultProps.component = Panel;
/**
 * 参见 BaseComponent
 */
CheckStateInner.defaultProps.componentPanel = 'span';

/**
 * 表单控件的2态组件的状态内容组件
 * @component
 * @mount Field.CheckState.Content
 * @augments BaseComponent
 * @private
 */
let CheckStateContent = aprops=>{
  let {
    isChecked,
    component:Component=Panel, className, ...props
  } = parseProps(aprops, CheckStateContent.props);

  let classStr = 'position-relative';
  let classSet = [isChecked?'check-status-checked':'check-status-unchecked'];

  return <Component inline className={classes(classStr, classSet, className)} {...props} isChecked={isChecked} />;
}

Object.defineProperty(Field.CheckState,"Content",{ get:function(){ return CheckStateContent }, set:function(val){ CheckStateContent = val }})

CheckStateContent.defaultProps = {};
/**
 * 指示是否是2种状态中的开启状态
 * @attribute module:Field~CheckStateContent.isChecked
 */
/**
 * 参见 BaseComponent
 */
CheckStateContent.defaultProps.component = Panel;


// radio checkbox
// ----------------------

/**
 * 表单控件的 checkbox 和 radio 的2态组件内容
 * @component
 * @mount Field.CheckStateContentCheckRadio
 * @augments BaseComponent
 * @private
 */
let CheckStateContentCheckRadio = aprops=>{
  let {
    type, isChecked, disabled, 
    name, nameChecked, defaultName, defaultNameChecked, 
    component:Component, 'b-theme':bTheme, 'b-style':bStyle, ...props
  } = parseProps(aprops, CheckStateContentCheckRadio.props);

  if(!bStyle) bStyle = 'hollow';
  if(!isChecked) { bTheme = undefined; bStyle = 'hollow' }

  return (
    <Component 
      type={type}  
      name={isChecked?nameChecked:name} defaultName={isChecked?defaultNameChecked:defaultName} 
      bc-border-radius-rounded={!Boolean(type==='checkbox')} bc-bg-color-component={disabled}
      b-style={bStyle} b-theme={bTheme} {...props} />
  )
}

Object.defineProperty(Field,"CheckStateContentCheckRadio",{ get:function(){ return CheckStateContentCheckRadio }, set:function(val){ CheckStateContentCheckRadio = val }})

CheckStateContentCheckRadio.defaultProps = {};
/**
 * 指示是否是选择状态的内容组件
 * @attribute module:Field~CheckStateContentCheckRadio.isChecked
 * @type {boolean}
 */
/**
 * 设置未选中时的图标名称
 * @type {string}
 */
CheckStateContentCheckRadio.defaultProps.name = ' ';
/**
 * 设置选中时的图标名称
 * @type {string}
 */
CheckStateContentCheckRadio.defaultProps.nameChecked = 'check';
/**
 * 设置未选中时的图标默认名称
 * @type {string}
 */
CheckStateContentCheckRadio.defaultProps.defaultName = ' ';
/**
 * 设置选中时的图标默认名称
 * @type {string}
 */
CheckStateContentCheckRadio.defaultProps.defaultNameChecked = 'x';
/**
 * 参见 BaseComponent
 */
CheckStateContentCheckRadio.defaultProps.component = Icon;
 

/**
 * 表单控件的对应的 checkbox 组件，基于2态组件实现
 * @component
 * @mount Field.Checkbox
 * @augments BaseComponent
 * @private
 */
let Checkbox = aprops=>{
  aprops = parseProps(aprops, Checkbox.props);
  return <CheckState content={Field.CheckStateContentCheckRadio} {...aprops} />
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
  aprops = parseProps(aprops, Radio.props);
  return <CheckState content={Field.CheckStateContentCheckRadio} {...aprops} />
};

Object.defineProperty(Field,"Radio",{ get:function(){ return Radio }, set:function(val){ Radio = val }})


// switch
// ----------------------

/**
 * 表单控件用于开关组件的2态内容
 * @component
 * @mount Field.CheckStateContentSwitch
 * @augments BaseComponent
 * @private
 */
let CheckStateContentSwitch = aprops=>{
  let {
    component:Component, className, children, ...props
  } = parseProps(aprops, CheckStateContentSwitch.props);

  let classStr = 'border-radius-rounded line-height-0';

  return (
    <Component b-style="hollow" className={classes(classStr, className)}>
      <CheckStateContentSwitchItem {...props} isOn />
      <CheckStateContentSwitchItem {...props} />
    </Component>
  )
}

Object.defineProperty(Field,"CheckStateContentSwitch",{ get:function(){ return CheckStateContentSwitch }, set:function(val){ CheckStateContentSwitch = val }})

CheckStateContentSwitch.defaultProps = {};
/**
 * 参见 BaseComponent
 */
CheckStateContentSwitch.defaultProps.component = Panel;

/**
 * 表单控件用于开关组件的2态内容的子组件，现实了开关的圆按钮
 * @component
 * @mount Field.CheckStateContentSwitchItem
 * @augments BaseComponent
 * @private
 */
let CheckStateContentSwitchItem = aprops=>{
  let {
    isChecked, isOn, 
    component:Component, 'b-theme':bTheme='component', className, children, ...props
  } = parseProps(aprops, CheckStateContentSwitchItem.props);

  let classStr = 'border-radius-rounded width-1em height-1em';

  return <Component {...props} inline b-style="solid" b-theme={isOn?(isChecked?bTheme:'white'):(isChecked?'white':'component')} className={classes(classStr, className)}  />
}

Object.defineProperty(Field.CheckStateContentSwitch,"Item",{ get:function(){ return CheckStateContentSwitchItem }, set:function(val){ CheckStateContentSwitchItem = val }})

CheckStateContentSwitchItem.defaultProps = {};
/**
 * 指示是否是2种状态中的开启状态
 * @attribute module:Field~CheckStateContentSwitchItem.isChecked
 */
/**
 * 指示是开启状态的子组件还是关闭状态的子组件
 * @attribute module:Field~CheckStateContentSwitchItem.isOn
 */
/**
 * 参见 BaseComponent
 */
CheckStateContentSwitchItem.defaultProps.component = Panel;

/**
 * 表单控件的开关组件，基于2态组件实现
 * @component
 * @mount Field.Switch
 * @augments BaseComponent
 * @private
 */
let Switch = aprops=>{
  aprops = parseProps(aprops, Switch.props);
  return <CheckState content={Field.CheckStateContentSwitch} {...aprops} type="checkbox" />
};

Object.defineProperty(Field,"Switch",{ get:function(){ return Switch }, set:function(val){ Switch = val }})


// file
// ----------------------
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
    component:Component, componentPanel, className, children, ...props
  } = parseProps(aprops, File.props);

  let classStr = 'line-height-1 vertical-align-middle';

  return (
    <Component component={componentPanel} className={classes(classStr, className)} disabled={disabled} {...props}>
      <HiddenInput type={type} value={value} disabled={disabled} onClick={onClick} onChange={onChange} {...inputProps} />
      {children}
    </Component>
  );
}

Object.defineProperty(Field,"File",{ get:function(){ return File }, set:function(val){ File = val }})

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
/**
 * 参见 BaseComponent
 */
File.defaultProps.component = Panel;
/**
 * 参见 BaseComponent
 */
File.defaultProps.componentPanel = 'label';

 