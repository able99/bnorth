import React from 'react';

import { MixinPage,View,Container,Button,NavBar,List } from '../bnorth/';
import logo from '../res/logo.png';

export default React.createClass({
  mixins: [MixinPage],

  render() {
    return (
      <View {...this.getPageProps()}>
        <NavBar 
          leftNav={ 
            [{
              icon: 'left-nav',
              onClick:()=>this.props.Apis.Navigate.back(),
            }]
          }
          amStyle="primary" 
          title='设置' />

        <Container scrollable>
          <List>
            <List.Item 
              media={<img src={logo} alt="" className="layout-size-squre-40" />} 
              title={this.props.Apis.User.load()&&this.props.Apis.User.load().fullname} 
              subTitle={"权限:"+(this.props.Apis.User.load()&&this.props.Apis.User.load()._role_id&&this.props.Apis.User.load()._role_id.name)} />
          </List>

          <List>
            <List.Item>
              <Button amStyle="alert" amSize="sm" radius block onClick={this.props.Apis.User.logout}>注销</Button>
            </List.Item>
          </List>
          
        </Container>
      </View>
    )
  },
});
