import React, { cloneElement } from 'react'
import { listen, createChainedFunction } from '../utils/event';
import { domIsTouch, domIsMouse } from '../utils/dom';
import hocHelper from '../utils/hocHelper';


export default class Activable extends React.Component {
  constructor (props) {
    super(props);
    this.state = {active:false};
  }

  getBindMethod = (aprops) => {
    if (domIsTouch) {
      let { onTouchStart, ...props } = aprops;
      return { onTouchStart: createChainedFunction(this.down, onTouchStart), ...props }
    } else if (domIsMouse) {
      let { onMouseDown, ...props } = aprops;
      return { onMouseDown: createChainedFunction(this.down, onMouseDown), ...props }
    }
    return aprops;
  }

  down = (event)=>{
    if(domIsTouch) {
      this.setState({active:true});

      let lisener = listen( event.target, 'touchend', ()=>{
        this.setState({active:false});
        lisener();
      });
    }else if (domIsMouse) {
      if(!(event.buttons&1)) return;
      this.setState({active:true});

      let lisener = listen( event.target, 'mouseup', ()=>{
        this.setState({active:false});
        lisener();
        lisener1();
      });
      let lisener1 = listen( document, 'mouseup', ()=>{
        this.setState({active:false});
        lisener();
        lisener1(); 
      });
    }
  }

  up = ()=>{
    this.setState({active:false});
  }

  render () {
    const { children } = this.props;
    const clonedChildren = cloneElement(children, this.getBindMethod(this.props));

    return clonedChildren;
  }
}


export const activable = WrappedComponent => {
  class EnhancedComponent extends Activable {
    render () {
      const { active:activeProps } = this.props;
      const { active:activeState } = this.state;
      return <WrappedComponent {...this.getBindMethod(this.props)} active={activeProps===undefined?activeState:activeProps} />
    }
  }

  return hocHelper(WrappedComponent, EnhancedComponent, 'Activable');
}