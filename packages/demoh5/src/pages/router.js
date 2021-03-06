import React from 'react';
import NavBar from '../components/navbar'
import List from '../components/list'
import Panel from '@bnorth/components/lib/Panel';


export let ToBlock = props=><h1>该页面被阻塞</h1>
export let BlockTo = ({app})=><div><h1>阻塞后跳转的页面</h1><button onClick={()=>{app.canBLock=false; app.router.restore()}}>解除阻塞</button></div>
 
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
            return <List.Item key={k} title={k} desc={JSON.stringify(v)} />
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
PageInfo.controller={
  _onStart:()=>console.log(1111),
  _onKeyEvent: e=>{return console.log(22222, e)}
}


let Component = props=>{
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
          <List.Item title="阻塞" desc="页面被阻塞" onClick={()=>{app.canBLock=true;app.router.push('toblock')}} />
          <List.Item title="错误地址" desc="跳转到没有配置的路由地址" onClick={()=>app.router.push('noroute')} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="弹出层操作" className="text-weight-bold text-size-lg" />
          <List.Item title="添加弹出层" onClick={()=>app.Poplayer.addPoplayer(
            props=>{return <Panel page bc-offset-a-start bc-margin-a- bc-position-absolute>
              <h1>poplayer</h1>
              <h3>state</h3>
              <div>{JSON.stringify(props.states.stateData,null,2)}</div>
              <button onClick={()=>props.poplayer.stateData.set('count', props.states.stateData.count+1)}>add count</button>
              <button onClick={()=>app.Poplayer.removePoplayer(props._id)}>close</button>
            </Panel>},null,{
              stateData:{initialization: {count:1}}
            })} />
        </List>
      </div>
    </div>
  )
}

Component.controller = app=>({
  onRouteMatch: info=>{
    if(app.canBLock&&info.pageName==='toblock') {
      return ()=>app.router.replace('..','blockto');
    }
  }
})

export default Component;