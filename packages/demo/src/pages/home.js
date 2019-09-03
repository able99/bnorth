import React from 'react';
import NavBar from '../components/navbar'
import List from '../components/list'


let Component = props=>{
  let { app } = props;
  // console.log('test', 'render', props.stateData);
  return (
    <div className="bg-color-white width-full height-full flex-display-block flex-direction-v">
      <NavBar title="bnorth demo" />
      <div className="scrollable-y- flex-sub-flex-extend">
        <List>
          <List.Item 
            title="组件列表" 
            desc="展示页面布局的常用组件"
            onClick={()=>app.router.push('components')} />
          <List.Item 
            title="组件插件列表" 
            desc="展示以插件形势存在的 ui 组件，这些组件插件提供了对话框，蒙层等弹出和悬浮功能"
            onClick={()=>app.router.push('cplugins')} />
          <List.Item 
            title="路由管理展示" 
            desc="展示应用组织页面和页面之间关系的能力"
            onClick={()=>app.router.push('router')} />
          <List.Item 
            title="数据管理展示" 
            desc="展示应用对网络数据获取与管理以及本地状态数据的管理"
            onClick={()=>app.router.push('data')} />
          <List.Item 
            title="功能插件列表" 
            desc="功能性插件展示，扩展了应用处理的能力，比如加密，操作浏览器，本地存储等等"
            onClick={()=>app.router.push('plugins')} />
          <List.Item 
            title="分页 demo" 
            desc="基于分页组件的分页布局展示"
            onClick={()=>app.router.push('tabs')} />
          {/* <List.Item 
            title="列表 demo" 
            desc="常见列表型页面的布局和逻辑展示"
            onClick={()=>app.router.push('lists')} /> */}
        </List>
      </div>
    </div>
  );
};

Component.controller = {
  // _onStart: ()=>console.log('test', 'onPageStart'),
  // _onStop: ()=>console.log('test', 'onPageSop'),
  // _onActive: ()=>console.log('test', 'onPageActive'),
  // _onInactive: ()=>console.log('test', 'onPageInactive'),
  _onKeyEvent: e=>{return console.log(111, e)}
}

export default Component;