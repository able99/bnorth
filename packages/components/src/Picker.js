

import React from 'react';
import BaseComponent, { domIsMouse } from './BaseComponent';
import Panel from './Panel';
import NavBar from './NavBar';


export class Picker extends React.Component {
  constructor(props, context) {
    super(props, context);
    let {modal:{indexs}, data} = props;
    this.state = {indexs: indexs||Array.from({length: data.length}, ()=>0)};
  }

  render() {
    const {
      data:adata=[], indexs:_indexs, 
      itemShowCount=5, itemHeight=40, linked, confirm, title, onChange, onCancel, onConfirm,
      modal:{app, _id}, ...props
    } = BaseComponent(this.props, Picker);
    let {indexs} = this.state;
    let data = [...adata];
    data.forEach((v,i,a)=>(typeof v==='function')&&(a[i]=v(indexs, a)))

    return (
      <Panel {...props} >
        {confirm?(
        <NavBar bc-border-set-bottom->
          <NavBar.Item onClick={()=>{onCancel&&onCancel();app.modal.close(_id)}}>取消</NavBar.Item>
          <NavBar.Title bc-text-size-lg>{title||' '}</NavBar.Title>
          <NavBar.Item onClick={()=>{onConfirm&&onConfirm(indexs, data);app.modal.close(_id)}}>确定</NavBar.Item>
        </NavBar>
        ):null}
        <Panel className="flex-display-block flex-align-stretch position-relative user-select-none">
          {data.map((v,i)=>(
            <Picker.Col 
              onChange={index=>{
                indexs[i]=index; indexs=[...indexs]; 
                if(linked) data.forEach((vv,ii)=>ii>i&&(indexs[ii]=0));
                this.setState({indexs}); onChange&&onChange(indexs, data);
              }}
              onClick={!confirm&&(index=>{
                onConfirm&&onConfirm(index, data);
                app.modal.close(_id);
              })}
              itemHeight={itemHeight} itemShowCount={itemShowCount} index={indexs[i]||0} data={v}
              key={i} />
          ))}
          <Panel className="position-absolute width-full border-set-v- bg-none- pointer-events-none bg-color-translucent" bs-top={itemHeight*Math.floor(itemShowCount/2)}  bs-height={itemHeight} />
        </Panel>
      </Panel>
    );
  }
}

Picker.Col = class extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {offset: -props.itemHeight*props.index};
    this._handleStart = this.handleStart.bind(this);
    this._handleMove = this.handleMove.bind(this);
    this._handleEnd = this.handleEnd.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.index !== this.props.index) this.setState({offset: -this.props.itemHeight*this.props.index});
  }

  handleStart(e) {
    this.offset = this.state.offset;
    this.y = domIsMouse?e.clientY:e.touches[0].clientY;
  }

  handleMove(e) {
    if(this.offset===undefined) return;
    this.offsetY = (domIsMouse?e.clientY:e.touches[0].clientY) - this.y;
    let offset = this.offset+this.offsetY;
    this.setState({offset});
  }

  handleEnd(e) {
    let index = -Math.sign(this.state.offset)*Math.round(Math.abs(this.state.offset)/this.props.itemHeight);
    if(index<0) index = 0;
    if(index>=this.props.data.length) index = this.props.data.length-1;
    this.props.onChange&&this.props.onChange(index);
    let offset = -this.props.itemHeight*index;
    this.setState({offset});
    this.offset = undefined;
  }

  render() {
    let {itemHeight, itemShowCount, data, onClick} = this.props;
    let {offset} = this.state;
    let offsetTop = offset%itemHeight;
    let offsetIndex = -Math.sign(offset)*Math.floor(Math.abs(offset)/itemHeight)-Math.floor(itemShowCount/2);
    
    return (
      <Panel 
        {...{[domIsMouse?'onMouseDown':'onTouchStart']:this._handleStart, [domIsMouse?'onMouseMove':'onTouchMove']: this._handleMove, [domIsMouse?'onMouseUp':'onTouchEnd']: this._handleEnd, onTouchCancel: this._handleEnd}}
        bs-height={itemShowCount*itemHeight} className="position-relative flex-sub-flex-extend overflow-a-hidden">
        {Array.from({length: itemShowCount+4}, (v,i)=>i).map((v,i)=>(
          <Panel 
            key={i} onClick={onClick&&(()=>onClick(v+offsetIndex))}
            className="flex-display-block flex-justify-center flex-align-center width-full position-absolute transition-set-- " 
            bs-top={v*itemHeight+offsetTop} bs-height={itemHeight}>
            {data[v+offsetIndex]}
          </Panel>
        ))}
      </Panel>
    )
  }
}


export default {
  _id: 'picker',
  _dependencies: 'modal',
  _onStart(app) {
    app.picker = {
      show: (data, aprops, options)=>{
        let {itemShowCount, itemHeight, linked, confirm, onChange, onCancel, onConfirm, title, ...props} = aprops;
        if(confirm===undefined) confirm = data.length>1;
        let pickerProps = {itemShowCount, itemHeight, linked, confirm, onChange, onCancel, onConfirm, title}
        return app.modal.show(props=><Picker data={data} modal={props} {...pickerProps} />, {...props, type: 'document', 'bp-container-className':'flex-display-block flex-direction-v flex-justify-end'}, options);
      },

      showTime: (time, props, options)=>{
        let data = [
          Array.from({length:24},(v,i)=>String(i).padStart(2, '0')),
          Array.from({length:60},(v,i)=>String(i).padStart(2, '0')),
        ]
        if(!time) {let date = new Date(); time = date.getHours()+':'+date.getMinutes()}
        let times = time.split(':');
        let indexs = [
          times[0]?Number(times[0]):0,
          times[1]?Number(times[1]):0,
        ]
        return app.picker.show(
          data, 
          { 
            indexs, 
            ...props, 
            onConfirm: indexs=>props.onConfirm&&props.onConfirm(data[0][indexs[0]]+':'+data[1][indexs[1]])
          }, 
          options
        );
      },

      showDate: (date, props, options)=>{
        let data = [
          Array.from({length:100},(v,i)=>String(1970+i).padStart(4, '0')),
          Array.from({length:12},(v,i)=>String(i+1).padStart(2, '0')),
          (indexs, data)=>{
            let year = data[0][indexs[0]]; let month = data[1][indexs[1]]; let daycount = 31;
            if(['04', '06', '09', '11'].includes(month)) daycount=30;
            if(month==='02') daycount = (year%4===0)&&(year%100!==0||year%400===0)?29:28;
            return Array.from({length: daycount},(v,i)=>String(i+1).padStart(2, '0'))
          },
        ]
        if(!date) {let adate = new Date(); date = adate.getFullYear()+'-'+adate.getMonth()+'-'+(adate.getDate()-1)}
        let dates = date.split('-');
        let indexs = [
          dates[0]?(Number(dates[0])-data[0][0]):0,
          dates[1]?Number(dates[1]):0,
          dates[2]?Number(dates[2]):0,
        ]
        return app.picker.show(
          data, 
          {
            linked: true, indexs,
            ...props, 
            onConfirm: (indexs,data)=>props.onConfirm&&props.onConfirm(data[0][indexs[0]]+'-'+data[1][indexs[1]]+'-'+data[2][indexs[2]])
          }, 
          options
        );
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