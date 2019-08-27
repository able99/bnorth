import React from 'react';


let RouterError = props=>{
  let { title='error', message, data, _id } = props;
  return ( 
    <div style={{padding: 8}}> 
      <h3>{title}</h3> 
      <hr/> 
      {_id?<p>id:{_id}</p>:null}
      <p>{RouterError.app.utils.message2String(message)}</p> 
      {data?<p>error data:{JSON.stringify(data)}</p>:null}
    </div>
  )
}

export default RouterError;