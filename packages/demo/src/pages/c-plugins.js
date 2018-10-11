import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel.PullRefresh'
import List from '@bnorth/components/lib/List'


let Component = aprops=>{
  let { app } = aprops;

  return (
    <View>
      <Panel main>
        <List bc-margin-bottom->
          <List.Item part="header">notice</List.Item>
          <List.Item 
            title="show" 
            onClick={()=>app.notice.show('dismiss after 3s')} />
          <List.Item 
            title="close button" 
            onClick={()=>app.notice.show('dismiss after 3s', {hasClose: true})} />
          <List.Item 
            title="theme" 
            onClick={()=>app.notice.show('dismiss after 3s', {'b-theme': 'alert'})} />
          <List.Item 
            title="close notice" 
            onClick={()=>app.notice.close()} />
        </List>

        <List bc-margin-bottom->
          <List.Item part="header">mask</List.Item>
          <List.Item 
            title="show" 
            after="dismiss after 3s"
            onClick={()=>{app.mask.show();setTimeout(()=>app.mask.close(),3000)}} />
          <List.Item 
            title="content" 
            after="dismiss after 3s"
            onClick={()=>{app.mask.show({loaderProps:{children: 'waiting'}});setTimeout(()=>app.mask.close(),3000)}} />
          <List.Item 
            title="theme" 
            onClick={()=>app.mask.show({cTheme: 'alert', mask: false})} />
        </List>

        <List bc-margin-bottom->
          <List.Item part="header">loading</List.Item>
          <List.Item 
            title="show" 
            onClick={()=>app.loading.show()} />
          <List.Item 
            title="show theme" 
            onClick={()=>app.loading.show({'b-theme':'alert'})} />
          <List.Item 
            title="reset" 
            after="set to 60"
            onClick={()=>app.loading.reset(60)} />
          <List.Item 
            title="close" 
            onClick={()=>app.loading.close()} />
        </List>

        <List bc-margin-bottom->
          <List.Item part="header">modal</List.Item>
          <List.Item 
            title="normal" 
            onClick={()=>app.modal.show('modal')} />
          <List.Item 
            title="title" 
            onClick={()=>app.modal.show('modal', {title: 'title'})} />
          <List.Item 
            title="theme" 
            onClick={()=>app.modal.show('modal', {title: 'title', 'b-theme': 'primary'})} />
          <List.Item 
            title="title and close button" 
            onClick={()=>app.modal.show('modal', {title: 'title', hasTitleClose: true})} />
          <List.Item 
            title="role:alert" 
            onClick={()=>app.modal.show('modal',{role: 'alert'})} />
          <List.Item 
            title="role:prompt" 
            onClick={()=>app.modal.show('modal', {role: 'prompt'})} />
          <List.Item 
            title="role:popup" 
            onClick={()=>app.modal.show('modal', {role: 'popup'})} />
          <List.Item 
            title="role:document" 
            onClick={()=>app.modal.show('modal', {role: 'document'})} />
          <List.Item 
            title="state" 
            onClick={()=>app.modal.show(
              ({modalId, modalState, modalStateData})=>(
                <div>
                  <strong>modalId: {modalId}</strong>
                  <div>input: {modalStateData&&modalStateData.input}</div>
                  <input className="border-set-a-" onChange={e=>modalState.update({input: e.target.value})} value={(modalStateData&&modalStateData.input)||''}/>
                </div>
              ),{
                role: 'prompt',
                state: true,
                onAction: (index, state, close)=>{
                  if(index<=0) return;
                  if(!state||!state.data().input) {app.render.error('请输入'); return false;}
                  close();
                  app.render.notice('输入:'+state.data().input);
                }
              })
            } />
        </List>
      </Panel>
    </View>
  );
};


export default Component;