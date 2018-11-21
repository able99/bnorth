import React from 'react';


export default props=>{
  let { app, data:{title, message, data, _id}={} } = props;
  return ( 
    <div style={{padding: 8}}> 
      <div> 
        <big><strong>Error</strong></big> 
        <button style={{padding: 4}} onClick={()=>app.router.refresh()}>[refresh]</button> 
        <button style={{padding: 4}} onClick={()=>app.router.replaceRoot()}>[home]</button> 
      </div> 
      <h3>{title}</h3> 
      <hr/> 
      <p>{app.utils.message2String(message)}</p> 
      {data?<p>error data:{JSON.stringify(data)}</p>:null}
      {_id?<p>page id:{_id}</p>:null}
    </div>
  )
}