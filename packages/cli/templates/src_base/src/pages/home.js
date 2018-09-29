import React from 'react';


let Component = props=><h1>Home Page</h1>;


Component.controller = (app,page)=>({
  onPageStart: ()=>console.log('onHomePageStart'),
})


export default Component;