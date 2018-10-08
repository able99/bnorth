/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import parseProps from './utils/props';
import Panel from './Panel';


let Spacing = (aprops)=>{
  let {
    count=1, stacked,
    component:Component=Panel, children, ...props
  } = parseProps(aprops, Spacing.props);

  return (
    <Component inline {...props}>
      <pre className="margin-a-0 padding-a-0">{Array(Number(count)).fill(stacked?'\n':' ')}</pre>
      {children}
    </Component>
  );
}


export default Spacing;