/**
 * @module
 */
import React from 'react';
import { transform } from '@bnorth/rich.css/lib/styles/animation'
import BaseComponent, { domFindContainer } from './BaseComponent';
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
    this.container = domFindContainer(this, this.props.container);
    this.forceUpdate();
  }

  render() {
    if(!this.container) return <span style={{ fontSize: 0 }} />;
    let { container, ...props } = BaseComponent(this.props, Landscape);
    let width = this.container.clientWidth;
    let height = this.container.clientHeight;

    let stylePre = (this.container&&height>width)?{ 
      width: height,
      height: width,
      top: (height - width) / 2,
      left: (width - height) / 2,
      ...transform('rotate', '90deg'),
    }:{};
    
    return <Panel full stylePre={stylePre} {...props} />;
  }
}

Landscape.defaultProps = {}
/**
 * 设置容器，横屏时以容器为参照横屏旋转
 * @type {element}
 */
Landscape.defaultProps.container = true;

export default Landscape;