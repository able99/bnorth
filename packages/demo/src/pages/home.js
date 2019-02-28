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
            title="路由管理" 
            desc="路由管理演示"
            onClick={()=>app.router.push('router')} />
          <List.Item 
            title="数据管理" 
            desc="数据管理演示"
            onClick={()=>app.router.push('data')} />
          <List.Item 
            title="插件列表" 
            desc="插件展示"
            onClick={()=>app.router.push('plugins')} />
        </List>
      </div>
    </div>
  );
};