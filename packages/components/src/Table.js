/**
 * @module
 */
import React from 'react';
import ReactDOM from 'react-dom';
import classes from '@bnorth/rich.css/lib/classes'; 
import BaseComponent from './BaseComponent';
import Panel from './Panel';
import GridView from './GridView';


export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      height: props.height,
    }
  }

  _getColumeWidth(col, width, cols) {
    if(!col.width) return width/cols.reduce((v1,v2)=>v1+(v2.subs?v2.subs.length:1), 0);
    if(typeof col.width==='function') return col.width(width);
    if(typeof col.width==='string'&&col.width.endsWith('%')) return width?width*Number(col.width.slice(0,-1))/100:col.width;
    if(!Number.isNaN(col.width)) return col.width;
    return 0;
  }

  _getColumeWidthFixed(fixedNum) {
    return Array(fixedNum).fill(0).reduce((v1,v2, i)=>v1+this.colWidthsHeader[i],0);
  }

  componentDidMount() {
    let {cols} = this.props;
    let {width, height} = this.state;
    let state = {};
    let dom = ReactDOM.findDOMNode(this);
    if(!width||!height) {
      state.width = dom.clientWidth;
      state.height = dom.clientHeight;
    }
    
    this.colCells = [];
    this.colWidthsCell = [];
    this.colWidthsHeader = [];
    for(let col of cols) {
      let sum = 0;
      for(let sub of (col.subs||[col])){
        let colWidth = this._getColumeWidth(sub, width, cols);
        this.colWidthsCell.push(colWidth);
        sum += colWidth;
        this.colCells.push(sub);
      }
      this.colWidthsHeader.push(sum);
    }
    this.columnWidthCell = index=>this.colWidthsCell[index];
    this.columnWidthHeader = index=>this.colWidthsHeader[index];
    state.colCells = this.colCells;
    if(!width||!height) this.setState(state);
  }

  handleScroll() {
    let dom = ReactDOM.findDOMNode(this);
    let domMain = dom.childNodes[0].firstChild;
    let domHeader = dom.childNodes[3].firstChild;
    let domFixed = dom.childNodes[2].firstChild;
    domHeader.scrollLeft = domMain.scrollLeft;
    domFixed.scrollTop = domMain.scrollTop;
  }
  
  render() {
    let {
      cols, data, fixedNum,
      rowHeight, headerHeight, 
      onCellClick, cellElementType, cellBorderColor, cellBackground, cellStyle, cellClassName, cellProps, headerElementType, headerBorderColor, headerBackground, headerStyle, headerClassName, headerProps,
      containerProps, children:Item, ...props
    } = BaseComponent(this.props, Table);
    let {width, height} = this.state;

    let classNamePre = 'position-relative ';
    let classNameStrBg = 'bg-color-white ';
    let classNameStrMask = 'position-absolute offset-top-start offset-left-start pointer-events-none ';
    let classNameStrPiece = classNameStrMask + classNameStrBg;
    
    let gridProps, gridPropsHeader, gridPropsCell;
    if(width&&height) {
      gridProps = {
        data: {...this.props, ...this.state},
        width, height,
        rowHeight: index=>index?rowHeight:headerHeight, rowCount: data.length+1,
      }
      gridPropsHeader = {
        ...gridProps,
        height: headerHeight, rowCount: 1, columnCount: cols.length, columnWidth: this.columnWidthHeader,
      }
      gridPropsCell = {
        ...gridProps,
        columnCount: this.colCells.length, columnWidth: this.columnWidthCell,
      }
    }

    let fixedWidth = width&&height?this._getColumeWidthFixed(fixedNum):0;

    return (
      <Panel classNamePre={classNamePre} {...containerProps} {...props}>
        {width&&height?
        <GridView tag="cell" bp-container-className={classNameStrBg} onScroll={()=>this.handleScroll()} {...gridPropsCell}>
          {Item||Table.Cell}
        </GridView>
        :null}

        {width&&height?
        <GridView 
          bp-container-className={classNameStrMask} {...gridPropsCell}
          columnCount={fixedNum}>
          {Item||Table.Cell}
        </GridView>
        :null}

        {fixedNum&&width&&height?
        <GridView 
          tag="fixed" bp-container-className={classNameStrPiece} {...gridPropsCell}
          width={fixedWidth} columnCount={cols.slice(0,fixedNum).reduce((v1, v2)=>v1+(v2.subs?v2.subs.length:1),0)} >
          {Item||Table.Cell}
        </GridView>
        :null}

        {width&&height?
        <GridView tag="header" bp-container-className={classNameStrPiece} {...gridPropsHeader} >
          {Item||Table.Cell}
        </GridView>
        :null}

        {fixedNum&&width&&height?
        <GridView 
          tag="headerFixed" bp-container-className={classNameStrPiece} {...gridPropsHeader}
          width={fixedWidth} columnCount={fixedNum}>
          {Item||Table.Cell}
        </GridView>
        :null}
      </Panel>
    )
  }
}

Table.defaultProps = {
  fixedNum: 0,
  cols: [],
  data: [],
  rowHeight: 40,
  headerHeight: 40, 
  cellElementType: 'div', 
  cellBorderColor: '#e2e2e2', 
  cellBackground: '#none', 
  headerElementType: 'div', 
  headerBorderColor: '#e2e2e2', 
  headerBackground: '#cbcbcb', 
}


Table.Cell = ({ data:cellData, columnIndex, rowIndex, style })=>{
  if(
    (cellData.tag==='cell'&&!rowIndex)||(cellData.tag==='cell'&&columnIndex<cellData.fixedNum)||
    (cellData.tag==='fixed'&&!rowIndex)||
    (cellData.tag==='header'&&columnIndex<cellData.fixedNum)
  ) return null;

  if(cellData.getCellData) cellData = {...cellData, ...cellData.getCellData(columnIndex, rowIndex, cellData)}
  let {
    cols, data, colCells,
    onCellClick,
    cellElementType, cellBorderColor, cellBackground, cellStyle, cellClassName, cellProps,
    headerElementType, headerBorderColor, headerBackground, headerStyle, headerClassName, headerProps,
  } = cellData;

  let isHeader = rowIndex===0;
  let col = isHeader?cols[columnIndex]:colCells[columnIndex];
  let rowData = data[rowIndex-1];
  let Component = isHeader?(col.headerElementType||headerElementType):(col.cellElementType||cellElementType);
  let styles = {
    ...style, 
    padding: 8, 
    borderBottom: '1px solid '+(isHeader?(col.headerBorderColor||headerBorderColor):(col.cellBorderColor||cellBorderColor)), borderRight: '1px solid '+(isHeader?(col.headerBorderColor||headerBorderColor):(col.cellBorderColor||cellBorderColor)), 
    background: (isHeader?(col.headerBackground||headerBackground):(col.cellBackground||cellBackground)),
    ...(isHeader?headerStyle:cellStyle),
    ...(isHeader?col.headerStyle:col.cellStyle),
  }
  let className = isHeader?classes('flex-display-block flex-align-center flex-justify-center text-align-center overflow-hidden line-height-1', headerClassName, col.headerClassName):classes('display-tablecell text-truncate- ', cellClassName, col.cellClassName);
  let props = isHeader?headerProps:cellProps;
  let propsCell = isHeader?col.headerProps:col.cellProps;
  let children = isHeader?(col.name||col.code):(rowData[col.code]);
  if(isHeader&&col.headerChildren) children = col.headerChildren(children, columnIndex, rowIndex, data, cols);
  if(col.cellChildren) children = col.cellChildren(children, columnIndex, rowIndex, data, cols);
  let onClick = onCellClick&&(()=>onCellClick(columnIndex, rowIndex, data, cols));

  return <Component style={styles} className={className} onClick={onClick} {...props} {...propsCell}>{children}</Component>
}