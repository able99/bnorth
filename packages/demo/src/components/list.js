import React from 'react';


let List = aprops=>{
  return (
    <div className="margin-a- position-relative" {...aprops} />
  )
}

List.Item = aprops=>{
  let { title, desc, children, ...props } = aprops;

  return (
    <div className="padding-a- border-set-bottom-" {...props}>
      <div className="">{title}</div>
      <div className="text-size-sm text-color-light">{desc}</div>
    </div>
  )
}



export default List;