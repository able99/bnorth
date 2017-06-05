import React from 'react';

import { Panel,CheckRadio,Switch,Field,Tabs,View,Container,Group,NavBar,TabBar,Button,List,Grid,Col,Pager,PopoverTrigger,Popover,Carousel,Accordion,Badge,ButtonGroup,Card,Icon } from '../../../bnorth/';
import logo from '../res/logo.png';

export default class ComponentListPage extends React.Component{
  
  render() {
    return (
      <View>
        <NavBar amStyle="primary" title='组件列表'
          leftNav={[{
            title: 'left',
            component: "a",
            onClick:()=>{this.props.Apis.Navigate.push("setting")},
          }]}
          rightNav={[{
            title: 'goto A',
            component: "a",
            onClick:()=>{this.props.Apis.Navigate.push("a")},
          }]} />

        <Container scrollable>
          {/* css */}
          <Group header="--css" >
            <div className="bg-color-success layout-size-width-auto-100 layout-size-height-auto-100" style={this.props.Utils.Style.backgroundImage(logo)}>
              111
            </div>
          </Group>

          {/* Panel */}
          <Group header="--Panel" >
            <Panel className="bg-color-success" block mode="line" expand folder param={2}>
              111<br/>111<br/>111<br/>111<br/>111<br/>
            </Panel>
            <Panel className="bg-color-alert layout-size-width-auto-50p" mode="ratio" param={0.5}>
              <span className="layout-size-full" style={this.props.Utils.Style.shadow()} >222</span>
            </Panel>
          </Group>

          {/* popover */}
          <Group header="--popover" >
            <PopoverTrigger popover={<Popover><p>Popover 内容</p></Popover>}>
              <Button amStyle="primary">显示 Popover</Button>
            </PopoverTrigger>
            <ButtonGroup justify split>
              <PopoverTrigger placement="dropdown" popover={<Popover><p>Popover 内容</p></Popover>}>
                <Button underline>Left</Button>
              </PopoverTrigger> 
              <Button underline>Center</Button>
              <Button underline>Right</Button>
            </ButtonGroup>
          </Group>

          {/* text */}
          <Group header="--button" >
            <h3>1line</h3>
            <div className="text-truncate">
              12345667890123456678901234566789012345667890123456678901234566789012345667890123456678901234566789012345667890123456678901234566789012345667890
            </div>
            <h3>2line</h3>
            <div className="text-truncate2">
              12345667890123456678901234566789012345667890123456678901234566789012345667890123456678901234566789012345667890123456678901234566789012345667890
            </div>
          </Group>

          {/* Carousel */}
          <Group header="--Carousel" >
            <Carousel autoPlay={false}>
              <Carousel.Item keu={1}>
                <div className="layout-size-height-auto-100 bg-color-success"></div>
              </Carousel.Item>
              <Carousel.Item keu={2}>
                <div className="layout-size-height-auto-100 bg-color-alert"></div>
              </Carousel.Item>
            </Carousel>
          </Group>

          {/* button */}
          <Group header="--button" >
            <Button href="www.baidu.com">link</Button>
            <Button amStyle="primary"><Icon name="person" />normal</Button>
            <Button amStyle="primary" hollow>hollow</Button>
            <Button amStyle="primary" underline active>underline</Button>
          </Group>

          {/* ButtonGroup */}
          <Group header="--ButtonGroup" >
            <ButtonGroup>
              <Button>Left</Button>
              <Button>Center</Button>
              <Button>Right</Button>
          </ButtonGroup>
          </Group>

          {/* Modal */}
          <Group header="--Modal" >
            <Button onClick={()=>
              this.props.Actions.actionNoticeDialogShow({
                onAction: (confirm)=>{},
                noPadded: true,
                content:(
                  <List inset className="margin-0 border-none">
                    <List.Item title="1" />
                    <List.Item title="2" />
                  </List>
                ),
              })
            }>select</Button>
            <Button onClick={()=>
              this.props.Actions.actionNoticeDialogShow({
                role: 'confirm',
                title: 'confirm',
                onAction: (confirm)=>{},
                content:(
                  <span>
                    confirm content
                  </span>
                ),
              })
            }>confirm</Button>
            <Button onClick={()=>
              this.props.Actions.actionNoticeDialogShow({
                role: 'alert',
                title: 'alert',
                modalWidth: '30%',
                onAction: (confirm)=>{},
                content:'alert content'
              })
            }>alert </Button>
            <Button onClick={()=>
              this.props.Actions.actionNoticeDialogShow({
                role: 'loading',
                title: 'loading',
                modalWidth: 'auto',
                onAction: (confirm)=>{},
              })
            }>loading </Button>
            <Button onClick={()=>
              this.props.Actions.actionNoticeDialogShow({
                title: 'propmt',
                role: 'prompt',
                content: (<Field placeholder="把 IQ 卡密码交出来" />),
                onAction: (confirm,data,e)=>{console.log(confirm,data,e)},
              })
            }>propmt </Button>
            <Button onClick={()=>
              this.props.Actions.actionNoticeDialogShow({
                title: 'actions',
                role: 'actions',
                content:(
                  <div className="modal-actions-group">
                  <List>
                    <List.Item className="modal-actions-header">分享到</List.Item>
                    <List.Item>微信</List.Item>
                    <List.Item className="modal-actions-alert">Twitter</List.Item>
                  </List>
                  </div>
                ),
                onAction: (confirm)=>{},
              })
            }>actions </Button>
            <Button onClick={()=>
              this.props.Actions.actionNoticeDialogShow({
                title: 'popup',
                role: 'popup',
                closeBtn: true,
                content: (<span>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/>12312<br/></span>),
                onAction: (confirm)=>{},
              })
            }>popup </Button>
            <Button onClick={()=>
              this.props.Actions.actionNoticeDialogShow({
                title: 'custom',
                role: 'custom',
                noMask: true,
                onAction: (confirm)=>{},
                backdropClassName: "layout-v-end-center margin-bottom",
                content: (<span>1</span>),
              })
            }>custom </Button>
          </Group>

          {/* form base */}
          <Group header="--form base" >
            <Field
              label="Your Name"
              containerClassName="my-label"
              placeholder="What's your name." />

            <Field
              label="Password"
              placeholder="Yout password."
              type="password" />

            <Field
              label="Age"
              placeholder="Your age."
              type="number" />

            <Field
              type="select"
              label="Select"
              ref="select"
              defaultValue="m" >
              <option value="m">Male</option>
              <option value="f">Female</option>
            </Field>

            <Field
              label="Range"
              type="range"
              defaultValue="10" />

            <Field
              label={"label"}
              type="checkbox"
              name="checkbox-list-1" />

            <Field
              type="checkbox"
              name="checkbox-list-1" />

            <Field
              label="Commnet"
              placeholder="Say something you whant."
              type="textarea" />

            <Field
              value="提交"
              type="submit"
              amStyle="primary"
              block
              onClick={this.handleSubmit} />

            <div className="form-set">
              <Field placeholder="Name." />
              <Field placeholder="Email." />
              <Field placeholder="Password." />
            </div>

            <Field
              placeholder="You domain."
              labelBefore="www."
              labelAfter=".com"
              containerClassName="my-group" />

            <Field
              placeholder="Your email."
              labelBefore={<Icon name="person" />}
              btnAfter={<Button>Subscribe</Button>} />

            <CheckRadio type="radio" name="CheckRadio" amStyle="primary" amSize="sm">
              checkbox1
            </CheckRadio>
            <CheckRadio type="radio" name="CheckRadio" amStyle="primary" amSize="sm">
              checkbox2
            </CheckRadio>
          </Group>

          {/* List */}
          <Group header="--List" >
            <List>
              <List.Item part="header">A</List.Item>
              <List.Item media="media" title="title" subTitle="sub" desc="desc" after="after" flag linkComponent="a" onClick={()=>{alert(1)}} />
              <List.Item after={<Badge rounded amStyle="success">ok</Badge>} title="link" />
              <List.Item after={<Switch />} title="switch" />
            </List>
            <br/>
            <List separatorInset>
              <List.Item part="header">A</List.Item>
              <List.Item media="media" title="title" subTitle="sub" desc="desc" after="after" flag linkComponent="a" onClick={()=>{alert(1)}} />
              <List.Item after={<Badge rounded amStyle="success">ok</Badge>} title="link" />
            </List>
          </Group>
          <Card>
            <List>
              <List.Item href="#" title="list in card" />
              <List.Item href="#" title="list in card" />
            </List>
          </Card>

          {/* List Form*/}
         
            <List>
              <List.Item
                nested="input">
                <Field
                  type="text"
                  label={null}
                  placeholder="text withnot label" />
              </List.Item>
              <List.Item
                media="media"
                nested="input">
                <Field
                  type="text"
                  label={'text'}
                  placeholder="text with label & media" />
              </List.Item>
            </List>
          

          {/* Tabs */}
          <Group header="--Tabs" >
            <Tabs className="layout-size-height-auto-100">        
              <Tabs.Item
                title="A" >
                11111
              </Tabs.Item>

              <Tabs.Item
                title="B" >
                22222
              </Tabs.Item>         
            </Tabs>
          </Group>

          {/* notice */}
          <Group header="--notice" >
            <Button onClick={()=>
              this.props.Actions.actionNoticeMessage("test")
            }>message</Button>
            <Button onClick={()=>{
              this.props.Actions.actionNoticeBlock();
              setTimeout(()=>{this.props.Actions.actionNoticeBlockFinish()},3000);
            }}>block</Button>
            <Button onClick={()=>{
              this.props.Actions.actionNoticeLoading();
              setTimeout(()=>{this.props.Actions.actionNoticeLoadingFinish()},5000);
            }}>loading</Button>
          </Group>

          <h4>Card</h4><hr/>
          <Card
            header="Card header"
            footer="Card footer"
          >
            Card 内容
          </Card>


          <h4>icon</h4><hr/>
          <Icon name="left-nav">nav</Icon>

          <h4>Grid</h4><hr/>
          <Grid bordered>
            <Col>col</Col>
            <Col>col</Col>
          </Grid>
          
          <h4>Accordion</h4><hr/>
          <Badge>12</Badge>
          <Badge rounded>12</Badge>
          <Badge radius>12</Badge>

          <h4>Group</h4><hr/>
          <Group
            header="默认"
            noPadded
          >
            1111
          </Group>

          <h4>List</h4><hr/>
          <List>
            <List.Item part="header">A</List.Item>
        
            <List.Item
              after={<Badge rounded amStyle="success">ok</Badge>}
              title="List Item 2" />

            <List.Item
              title="List Item 3"
              after="11" />
            <List.Item
              title="List Item 4" />
          </List>

          <h4>Accordion</h4><hr/>
          <Accordion>
           
            <Accordion.Item
              title={'a'} >
              <p>
                1111111<br/>
                1111111<br/>
                1111111<br/>
                1111111<br/>
              </p>
            </Accordion.Item>

            <Accordion.Item
              title={'b'} >
              <p>
                2222222<br/>
                2222222<br/>
                2222222<br/>
                2222222<br/>
              </p>
            </Accordion.Item>


          </Accordion>

          <h4>tabbar</h4><hr/>
          <Pager className='layout-size-height-auto-100'>
            {this.props.route.container.map((v)=>{return (
              <Pager.Item active={this.getPageChildPath()===v} key={'pager-'+v}> {this.props[v]} </Pager.Item>
            )})}
          </Pager>
          
        </Container>

        <TabBar
          amStyle=""
          onAction={(eventKey)=>{this.props.Apis.Navigate.replace(this.getPageFullPath()+"/"+eventKey)}}>
          <TabBar.Item
            eventKey="taba"
            selected={this.getPageChildPath()==="taba"}
            icon="scan"
            title="tabA" />
          <TabBar.Item
            eventKey="tabb"
            selected={this.getPageChildPath()==="tabb"}
            icon="scan"
            title="tabB" />
        </TabBar>
      </View>
    )
  }
}
