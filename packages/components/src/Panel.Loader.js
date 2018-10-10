/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import Panel from './Panel';
import Loader from './Loader';


Panel.Loader = aprops=>{
  let {
    position='left', isProgress, progress, 
    titleProps, loaderProps,
    component:Component=Panel, componentPanel, className, children, ...props
  } = parseProps(aprops, Panel.Loader.props);
  
  let classStr = 'flex-display-block flex-justify-center flex-align-center';
  let classSet = (position==='top'||position==='bottom')?'flex-direction-v':'';

  let ctitle = children?<Panel.Loader._Title position={position} {...titleProps}>{children}</Panel.Loader._Title>:null;
  let cloader = position?<Panel.Loader._Loader isProgress={isProgress} progress={progress} {...loaderProps} />:null;

  return (
    <Component component={componentPanel} className={classes(classStr, classSet, className)} {...props}>
      {position==='right'||position==='bottom'?ctitle:null}
      {cloader}
      {position==='left'||position==='top'?ctitle:null}
    </Component>
  );
}

Panel.Loader._Loader = Loader;

Panel.Loader._Title = aprops=>{
  let {
    position,
    component:Component=Panel, componentPanel, className, ...props
  } = parseProps(aprops, Panel.Loader._Title.props);

  let classStr = 'text-truncate position-relative';
  let classSet = (position==='top'||position==='bottom')?'text-align-center':'';

  return <Component component={componentPanel} className={classes(classStr, classSet, className)} {...props} />;
}


export default Panel;
