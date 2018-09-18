import React from 'react';
import ReactMarkdown from 'react-markdown'


export default props=>{
  let { data } = props;
  return (
    <ReactMarkdown source={data} />
  )
}