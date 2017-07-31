import React from 'react';
import { View,Pager,TabBar } from '../../../bnorth/';

export default class HomePage extends React.Component{
  render() {
    return (
      <View className="layout-v">
        <Pager className='layout-sub-flex-grow layout-full-h'>
          {this.props.route.container.map((v)=>{return (
            <Pager.Item active={this.getPageChildPath()===v} key={'pager-'+v}> {this.props[v]} </Pager.Item>
          )})}
        </Pager>
        <TabBar
          onAction={(eventKey)=>{this.props.Apis.Navigate.replace('..',eventKey)}}>
          <TabBar.Item
            eventKey="main"
            selected={this.getPageChildPath()==="main"}
            icon="home"
            title="首页" />
          <TabBar.Item
            eventKey="person"
            selected={this.getPageChildPath()==="person"}
            icon="person"
            title="我的" />
        </TabBar>
      </View>
    );
  }
}