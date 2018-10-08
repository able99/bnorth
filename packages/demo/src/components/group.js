import React from 'react';


let Group = aprops=>{
  let { 
    app, page, stateData, stateComponentSwitchs,  stateCommonProps, stateComponentProps,
    title, disabled, children, ...props
  } = aprops;
  if(disabled) return null;
  let switchOn = stateComponentSwitchs.includes(title);

  return (
    <div className="padding-a-xs" {...props}>
      <div 
        onClick={()=>{
          switchOn?page.stateComponentSwitchs.delete(title):page.stateComponentSwitchs.update([title], {append: true})}
        }
        className="flex-display-block flex-align-center margin-v- cursor-pointer margin-right-">
        <span>{switchOn?'-':'+'}</span>
        <strong className="flex-sub-flex-extend">{title}</strong>
      </div>
      {switchOn?<div className="border-set-a- padding-a-xs bg-color-white">{children}</div>:<div className="border-set-bottom-" />}
    </div>
  )
}

Group.Item = aprops=>{
  let { title, children } = aprops;

  return (
    <React.Fragment>
      <div className="text-weight-bolder margin-bottom- border-set-bottom-">{title}</div>
      {children}
    </React.Fragment>
  )
}

Group.Prop = aprops=>{
  let { children } = aprops;

  return (
    <div className="padding-a- bg-color-component">
      {children}
    </div>
  )
}


export default Group;