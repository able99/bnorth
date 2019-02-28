import React, {cloneElement} from 'react';
import NavBar from './navbar';
import List from './list';


let commonProps = {
  // 'toSub': undefined,
  'b-style': ['solid', 'hollow', 'plain', 'underline'],
  'b-theme': ['primary', 'alert', 'success'],
  'b-size': ['xs', 'sm', 'lg', 'xl', '2x', '3x'],
  'selected': undefined,
  'active': undefined,
  'disabled': undefined,
  'bc-margin-a': ['0', 'xs', 'sm', 'lg', 'xl'],
  'bc-padding-a': ['0', 'xs', 'sm', 'lg', 'xl'],
  'bc-border-radius': ['2', '5', '10', 'rounded'],
  'bc-border-set-a-': undefined,
}

let PropSel = aprops=>{
  let { title, option, state, stateData } = aprops;
  let componnet = null;

  if(Array.isArray(option)) {
    componnet = [undefined,...option].map((v,i)=>(
      <label key={(v?v.toString():'')+i} className="margin-right-">
        <input 
          className="margin-right-xxs"
          onChange={e=>state.update({[title]: v})} checked={(stateData[title]===v)||false}
          type='radio' key={v} />
        <span>{v!==undefined?v:'none'}</span>
      </label>
    ))
  }else if(!option) {
    componnet = (
      <label>
        <input 
          className="margin-right-"
          onChange={e=>state.update({[title]: e.target.checked})} checked={Boolean(stateData[title])}
          type='checkbox' />
      </label>
    )
  }else if(typeof option==='object'&&option.type==='range') {
    let { min, max, fact=1 } = option;
    componnet = (
      <input 
        className="width-full" 
        onChange={e=>state.update({[title]: e.target.value*fact})} value={(stateData[title]||0)*fact}
        min={min} max={max} type='range' />
    )
  }

  return <div className="padding-a-"><div><strong>{title}</strong></div>{componnet}</div>;
}



let Groups = aprops=>{
  let { 
    app, children, component, ...props
  } = aprops;
  children = React.Children.toArray(children);
  let Component = component?children.find(v=>v.props.title===component):component;

  return (
    <div className="bg-color-white width-full height-full scrollable-y">
      <NavBar title={component||'组件列表'} onBack={()=>app.router.back()} />
      {Component&&cloneElement(Component, props)}
      {!Component&&(
        <List>
          {children.map(v=>(
            <List.Item title={v.props.title} desc={v.props.desc} onClick={()=>app.router.push(['components', v.props.title])} />
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
  let { data, isCommon, page, stateComponentProps } = aprops;

  return (
    <div className="margin-bottom-">
      <div className="border-set-bottom- padding-a-"><strong>{isCommon?'通用':'组件'}属性</strong></div>
      {Object.entries(data||{}).map(([k,v])=><PropSel title={k} option={v} state={page.stateComponentProps} stateData={stateComponentProps} />)}
    </div>
  ) 
}

Groups.Show = aprops=>{
  let { children, stateComponentProps, stateCommonProps } = aprops;
  if(typeof children === 'function')
    children = [children]
  else if(Array.isArray(children))
    children = children
  else
    children = React.Children.toArray(children);

  return (
    <div>
      <hr /> <hr /> <hr />
      {children.map(v=>{
        let props = {...stateCommonProps, ...stateComponentProps}
        return typeof(v)==='function'?v(props):cloneElement(v, props)
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
      <div className="border-set-bottom- padding-a- scrollable-y" style={{height: 100}}>{logs.map(v=><div>{v}</div>)}</div>
    </div>
  )
}


export default Groups;