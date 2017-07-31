import React from 'react';
import { View,Container,Button,NavBar,Field,Icon,List } from '../../../bnorth/';

export default class PasswordPage extends React.Component{
  render() {
    return (
      <View>
        <NavBar 
          leftNav={[NavBar.navItemBack]}
          amStyle="primary" 
          title='修改密码' />
        <Container scrollable className="margin-top-xxxl">

          <List>
            <List.Item
              nested="input" >
              <Field 
                className="text-align-right"
                value={this.props.Apis.User.load().mobile}
                readOnly />
            </List.Item>
            <List.Item
              title={
                <Field 
                  value={this.props.wrap_data.verifyCode}
                  onInput={(e)=>{this.props.Wraps.data.update({"verifyCode":e.target.value})}}
                  placeholder="请输入验证码"  />
              }
              after={
                <Button 
                  plain
                  disabled={this.props.wrap_data.__sended}
                  onClick={()=>this.props.ex.getVerifyCode()}>
                  获取验证码
                </Button>
              }
              nested="input" />

            <List.Item
              nested="input" >
              <Field 
                value={this.props.wrap_data.newPassword}
                onInput={(e)=>{this.props.Wraps.data.update({"newPassword":e.target.value})}}
                placeholder="请输入密码"  />
            </List.Item>
          </List>

          <div className="margin margin-top-xxl margin-bottom-0">
            <Button 
              className="margin-0"
              block radius amStyle="primary"
              disabled={this.props.Wraps.data.validate()}
              onClick={()=>this.props.ex.submit()}
              >
              修改密码
            </Button>
          </div>
        </Container>
      </View>
    )
  }
}
