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
      controller:ControllerComponent, pager:PagerComponent, pagerProps, controllerPrevProps, controllerNextProps,
      component:Component, children, ...props
    } = BaseComponent(this.props, Carousel);
    let { selectedIndex } = this.state;
    children = React.Children.toArray(children).filter(v=>v);
    if(ControllerComponent===true) ControllerComponent = Controller;
    if(PagerComponent===true) PagerComponent = Pager;

    return (
      <Component 
        type="scroll" selectedIndex={selectedIndex} onSelect={selectedIndex=>this.setState({selectedIndex}, ()=>this.go())}
        onMouseOver={e=>pauseOnHover&&this.pause()} onMouseOut={e=>this.isPaused&&this.play()}
        {...props}>
        {children}
        {Controller?<Controller onClick={e=>this.prev()} {...controllerPrevProps} itemPlain />:null}
        {Controller?<Controller onClick={e=>this.next()} {...controllerNextProps} itemPlain isNext />:null}
        {Pager?<Pager onClick={selectedIndex=>this.setState({selectedIndex}, ()=>this.go())} itemCount={children.length} selectedIndex={selectedIndex} {...pagerProps} itemPlain />:null}
      </Component>
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
Carousel.defaultProps.component = PanelContainer;

export default Carousel;




// Carousel Item
// ------------------------------
Carousel.Item = Panel;




// Carousel Controller
// ------------------------------

/**
 * 轮播组件内部使用的翻页控制组件
 * @component 
 * @private
 * @augments module:BaseComponent.BaseComponent
 * @augments module:ICon.Icon
 */
let Controller = aprops=>{
  let {
    isNext, mask, icon, iconNext, defaultIcon, defaultIconNext,
    component:Component, ...props
  } = BaseComponent(aprops, Controller);

  let classNamePre = {
    'position-absolute text-color-white cursor-pointer margin-h-xxs padding-a-xxs offset-top-center translate-center-y text-weight-border': true,
    [`offset-${isNext?'right':'left'}-start`]: true,
    ['bg-color-'+(mask===true?'overlay':mask)]: mask,
  }

  return <Component b-size="xl" name={isNext?iconNext:icon} defaultName={isNext?defaultIconNext:defaultIcon} classNamePre={classNamePre} {...props} />
}

Object.defineProperty(Carousel,"Controller",{ get:function(){ return Controller }, set:function(val){ Controller = val }})

Controller.defaultProps = {};
/**
 * 是否是指示显示下一页的控制器
 * @attribute module:Carousel~Controller.isNext
 * @type {boolean}
 */
/**
 * 设置组件是否具有蒙层背景或者指定蒙层的主题，true 表示使用默认的 mask 主题蒙层
 * @attribute module:Carousel~Controller.mask
 * @type {boolean|string}
 */
/**
 * 设置控制器的图标
 * @type {string}
 */
Controller.defaultProps.icon = 'left';
/**
 * 设置控制器为指向下一页时的图标
 * @type {string}
 */
Controller.defaultProps.iconNext = 'right'; 
/**
 * 设置控制器的默认图标
 * @type {string}
 */
Controller.defaultProps.defaultIcon = '<';
/**
 * 设置控制器为指向下一页时的默认图标
 * @type {string}
 */
Controller.defaultProps.defaultIconNext = '>';
Controller.defaultProps.component = Icon;



// Carousel Pager
// ------------------------------

/**
 * 轮播组件内部使用的分页控制器
 * @component 
 * @private
 * @augments module:BaseComponent.BaseComponent
 * @augments module:Panel~PanelContainer
 */
let Pager = aprops=>{
  let { itemCount, onClick, mask, ...props } = BaseComponent(aprops, Pager, {isContainer: true});

  let classNamePre = {
    'position-absolute padding-a-xs margin-bottom-xs border-radius-rounded offset-bottom-start offset-left-center translate-center-x': true,
    ['bg-color-'+(mask===true?'overlay':mask)]: mask,
  };
  
  return (
    <PanelContainer type="flex" itemCount={itemCount} classNamePre={classNamePre} {...props}>
      {Array.from({length:itemCount},(v,k)=>k).map(v=><Panel component="li" key={v} onClick={onClick} />)}
    </PanelContainer>
  );
}

Object.defineProperty(Carousel,"Pager",{ get:function(){ return Pager }, set:function(val){ Pager = val }})

Pager.defaultProps = {};
Pager.defaultProps.component = 'ol';

Pager.itemGetClassName = (itemProps, containerProps)=>{
  return {
    'cursor-pointer width-0em5 height-0em5 border-radius-rounded border-set-a-white': true,
    'bg-color-white': itemProps.itemSelected,
    'bg-color-component': itemProps.itemSelected,
    'margin-left-xxs': itemProps.itemIndex>0,
  }
}

