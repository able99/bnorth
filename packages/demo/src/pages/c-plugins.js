import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel.PullRefresh'
import Button from '@bnorth/components/lib/Button'


let Component = aprops=>{
  let { app } = aprops;

  return (
    <View>
      <Panel main>
        <h4>notice</h4>
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
        </Button.Group>
      </Panel>
    </View>
  );
};


export default Component;