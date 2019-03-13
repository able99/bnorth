import React from 'react';
import NavBar from '../components/navbar'
import List from '../components/list'


let Component = props=>{
  let { app, page, stateDataObj, stateDataArr, stateEvent, stateNetworkObj, stateNetworkArr, stateNetworkArrDeep, stateValidate } = props;

  return (
    <div className="bg-color-white width-full height-full flex-display-block flex-direction-v">
      <NavBar title="数据管理展示" onBack={()=>app.router.back()} />
      <div className="scrollable-y- flex-sub-flex-extend">
        <List className="margin-bottom-2x">
          <List.Item title="状态数据 - 对象数据" desc={JSON.stringify(stateDataObj)} className="text-weight-bold text-size-lg" />
          <List.Item title="add tick" desc="增加一个计数" onClick={()=>page.stateDataObj.set('tick', (stateDataObj.tick||0)+1)} />
          <List.Item title="add tick1" desc="增加另一个计数"  onClick={()=>page.stateDataObj.update({tick1: (stateDataObj.tick1||0)+1})} />
          <List.Item title="add tick1: append:false" desc="增加另一个计数，但是不合并数据" onClick={()=>page.stateDataObj.update({tick1: (stateDataObj.tick1||0)+1}, {append: false})} />
          <List.Item title="delete tick1" desc="删除另一个计数" onClick={()=>page.stateDataObj.delete('tick1')} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="状态数据 - 数组数据" desc={JSON.stringify(stateDataArr)} className="text-weight-bold text-size-lg" />
          <List.Item title="添加元素" onClick={()=>page.stateDataArr.update([stateDataArr.length])} />
          <List.Item title="添加元素 - append:true" desc="增加元素，采用合并方式" onClick={()=>page.stateDataArr.update([stateDataArr.length], {append:true})} />
          <List.Item title="删除元素" desc="删除第一个元素" onClick={()=>page.stateDataArr.delete(0)} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="状态数据 - 具有初始数据和增加了状态事件" desc={JSON.stringify(stateEvent)} className="text-weight-bold text-size-lg" />
          <List.Item title="add tick" desc="增加一个计数" onClick={()=>page.stateEvent.set('tick', (stateEvent.tick||0)+1)} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="网络数据 - 对象数据" desc={JSON.stringify(stateNetworkObj)} className="text-weight-bold text-size-lg" />
          <List.Item title="获取" desc="从网络获取" onClick={()=>page.stateNetworkObj.fetch()} />
          <List.Item title="更新" desc="手动修改数据 {test:1}" onClick={()=>page.stateNetworkObj.update({test: 1}, {append:false})} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="网络数据 - 数组数据" desc={JSON.stringify(stateNetworkArr)} className="text-weight-bold text-size-lg" />
          <List.Item title="获取" desc="从网络获取" onClick={()=>page.stateNetworkArr.fetch()} />
          <List.Item title="获取" desc="从网络获取，并设置为追加方式" onClick={()=>page.stateNetworkArr.fetch({append: true})} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="网络数据 - 对象里面嵌套数组" desc={JSON.stringify(stateNetworkArrDeep)} className="text-weight-bold text-size-lg" />
          <List.Item title="获取" desc="从网络获取" onClick={()=>page.stateNetworkArrDeep.fetch()} />
          <List.Item title="获取" desc="从网络获取，并且设置追加方式指向 list 字段" onClick={()=>page.stateNetworkArrDeep.fetch({append: 'list'})} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="有效性校验 - TODO" desc={JSON.stringify(stateValidate)} className="text-weight-bold text-size-lg" />
        </List>
      </div>
    </div>
  )
}


Component.controller = app=>({
  stateDataObj: { },
  stateDataArr: { initialization: []},

  stateEvent: { initialization: {tick: 10} },
  onStateUpdated_stateEvent: (data, prevData)=>{app.notice.show(`状态改变事件:${JSON.stringify(prevData)}->${JSON.stringify(data)}`)},

  stateNetworkObj: {state: app.Request, url: '/test/obj', fetchOnStart: true},
  stateNetworkArr: {state: app.Request, url: '/test/arr', fetchOnStart: true},
  stateNetworkArrDeep: {state: app.Request, url: '/test/arr/deep', fetchOnStart: true},

  stateValidate: {state: app.Validate, initialization: {a: 1}, rules: {a: 'required'} },
});


export default Component;