/**
 * @module
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { VariableSizeList } from 'react-window';
import BaseComponent from './BaseComponent';
import Panel from './Panel';


export default class ListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.height,
      itemSize: props.itemSize,
    }
  }

  componentDidMount() {
    let {height, itemSize} = this.state;
    let state = {};
    let dom = ReactDOM.findDOMNode(this);
    if(!height) {
      state.height = dom.clientHeight;
    }
    if(!itemSize) {
      dom = dom.firstChild;
      let size = dom.clientHeight;
      state.itemSize = ()=>size;
    }
    if(!height||!itemSize) this.setState(state);
  }
  
  render() {
    let {containerProps, itemCount, data, children:Item, ...props} = BaseComponent(this.props, ListView);
    let {height, itemSize} = this.state;

    return (
      <Panel {...containerProps}>{!height||!itemSize?<Item data={[]} index={0} style={{}} />:(
        <VariableSizeList 
          useIsScrolling
          itemData={data} itemCount={itemCount>=0?itemCount:(data?data.length:0)}
          {...props}
          height={height} itemSize={itemSize} >
          {Item}
        </VariableSizeList>
      )}</Panel>
    )
  }
}

