import React from 'react';
import { View,Container,Button,NavBar,Field,Icon,List } from '../../../bnorth/';

export default class ResisterPage extends React.Component{
  render() {
    return (
      <View>
        <NavBar 
          leftNav={[NavBar.navItemBack]}
          amStyle="primary" 
          title='用户注册' />
        <Container scrollable className="margin-top-xxxl">
        
          <List>
            <List.Item
              nested="input" >
              <Field 
                value={this.props.wrap_data.mobile}
                onInput={(e)=>{this.props.Wraps.data.update({"mobile":e.target.value})}}
                placeholder="请输入用户名"  />
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
                  disabled={this.props.Wraps.data.validate('mobile')}
                  onClick={()=>this.props.ex.getVerifyCode()}>获取验证码</Button>
              }
              nested="input" />

            <List.Item
              nested="input" >
              <Field 
                value={this.props.wrap_data.password}
                onInput={(e)=>{this.props.Wraps.data.update({"password":e.target.value})}}
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
              注册
            </Button>
          </div>
        </Container>
      </View>
    )
  }
}
