import React from 'react';

import { View,Container,Button,ButtonGroup,Field } from '../../../bnorth/';

export default class LoginPage extends React.Component{
  render() {
    return (
      <View>
        <Container 
          style={this.props.Utils.Style.backgroundImage(this.props.Config.loginBg, '100%', '100%')}
          scrollable className="padding-xxxl layout-v-end-center">
          

          <ButtonGroup split justify className="background-none layout-full-h margin-v-xxl">
            {((this.props.wrap_data.types&&this.props.wrap_data.types.length>1&&this.props.wrap_data.types)||[]).map((v)=>{return(
              <Button
                key={`type-${v.type}`}
                onClick={()=>this.props.Wraps.data.update({type:v.type})} 
                plain className={this.props.wrap_data.type===v.type?'text-color-primary':'text-color-pwhite'}>
                {v.name}
              </Button>
            )})}
          </ButtonGroup>

          {this.props.wrap_data.type===0?
          <div className="layout-full-h">
            <div className="margin-bottom-xxl border-radius-rounded">
              <Field 
                className="margin-0 padding-h-xl border-none"
                value={this.props.wrap_loginNormal.userName}
                onChange={(e)=>{this.props.Wraps.loginNormal.update({"userName":e.target.value})}}
                placeholder="请输入邮箱或者手机号"  />
            </div>
            <div className="margin-bottom-xxl border-radius-rounded">
              <Field 
                className="margin-0 padding-h-xl border-none"
                value={this.props.wrap_loginNormal.password}
                onChange={(e)=>{this.props.Wraps.loginNormal.update({"password":e.target.value})}}
                type="password"
                placeholder="请输入密码"  />
            </div>
            <Button 
              className="margin-bottom-xxl" 
              block rounded amStyle="primary"
              disabled={this.props.Wraps.loginNormal.validate()}
              onClick={()=>this.props.Apis.User.login(this.props.wrap_loginNormal)} >
              确认
             </Button>
             <div className="margin-h layout-h-between-center">
              <Button 
                onClick={()=>{this.props.Apis.Navigate.push(this.props.Config.Path.resister)}}
                plain className="text-color-light">
                注册
              </Button>
              <Button 
                onClick={()=>{this.props.Apis.Navigate.push(this.props.Config.Path.forget)}}
                plain className="text-color-light">
                忘记密码
              </Button>
            </div>
          </div>
          :null}

          {this.props.wrap_data.type===1?
          <div className="layout-full-h">
            <div className="margin-bottom-xxl border-radius-rounded">
              <Field 
                className="margin-0 padding-h-xl border-none"
                value={this.props.wrap_loginVerify.email}
                onInput={(e)=>{this.props.Wraps.loginVerify.update({"email":e.target.value})}}
                placeholder="请输入邮箱"  />
            </div>
            <div className="margin-bottom-xxl border-radius-rounded layout-h-start-center bg-color-pwhite">
              <Field 
                className="margin-0 padding-h-xl ayout-sub-flex-grow border-none"
                value={this.props.wrap_loginVerify.verifyCode}
                onInput={(e)=>{this.props.Wraps.loginVerify.update({"verifyCode":e.target.value})}}
                placeholder="请输入验证码"  />
              <Button 
                disabled={this.props.wrap_login.sended||this.props.Wraps.loginVerify.validate('email')}
                amStyle="link"
                className=" layout-sub-flex-none"
                radius
                plain
                onClick={()=>this.props.ex.getVerifyCode(this.props.wrap_loginVerify.email)}>获取验证码</Button>
            </div>
            <Button 
              className="margin-bottom-xxl" 
              block rounded amStyle="primary"
              disabled={this.props.Wraps.loginVerify.validate()}
              onClick={()=>this.props.Apis.User.login(this.props.wrap_loginVerify,'verify')} >
              确认
             </Button>
          </div>
          :null}
        </Container>
      </View>
    )
  }
}
