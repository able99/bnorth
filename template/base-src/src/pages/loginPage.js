import React from 'react';

import { MixinPage,View,Container,Button,NavBar,List,Field } from '../bnorth/';

export default React.createClass({
  mixins: [MixinPage],

  render() {
    return (
      <View {...this.getPageProps()}>
        <NavBar amStyle="primary" title='登录' />
        <Container scrollable>
          <List>
            <List.Item 
              media={<span className="layout-size-min-width-80">用户名</span>} 
              title={<Field type="text" 
              value={this.props.wrap_login.userName}
              onInput={(e)=>{this.props.Wraps.login.update({userName:e.target.value})}} />} />
            <List.Item 
              media={<span className="layout-size-min-width-80">密码</span>} 
              title={<Field type="password" 
              value={this.props.wrap_login.userPwd}
              onInput={(e)=>{this.props.Wraps.login.update({userPwd:e.target.value})}} />} />
            <List.Item title={
              <Button 
                amStyle="primary" radius block 
                disabled={!this.props.Utils.Format.checkObj(this.props.wrap_login)}
                onClick={()=>this.props.Apis.User.login(this.props.wrap_login)}
              >登录</Button>} />
          </List>
          
        </Container>
      </View>
    )
  },
});
