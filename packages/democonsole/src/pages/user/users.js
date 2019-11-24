import React from 'react';
import Panel from '@bnorth/components/lib/Panel';
import Table from 'antd/es/table';
import Tag from 'antd/es/tag';
import Modal from 'antd/es/modal';
import Input from 'antd/es/input';
import Divider from 'antd/es/divider';
import Icon from 'antd/es/icon';
import Form from 'antd/es/form';
import Button from 'antd/es/button';


const columns = [
  { title: '名字', dataIndex: 'name', key: 'name', },
  { title: '年龄', dataIndex: 'age', key: 'age', },
  { title: '角色', key: 'role', dataIndex: 'role',
    render: data=>(<Tag>{data}</Tag>),
  },
  { title: '操作', key: 'action',
    render: data => (
      <span>
        <span>编辑 {data.name}</span>
        <Divider type="vertical" />
        <span>删除 {data.name}</span>
      </span>
    ),
  },
];

const AddUser = Form.create({name: 'AddUser'})(class extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err) return;
      if(this.props.onSubmit) this.props.onSubmit(values);
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
      </Form>
    );
  }
});

const FormPanel = Form.create({})(class extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if(err) return;
      this.props.actionSubmit&&this.props.actionSubmit(values);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form layout="inline" className="padding-v-" onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('username', {})(
            <Input
              prefix={<Icon type="user" bs-color="rgba(0,0,0,.25)" />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {})(
            <Input
              prefix={<Icon type="lock" bs-color="rgba(0,0,0,.25)" />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">搜索</Button>
        </Form.Item>
      </Form>
    );
  }
});



let Component = props=>{
  let { page, stateUsers, stateData:{showAdd} } = props;

  return (
    <Panel>
      <FormPanel onSubmit={page.actionSearch} />
      <Panel className="padding-v-"><Button type="primary" onClick={page.actionAdd}>添加</Button></Panel>
      <Table columns={columns} dataSource={stateUsers} onRow={record=>({onClick: ()=>page.actionDetail(record.id)})} />
      <Modal title="添加用户" visible={showAdd} onOk={page.actionAddConfirm} onCancel={page.actionAddCancel} >
        <AddUser />
      </Modal>
    </Panel>
  )
};

Component.controller = (app,page)=>({
  stateUsers: [{url: '/user', fetchOnStart: true, initialization: []}, app.Request],

  actionDetail: data=>{
    app.router.push(['user', data]);
  },

  actionSearch: data=>{
    page.stateData.update(data);
  },

  actionAdd: ()=>{
    page.stateData.update({showAdd: true});
  },

  actionAddConfirm: data=>{
    console.log(111,data);
    page.stateData.update({showAdd: false});
  },

  actionAddCancel: ()=>{
    page.stateData.update({showAdd: false});
  },
})


export default Component;