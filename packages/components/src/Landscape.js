/**
 * @module
 */
import React from 'react';
import { transform } from '@bnorth/rich.css/lib/styles/animation'
import BaseComponent, { listen, domFindDock } from './BaseComponent';
import Panel from './Panel';


/**
 * 横屏组件，需要有容器组件且，容器组件尺寸不能依赖横屏组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel.Panel
 */
class Landscape extends React.Component
{
  componentDidMount() {
    this.dock = domFindDock(this, this.props.dock);
    this.forceUpdate();
    this.offResizeListener = listen( window, 'resize', ()=>this.forceUpdate(), true);
  }

  componentWillUnmount() {
    this.offResizeListener&&this.offResizeListener();
  }

  render() {
    if(!this.dock) return <span style={{ fontSize: 0 }} />;
    let { 
      dock,
      classNamePre ,stylePre, ...props 
    } = BaseComponent(this.props, Landscape);

    let width = this.dock.clientWidth;
    let height = this.dock.clientHeight;

    classNamePre = {
      'position-relative': true,
      ...classNamePre,
    }
    stylePre = (this.dock&&height>width)?{ 
      width: height,
      height: width,
      top: (height - width) / 2,
      left: (width - height) / 2,
      ...transform('rotate', '90deg'),
      ...stylePre,
    }:{};
    
    return <Panel full classNamePre={classNamePre} stylePre={stylePre} {...props} />;
  }
}

Landscape.defaultProps = {}
/**
 * 设置容器，横屏时以容器为参照横屏旋转
 * @type {element}
 */
Landscape.defaultProps.dock = true;


Object.defineProperty(Landscape,"Landscape",{ get:function(){ return Landscape }, set:function(val){ Landscape = val }})
Landscape.isBnorth = true;
Landscape.defaultProps['b-precast'] = {};
export default Landscape;