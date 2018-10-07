// /**
//  * bnorth solution
//  * @copyright (c) 2016 able99
//  * @author able99 (8846755@qq.com)
//  * @license MIT
//  */
// import React from 'react';
// import { styleFlexSubBasis } from '@bnorth/rich.css/lib/styles/flex'
// import classes from '@bnorth/rich.css/lib/classes'; 
// import parseProps from './utils/props';
// import Panel from './Panel';
// let Grid = aprops=>{
//   let {
//     border, avg, align, justify, wrap=avg?'nowrap':'wrap', total=12, 
//     component:Component=Panel, className, children, ...props
//   } = parseProps(aprops);
//   let classStr = 'position-relative overflow-a-hidden backface-hidden flex-display-block';
//   let classSet = {
//     [`flex-wrap-${wrap}`]: wrap,
//     [`flex-align-${align}`]: align,
//     [`flex-justify-${justify}`]: justify,
//   };
//   return (
//     <Component className={cx(classSet, className)} {...props}>
//       {React.Children.toArray(children)
//       .filter(v=>v)
//       .map((v,i, arr)=>cloneElement(v, {
//         cTheme, cStyle, cSize,
//         i, count: arr.length, avg, total, border, ...props
//       }))}  
//     </Component>
//   );
// }
// let GridItem = (aprops)=>{
//   let {
//     i, count, cols, offset, shrink, total=12, border, avg, 
//     component: Component = 'div', style, className, cTheme, cStyle, cSize, children, ...props
//   } = parseProps(aprops);
//   let classSet = {
//     'padding': !hascx(className, 'padding'),
//     'flex-sub-flex-extend': avg,
//     'flex-sub-flex-none': !avg&&(shrink||cols),
//     'border-set-right': border,
//     'border-set-bottom': border,
//   };
//   let styleSet = { 
//     ...cols&&styleFlexSubBasis(100*cols/total),
//   }
//   if(offset){
//     styleSet.marginLeft = `${offset*(100*cols/total)}%`;
//   }
//   return (
//     <Component style={{...styleSet, ...style}} className={cx(classSet, className)} {...props}>
//       {children}
//     </Component>
//   );
// }
// Grid.Item = GridItem;
// export default Grid;
"use strict";