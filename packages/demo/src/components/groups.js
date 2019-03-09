import React, {cloneElement} from 'react';
import NavBar from './navbar';
import List from './list';


let commonProps = {
  'b-style|样式风格': ['solid', 'hollow', 'plain', 'underline'],
  'b-theme|主题颜色': ['primary', 'alert', 'success'],
  'b-size|主题大小': ['xs', 'sm', 'lg', 'xl', '2x', '3x'],
  'selected|选中状态': false,
  'active|活动状态': false,
  'disabled|禁用状态': false,
  'bc-margin-a|四周边距': ['0', 'xs', 'sm', 'lg', 'xl'],
  'bc-padding-a|四周内距': ['0', 'xs', 'sm', 'lg', 'xl'],
  'bc-border-radius|边框圆角': ['2', '5', '10', 'rounded'],
  'bc-border-set-a|边框': [true, 'primary', 'alert'],
}

let PropSel = aprops=>{
  let { title, option, state, stateData } = aprops;
  let componnet = null;
  let titles = String(title).split('|'); title = titles[0]; let desc = titles[1];

  if(Array.isArray(option)) {
    componnet = [undefined,...option].map((v,i)=>(
      <label key={(v?v.toString():'')+i} className="margin-right-">
        <input 
          className="margin-right-xxs" type='radio' key={v}
          onChange={e=>{if(v===undefined){state.delete(title)}else{state.update({[title]: v})}}} checked={(stateData[title]===v)||false} />
        <span>{v!==undefined?String(v):'none'}</span>
      </label>
    ))
  }else if(typeof option==='boolean') {
    componnet = (
      <label>
        <input 
          className="margin-right-" type='checkbox'
          onChange={e=>state.update({[title]: e.target.checked})} checked={Boolean(stateData[title])} />
      </label>
    )
  }else if(typeof option==='object'&&option.type==='range') {
    let { min, max, fact=1 } = option;
    componnet = (
      <input 
        className="width-full" min={min} max={max} type='range' 
        onChange={e=>state.update({[title]: e.target.value*fact})} value={(stateData[title]||0)*fact} />
    )
  }

  return <div className="padding-a-"><div><strong>{title}</strong></div><div><small>{desc}</small></div>{componnet}</div>;
}



let Groups = aprops=>{
  let { 
    app, children, component, ...props
  } = aprops;
  children = React.Children.toArray(children);
  let Component = component?children.find(v=>v.props.title===component):component;

  return (
    <div className="bg-color-white width-full height-full scrollable-y-">
      <NavBar title={component||'组件列表'} onBack={()=>app.router.back()} />
      {Component&&cloneElement(Component, props)}
      {!Component&&(
        <List>
          {children.map(v=>(
            <List.Item key={v.props.title} title={v.props.title} desc={v.props.desc} onClick={()=>app.router.push(['components', v.props.title])} />
          ))}
        </List>
      )}
    </div>
  )
}

Groups.Group = aprops=>{
  let { 
    title, children, ...props
  } = aprops;

  return (
    <div className="bg-color-white">
      {React.Children.toArray(children).map(v=>cloneElement(v, props))}
      <Groups.Props data={commonProps} isCommon {...props} />
    </div>
  )
}

Groups.Sep = aprops=>{
  let { title } = aprops;
  return <div className="border-set-bottom- padding-a-"><big><strong>{title}</strong></big></div>;
}

Groups.Props = aprops=>{
  let { data, isCommon, page, stateCommonProps, stateComponentProps } = aprops;

  return (
    <div className="margin-bottom-">
      <div className="border-set-bottom- padding-a-"><strong>{isCommon?'通用':'组件'}属性</strong></div>
      {Object.entries(data||{}).map(([k,v])=><PropSel key={k} title={k} option={v} state={isCommon?page.stateCommonProps:page.stateComponentProps} stateData={isCommon?stateCommonProps:stateComponentProps} />)}
    </div>
  ) 
}

Groups.Show = aprops=>{
  let { children, stateComponentProps, stateCommonProps } = aprops;
  if(typeof children === 'function') {
    children = [children]
  }else if(Array.isArray(children)) {
  }else{
    children = React.Children.toArray(children);
  }

  return (
    <div>
      <hr /> <hr /> <hr />
      {children.map((v,i)=>{
        let key = i;
        let props = {...stateCommonProps, ...stateComponentProps, key}
        props.key = props.key||i;
        return cloneElement(typeof(v)==='function'?v(props):v, typeof(v)==='function'?{key}:props);
      })}
      <hr /> <hr /> <hr />
    </div>
  ) 
}

Groups.Log = aprops=>{
  let {logs=[]} = aprops;
  if(!logs.length) return null;
  return (
    <div>
      <div className="border-set-bottom- padding-a-"><strong>日志</strong></div>
      <div className="border-set-bottom- padding-a- scrollable-y-" style={{height: 100}}>{[...logs].reverse().map((v,i,a)=><div key={i}>{a.length-i-1}: {v}</div>)}</div>
    </div>
  )
}


export default Groups;