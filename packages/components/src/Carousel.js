/**
 * @module
 */
import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import AnimationSlider from './AnimationSlider';
import Panel from './Panel.Touchable';
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
    defaultSelected: 0,
    controller: true, 
    pager: true, 
    interval: 4000, 
    autoPlay: true, 
  }

  constructor(props){
    super(props);
    this.state = {selected: props.defaultSelected};
  }

  prev() {
    let selected = this.state.selected-1;
    this.setState({selected: selected>=0?selected:(React.Children.toArray(this.props.children).filter(v=>v).length-1)});
    this._goNext();
  }

  next() {
    this.setState({selected: (this.state.selected+1)%(React.Children.toArray(this.props.children).filter(v=>v).length)});
    this._goNext();
  }

  pause() {
    this._isPaused = true;
    this._clearTimeoutNext();
  }

  play() {
    this._isPaused = false;
    this._goNext();
  }

  _goNext() {
    let { autoPlay, interval } = this.props;
    this._clearTimeoutNext();
    if (autoPlay && !this._isPaused && interval) this._timeoutNext = setTimeout(()=>this.next(), interval);
  }

  _clearTimeoutNext() {
    if(this._timeoutNext) { clearTimeout(this._timeoutNext); this._timeoutNext = undefined; }
  }

  _handleFocus() {
    if(this.props.pauseOnHover) this.pause();
  }

  _handleBlur() {
    if(this._isPaused) this.play();
  }

  componentDidMount() {
    this.props.autoPlay && this._goNext();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.interval !== this.props.interval || prevProps.autoPlay !== this.props.autoPlay) this._goNext();
  }

  componentWillUnmount() {
    this._clearTimeoutNext();
  }

  render() {
    let {
      defaultSelected, interval, timeout, autoPlay, pauseOnHover,
      pagerProps, controllerPrevProps, controllerNextProps,
      controller:ControllerComponent, pager:PagerComponent, 
      component:Component=Panel.Touchable, componentPanel=AnimationSlider, children, ...props
    } = parseProps(this.props, Carousel.props);
    let { selected } = this.state;
    children = React.Children.toArray(children);
    if(ControllerComponent===true) ControllerComponent = Controller;
    if(PagerComponent===true) PagerComponent = Pager;

    let content = (
      <React.Fragment>
        {Controller?<Controller onClick={e=>this.prev()} {...controllerPrevProps}/>:null}
        {Controller?<Controller onClick={e=>this.next()} {...controllerNextProps} isNext/>:null}
        {Pager?<Pager onClick={e=>this.setState({selected: e})} size={children.length} selected={Math.round(selected)} {...pagerProps} />:null}
      </React.Fragment>
    );

    return (
      <Component
        component={componentPanel}  
        index={selected} onSwipeLeft={e=>this.next()} onSwipeRight={e=>this.prev()} onMouseOver={e=>this._handleFocus()} onMouseOut={e=>this._handleBlur()}
        content={content}
        {...props}>
        {children}
      </Component>
    );
  }
}

export default Carousel;

// Carousel Item
// ------------------------------
Carousel.Item = AnimationSlider.Item;

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
  } = parseProps(aprops, Controller.props);

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
  } = parseProps(aprops, Pager.props);

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
  } = parseProps(aprops, Item.props);

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





