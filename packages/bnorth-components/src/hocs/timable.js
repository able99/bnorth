import React from 'react'
import hocHelper from '../utils/hocHelper';


export const timable = (WrappedComponent,options={}) => {
  class EnhancedComponent extends React.Component {
    static defaultProps = {
      defaultSum: 0,
      autoStart: true,
      intervalTime: 1000,
      timeout: null,
      random: true,
      autoStop: true,
      isClose: false,
    };
  
    constructor(props) {
      super(props);
      this.state = {
        sum: this.props.defaultSum||0,
        isOver: false,
      };
    }

    increase(value) {
      let sum = this.state.sum;
      sum += value?value:(this.props.random?(Math.random()*this.props.intervalTime):this.props.intervalTime);
      let isOver = this.props.autoStop?this.props.timeout&&sum>this.props.timeout:this.props.isClose;

      this.setState({ sum, isOver });
      if(isOver) this.stop();
    }

    start() {
      this.interval = setInterval(this.increase.bind(this), this.props.intervalTime);
    }

    stop() {
      if (this.interval) clearInterval(this.interval);
    }

    full() {
      let sum = this.state.sum;
      this.increase(this.props.timeout-sum);
    }

    reset() {
      this.setState({ 
        sum:0, 
        isOver:false,
      });
    }
  
    componentDidMount = () => {
      if(this.props.autoStart) this.start();
    };
  
    componentWillUnmount = () => {
      this.stop();
    };

    componentDidUpdate(nextProps) {
      if(!this.props.isClose&&nextProps.isClose) {
        this.full();
      }
    }

    render() {
      let { defaultSum, autoStart, autoStop, isClose, random, ...props } = this.props;
      return <WrappedComponent {...props} {...this.state} />
    }
  }

  return hocHelper(WrappedComponent, EnhancedComponent, options, 'Timable');
}