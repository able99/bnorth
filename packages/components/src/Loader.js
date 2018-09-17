/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';

 
class Loader extends React.Component {
  render() {
    let {
      type='circleLoading', ...props
    } = genCommonProps(this.props);

    let Component = Loader['_'+type];
    if(!Component) return null;

    return <Component {...props}/>
  }
}

Loader._circleLoading = aprops=>{
  let {
    timeout='2s', color="currentColor", colorReverse='lightgray',
    className, children, ...props
  } = genCommonProps(aprops);

  let classStr = '';

  return (
    <svg style={{width: 200,height:100}} viewbox="0 0 100 100" className={cxm(classStr, className)} {...props}>
      <circle cx="50" cy="50" r="25" stroke-width="10" stroke={colorReverse} fill="none"></circle>
      <circle cx="50" cy="50" r="25" stroke-width="10" stroke={color} fill="none" transform="matrix(0,-1,1,0,0,100)" stroke-dasharray="10,156">
        {/*<animate attributeName="stroke-dasharray" from="0,156" to="156,156" dur="2s" repeatCount="indefinite" />*/}
        {<animate attributeName="stroke-dashoffset" from="0" to="-156" dur={timeout} repeatCount="indefinite" />}
      </circle>
      {children}
    </svg>
  );
}

Loader._lineLoading = aprops=>{
  let {
    timeout='2s', color="currentColor", colorReverse='lightgray',
    className, children, ...props
  } = genCommonProps(aprops);

  let classStr = '';

  return (
    <svg  viewbox="0 0 100 5" className={cxm(classStr, className)} {...props}>
      <line x1="0" y1="2" x2="100" y2="2" stroke-width="5" stroke={colorReverse} fill="none" />
      <line x1="0" y1="2" x2="100" y2="2" stroke-width="5" stroke={color} fill="none" stroke-dasharray="10,100">
        {<animate attributeName="stroke-dashoffset" values="0;-90;0" dur={timeout} repeatCount="indefinite" />}
      </line>
      {children}
    </svg>
  );
}

Loader._circleProgress = aprops=>{
  let {
    progress, color="currentColor", colorReverse='lightgray',
    className, children, ...props
  } = genCommonProps(aprops);

  let classStr = '';

  return (
    <svg width="100" height="100" viewbox="0 0 100 100" className={cxm(classStr, className)} {...props}>
      <circle cx="50" cy="50" r="25" stroke-width="10" stroke={colorReverse} fill="none"></circle>
      <circle cx="50" cy="50" r="25" stroke-width="10" stroke={color} fill="none" transform="matrix(0,-1,1,0,0,100)" stroke-dasharray={`${1.56*(progress||0)},156`}></circle>
      {children}
    </svg>
  );
}

Loader._lineProgress = aprops=>{
  let {
    progress, color="currentColor", colorReverse='lightgray',
    className, children, ...props
  } = genCommonProps(aprops);

  let classStr = '';

  return (
    <svg width="100" height="10" viewbox="0 0 100 10" className={cxm(classStr, className)} {...props}>
      <line x1="0" y1="5" x2="100" y2="5" stroke-width="10" stroke={colorReverse} fill="none" />
      <line x1="0" y1="5" x2="100" y2="5" stroke-width="10" stroke={color} fill="none" stroke-dasharray={`${(progress||0)},100`} />
      {children}
    </svg>
  );
}


export default Loader;
