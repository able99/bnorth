import React from 'react';
// import Panel from '@bnorth/components/lib/Panel'


let Component = props=>{
  // return (
  //   <Panel page full>
  //     <h1>Home Page</h1>
  //   </Panel>
  // )

  return <h1>Home Page</h1>;
};

Component.controller = (app,page)=>({
  onPageStart: ()=>console.log('onHomePageStart'),
})


export default Component;