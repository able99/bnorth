import React from 'react';


let List = aprops=>{
  return (
    <div className="margin-a- position-relative" {...aprops} />
  )
}

List.Item = aprops=>{
  let { title, desc, className, children, ...props } = aprops;

  return (
    <div className={"padding-a- border-set-bottom- "+className} {...props}>
      <div className="">{title}</div>
      <div className="text-size-sm text-color-light">{desc}</div>
    </div>
  )
}



export default List;