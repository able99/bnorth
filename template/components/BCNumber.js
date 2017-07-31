import React from 'react';
import PropTypes from 'prop-types';
import { Button,Field } from '../bnorth/';

export default class NumberComponent extends React.Component{
  static propTypes = {
    number: PropTypes.number,
    defaultNumber: PropTypes.number,
  }

  static defaultProps = {
    number: null,
    defaultNumber: 0,
  }

  constructor(props) {
    super(props);
    this.state = {
      number: props.number||props.defaultNumber||NumberComponent.defaultProps.defaultNumber,
    };
  }

  setNumber(number){
    number = isNaN(number)?0:number;
    number = Math.max(number,0);
    number = Math.min(number,999);

    if(this.props.onNumberChange)this.props.onNumberChange(number);
    return this.props.number||number;
  }

  render() {
    return (
      <Field
        onClick={this.props.onClick||((e)=>{e.stopPropagation()})}
        type="tel"
        className="text-align-center border-none border-h padding-xs layout-size-width-auto-35 layout-size-min-width-35"
        btnBefore={
          <Button 
            onClick={(e)=>{e.stopPropagation();this.setState({number:this.setNumber((this.props.number||this.state.number)-1)})}} 
            className="padding-h" plain
            >-</Button>
        }
        btnAfter={
          <Button 
            onClick={(e)=>{e.stopPropagation();this.setState({number:this.setNumber((this.props.number||this.state.number)+1)})}} 
            className="padding-h" plain
            >+</Button>}
        value={this.props.number||this.state.number}
        onChange={(e)=>{this.setState({number:this.setNumber(e.target.value)})}}
        containerClassName="border margin-0" />
    )
  }
}