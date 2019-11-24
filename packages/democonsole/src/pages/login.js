import React from 'react';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import Checkbox from 'antd/es/checkbox';


const FormPanel = Form.create({})(class extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err) return;
      if(this.props.onLogin) this.props.onLogin(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" bs-color="rgba(0,0,0,.25)" />} placeholder="Username" />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" bs-color="rgba(0,0,0,.25)" />} type="password" placeholder="Password" />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
});


let Component = props=>{
  let { page } = props;
  return <FormPanel onLogin={page.actionLogin} />
};

Component.controller = (app,page)=>({
  actionLogin: data=>{
    app.request.request({
      url: '/auth',
      data,
    }).then(v=>{
      v&&app.router.replaceRoot();
    })
  }
})


export default Component;