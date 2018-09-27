/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import { genCommonProps, cxm } from './utils/props';
import AnimationSlider from './AnimationSlider';
import Panel from './Panel.Touchable';
import Icon from './Icon';


class Carousel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      index: props.defaultIndex||0,
      isForward: undefined, 
    }
  }

  prev() {
    let index = this.state.index-1;
    this.setState({ isForward: false, index: index>=0?index:(React.Children.toArray(this.props.children).filter(v=>v).length-1)});
    this.goNext();
  }

  next() {
    this.setState({ isForward: true, index: (this.state.index+1)%(React.Children.toArray(this.props.children).filter(v=>v).length)});
    this.goNext();
  }

  pause() {
    this._isPaused = true;
    if(this._timeout) { clearTimeout(this._timeout); this._timeout = undefined; }
  }

  play() {
    this._isPaused = false;
    this.goNext();
  }

  goNext() {
    let { autoPlay=true, interval=4000 } = this.props;
    if(this._timeout) { clearTimeout(this._timeout); this._timeout = undefined; }
    if (autoPlay && !this._isPaused && interval) this._timeout = setTimeout(()=>this.next(), interval);
  }

  handleFocus() {
    let { pauseOnHover } = this.props;
    if (pauseOnHover) {
      this.pause();
      this.setState({mouseOver:true});
    }
  }

  handleBlur() {
    if (this._isPaused) {
      this.play();
      this.setState({mouseOver:false});
    }
  }

  componentDidMount() {
    let { autoPlay=true } = this.props;
    autoPlay && this.goNext();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.interval !== this.props.interval) this.goNext();
  }

  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  render() {
    let {
      defaultIndex, controller=true, pager=true, interval, timeout, autoPlay, loop, pauseOnHover,
      pagerItemProps, controllerPrevProps, controllerNextProps,
      component:Component=Panel.Touchable, componentAnimation=AnimationSlider, children, ...props
    } = genCommonProps(this.props);
    let { index } = this.state;
    children = React.Children.toArray(children);

    return (
      <Component
        component={componentAnimation}  
        index={index} onSwipeLeft={e=>this.next()} onSwipeRight={e=>this.prev()} onFocus={e=>this.handleFocus()} onBlur={e=>this.handleBlur()}
        {...props}>
        {controller?<Carousel.Controller onClick={e=>this.prev()} {...controllerPrevProps}/>:null}
        {controller?<Carousel.Controller onClick={e=>this.next()} {...controllerNextProps} isForward/>:null}
        {pager?<Carousel.Pager onClick={e=>this.setState({index: e})} count={children.length} index={Math.round(index)} {...pagerItemProps} />:null}
        {children}
      </Component>
    );
  }
}

Carousel.Controller = aprops=>{
  let {
    isForward, name=aprops.isForward?'right':'left', nameDefault=isForward?'>':'<',
    component:Component=Icon, className, ...props
  } = genCommonProps(aprops);

  let classStr = 'bg-color-mask position-absolute text-color-white cursor-pointer margin-h-xxs offset-top-center translate-center-y text-weight-border';
  let classSet = [`offset-${isForward?'right':'left'}-start`];

  return <Component b-size="xl" className={cxm(classStr, classSet, className)} name={name} nameDefault={nameDefault} {...props} />
}

Carousel.Pager = aprops=>{
  let {
    count, index, onClick, itemProps,
    component:Component=Panel, componnetPanel='ol', className, ...props
  } = genCommonProps(aprops);

  let classStr = 'position-absolute flex-display-block flex-justify-center flex-align-center bg-color-overlay padding-a-xs margin-bottom-xs border-radius-rounded offset-bottom-start offset-left-center translate-center-x';
  
  return (
    <Component component={componnetPanel} className={cxm(classStr, className)} {...props}>
      {Array
        .from({length:count},(v,k)=>k)
        .map(v=><Carousel.Pager.Item key={v} onClick={onClick} count={count} index={index} i={v} {...itemProps}/>)
      }
    </Component>
  );
}

Carousel.Pager.Item = aprops=>{
  let {
    count, index, i, onClick,
    component:Component=Panel, componnetPanel='li', className, ...props
  } = genCommonProps(aprops);

  let classStr = 'cursor-pointer width-0em5 height-0em5 border-radius-rounded border-set-a-white';
  let classSet = {
    'bg-color-white': i===index,
    'bg-color-component': i===index,
    'margin-left-xxs': i>0,
  };

  return <Component onClick={e=>onClick&&onClick(i)} component={componnetPanel} className={cxm(classStr, classSet, className)} {...props} />;
}

Carousel.Item = AnimationSlider.Item;


export default Carousel;







