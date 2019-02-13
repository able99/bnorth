/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import BaseComponent from './BaseComponent';
import Panel from './Panel';
import Icon from './Icon';


// Carousel
// ------------------------------

/**
 * 轮播组件
 * @component 
 * @exportdefault
 * @augments BaseComponent
 */
class Carousel extends React.Component {
  static defaultProps = {
    selectedIndexDefault: 0,
    controller: true, 
    pager: true, 
    interval: 4000, 
    autoPlay: true, 
  }

  constructor(props){
    super(props);
    this.state = {selectedIndex: props.selectedIndexDefault};
  }

  prev() {
    let { selectedIndex } = this.state;
    selectedIndex--;
    if(selectedIndex<0) selectedIndex = React.Children.toArray(this.props.children).filter(v=>v).length - 1;
    this.setState({selectedIndex});
    this.go();
  }

  next() {
    let { selectedIndex } = this.state;
    selectedIndex++;
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
      selectedIndexDefault, interval, timeout, autoPlay, pauseOnHover,
      controller:ControllerComponent, pager:PagerComponent, pagerProps, controllerPrevProps, controllerNextProps,
      component:Component=Panel.Container, componentPanel, children, ...props
    } = BaseComponent(this.props, Carousel);
    let { selectedIndex } = this.state;

    children = React.Children.toArray(children).filter(v=>v);
    if(ControllerComponent===true) ControllerComponent = Controller;
    if(PagerComponent===true) PagerComponent = Pager;

    return (
      <Component component={componentPanel}  
        selectedIndex={selectedIndex} onSelect={selectedIndex=>this.setState({selectedIndex}, ()=>this.go())}
        onMouseOver={e=>pauseOnHover&&this.pause()} onMouseOut={e=>this.isPaused&&this.play()}
        type="scroll" {...props}>
        {children}
        {Controller?<Controller onClick={e=>this.prev()} {...controllerPrevProps} itemPlain />:null}
        {Controller?<Controller onClick={e=>this.next()} {...controllerNextProps} itemPlain isNext />:null}
        {Pager?<Pager onClick={selectedIndex=>this.setState({selectedIndex}, ()=>this.go())} size={children.length} selectedIndex={Math.round(selectedIndex)} {...pagerProps} itemPlain />:null}
      </Component>
    );
  }
}

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
 * @augments BaseComponent
 */
let Controller = aprops=>{
  let {
    isNext, mask,
    icon, iconNext, defaultIcon, defaultIconNext,
    component:Component=Icon, className, ...props
  } = BaseComponent(aprops, Controller);

  let classStr = 'position-absolute text-color-white cursor-pointer margin-h-xxs padding-a-xxs offset-top-center translate-center-y text-weight-border';
  let classSet = {
    [`offset-${isNext?'right':'left'}-start`]: true,
    ['bg-color-'+(mask===true?'overlay':mask)]: mask,
  }

  return (
    <Component 
      b-size="xl" 
      name={isNext?iconNext:icon} defaultName={isNext?defaultIconNext:defaultIcon} 
      className={classes(classStr, classSet, className)} {...props} />
  );
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
/**
 * 参见 BaseComponent
 */
Controller.defaultProps.component = Icon;
// Carousel Pager
// ------------------------------

/**
 * 轮播组件内部使用的分页控制器
 * @component 
 * @private
 * @augments BaseComponent
 */
let Pager = aprops=>{
  let {
    size, selected, onClick, itemProps, mask,
    component:Component, componnetPanel, className, ...props
  } = BaseComponent(aprops, Pager);

  let classStr = 'position-absolute flex-display-block flex-justify-center flex-align-center padding-a-xs margin-bottom-xs border-radius-rounded offset-bottom-start offset-left-center translate-center-x';
  let classSet = [];
  if(mask) classSet.push('bg-color-'+(mask===true?'overlay':mask));
  
  return (
    <Component component={componnetPanel} className={classes(classStr, classSet, className)} {...props}>
      {Array.from({length:size},(v,k)=>k).map(v=>(
        <Item key={v} onClick={onClick} size={size} selected={selected} index={v} {...itemProps} />
      ))}
    </Component>
  );
}

Object.defineProperty(Carousel,"Pager",{ get:function(){ return Pager }, set:function(val){ Pager = val }})

Pager.defaultProps = {};
/**
 * 参见 BaseComponent
 */
Pager.defaultProps.component = Panel;
/**
 * 参见 BaseComponent
 */
Pager.defaultProps.componentPanel = 'ol';

// Carousel Pager Item
// ------------------------------

/**
 * 轮播组件内部使用的分页控制器的条目
 * @component 
 * @private
 * @augments BaseComponent
 */
let Item = aprops=>{
  let {
    index, size, selected, onClick,
    component:Component, componnetPanel, className, ...props
  } = BaseComponent(aprops, Item);

  let classStr = 'cursor-pointer width-0em5 height-0em5 border-radius-rounded border-set-a-white';
  let classSet = {
    'bg-color-white': index===selected,
    'bg-color-component': index===selected,
    'margin-left-xxs': index>0,
  };

  return <Component component={componnetPanel} onClick={e=>onClick&&onClick(index)} className={classes(classStr, classSet, className)} {...props} />;
}

Object.defineProperty(Carousel.Pager,"Item",{ get:function(){ return Item }, set:function(val){ Item = val }})

Item.defaultProps = {};
/**
 * 参见 BaseComponent
 */
Item.defaultProps.component = Panel;
/**
 * 参见 BaseComponent
 */
Item.defaultProps.componentPanel = 'li';





