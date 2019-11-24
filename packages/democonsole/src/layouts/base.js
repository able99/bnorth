import React from 'react';
import Panel from '@bnorth/components/lib/Panel';
import Layout from 'antd/es/layout';
import Menu from 'antd/es/menu';
import Dropdown from 'antd/es/dropdown';
import Button from 'antd/es/button';
import Icon from 'antd/es/icon';
import PageHeader from 'antd/es/page-header';
import Avatar from 'antd/es/avatar';
import routes from '../routes';
import logo from '../../res/logo.png';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;


let Component = props=>{
  let {app, info:{routeDefine:{menus=[]}, subRoutePageInfo:{pageName, routeDefine:{title='首页'}={}}={}}, children:{_:subRoutePage, home:homePage}={}} = props;
  const [collapsed, setCollapsed] = React.useState(false);
  
  let openKey = menus.find(v=>v.subMenus&&v.subMenus.find(vv=>vv===pageName));
  openKey = openKey&&openKey.title;
  
  return (
    <Panel bc-overflow-y-auto bc-height-full  bc-min-height-fullh>
      <Layout style={{minHeight: '100%'}}>
        <Sider breakpoint="lg" collapsedWidth="0" trigger={null} collapsible collapsed={collapsed}>
          <Panel bc-padding-a- bc-text-align-center bc-text-color-white b-size="lg"> 
            <Panel component="img" alt="" src={logo} bs-height='1.5em' bc-margin-right-sm bc-border-set-bottom- />
            {process.bnorth.name}
          </Panel>
          <Menu theme="dark" mode="inline" defaultOpenKeys={[openKey]} defaultSelectedKeys={[pageName]} onClick={({key})=>app.router.push('/'+key)}>
            {menus.map(v=>{
              if(typeof v === 'object') {
                return <SubMenu key={v.title} title={<span>{v.name?<Icon type={v.name} />:null}<span>{v.title}</span></span>}>
                  {(v.subMenus||[]).map(vv=>{
                    let route =routes[vv];
                    return <Menu.Item key={vv}>{route.name?<Icon type={route.name} />:null}<span>{route.title}</span></Menu.Item>
                  })}
                </SubMenu>
              }else {
                let route =routes[v];
                return <Menu.Item key={v}>{route.name?<Icon type={route.name} />:null}<span>{route.title}</span></Menu.Item>
              }
            })}
          </Menu>
        </Sider>
        <Layout>
          <Header className="bg-color-white flex-display-block flex-justify-between flex-align-center">
            <Button type="primary" onClick={()=>setCollapsed(!collapsed)}>
              <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button>
            <Panel className="flex-display-block flex-align-center">
              <Dropdown overlay={
                <Menu>
                  <Menu.Item key="0">用户信息</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="3" onClick={()=>alert(1)}>退出登录</Menu.Item>
                </Menu>} trigger={['hover']}>
                <Panel><Avatar style={{ backgroundColor: '#87d068' }} icon="user" />用户名</Panel>
              </Dropdown>
            </Panel>
          </Header>
          <Content className="margin-a- padding-a- bg-color-white">
            <PageHeader title={title} />
            {subRoutePage||homePage}
          </Content>
          <Footer className="text-align-center">XXX ©2019 Created by JIHENG</Footer>
        </Layout>
      </Layout>
    </Panel>
  )
};

Component.controller = (app,page)=>({
  stateUser: [{url: '/auth', fetchOnStart: true}, app.Request],

  _onStart: ()=>{
    console.log(222)
  },
})

export default Component;