import React from 'react';


let Component = props=>{
  let { route } = props;

  return (
    <div>{JSON.stringify(route.params)}</div>
  )
};


Component.controller = {
}


export default Component;