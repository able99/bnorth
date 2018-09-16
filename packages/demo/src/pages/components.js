import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'
// import Button from '@bnorth/components/lib/Button'
// import Tabs from '@bnorth/components/lib/Tabs'
import List from '@bnorth/components/lib/List'

export default props=>{
  // let { app } = props;
  return (
    <View>
      <Panel main>
        <List itemProps={{'b-theme': 'alert'}}>
          <List.Item part='header'>header</List.Item>
          <List.Item title='1' media='m' subTitle='11' after='a' titleProps={{'b-theme':'success'}} arrow></List.Item>
          <List.Item title='2'></List.Item>
          <List.Item title='3'></List.Item>
          <List.Item part='footer'>footer</List.Item>
        </List>
        {/*<Button b-theme="primary" bc-text-align b-style="solid"  bs-width={200} style={{height: 100}}>123</Button>*/}
        {/*<Button.Group justify separator buttonProps={{'b-theme': 'alert'}}>
          <Button>1</Button>
          <Button b-theme="success">2</Button>
          <Button>3</Button>
        </Button.Group>*/}
        {/*<Tabs buttonGroupProps={{buttonProps:{'b-theme':'primary'}, 'bc-border-set-bottom-primary':true}} bc-height-full>
          <Tabs.Item title="A" bc-bg-color='primary'>1</Tabs.Item>
          <Tabs.Item title="B">2</Tabs.Item>
      </Tabs>*/}

        {/*<h4>notice</h4>
        <Button.Group justify separator>
          <Button onClick={()=>app.notice.show('dismiss after 3s')}>show</Button>
          <Button onClick={()=>app.notice.show('dismiss after 3s', {hasClose: true})}>close btn</Button>
          <Button onClick={()=>app.notice.show('dismiss after 3s', {cTheme: 'alert'})}>theme</Button>
          <Button onClick={()=>app.notice.close()}>close</Button>
        </Button.Group>

        <h4>mask</h4>
        <Button.Group justify separator>
          <Button onClick={()=>app.mask.show()}>show</Button>
          <Button onClick={()=>app.mask.show({children: 'waiting'})}>with content</Button>
          <Button onClick={()=>app.mask.show({cTheme: 'alert', mask: false})}>theme</Button>
          <Button onClick={()=>app.mask.close()}>close</Button>
        </Button.Group>

        <h4>loading</h4>
        <Button.Group justify separator>
          <Button onClick={()=>app.loading.show()}>show</Button>
          <Button onClick={()=>app.loading.show({cTheme: 'alert'})}>theme</Button>
          <Button onClick={()=>app.loading.reset()}>reset</Button>
          <Button onClick={()=>app.loading.full()}>full</Button>
          <Button onClick={()=>app.loading.close()}>close</Button>
        </Button.Group>

        <h4>modal</h4>
        <Button.Group justify separator>
          <Button onClick={()=>app.modal.show('modal')}>normal</Button>
          <Button onClick={()=>app.modal.show('modal', {title: 'title1'})}>title</Button>
          <Button onClick={()=>app.modal.show('modal', {titleClose: true})}>close btn</Button>
        </Button.Group>
        <Button.Group justify separator>
          <Button onClick={()=>app.modal.show('modal', {role: 'alert'})}>alert</Button>
          <Button onClick={()=>app.modal.show('modal', {role: 'prompt'})}>prompt</Button>
          <Button onClick={()=>app.modal.show('modal', {role: 'popup'})}>popup</Button>
          <Button onClick={()=>app.modal.show('modal', {role: 'document'})}>document</Button>
        </Button.Group>
        <Button.Group justify separator>
          <Button onClick={()=>app.modal.show(({modalData, modalUpdate})=>(
            <div>
              <div>{modalData.input}</div>
              <input onChange={e=>modalUpdate({input: e.target.value})} value={modalData.input}/>
            </div>
          ),{
            role: 'prompt',
            onAction: (index, data, close)=>{
              if(index<=0) return;
              if(!data.input) {app.render.error('请输入'); return false;}
              close();
              app.render.notice('输入:'+data.input);
            }
          })}>
            state
          </Button>
        </Button.Group>*/}
      </Panel>
    </View>
  );
};