import React from 'react';
import NavBar from '../components/navbar'
import List from '../components/list'


export default props=>{
  let { app } = props;

  return (
    <div className="bg-color-white width-full height-full flex-display-block flex-direction-v">
      <NavBar title="bnorth demo" />
      <div className="scrollable-y flex-sub-flex-extend">
        <List>
          <List.Item 
            title="组件列表" 
            desc="组件展示"
            onClick={()=>app.router.push('components')} />
          <List.Item 
            title="组件插件列表" 
            desc="弹出与悬浮 ui 插件展示，如对话框等"
            onClick={()=>app.router.push('cplugins')} />
          <List.Item 
            title="路由管理" 
            desc="路由管理演示"
            onClick={()=>app.router.push('router')} />
          <List.Item 
            title="数据管理" 
            desc="数据管理演示"
            onClick={()=>app.router.push('data')} />
          <List.Item 
            title="功能插件列表" 
            desc="功能插件展示"
            onClick={()=>app.router.push('plugins')} />
          <List.Item 
            title="tabbar demo" 
            desc="基于 tabbar 的页面展示"
            onClick={()=>app.router.push('tabbar')} />
          <List.Item 
            title="list demo" 
            desc="基于 list 的页面展示"
            onClick={()=>app.router.push('list')} />
        </List>
      </div>
    </div>
  );
};