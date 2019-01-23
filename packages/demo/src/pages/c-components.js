import React from 'react';
import Group from '../components/group'
import Prop from '../components/props'
import img from '../../res/aboutme.svg';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel.AspectRatio'
import '@bnorth/components/lib/Panel.Container'
import Button from '@bnorth/components/lib/Button'
import Icon from '@bnorth/components/lib/Icon'
import Space from '@bnorth/components/lib/Space'
import Fab from '@bnorth/components/lib/Fab'
import Loader from '@bnorth/components/lib/Loader'
import Carousel from '@bnorth/components/lib/Carousel'
import Field from '@bnorth/components/lib/Field'
import Popover from '@bnorth/components/lib/Popover'
import Tabs from '@bnorth/components/lib/Tabs'
import TabBar from '@bnorth/components/lib/TabBar'
import NavBar from '@bnorth/components/lib/NavBar'
import List from '@bnorth/components/lib/List'
import AnimationCollapse from '@bnorth/components/lib/AnimationCollapse'
import AnimationFade from '@bnorth/components/lib/AnimationFade'
import AnimationSlider from '@bnorth/components/lib/AnimationSlider'
import Backdrop from '@bnorth/components/lib/Backdrop'
import BackTop from '@bnorth/components/lib/BackTop';


let Component = aprops=>{
  let { app, page, stateData, stateComponentSwitchs,  stateCommonProps, stateComponentProps } = aprops;
  let groupProps = { app, page, stateComponentSwitchs, stateCommonProps, stateComponentProps };

  return (
    <View bc-bg-color-white>
      <Panel main>
        <Panel bc-padding-a- bc-bg-color="view">gadget</Panel>

        <Group title="AnimationCollapse" {...groupProps}>
          <Group.Prop>
            <Prop title="in" option={[true, false]} sub="AnimationCollapse" state={page.stateComponentProps} stateData={stateComponentProps}/>
            <Prop title="dimension" option={['width', 'height']} sub="AnimationCollapse" state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <AnimationCollapse bc-bg-color-primary {...stateCommonProps} {...stateComponentProps.AnimationCollapse}>
            123<br />
            123<br />
            123<br />
          </AnimationCollapse>
        </Group>

        <Group title="AnimationFade" {...groupProps}>
          <Group.Prop>
            <Prop title="in" option={[true, false]} sub="AnimationFade" state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <AnimationFade bc-bg-color-primary {...stateCommonProps} {...stateComponentProps.AnimationFade}>
            123<br />
            123<br />
            123<br />
          </AnimationFade>
        </Group>

        <Group title="AnimationSlider" {...groupProps}>
          <Group.Prop>
            <Prop title="index" option={['0', '1', '2']} sub="AnimationSlider" state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <AnimationSlider {...stateCommonProps} {...stateComponentProps.AnimationSlider}>
            <AnimationSlider.Item bc-bg-color-primary >123</AnimationSlider.Item>
            <AnimationSlider.Item bc-bg-color-success >456</AnimationSlider.Item>
            <AnimationSlider.Item bc-bg-color-alert >789</AnimationSlider.Item>
          </AnimationSlider>
        </Group>






        <Panel bc-padding-a- bc-bg-color="view">utils</Panel>

        <Group title="Backdrop" {...groupProps}>
          <Group.Prop>
            <Prop title="in" option={[true, false]} sub="Backdrop" state={page.stateComponentProps} stateData={stateComponentProps}/>
            <Prop title="mask" option={[true, 'primary']} sub="Backdrop" state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <Panel bc-position-relative bc-width-full bs-height="100px">
            123<br />
            123<br />
            123<br />
            <Backdrop {...stateCommonProps} {...stateComponentProps.Backdrop}></Backdrop>
          </Panel>
        </Group>







        <Panel bc-padding-a- bc-bg-color="view">gadget</Panel>

        <Group title="BackTop" {...groupProps}>
          <Group.Prop>
            <Prop title="in" option={[true, false]} sub="Backdrop" state={page.stateComponentProps} stateData={stateComponentProps}/>
            <Prop title="mask" option={[true, 'primary']} sub="Backdrop" state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <BackTop></BackTop>
        </Group>

        <Group title="Button" {...groupProps}>
          <Group.Prop>
            <Prop title="justify" sub="Button.Group" state={page.stateComponentProps} stateData={stateComponentProps}/>
            <Prop title="separator" sub="Button.Group" state={page.stateComponentProps} stateData={stateComponentProps}/>
            <Prop title="stacked" sub="Button.Group" state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <Group.Item title="button">
            <Button {...stateCommonProps}>button</Button>
          </Group.Item>
          <Group.Item title="button group">
            <Button.Group {...stateComponentProps['Button.Group']} {...stateCommonProps}>
              <Button >button1</Button>
              <Button >button2</Button>
              <Button >button3</Button>
            </Button.Group>
          </Group.Item>
        </Group>

        <Group title="Field" {...groupProps}>
          <Group.Item title="text">
            <Field {...stateCommonProps} type="text" />
          </Group.Item>
          <Group.Item title="static">
            <Field {...stateCommonProps} type="static" />
            <Field {...stateCommonProps} type="static" value="value" />
          </Group.Item>
          <Group.Item title="textarea">
            <Field {...stateCommonProps} type="textarea" />
          </Group.Item>
          <Group.Item title="checkbox">
            <Field {...stateCommonProps} type="checkbox" />
          </Group.Item>
          <Group.Item title="radio">
            <Field {...stateCommonProps} type="radio" />
          </Group.Item>
          <Group.Item title="switch">
            <Field {...stateCommonProps} type="switch" />
          </Group.Item>
          <Group.Item title="file">
            <Field {...stateCommonProps} type="file">open</Field>
          </Group.Item>
          <Group.Item title="before after">
            <Field containerProps={stateCommonProps} before="b" after="a" />
          </Group.Item>
        </Group>

        <Group title="Icon" {...groupProps}>
          <Group.Item title="svg">
            <Icon {...stateCommonProps} name="star" />
          </Group.Item>
          <Group.Item title="img">
            <Icon {...stateCommonProps} src={img} />
          </Group.Item>
          <Group.Item title="char">
            <Icon {...stateCommonProps} char='B' />
          </Group.Item>
          <Group.Item title="shape">
            <Icon {...stateCommonProps} shape='triangle' />
          </Group.Item>
        </Group>

        <Group title="Space" {...groupProps}>
          <Prop 
            title="count" sub="Space"
            option={{type: 'range', min: 1, max: 5}} 
            state={page.stateComponentProps} stateData={stateComponentProps}/>
          <Group.Item title="space">
            <Space count={1} {...stateCommonProps} {...stateComponentProps.Space} />
          </Group.Item>
          <Group.Item title="wrap">
            <Space count={1} stacked {...stateCommonProps} {...stateComponentProps.Space} />
          </Group.Item>
        </Group>

        <Group title="Carousel" {...groupProps}>
          <Prop 
            title="controller" sub="Carousel"
            state={page.stateComponentProps} stateData={stateComponentProps} />
          <Prop 
            title="pager" sub="Carousel"
            state={page.stateComponentProps} stateData={stateComponentProps} />
          <Prop 
            title="autoPlay" sub="Carousel"
            state={page.stateComponentProps} stateData={stateComponentProps} />
          <Prop 
            title="pauseOnHover" sub="Carousel"
            state={page.stateComponentProps} stateData={stateComponentProps} />
          <Carousel {...stateComponentProps.Carousel}>
            {Array.from(Array(5), (v,i)=>i).map(v=>(
              <Carousel.Item 
                component={Panel.AspectRatio} 
                ratio={0.1} bs-background={`rgb(${v*10+50},${v*10+50},${v*10+50}`} bc-text-align-center bc-text-color-white
                onClick={()=>alert(v)}
                key={v} >
                {v}
              </Carousel.Item>
            ))}
          </Carousel>
        </Group>

        <Group title="Loader" {...groupProps}>
          <Group.Prop>
            <Prop 
              title="progress" sub="Loader"
              option={{type: 'range', min: 0, max: 100}} 
              state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <Group.Item title="circle progress">
            <Loader {...stateCommonProps} type="circle" isProgress {...stateComponentProps.Loader} />
          </Group.Item>
          <Group.Item title="circle">
            <Loader {...stateCommonProps} type="circle" />
          </Group.Item>
          <Group.Item title="line progress">
            <Loader {...stateCommonProps} type="line" isProgress {...stateComponentProps.Loader} />
          </Group.Item>
          <Group.Item title="line">
            <Loader {...stateCommonProps} type="line" />
          </Group.Item>
        </Group>






        <Panel bc-padding-a- bc-bg-color="view">layout</Panel>

        <Group title="Panel" {...groupProps}>
          <Panel {...stateCommonProps}>Panel</Panel>
        </Group>

        <Group title="Panel.Container" {...groupProps}>
          <Group.Prop>
            <Prop 
              title="type" sub="Panel.Container" option={['single', 'justify', 'primary', 'flex']} 
              state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <Group.Item title="Panel.Container">
            <Panel.Container {...stateComponentProps['Panel.Container']}>
              <Panel.Container>1</Panel.Container>
              <Panel.Container selected subTypePrimary>2</Panel.Container>
              <Panel.Container>3</Panel.Container>
            </Panel.Container>
          </Group.Item>
        </Group>

        <Group title="Panel.AspectRatio" {...groupProps}>
          <Group.Prop>
            <Prop 
              title="ratio" sub="Panel.AspectRatio" option={{type: 'range', min: 0, max: 10}} 
              state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <Group.Item title="Panel.AspectRatio">
            <Panel.AspectRatio bc-bg-color-primary ratio={stateComponentProps['Panel.AspectRatio']&&(stateComponentProps['Panel.AspectRatio'].ratio/10)}>ratio={stateComponentProps['Panel.AspectRatio']&&(stateComponentProps['Panel.AspectRatio'].ratio/10)}</Panel.AspectRatio>
          </Group.Item>
        </Group>

        <Group title="Panel.Icon" {...groupProps}>
          <Group.Prop>
            <Prop 
              title="position" sub="Panel.Icon" option={['left', 'right', 'top', 'bottom']} 
              state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <Group.Item title="Panel.Icon">
            <Panel.Icon icon="view_comfy" {...stateComponentProps['Panel.Icon']}>content</Panel.Icon>
          </Group.Item>
        </Group>

        <Group title="Panel.Loader" {...groupProps}>
          <Group.Prop>
            <Prop 
              title="position" sub="Panel.Loader" option={['left', 'right', 'top', 'bottom']} 
              state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <Group.Item title="Panel.Loader">
            <Panel.Loader icon="view_comfy" {...stateComponentProps['Panel.Loader']}>content</Panel.Loader>
          </Group.Item>
        </Group>

        <Group title="List" {...groupProps}>
          <Group.Prop>
            <Prop 
              title="separatorInset" sub="List"
              state={page.stateComponentProps} stateData={stateComponentProps}/>
            <Prop 
              title="commonPropsToItem" sub="List"
              state={page.stateData} stateData={stateData}/>
          </Group.Prop>
          <List 
            header="header" footer="footer" {...stateComponentProps['List']}
            {...(!(stateData.List&&stateData.List.commonPropsToItem)?stateCommonProps:{})}>
            {Array.from(Array(3), (v,i)=>i).map(i=>(
              <List.Item
                title={'title'+i} media={'media'+i} subTitle={'subTitle'+i} desc={'desc'+i} after={'after'+i} 
                onClick={()=>alert(i)} 
                key={i} {...(stateData.List&&stateData.List.commonPropsToItem?stateCommonProps:{})}/>
            ))}
          </List>
        </Group>

        <Group title="NavBar" {...groupProps}>
          <NavBar {...stateCommonProps}>
            <NavBar.Item icon="left" iconProps={{defaultName: '<'}}>back</NavBar.Item>
            <NavBar.Title>NavBar.Title</NavBar.Title>
          </NavBar>
        </Group>

        <Group title="Tabs" {...groupProps}>
          <Tabs {...stateCommonProps}>
            <Tabs.Item title="title1">tabs1</Tabs.Item>
            <Tabs.Item title="title2">tabs2</Tabs.Item>
            <Tabs.Item title="title3">tabs3</Tabs.Item>
          </Tabs>
        </Group>

        <Group title="TabBar" {...groupProps}>
          <Group.Prop>
            <Prop 
              title="commonPropsToItem" sub="TabBar"
              state={page.stateData} stateData={stateData}/>
          </Group.Prop>
          <TabBar {...(!(stateData.TabBar&&stateData.TabBar.commonPropsToItem)?stateCommonProps:{})}>
            {[['left','<'],['right','>'],['up','^'],['down','|']].map(([name, defaultName],i)=>(
              <TabBar.Item 
                key={name}
                icon={name} iconProps={{defaultName}} 
                {...(stateData.TabBar&&stateData.TabBar.commonPropsToItem?stateCommonProps:{})} 
                selected={i===0}>
                {name}
              </TabBar.Item >
            ))}
          </TabBar>
        </Group>

        


        <Panel bc-padding-a- bc-bg-color="view">popup</Panel>
        
        <Group title="Fab" {...groupProps}>
          <Group.Prop>
            <Prop title="h" option={['start','center','end']} sub="Fab" state={page.stateComponentProps} stateData={stateComponentProps}/>
            <Prop title="v" option={['start','center','end']} sub="Fab" state={page.stateComponentProps} stateData={stateComponentProps}/>
            <Prop title="margin" option={[true, false]} sub="Fab" state={page.stateComponentProps} stateData={stateComponentProps}/>
            <Prop title="container" option={[true, false]} sub="Fab" state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <Panel bc-position-relative bc-width-full bs-height="150px">
            <Fab {...stateComponentProps.Fab}>Fab1</Fab>
          </Panel>
        </Group>

        <Group title="Popover" {...groupProps}>
          <Group.Prop>
            <Prop 
              title="placement" sub="Popover" 
              option={['bottom-auto-full','right-auto-center']} 
              state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <Popover inline {...stateCommonProps} overlay={<div>123<br/>123<br/>123<br/></div>} container {...stateComponentProps.Popover}>popover</Popover>
        </Group>

      </Panel>
    </View>
  );
};

Component.controller = app=>({
  stateCommonProps: app.plugins.getPluginById().stateCommonProps._id,
  stateComponentProps: app.plugins.getPluginById().stateComponentProps._id,
  stateComponentSwitchs: app.plugins.getPluginById().stateComponentSwitchs._id,
})

export default Component;