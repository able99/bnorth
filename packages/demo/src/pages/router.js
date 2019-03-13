import React from 'react';
import NavBar from '../components/navbar'
import List from '../components/list'


export let PageInfo = props=>{
  let { app, route } = props;

  return (
    <div className="bg-color-white width-full height-full flex-display-block flex-direction-v">
      <NavBar title="路由展示" onBack={()=>app.router.back()} />
      <div className="scrollable-y- flex-sub-flex-extend">
        <List className="margin-bottom-2x">
          <List.Item title="路由信息" className="text-weight-bold text-size-lg" />
          {Object.entries(route).map(([k,v])=>{
            if(k==='subPageInfos'||k==='popLayerInfos') return null;
            if(k==='subPages') v = Object.keys(v);
            if(k==='popLayers') v = 'popLayers count:' + v.length;
            return <List.Item title={k} desc={JSON.stringify(v)} />
          })}
        </List>
        <List className="margin-bottom-2x">
          <List.Item title="导航" className="text-weight-bold text-size-lg" />
          <List.Item title="push param1=pp1" onClick={()=>app.router.push(['pageinfo', 'pp1'])} />
          <List.Item title="push query:{n:'qq1'}" onClick={()=>app.router.push('pageinfo', {query:{n:'qq1'}})} />
          <List.Item title="push state:{n:'ss1'}" onClick={()=>app.router.push('pageinfo', {state:{n:'ss1'}})} />
        </List>
      </div>
    </div>
  )
}


export default props=>{
  let { app } = props;

  return (
    <div className="bg-color-white width-full height-full flex-display-block flex-direction-v">
      <NavBar title="路由管理展示" onBack={()=>app.router.back()} />
      <div className="scrollable-y- flex-sub-flex-extend">
        <List className="margin-bottom-2x">
          <List.Item title="导航" desc="页面之前跳转" className="text-weight-bold text-size-lg" />
          <List.Item title="push" desc="跳转页面" onClick={()=>app.router.push('pageinfo')} />
          <List.Item title="replace" desc="替换当前页面" onClick={()=>app.router.replace('pageinfo')} />
          <List.Item title="back" desc="返回前一个跳转的页面" onClick={()=>app.router.back()} />
          <List.Item title="pushRoot" desc="跳转到根页面" onClick={()=>app.router.pushRoot()} />
          <List.Item title="error" desc="跳转到错误页面 - mssage:'验证通过',title:'测试错误'" onClick={()=>app.router.error('验证通过','测试错误')} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="导航参数" desc="页面之间传递参数" className="text-weight-bold text-size-lg" />
          <List.Item title="push" desc="页面的参数(页面私用) - param1=p1" onClick={()=>app.router.push(['pageinfo', 'p1'])} />
          <List.Item title="push" desc="地址的参数(页面公用) - query:{n:'q1'}" onClick={()=>app.router.push('pageinfo', {query:{n:'q1'}})} />
          <List.Item title="push" desc="页面的数据(存在内存，刷新后消失) - state:{n:'s1'}" onClick={()=>app.router.push('pageinfo', {state:{n:'s1'}})} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="导航地址" className="text-weight-bold text-size-lg" />
          <List.Item title="getUrl" desc="获取地址 - param1=p1" onClick={()=>alert(app.router.getUrl(['pageinfo', 'p1']))} />
          <List.Item title="getPathName" desc="获取路径 - param1=p1" onClick={()=>alert(app.router.getPathName(['pageinfo', 'p1']))} />
          <List.Item title="getUrl" desc="获取地址 - query:{n:'q1'}" onClick={()=>alert(app.router.getUrl('pageinfo', {query:{n:'q1'}}))} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="特殊处理" className="text-weight-bold text-size-lg" />
          <List.Item title="懒加载" desc="页面文件后加载" onClick={()=>app.router.push(['dynamic', 'dp1'])} />
          <List.Item title="阻塞" desc="TODO" onClick={()=>app.router.push(['dynamic', 'dp1'])} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="弹出层操作" className="text-weight-bold text-size-lg" />
          <List.Item title="添加弹出层 - 内容" onClick={()=>app.router.addPopLayer('弹出层 - 点击关闭')} />
          <List.Item title="添加弹出层 - 组件" onClick={()=>app.router.addPopLayer(props=><div style={{zIndex: 9, position: 'absolute'}} onClick={()=>props.app.router.removePopLayer(props._id)}>弹出层 - 点击关闭</div>)} />
          <List.Item title="添加弹出层 - 状态" onClick={()=>app.router.addPopLayer(props=>{
            console.log(1111111, props); 
            return (
              <div style={{zIndex: 9, position: 'absolute', background: 'lightgray', padding: 8}}>
                弹出层 - 状态 - {JSON.stringify(props.stateData)}
                <div onClick={()=>props.states.stateData.update({tick:props.stateData.tick+1})}>点击更新 tick</div>
                <div onClick={()=>props.app.router.removePopLayer(props._id)}>点击关闭</div>
              </div>
            )
          }, undefined, {data: {initialization: {tick: 1}}})} />
        </List>
      </div>
    </div>
  )
}