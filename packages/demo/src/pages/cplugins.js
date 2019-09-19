import React from 'react';
import NavBar from '../components/navbar'
import List from '../components/list'


export default props=>{
  let { app, page, stateData } = props;

  return (
    <div className="bg-color-white width-full height-full flex-display-block flex-direction-v">
      <NavBar title="组件插件列表" onBack={()=>app.router.back()} />
      <div className="scrollable-y- flex-sub-flex-extend">
        <List className="margin-bottom-2x">
          <List.Item title="modal" desc="模态对话框" className="text-weight-bold text-size-lg" />
          <List.Item title="打开" onClick={()=>app.modal.show('modal')} />
          <List.Item title="打开 alert" onClick={()=>app.modal.show('modal', {type: 'alert', onAction: index=>{index>=0&&alert('ok')}})} />
          <List.Item title="打开 prompt" onClick={()=>app.modal.show('modal', {type: 'prompt', onAction: index=>{index>0&&alert('ok')}})} />
          <List.Item title="打开 popup" onClick={()=>app.modal.show('modal', {type: 'popup', })} />
          <List.Item title="打开 带 title 带 close" onClick={()=>app.modal.show('modal', {title: 'title', close: true})} />
          <List.Item title="打开 带状态数据" onClick={()=>app.modal.show(
            props=>(
              <div>
                弹出层 - 状态 - {JSON.stringify(props.stateData)}
                <div onClick={()=>props.poplayer.stateData.update({tick:props.states.stateData.tick+1})}>点击更新 tick</div>
                <div onClick={()=>props.app.modal.close(props._id)}>点击关闭</div>
              </div>
            ), {
              close: true, title: 'title',
            }, {
              props: (app, _id)=>({
                onAction: ()=>{alert(app.Poplayer.getPoplayer(_id).stateData.data().tick)},
              }),
              options: (app, _id)=>({
                stateData: {initialization: {tick: 1}, _onStateUpdated:data=>app.Poplayer.addPoplayer(null, {title: data.tick}, {_id})},
              }),
            })} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="notice" desc="消息通知" className="text-weight-bold text-size-lg" />
          <List.Item title="打开" onClick={()=>app.notice.show('notice')} />
          <List.Item title="关闭" onClick={()=>app.notice.close()} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="mask" desc="蒙层" className="text-weight-bold text-size-lg" />
          <List.Item title="打开" onClick={()=>{app.mask.show('3秒后关闭');window.setTimeout(()=>app.mask.close(), 3000)}} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="loader" desc="加载指示器" className="text-weight-bold text-size-lg" />
          <List.Item title="打开 可多次点击" onClick={()=>app.loader.show()} />
          <List.Item title="关闭 需多次关闭" onClick={()=>app.loader.close()} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="picker" desc="选择器" className="text-weight-bold text-size-lg" />
          <List.Item title="单选" desc={'='+stateData.picker} onClick={()=>app.picker.show([Array.from({length: 1000}, (v,i)=>i)], {onConfirm: (index,data)=>page.stateData.set('picker', data[0][index])})} />
          <List.Item title="时间" desc={'='+stateData.pickerTime} onClick={()=>app.picker.showTime(stateData.pickerTime, {onConfirm: data=>page.stateData.set('pickerTime', data)})} />
          <List.Item title="日期" desc={'='+stateData.pickerDate} onClick={()=>app.picker.showDate(stateData.pickerDate, {onConfirm: data=>page.stateData.set('pickerDate', data)})} />
        </List>
      </div>
    </div>
  )
}