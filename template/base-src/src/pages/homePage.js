import React from 'react';

import { AppMixinPage } from '../bnorth/app/app';
import { View,Container,NavBar,List,Grid,Col,Icon}  from '../bnorth/components/';

export default React.createClass({
  mixins: [AppMixinPage],

  render() {
    return (
      <View {...this.getPageProps()}>
        <NavBar amStyle="primary" title='入库'
          rightNav={[{
          icon: 'setting',
          component: "a",
          onClick:()=>{this.props.actionNaviGoto("setting")},
        }]} />

        <Container scrollable>
          <List>
            <List.Item title={<span className="text-primary">入库</span>} />
            <List.Item>
              <Grid className="layout-sub-full">
                <Col cols={2} className="layout-v-center-center" onClick={()=>this.props.actionNaviGoto("instoreorder","0")}>
                  <Icon name='func-instock' className="text-primary"></Icon>
                  <span className="text-primary">普通</span>
                </Col>
                <Col cols={2} className="layout-v-center-center" onClick={()=>this.props.actionNaviGoto("instoreorder","1")}>
                  <Icon name='func-instock-lg' className="text-primary"></Icon>
                  <span className="text-primary">LG</span>
                </Col>
              </Grid>
            </List.Item>
          </List>
          <List>
            <List.Item title={<span className="text-primary">出库</span>} />
            <List.Item>
              <Grid className="layout-sub-full">
                <Col cols={2} className="layout-v-center-center">
                  <Icon name='func-outstock' className="text-primary"></Icon>
                  <span className="text-primary">普通</span>
                </Col>
                <Col cols={2} className="layout-v-center-center">
                  <Icon name='func-outstock-lg' className="text-primary"></Icon>
                  <span className="text-primary">LG</span>
                </Col>
              </Grid>
            </List.Item>
          </List>
          <List>
            <List.Item title={<span className="text-primary">盘点操</span>} />
            <List.Item>
              <Grid className="layout-sub-full">
                <Col cols={2} className="layout-v-center-center">
                  <Icon name='func-inventory-plan' className="text-primary"></Icon>
                  <span className="text-primary">计划</span>
                </Col>
                <Col cols={2} className="layout-v-center-center">
                  <Icon name='func-inventory-noplan' className="text-primary"></Icon>
                  <span className="text-primary">随机</span>
                </Col>
              </Grid>
            </List.Item>
          </List>
        </Container>
      </View>
    )
  },
});
