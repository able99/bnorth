import React from 'react';

export default (length=3, {Component='div', children=i=>('data-'+i), pre, ext, clickable, ...props}={})=>Array.from({length}, (v,i)=>i+1).map(v=><Component key={v} onClick={clickable?e=>alert(v):null} {...props}>{pre}{typeof children==='function'?children(v):children}{ext}</Component>)