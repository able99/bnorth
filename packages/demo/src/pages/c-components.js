import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel.AspectRatio'
import '@bnorth/components/lib/Panel.Container'
import Button from '@bnorth/components/lib/Button'
import Icon from '@bnorth/components/lib/Icon'
import Space from '@bnorth/components/lib/Space'
import Fab from '@bnorth/components/lib/Fab'
import Tabs from '@bnorth/components/lib/Tabs'
import Loader from '@bnorth/components/lib/Loader'
import Group from '../components/group'
import Prop from '../components/props'
import img from '../../res/aboutme.svg';


let Component = aprops=>{
  let { app, page, stateComponentSwitchs,  stateCommonProps, stateComponentProps } = aprops;
  let groupProps = { app, page, stateComponentSwitchs, stateCommonProps, stateComponentProps };

  return (
    <View bc-bg-color-white>
      <Panel main>
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

        <Group title="Icon" {...groupProps}>
          <Group.Item title="svg">
            <Icon {...stateCommonProps} name="heart" />
          </Group.Item>
          <Group.Item title="img">
            <Icon {...stateCommonProps} src={img} />
          </Group.Item>
          <Group.Item title="char">
            <Icon {...stateCommonProps} char='B' />
          </Group.Item>
        </Group>

        <Group title="Fab" {...groupProps}>
          <Group.Prop>
            <Prop title="h" option={['start','center','end']} sub="Fab" state={page.stateComponentProps} stateData={stateComponentProps}/>
            <Prop title="v" option={['start','center','end']} sub="Fab" state={page.stateComponentProps} stateData={stateComponentProps}/>
            <Prop title="container" option={[true]} sub="Fab" state={page.stateComponentProps} stateData={stateComponentProps}/>
          </Group.Prop>
          <Fab {...stateComponentProps.Fab}>Fab1</Fab>
        </Group>

        <Group title="Panel" {...groupProps}>
          <Group.Item title="Panel">
            <Panel {...stateCommonProps}>Panel</Panel>
          </Group.Item>
          <Group.Item title="Panel.AspectRatio">
            <Panel.AspectRatio ratio={0.5}>w/h=0.5</Panel.AspectRatio>
          </Group.Item>
        </Group>

        <Group title="Space" {...groupProps}>
          <Group.Item title="space">
            <Space count={2} {...stateCommonProps} />
          </Group.Item>
          <Group.Item title="wrap">
            <Space count={2} stacked {...stateCommonProps} />
          </Group.Item>
        </Group>

        <Group title="Tabs" {...groupProps}>
          <Tabs>
            <Tabs.Item title="title1">tabs1</Tabs.Item>
            <Tabs.Item title="title2">tabs2</Tabs.Item>
            <Tabs.Item title="title3">tabs3</Tabs.Item>
          </Tabs>
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
              <Button>button1</Button>
              <Button>button2</Button>
              <Button>button3</Button>
            </Button.Group>
          </Group.Item>
        </Group>
      </Panel>
    </View>
  );
};

Component.controller = app=>({
  stateCommonProps: app.plugins.getByName(app._id).stateCommonProps._id,
  stateComponentProps: app.plugins.getByName(app._id).stateComponentProps._id,
  stateComponentSwitchs: app.plugins.getByName(app._id).stateComponentSwitchs._id,
})

export default Component;