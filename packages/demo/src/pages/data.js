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
          <List.Item title="state object" desc={JSON.stringify(stateDataObj)} className="text-weight-bold text-size-lg" />
          <List.Item title="add tick" onClick={()=>page.stateDataObj.set('tick', (stateDataObj.tick||0)+1)} />
          <List.Item title="add tick1" onClick={()=>page.stateDataObj.update({tick1: (stateDataObj.tick1||0)+1})} />
          <List.Item title="add tick1: append:false" onClick={()=>page.stateDataObj.update({tick1: (stateDataObj.tick1||0)+1}, {append: false})} />
          <List.Item title="delete tick1" onClick={()=>page.stateDataObj.delete('tick1')} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="state arr" desc={JSON.stringify(stateDataArr)} className="text-weight-bold text-size-lg" />
          <List.Item title="添加元素" onClick={()=>page.stateDataArr.update([stateDataArr.length])} />
          <List.Item title="添加元素 - append:true" onClick={()=>page.stateDataArr.update([stateDataArr.length], {append:true})} />
          <List.Item title="删除 - 0" onClick={()=>page.stateDataArr.delete(0)} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="state 初始数据与事件" desc={JSON.stringify(stateEvent)} className="text-weight-bold text-size-lg" />
          <List.Item title="添加 tick" onClick={()=>page.stateEvent.set('tick', (stateEvent.tick||0)+1)} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="网络 obj" desc={JSON.stringify(stateNetworkObj)} className="text-weight-bold text-size-lg" />
          <List.Item title="获取" onClick={()=>page.stateNetworkObj.fetch()} />
          <List.Item title="更新 test:1" onClick={()=>page.stateNetworkObj.update({test: 1}, {append:false})} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="网络 arr" desc={JSON.stringify(stateNetworkArr)} className="text-weight-bold text-size-lg" />
          <List.Item title="获取" onClick={()=>page.stateNetworkArr.fetch()} />
          <List.Item title="获取 append:true" onClick={()=>page.stateNetworkArr.fetch({append: true})} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="网络 arr deep" desc={JSON.stringify(stateNetworkArrDeep)} className="text-weight-bold text-size-lg" />
          <List.Item title="获取" onClick={()=>page.stateNetworkArrDeep.fetch()} />
          <List.Item title="获取 append:list" onClick={()=>page.stateNetworkArrDeep.fetch({append: 'list'})} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="有效性校验*" desc={JSON.stringify(stateValidate)} className="text-weight-bold text-size-lg" />
          <List.Item title="add tick" onClick={()=>page.stateValidate.set('tick', (stateValidate.tick||0)+1)} />
          <List.Item title="删除 a" onClick={()=>page.stateValidate.delete('a')} />
        </List>
      </div>
    </div>
  )
}


Component.controller = app=>({
  stateDataObj: { },
  stateDataArr: { initialization: []},

  stateEvent: { initialization: {tick: 10} },
  onStateUpdated_stateEvent: (data, prevData)=>{app.notice.show(`${JSON.stringify(prevData)}->${JSON.stringify(data)}`)},

  stateNetworkObj: {state: app.Request, url: '/test/obj', fetchOnStart: true},
  stateNetworkArr: {state: app.Request, url: '/test/arr', fetchOnStart: true},
  stateNetworkArrDeep: {state: app.Request, url: '/test/arr/deep', fetchOnStart: true},

  stateValidate: {state: app.Validate, initialization: {a: 1}, rules: {a: 'required'} },
});


export default Component;