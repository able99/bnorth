/**
 * @module
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { VariableSizeGrid } from 'react-window';
import BaseComponent from './BaseComponent';
import Panel from './Panel';


export default class GridView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height,
      columnWidth: props.columnWidth,
      rowHeight: props.rowHeight,
    }
  }

  componentDidMount() {
    let {columnCount} = this.props;
    let {width, height, columnWidth, rowHeight} = this.state;
    let state = {};
    let dom = ReactDOM.findDOMNode(this);
    let awidth = dom.clientWidth;

    if(!width||!height) {
      state.width = dom.clientWidth;
      state.height = dom.clientHeight;
    }
    if(!columnWidth) {
      state.columnWidth = ()=>awidth/columnCount;
    }else if(typeof columnWidth==='number') {
      state.columnWidth = ()=>columnWidth;
    }else if(typeof columnWidth==='string'&&columnWidth.endsWith('%')) {
      state.columnWidth = ()=>awidth*Number(columnWidth.slice(0,-1)/100);
    }else if(Array.isArray(columnWidth)) {
      state.columnWidth = index=>(typeof columnWidth[index]==='string'&&columnWidth[index].endsWith('%')?awidth*Number(columnWidth[index].slice(0,-1)/100):columnWidth[index])||(awidth/columnCount);
    }
    if(!rowHeight) {
      dom = dom.firstChild;
      let size = dom.clientHeight;
      state.rowHeight = ()=>size;
    }
    if(!height||!rowHeight||!rowHeight||!columnWidth) this.setState(state);
  }
  
  render() {
    let {
      containerProps, 
      columnCount, rowCount, 
      tag, data, children:Item, ...props
    } = BaseComponent(this.props, GridView);
    let {width, height, columnWidth, rowHeight} = this.state;

    return (
      <Panel {...containerProps}>{!width||!height||!columnWidth||!rowHeight?<Item data={[]} columnIndex={0} rowIndex={0} style={{}} />:(
        <VariableSizeGrid 
          useIsScrolling {...props}
          itemData={tag?{...data, tag}:data} 
          columnCount={columnCount} rowCount={rowCount>=0?rowCount:(data?data.length:0)}
          columnWidth={columnWidth} rowHeight={rowHeight}
          width={width} height={height}>
          {Item}
        </VariableSizeGrid>
      )}</Panel>
    )
  }
}

GridView.defaultProps = {
  columnCount: 1,
}
