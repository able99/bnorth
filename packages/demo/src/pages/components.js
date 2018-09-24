import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'
import '@bnorth/components/lib/Panel.PullRefresh'
import '@bnorth/components/lib/Panel.AspectRatio'
import Button from '@bnorth/components/lib/Button'
import List from '@bnorth/components/lib/List'
import InfiniteScroll from '@bnorth/components/lib/InfiniteScroll';
import BackTop from '@bnorth/components/lib/BackTop';
// import Icon from '@bnorth/components/lib/Icon'
// import Space from '@bnorth/components/lib/Space'
// import Fab from '@bnorth/components/lib/Fab'
// import Tabs from '@bnorth/components/lib/Tabs'
import Loader from '@bnorth/components/lib/Loader'
import NavBar from '@bnorth/components/lib/NavBar'
// import img from '../../res/aboutme.svg';


let Group = aprops=>{
  let { 
    app, page, stateData, stateComponentSwitchs,  stateCommonProps, stateComponentProps,
    title, disabled, children, ...props
  } = aprops;
  if(disabled) return null;
  let switchOn = stateComponentSwitchs.includes(title);

  return (
    <div className="padding-a-xs" {...props}>
      <div className="flex-display-block flex-align-center margin-v-">
        <Button 
          onClick={()=>switchOn?page.stateComponentSwitchs.delete(title):page.stateComponentSwitchs.update([title], {append: true})}
          b-style="plain" bc-padding-a- bc-flex-sub-flex-none >
          {switchOn?'-':'+'}
        </Button>
        <strong className="flex-sub-flex-extend">{title}</strong>
      </div>
      {switchOn?<div className="border-set-a- padding-a-xs bg-color-white">{children}</div>:<div className="border-set-bottom-" />}
    </div>
  )
}

Group.Item = aprops=>{
  let { title, children } = aprops;

  return (
    <React.Fragment>
      <h4 className="border-set-bottom-">{title}</h4>
      {children}
    </React.Fragment>
  )
}


let Component = aprops=>{
  let { app, page, stateData, stateComponentSwitchs,  stateCommonProps, stateComponentProps} = aprops;

  return (
    <View>
      <Panel main>
        <Group 
          app={app} page={page}
          stateData={stateData} stateComponentSwitchs={stateComponentSwitchs} stateCommonProps={stateCommonProps} stateComponentProps={stateComponentProps}
          title="Panel">
          <Group.Item title="circle progress">
            <Loader type="circle" isProgress progress={45}/>
          </Group.Item>
          <Group.Item title="circle">
            <Loader type="circle" />
          </Group.Item>
          <Group.Item title="line progress">
            <Loader type="line" isProgress progress={45}/>
          </Group.Item>
          <Group.Item title="line">
            <Loader type="line"/>
          </Group.Item>
        </Group>

        <Group 
          app={app} page={page}
          stateData={stateData} stateComponentSwitchs={stateComponentSwitchs} stateCommonProps={stateCommonProps} stateComponentProps={stateComponentProps}
          title="list & pull refresh & infinite scroll & backtop" disabled>
          <Panel bs-width="70%" bs-height="300px" bc-border-set- data-container>
            <Panel.PullRefresh 
              bc-height-full bc-scrollable-y- 
              isLoading={stateData.isLoading} 
              onRefresh={()=>{ page.stateData.update({isLoading: true}); setTimeout(()=>page.stateData.update({isLoading: false}), 3000)}} >
              <List>
                <List.Item part='header'>header</List.Item>
                {Array(10).fill(0).map((v,i)=>(
                  <List.Item name="aaa"
                    title={'title'+i} media={'media'+i} subTitle={'subTitle'+i} desc={'desc'+i} after={'after'+i} 
                    onClick={()=>alert(i)} 
                    key={i}/>
                ))}
                <List.Item part='footer'>footer</List.Item>
              </List>
              <BackTop container />
              <InfiniteScroll
                isLoading={stateData.isLoadingMore}  
                onLoading={()=>{page.stateData.update({isLoadingMore: true}); setTimeout(()=>page.stateData.update({isLoadingMore: false}), 5000)}}  />
            </Panel.PullRefresh>
          </Panel>
        </Group>

        <Group 
          app={app} page={page}
          stateData={stateData} stateComponentSwitchs={stateComponentSwitchs} stateCommonProps={stateCommonProps} stateComponentProps={stateComponentProps}
          title="NavBar">
          <Group.Item title="NavBar">
            <NavBar>
              <NavBar.Item> item1item1 </NavBar.Item>
              <NavBar.Title> title </NavBar.Title>
              <NavBar.Item> item2 </NavBar.Item>
            </NavBar>
          </Group.Item>
        </Group>
        {/*<Panel.Touchable onPan={(e,el)=>console.log(e,el)} >
          <List>
            {Array(10).fill(0).map((v,i)=>(
              <List.Item 
                title={i}  
                key={i}/>
            ))}
          </List>
            </Panel.Touchable>*/}

        {/*<Group title="Icon">
          <Group.Item title="svg">
            <Icon name="heart" />
          </Group.Item>
          <Group.Item title="img">
            <Icon src={img} />
          </Group.Item>
          <Group.Item title="char">
            <Icon char='B' />
          </Group.Item>
        </Group>

        <Group title="Fab">
          <Group.Item title="container - end, center">
            <Fab h="end" v="center" container>Fab1</Fab>
          </Group.Item>
          <Group.Item title="no container - start, center">
            <Fab h="start" v="center">Fab2</Fab>
          </Group.Item>
        </Group>

        <Group title="Panel">
          <Group.Item title="Panel">
            <Panel {...stateCommonProps}>Panel</Panel>
          </Group.Item>
          <Group.Item title="Panel.AspectRatio">
            <Panel.AspectRatio ratio={0.5}>w/h=0.5</Panel.AspectRatio>
          </Group.Item>
        </Group>

        <Group title="Space">
          <Group.Item title="space">
            <Space count={2} {...stateCommonProps} />
          </Group.Item>
          <Group.Item title="wrap">
            <Space count={2} stacked {...stateCommonProps} />
          </Group.Item>
                </Group>*/}

        
        
        
        {/*<Loader b-theme="primary" progress={Math.random()*100} />*/}
        {/*<Icon b-theme="alert" name="heart" src1={img} chat1='2' />*/}
        {/*<List itemProps={{'b-theme': 'alert'}}>
          <List.Item part='header'>header</List.Item>
          <List.Item title='1' media='m' subTitle='11' after='a' titleProps={{'b-theme':'success'}} arrow></List.Item>
          <List.Item title='2'></List.Item>
          <List.Item title='3'></List.Item>
          <List.Item part='footer'>footer</List.Item>
        </List>*/}
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

Component.controller = {
  stateCommonProps: {
    initialization: {
      'b-theme': 'primary',
    }
  },
  stateComponentSwitchs: {
    initialization: [],
  }
}

export default Component;