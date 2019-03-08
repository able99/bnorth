import React from 'react';
import NavBar from '../components/navbar'
import List from '../components/list'


export let PageInfo = props=>{
  let { app, route } = props;

  return (
    <div className="scrollable-y- padding-a-">
      <h3><button onClick={()=>app.router.back()}>back</button>page info</h3>
      <hr />
      {Object.entries(route).map(([k,v])=>{
        if(k==='subPageInfos'||k==='popLayerInfos') return null;
        if(k==='subPages') return <div>subPages: {Object.keys(v)}</div>;
        if(k==='popLayers') return <div>popLayers count: {v.length}</div>;
        return <div>{k}: {JSON.stringify(v)}</div>;
      })}
      <hr />
      <div className="margin-top-">
        <h4>navigator</h4>
        <button className="padding-a-xxs margin-bottom-" onClick={()=>app.router.push(['pageinfo', 'pp1'])}>push pageinfo pp1</button>
        <button className="padding-a-xxs margin-bottom-" onClick={()=>app.router.push('pageinfo', {query:{a:'qq1'}})}>push pageinfo query:|a:qq1</button>
        <button className="padding-a-xxs margin-bottom-" onClick={()=>app.router.push('pageinfo', {state:{a:'ss1'}})}>push pageinfo state:|a:ss1</button>
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
          <List.Item title="导航" className="text-weight-bold text-size-lg" />
          <List.Item title="push" onClick={()=>app.router.push('pageinfo')} />
          <List.Item title="replace" onClick={()=>app.router.replace('pageinfo')} />
          <List.Item title="back" onClick={()=>app.router.back()} />
          <List.Item title="pushRoot" onClick={()=>app.router.pushRoot()} />
          <List.Item title="error" desc="mssage:'验证通过',title:'测试错误'" onClick={()=>app.router.error('验证通过','测试错误')} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="导航参数" className="text-weight-bold text-size-lg" />
          <List.Item title="push" desc="param1=p1" onClick={()=>app.router.push(['pageinfo', 'p1'])} />
          <List.Item title="push" desc="query:{n:'q1'}" onClick={()=>app.router.push('pageinfo', {query:{n:'q1'}})} />
          <List.Item title="push" desc="state:{n:'s1'}" onClick={()=>app.router.push('pageinfo', {state:{n:'s1'}})} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="导航地址" className="text-weight-bold text-size-lg" />
          <List.Item title="getUrl" desc="param1=p1" onClick={()=>alert(app.router.getUrl(['pageinfo', 'p1']))} />
          <List.Item title="getPathName" desc="param1=p1" onClick={()=>alert(app.router.getPathName(['pageinfo', 'p1']))} />
          <List.Item title="getUrl" desc="query:{n:'q1'}" onClick={()=>alert(app.router.getUrl('pageinfo', {query:{n:'q1'}}))} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="特殊处理" className="text-weight-bold text-size-lg" />
          <List.Item title="懒加载" onClick={()=>app.router.push(['dynamic', 'dp1'])} />
          <List.Item title="阻塞" onClick={()=>app.router.push(['dynamic', 'dp1'])} />
        </List>
      </div>
    </div>
  )
}