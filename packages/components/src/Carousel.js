/**
 * bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */


import React from 'react';
import { genCommonProps, cx } from './utils/props';
import AnimationSlider from './AnimationSlider';
import Panel from './Panel';
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
      className, children, ...props
    } = this.props;
    let { index } = this.state;
    children = React.Children.toArray(children);


    let classSet = {
      'overflow-a-hidden': true,
    }
    

    return (
      <Panel.Touchable 
        component={AnimationSlider} className={cx(classSet, className)} 
        index={index} onSwipeLeft={e=>this.next()} onSwipeRight={e=>this.prev()} onFocus={e=>this.handleFocus()} onBlur={e=>this.handleBlur()}
        {...props}>
        {children}
        {pager?<Carousel.Pager onTap={e=>this.setState({index: e})} count={children.length} index={Math.round(index)} {...pagerItemProps} />:null}
        {controller?<Carousel.Controller onTap={e=>this.prev()} {...controllerPrevProps}/>:null}
        {controller?<Carousel.Controller onTap={e=>this.next()} {...controllerNextProps} isForward/>:null}
      </Panel.Touchable>
    );
  }
}

Carousel.Item = AnimationSlider.Item;

Carousel.Controller = aprops=>{
  let {
    isForward,
    component, name=aprops.isForward?'right':'left', style, className, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'bg-color-mask': true,
    'position-absolute': true,
    'text-color-white': true,
    'cursor-pointer': true,
    'padding': true,
    'translate-center-y': true,
    'text-weight-border': true,
    'corsor-pointer': true,
  };
  
  let styleSet = {
    top: '50%',
    [isForward?'right':'left']: 0,
    ...style,
  };


  return (
    <Panel.Touchable style={styleSet} className={cx(classSet, className)} {...props}>
      {component||<Icon name={Icon.getName(name, isForward?'>':'<')} />}
    </Panel.Touchable>
  )
}

Carousel.Pager = aprops=>{
  let {
    count, index, onTap, itemProps,
    component:Component='ol', style, className, ...props
  } = genCommonProps(aprops);


  let classSet = {
    'position-absolute': true,
    'flex-display-flex': true,
    'flex-justify-center': true,
    'flex-align-center': true,
    'bg-color-overlay': true,
    'padding-xs': true,
    'border-radius-rounded': true,
    'translate-center-x': true,
  };

  let styleSet = {
    left: '50%',
    bottom: '3%',
    ...style,
  };
  
  
  return (
    <Component style={styleSet} className={cx(classSet, className)} {...props}>
      {Array(count).fill(0).map((v,i)=>
        <Carousel.Pager.Item key={i} onTap={onTap} count={count} index={index} i={i} {...itemProps}/>
      )}
    </Component>
  );
}

Carousel.Pager.Item = aprops=>{
  let {
    count, index, i, onTap,
    component='li', className, ...props
  } = aprops;


  let classSet = {
    'cursor-pointer': true,
    'margin-left-xxs': i>0,
    'width-em-0-5': true,
    'height-em-0-5': true,
    'border-radius-rounded': true,
    'border-set-white': true,
    'bg-color-white': i===index,
    'bg-color-component': i===index,
  };


  return <Panel.Touchable onTap={e=>onTap&&onTap(i)} component={component} className={cx(classSet, className)} {...props} />;
}


export default Carousel;







