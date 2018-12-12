/**
 * @overview bnorth solution
 * @copyright (c) 2016 able99
 * @author able99 (8846755@qq.com)
 * @license MIT
 */

import React from 'react';
import classes from '@bnorth/rich.css/lib/classes'; 
import { transform } from '@bnorth/rich.css/lib/styles/animation';
import { domFindNode, domOffset } from './utils/dom';
import parseProps from './utils/props';
import Panel from './Panel.Touchable';
import Button from './Button';


export class Picker extends React.Component {
  static defaultProps = {
    lineCount: 5,
    data: [],
    index: [],
  }

  constructor(props, context) {
    super(props, context);
    let { data, index, onInit } = props;
    index = this._parseData(index, data, true);
    this.state = {index, itemSize: 0};
    onInit&&onInit(this._parseIndex(index, this.data));
  }

  _parseIndex(index, data) {
    return index.map((v,i)=>data[i][v]);
  }

  _parseData(index, data, parseIndex) {
    this.data = [];
    let aindex = parseIndex?[]:index;

    data.forEach((v,i)=>{
      if(typeof v==='function') v = v(i, this.data, aindex);

      if(i===0) {
        v = v||[];
      }else {
        v = v.filter(vv=>{
          if(!vv) return false;
          if(typeof vv !== 'object' || vv.pid===undefined|| vv.pid===null) return true;
          let pobj = this.data[i-1][aindex[i-1]||0];
          return pobj&&vv.pid===(pobj.id||pobj.name);
        });
      }

      if(parseIndex) aindex[i] = index[i]?Math.max(v.findIndex(vv=>typeof vv==='object'?(vv.id||vv.name)===index[i]:vv===index[i]),0):0;
      this.data[i] = v;
    })

    return aindex;
  }

  _handleChange(i, colIndex, index, data) {
    let { onChange, data:originData } = this.props;
    index = [...index];

    index[i] = colIndex;
    for(let ii=i+1; ii<data.length; ii++) {
      if(data[ii][0]&&(typeof data[ii][0]==='object')&&(data[ii][0].pid!==null)&&(data[ii][0].pid!==undefined)) index[ii] = 0;
    }
    
    this._parseData(index, originData);
    for(let ii=0; ii<data.length; ii++) {
      if(index[ii]<0) index[ii] = 0;
      if(index[ii]>=this.data[ii].length) {index[ii] = this.data[ii].length - 1}
    }

    if(onChange&&onChange(this._parseIndex(index, this.data)) === false) {
      this.setState({})
    }else{
      this.setState({index})
    }
  }

  render() {
    const {
      lineCount, data, onInit, onChange, index:_index,
      component:Component=Panel, componentPanel, className, ...props
    } = parseProps(this.props, Picker.props);
    const { index, itemSize } = this.state;

    let classStr = 'flex-display-block  overflow-y-hidden';

    return (
      <Component component={componentPanel} className={classes(classStr, className)} {...props} >
        {data.map((v,i)=>(
          <Picker._Col 
            data={this.data[i].map(v=>typeof v==='object'?v.name:v)} 
            onChange={e=>this._handleChange(i, e, index, this.data)} onSize={i===0&&(e=>this.setState({itemSize: e}))}
            key={i} lineCount={lineCount} index={index[i]||0} />
        ))}
        <Picker._Line lineCount={lineCount} itemSize={itemSize} />
      </Component>
    );
  }
}

Picker._Line = aprops=>{
  const {
    itemSize, lineCount,
    component:Component=Panel, componentPanel, className, style, ...props
  } = parseProps(aprops, Picker._Line.props);

  let classStr = 'border-set-v- position-absolute width-full pointer-events-none';
  let styleSet = { top: Math.floor(lineCount/2)*itemSize, height: itemSize, ...style};

  return <Component className={classes(classStr, className)} style={styleSet} {...props} />
}

Picker._Col = class extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {offset: 0};
  }

  componentDidMount() {
    let el = domFindNode(this);
    this.itemSize = el&&el.children[0]&&el.children[0].children&&domOffset(el.children[0].children[0]).height;
    this.props.onSize&&this.props.onSize(this.itemSize);
  }

  handleMove(event, target) {
    this.setState({offset: event.deltaY});
    event.preventDefault();
  }

  handleEnd(event, target) {
    let { data, index, onChange } = this.props;
    let indexChange = this.props.index+Math.round(-event.deltaY / this.itemSize);
    indexChange = Math.max(indexChange, 0);
    indexChange = Math.min(indexChange, data.length-1);
    if(indexChange!==index&&onChange) onChange(indexChange);
    this.setState({offset: 0});
    event.preventDefault();
  }

  render() {
    const {
      data=[], index, lineCount, onSize,
      component:Component=Panel.Touchable, componentPanel, className, ...props
    } = parseProps(this.props, Picker._Col.props);
    const { offset } = this.state;
    if(!data.length) data.push(' ');

    let translateY = `${(this.itemSize*(Math.floor(lineCount/2)-index))+offset}px`;
    let classStr = 'flex-sub-flex-extend transition-set- overflow-a-hidden';

    return (
      <Component component={componentPanel} 
        direction="vertical" onPan={this.handleMove.bind(this)} onPanCancel={(el,e)=>this.handleEnd(el,e)} onPanEnd={(el,e)=>this.handleEnd(el,e)}
        bs-height={this.itemSize*lineCount} 
        className={classes(classStr, className)} {...props}>
        <Panel style={transform('translateY', translateY)}>
          {data.map((v,i)=><Picker._Item key={i} selected={i===index}>{v}</Picker._Item>)}
        </Panel>
      </Component>
    );
  }
}

Picker._Item = aprops=>{
  const {
    selected,
    component:Component=Panel, componentPanel, className, children, ...props
  } = parseProps(aprops, Picker._Item.props);

  let classStr = 'padding-a- text-align-center width-full';

  return (
    <Component component={componentPanel} 
      b-theme={!selected&&'light'} 
      className={classes(classStr, className)} {...props}>
      <Panel className="text-truncate-1-placeholder">{children}</Panel>
    </Component>
  );
}


export default {
  pluginName: 'picker',
  pluginDependence: ['modal'],

  onPluginMount(app) {
    app.picker = {
      show: (data, {index, lineCount, title, hasTitleClose, onChange, onConfirm, onCancel, ...props}={})=>{
        let indexChange = [];

        let _id = app.modal.show((
          <Panel className="bg-color-white" onClick={e=>e.stopPropagation()}>
            <Panel className="flex-display-block flex-justify-between flex-align-center border-set-bottom- padding-a-xs">
              <Button b-theme="link" b-style="plain" onClick={()=>{onCancel&&onCancel();app.picker.close(_id)}}>取消</Button>
              <Panel bc-text-weigth="bold">{title}</Panel>
              <Button 
                b-theme="link" b-style="plain" 
                onClick={()=>{
                  if(onConfirm&&onConfirm(indexChange.map(v=>typeof v==='object'?(v.id||v.name):v), indexChange)===false) return;
                  app.picker.close(_id)
                }}>
                确定
              </Button>
            </Panel>
            <Picker 
              data={data} index={index} lineCount={lineCount} 
              onInit={e=>indexChange=e}
              onChange={e=>{indexChange=e; return onChange&&onChange(indexChange)}} />
          </Panel>
        ), {
          role: 'document',
          containerProps: {
            className: 'flex-display-block flex-justify-end flex-direction-v flex-align-stretch',
          },
          ...props
        });
      },

      time: (index, {onChange, onConfirm, ...props}={})=>{
        let data = [
          Array.from(Array(24), (v,i)=>String(i).padStart(2,'0')),
          Array.from(Array(60), (v,i)=>String(i).padStart(2,'0')),
        ]
        if(index && index.split(':').length===2) props.index = index.split(':');
        if(onChange) props.onChange = e=>onChange(e&&`${e[0]}:${e[1]}`);
        if(onConfirm) props.onConfirm = e=>onConfirm(e&&`${e[0]}:${e[1]}`);

        app.picker.show(data, props);
      },

      date: (index, {year, yearCount=50, onChange, onConfirm, ...props}={})=>{
        let date = new Date(); 
        year = year||(date.getFullYear()-yearCount+2);
        let data = [
          ()=>Array.from(Array(yearCount), (v,i)=>String(year+i).padStart(4,'0')),
          ()=>Array.from(Array(12), (v,i)=>String(i+1).padStart(2,'0')),
          (i, data, index)=>{
            let daycount = 31;
            let year = data[0][index[0]];
            let month = data[1][index[1]];
            if(['04', '06', '09', '11'].includes(month)) daycount=30;
            if(month==='02') daycount = (year%4===0)&&(year%100!==0||year%400===0)?29:28;
            return Array.from(Array(daycount), (v,i)=>String(i+1).padStart(2,'0'));
          },
        ]
        
        if(!index) index=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        if(index && index.split('-').length===3) props.index = index.split('-');
        if(onChange) props.onChange = e=>onChange(e&&`${e[0]}-${e[1]}-${e[2]}`);
        if(onConfirm) props.onConfirm = e=>onConfirm(e&&`${e[0]}-${e[1]}-${e[2]}`);

        app.picker.show(data, props);
      },

      datetime: (index, {onChange, onConfirm, ...props}={})=>{
        let data = [
          ()=>Array.from(Array(100), (v,i)=>String(1950+i).padStart(4,'0')),
          ()=>Array.from(Array(12), (v,i)=>String(i+1).padStart(2,'0')),
          ()=>Array.from(Array(31), (v,i)=>String(i+1).padStart(2,'0')),
          Array.from(Array(24), (v,i)=>String(i).padStart(2,'0')),
          Array.from(Array(60), (v,i)=>String(i).padStart(2,'0')),
        ]
        if(index && index.split(':').length) props.index = index.split(':');
        if(onChange) props.onChange = e=>onChange(e&&`${e[0]}:${e[1]}`);
        if(onConfirm) props.onConfirm = e=>onConfirm(e&&`${e[0]}:${e[1]}`);

        app.picker.show(data, props);
      },
      
      close: _id=>{
        app.modal.close(_id);
      },
    };
  },

  onPluginUnmount(app) {
    delete app.picker;
  },
}