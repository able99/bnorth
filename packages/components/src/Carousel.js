/**
 * @module
 */
import React from 'react';
import BaseComponent from './BaseComponent';
import Panel, { PanelContainer } from './Panel';
import Icon from './Icon';


// Carousel
// ------------------------------

/**
 * 轮播组件
 * @component 
 * @exportdefault
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel~PanelContainer
 */
class Carousel extends React.Component {
  constructor(props){
    super(props);
    this.state = {selectedIndex: props.selectedIndexDefault};
  }

  prev() {
    let { selectedIndex } = this.state;
    if(selectedIndex<0) selectedIndex = React.Children.toArray(this.props.children).filter(v=>v).length - 1;
    this.setState({selectedIndex});
    this.go();
  }

  next() {
    let { selectedIndex } = this.state;
    selectedIndex = (++selectedIndex)%(React.Children.toArray(this.props.children).filter(v=>v).length);
    this.setState({selectedIndex});
    this.go();
  }

  pause() {
    this.isPaused = true;
    this.stop();
  }

  play() {
    this.isPaused = false;
    this.go();
  }

  go() {
    let { autoPlay, interval } = this.props;
    this.stop();
    if (autoPlay && !this._isPaused && interval) this.timer = setTimeout(()=>this.next(), interval);
  }

  stop() {
    if(this.timer) { clearTimeout(this.timer); this.timer = undefined; }
  }

  componentDidMount() {
    this.go();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.interval !== this.props.interval || prevProps.autoPlay !== this.props.autoPlay) this.go();
  }

  componentWillUnmount() {
    this.stop();
  }

  render() {
    let {
      selectedIndexDefault, interval, autoPlay, pauseOnHover,
      controller, pager, pagerProps, controllerProps, controllerPrevProps, controllerNextProps,
      children, ...props
    } = BaseComponent(this.props, Carousel);
    let { selectedIndex } = this.state;
    children = React.Children.toArray(children).filter(v=>v);

    let classNameStrController = 'position-absolute margin-h-xxs padding-a-xxs offset-top-center translate-center-y text-weight-border';
    let classNamePreControllerPrev = {
      [classNameStrController]: true,
      [`offset-left-start`]: true,
    }
    let classNamePreControllerNext = {
      [classNameStrController]: true,
      [`offset-right-start`]: true,
    }
    let classNamePrePager = 'position-absolute padding-a-xs margin-bottom-xs border-radius-rounded offset-bottom-start offset-left-center translate-center-x';

    return (
      <PanelContainer type="scroll" selectedIndex={selectedIndex} onSelect={selectedIndex=>this.setState({selectedIndex}, ()=>this.go())} onMouseOver={e=>pauseOnHover&&this.pause()} onMouseOut={e=>this.isPaused&&this.play()} {...props}>
        {children}
        {controller?<Panel 
          componentTransform={Icon} classNamePre={classNamePreControllerPrev} b-size="xl" b-style="solid" b-theme="mask" name="left:<"
          onClick={e=>this.prev()} 
          itemPlain {...controllerProps} {...controllerPrevProps}  />:null}
        {controller?<Panel 
          componentTransform={Icon} classNamePre={classNamePreControllerNext} b-size="xl" b-style="solid" b-theme="mask" name="right:>"
          onClick={e=>this.next()} 
          itemPlain {...controllerProps} {...controllerPrevProps}  />:null}
        {pager?<PanelContainer 
          component="ol" type="flex" selectedIndex={selectedIndex}
          itemPlain classNamePre={classNamePrePager} b-theme="mask" b-style="solid" {...pagerProps}>
          {Array.from({length:children.length},(v,k)=>k).map(v=>
            <Panel 
              key={v} component="li" 
              classNamePre="width-0em5 height-0em5 border-radius-rounded" bc-margin-left-xxs={Boolean(v)} b-theme='white' b-style={selectedIndex===v?'solid':'hollow'} bgThemeOnHollow={false}
              onClick={()=>this.setState({selectedIndex: v}, ()=>this.go())} />
          )}
        </PanelContainer>:null}
      </PanelContainer>
    );
  }
}

Carousel.defaultProps = {}
/**
 * 默认的轮播条目
 * @type {number}
 */
Carousel.defaultProps.selectedIndexDefault = 0;
/**
 * 轮播间隔
 * @type {number}
 */
Carousel.defaultProps.interval = 4000; 
/**
 * 鼠标滑过时，是否暂停
 * @type { boolean}
 */
Carousel.defaultProps.pauseOnHover = false;
/**
 * 是否自动播放
 * @type { boolean}
 */
Carousel.defaultProps.autoPlay = true; 
/**
 * 前进后退按钮，true 表示使用默认按钮
 * @type {boolean|component}
 */
Carousel.defaultProps.controller = true;
/**
 * 后退按钮属性
 * @attribute module:Carousel.Carousel.controllerPrevProps
 * @type {Object}
 */
/**
 * 前进按钮属性
 * @attribute module:Carousel.Carousel.controllerNextProps
 * @type {Object}
 */
/**
 * 分页器组件，true 表示使用默认分页器
 * @type {boolean|component}
 */
Carousel.defaultProps.pager = true;
/**
 * 分页器属性
 * @attribute module:Carousel.Carousel.pagerProps
 * @type {Object}
 */


Object.defineProperty(Carousel,"Carousel",{ get:function(){ return Carousel }, set:function(val){ Carousel = val }})
export default Carousel;



Carousel.Item = Panel;
