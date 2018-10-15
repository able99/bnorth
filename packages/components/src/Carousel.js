/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import parseProps from './utils/props';
import AnimationSlider from './AnimationSlider';
import Panel from './Panel.Touchable';
import Icon from './Icon';


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
      defaultSelected, controller:Controller, pager:Pager, interval, timeout, autoPlay, pauseOnHover,
      pagerItemProps, controllerPrevProps, controllerNextProps,
      component:Component=Panel.Touchable, componentPanel=AnimationSlider, children, ...props
    } = parseProps(this.props, Carousel.props);
    let { selected } = this.state;
    children = React.Children.toArray(children);
    if(Controller===true) Controller = Carousel._Controller;
    if(Pager===true) Pager = Carousel._Pager;

    let content = (
      <React.Fragment>
        {Controller?<Controller onClick={e=>this.prev()} {...controllerPrevProps}/>:null}
        {Controller?<Controller onClick={e=>this.next()} {...controllerNextProps} isForward/>:null}
        {Pager?<Pager onClick={e=>this.setState({selected: e})} count={children.length} selected={Math.round(selected)} {...pagerItemProps} />:null}
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

Carousel._Controller = aprops=>{
  let {
    isForward, name=aprops.isForward?'right':'left', defaultName=isForward?'>':'<',
    component:Component=Icon, className, ...props
  } = parseProps(aprops, Carousel._Controller.props);

  let classStr = 'bg-color-mask position-absolute text-color-white cursor-pointer margin-h-xxs offset-top-center translate-center-y text-weight-border';
  let classSet = [`offset-${isForward?'right':'left'}-start`];

  return <Component b-size="xl" name={name} defaultName={defaultName} className={classes(classStr, classSet, className)} {...props} />
}

Carousel._Pager = aprops=>{
  let {
    count, selected, onClick, itemProps,
    component:Component=Panel, componnetPanel='ol', className, ...props
  } = parseProps(aprops, Carousel._Pager.props);

  let classStr = 'position-absolute flex-display-block flex-justify-center flex-align-center bg-color-overlay padding-a-xs margin-bottom-xs border-radius-rounded offset-bottom-start offset-left-center translate-center-x';
  
  return (
    <Component component={componnetPanel} className={classes(classStr, className)} {...props}>
      {Array.from({length:count},(v,k)=>k).map(v=>(
        <Carousel._Pager._Item key={v} onClick={onClick} count={count} selected={selected} i={v} {...itemProps} />
      ))}
    </Component>
  );
}

Carousel._Pager._Item = aprops=>{
  let {
    count, selected, i, onClick,
    component:Component=Panel, componnetPanel='li', className, ...props
  } = parseProps(aprops, Carousel._Pager._Item.props);

  let classStr = 'cursor-pointer width-0em5 height-0em5 border-radius-rounded border-set-a-white';
  let classSet = {
    'bg-color-white': i===selected,
    'bg-color-component': i===selected,
    'margin-left-xxs': i>0,
  };

  return <Component component={componnetPanel} onClick={e=>onClick&&onClick(i)} className={classes(classStr, classSet, className)} {...props} />;
}

Carousel.Item = AnimationSlider.Item;


export default Carousel;







