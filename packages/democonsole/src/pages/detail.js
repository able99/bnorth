import React from 'react';
import Card from 'antd/es/card';
import Row from 'antd/es/row';
import Col from 'antd/es/col';


let Component = props=>{
  return (
    <div>
      <Card title="Default size card" extra={<a href="#/">More</a>}>
        <Row gutter={18}>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">字段：xxx</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">字段：xxx</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">字段：xxx</div>
          </Col>
        </Row>
        <Row gutter={18}>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">字段：xxx</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">字段：xxx</div>
          </Col>
          <Col className="gutter-row" span={8}>
            <div className="gutter-box">字段：xxx</div>
          </Col>
        </Row>
      </Card>
    </div>
  )
};

Component.controller = (app,page)=>({
  onPageStart: ()=>console.log('onHomePageStart'),
})


export default Component;