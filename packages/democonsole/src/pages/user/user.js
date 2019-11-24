import React from 'react';
import Card from 'antd/es/card';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Tag from 'antd/es/tag';


let Component = props=>{
  let {stateUser} = props;

  return (
    <div>
      <Card title="Default size card" extra={<a href="#/">More</a>}>
        <Row gutter={18}>
          <Col className="gutter-row" span={8}>
            名字：{stateUser.name}
          </Col>
          <Col className="gutter-row" span={8}>
            年龄：{stateUser.age}
          </Col>
          <Col className="gutter-row" span={8}>
            角色：<Tag>{stateUser.role}</Tag>
          </Col>
        </Row>
      </Card>
    </div>
  )
};

Component.controller = (app,page)=>({
  stateUser: [{url: '/user/'+page.props.params.id, fetchOnStart: true, initialization: []}, app.Request],
})


export default Component;