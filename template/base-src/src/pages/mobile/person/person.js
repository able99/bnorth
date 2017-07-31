import React from 'react';
import { View,Container,NavBar } from '../../../bnorth/';

export default class PersonPage extends React.Component{
  render() {
    let user = this.props.wrap_user.data||{};
    let isLogin = this.props.Apis.User.isLogin();
    return (
      <View>
        <NavBar 
          rightNav={[{
            title: isLogin?"注销":"登录",
            component: "a",
            onClick:()=>isLogin?this.props.Apis.User.logout():this.props.Apis.Navigate.goLogin(),
          }]}
          amStyle="primary" 
          title='用户中心' />
        <Container scrollable>
          
        </Container>
      </View>
    );
  }
}