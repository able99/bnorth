import React from 'react';


let NavBar = aprops=>{
  let { 
    onBack, title, children, ...props
  } = aprops;

  return (
    <div className="position-relative border-set-bottom- flex-display-block flex-align-center" {...props}>
      <div className="padding-a- flex-sub-flex-none cursor-pointer" style={{visibility: onBack?'visible':'hidden'}} onClick={onBack}>{'<'}</div>
      <div className="flex-sub-flex-extend text-align-center text-size-lg text-weight-bold">{title}</div>
      <div className="padding-a- flex-sub-flex-none" style={{visibility: 'hidden'}}>{'<'}</div>
    </div>
  )
}


export default NavBar;