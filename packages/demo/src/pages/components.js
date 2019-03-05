import React from 'react';
import Groups from '../components/groups'
import listGener from '../components/listgener'
import Animation from '@bnorth/components/lib/Animation'
import AspectRatio from '@bnorth/components/lib/AspectRatio';
import Backdrop from '@bnorth/components/lib/Backdrop'
import BackTop from '@bnorth/components/lib/BackTop';
import Button from '@bnorth/components/lib/Button'
import Carousel from '@bnorth/components/lib/Carousel'
import Dropload from '@bnorth/components/lib/Dropload'
import Fab from '@bnorth/components/lib/Fab'
import Field from '@bnorth/components/lib/Field'
import Icon, { PanelIcon } from '@bnorth/components/lib/Icon'
import Landscape from '@bnorth/components/lib/Landscape'
import List from '@bnorth/components/lib/List'
import Loader, { PanelLoader } from '@bnorth/components/lib/Loader'
import Mask from '@bnorth/components/lib/Mask'
import Modal from '@bnorth/components/lib/Modal'
import Notice from '@bnorth/components/lib/Notice'
import NavBar from '@bnorth/components/lib/NavBar'
import Panel, { PanelContainer } from '@bnorth/components/lib/Panel'
import Popover from '@bnorth/components/lib/Popover'
import PullRefresh from '@bnorth/components/lib/PullRefresh'
import ScrollSpy from '@bnorth/components/lib/ScrollSpy';
import Space from '@bnorth/components/lib/Space'
import TabBar from '@bnorth/components/lib/TabBar'
import Touchable from '@bnorth/components/lib/Touchable';
import img from '../../res/aboutme.svg';


let Component = aprops=>{
  let { app, page, route:{params:{component}}, stateData, stateLog, stateCommonProps:{toSub, ...stateCommonProps}, stateComponentProps } = aprops;
  let groupProps = { app, page, stateData, stateCommonProps, stateComponentProps };

  return (
    <Groups app={app} component={component} {...groupProps}>
      <Groups.Group title="Animation" desc="动画">
        <Groups.Props data={{
          type: ['fade', 'collapse'],
          'in': [true, false],
          dimension: ['width', 'height'],
        }}/>
        <Groups.Show>
          <Animation>{listGener()}</Animation>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="AspectRatio" desc="横纵比">
        <Groups.Props data={{
          ratio: {type: 'range', min: 0, max: 10, fact: 0.1},
        }}/>
        <Groups.Show>
          <AspectRatio>ratio={stateComponentProps.ratio}</AspectRatio>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Backdrop" desc="背景">
        <Groups.Props data={{
          in: [true, false],
        }}/>
        <Groups.Show>
          {props=><Panel>{listGener()}<Backdrop children="Backdrop" {...props}/></Panel>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="BackTop" desc="返回顶部按钮">
        <Groups.Show>
          {props=><Panel data-dock><Panel bc-width-full bs-height="150px" bc-scrollable-y>{listGener(40)}<BackTop param="100%" dock {...props} /></Panel></Panel>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Button" desc="按钮组件">
        <Groups.Show>
          <Button>button</Button>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Carousel" desc="轮播">
        <Groups.Props data={{
          controller: undefined,
          pager: undefined,
          autoPlay: undefined,
          pauseOnHover: undefined,
        }}/>
        <Groups.Show>
          <Carousel>{Array.from(Array(5), (v,i)=>i).map(v=>(<Carousel.Item key={v}
            component={AspectRatio} 
            ratio={0.1} bs-background={`rgb(${v*10+50},${v*10+50},${v*10+50}`} bc-text-align-center bc-text-color-white
            onClick={()=>alert(v)} >
            {v}
          </Carousel.Item>))}</Carousel>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Dropload" desc="上拉刷新">
        <Groups.Show>
          {props=><Panel bc-position-relative bc-scrollable-y bs-height="150px">
            {listGener(stateData.count||10)}
            <Dropload onLoad={()=>{page.stateData.update({isLoading: true}); setTimeout(()=>page.stateData.update({count: (stateData.count||10)+10, isLoading: false}), 3000)}} {...props} isLoading={stateData.isLoading}>loadding</Dropload>
          </Panel>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Fab" desc="浮动按钮">
        <Groups.Props data={{
          h: ['start','center','end'],
          v: ['start','center','end'],
          margin: [true, false],
          dock: [true, false],
        }}/>
        <Groups.Show>
          {props=><Panel data-dock><Panel bc-scrollable-y bs-height="150px">{listGener(20)}<Fab {...props}>fab</Fab></Panel></Panel>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Field" desc="输入域">
        <Groups.Show>
          <Groups.Sep title="text" />
          <Field type="text" />
          <Groups.Sep title="text controlled" />
          <Field type="text" onChange={e=>page.stateData.update({text: e.target.value})} value={stateData.text}/>
          <Groups.Sep title="patternName=number" />
          <Field type="text" onChange={e=>page.stateData.update({text1: e.target.value})} value={stateData.text1} patternName="number" />
          <Groups.Sep title="static 空值" />
          <Field type="static" />
          <Groups.Sep title="static" />
          <Field type="static" value="value" />
          <Groups.Sep title="textarea" />
          <Field type="textarea" />
          <Groups.Sep title="checkbox" />
          <Field type="checkbox" />
          <Groups.Sep title="radio" />
          <Field type="radio" bp-input-name="r1" />
          <Field type="radio" bp-input-name="r1" />
          <Groups.Sep title="switch" />
          <Field type="switch" />
          <Groups.Sep title="file" />
          <Field type="file">open</Field>
          <Groups.Sep title="container" />
          {props=><Field containerProps={props} before="b" after="a" />}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Icon" desc="图标">
        <Groups.Props data={{
          rotate: [90,180],
        }}/>
        <Groups.Show>
          <Groups.Sep title="svg" />
          <Icon {...stateCommonProps} name="star" />
          <Groups.Sep title="img" />
          <Icon {...stateCommonProps} src={img} />
          <Groups.Sep title="char" />
          <Icon {...stateCommonProps} char='B' />
          <Groups.Sep title="shape" />
          <Icon {...stateCommonProps} shape='triangle' />
          <Groups.Sep title="PanelIcon" />
          <PanelIcon name="star" title="title" />
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Landscape" desc="横屏">
        <Groups.Show><Panel b-style="solid" b-theme="primary" bs-height={500} data-dock><Landscape>{listGener()}</Landscape></Panel></Groups.Show>
      </Groups.Group>
      
      <Groups.Group title="List" desc="列表">
        <Groups.Props data={{
          separatorInset: undefined,
        }}/>
        <Groups.Show>
          <List header="header" footer="footer">
            {Array.from(Array(3), (v,i)=>i).map(i=>(<List.Item key={i} 
              title={'title'+i} media={'media'+i} subTitle={'subTitle'+i} desc={'desc'+i} after={'after'+i} 
              onClick={()=>alert(i)} />
            ))}
          </List>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Loader" desc="加载中">
        <Groups.Props data={{
          type: ['circle','line'],
          isProgress: undefined,
          progress: {type: 'range', min: 1, max: 100},
        }}/>
        <Groups.Show>
          <Groups.Sep title="Loader" />
          <Loader />
          <Groups.Sep title="PanelLoader" />
          <PanelLoader title="title" />
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Mask" desc="蒙层">
        <Groups.Show>
          {props=><div style={{height: 500}} className="position-relative"><Mask {...props}>body</Mask></div>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Modal" desc="对话框">
        <Groups.Show>
          {props=><div style={{height: 500}} className="position-relative"><Modal title="title" role="prompt" _precast={{a:1}} close {...props}>body</Modal></div>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="NavBar" desc="标题栏">
        <Groups.Show>
          <NavBar>
            <NavBar.Item name="left:<">back</NavBar.Item>
            <NavBar.Title>NavBar.Title</NavBar.Title>
          </NavBar>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Notice" desc="通知栏">
        <Groups.Show>
          {props=><div style={{height: 300}} className="position-relative"><Notice {...props}>notice</Notice></div>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Panel" desc="面板组件">
        <Groups.Show>
          <Panel>Panel</Panel>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="PanelContainer" desc="面板容器组件">
        <Groups.Props data={{
          type: ['single', 'justify', 'primary', 'flex', 'scroll'],
          selectedIndex: [0,1,2,3,4,5],
          countToShow: [1,2],
          separator: undefined,
        }}/>
        <Groups.Show>
          <PanelContainer {...stateData} onSelectedChange={selectedIndex=>page.stateData.update({selectedIndex})}>
            {listGener(5)}
          </PanelContainer>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Popover" desc="弹出框">
        <Groups.Props data={{
          placement: ['bottom-auto-full','right-auto-center'],
        }}/>
        <Groups.Show>
          {props=><div className="scrollable-y" style={{height: 50}}>{listGener()}<Popover inline overlay={listGener()}  {...props}>popover</Popover></div>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="PullRefresh" desc="下拉刷新">
        <Groups.Show>
          {props=><div style={{height: 150}} className="scrollable-y">
            <PullRefresh onLoad={()=>{page.stateData.update({isLoading: true}); setTimeout(()=>page.stateData.update({isLoading: false}), 3000)}} isLoading={stateData.isLoading} {...props}>{listGener(20, {onClick: ()=>alert(1)})}</PullRefresh>
          </div>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="ScrollSpy" desc="滚动监控">
        <Groups.Show>
          {props=><Panel bc-position-relative bc-width-full bs-height="100px" bc-scrollable-y>
            {listGener(10)}
            <ScrollSpy onRelativeChange={(p)=>page.stateLog.update([p], {append: true})} {...props} />
            {listGener(10)}
          </Panel>}
        </Groups.Show>
        <Groups.Log logs={stateLog} />
      </Groups.Group>

      <Groups.Group title="Space" desc="空白">
        <Groups.Props data={{
          stacked: undefined,
          count: {type: 'range', min: 1, max: 5},
        }}/>
        <Groups.Show>
          <Space count={1} />
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="TabBar" desc="标签页">
        <Groups.Props data={{
          'bp-nav-separator': undefined, 
          'bp-nav-bp-item-b-style': ['underline'],
          position: ['bottom'], 
          'bp-nav-bp-item-position': ['top', 'left'],
        }} />
        <Groups.Show>
          <TabBar bs-height={150} bp-container-bp-item-className="scrollable-y">
            <TabBar.Item title="title1" name="view_comfy">{listGener(20, {children: i=>('tab1-'+i)})}</TabBar.Item>
            <TabBar.Item title="title2" name="settings">{listGener(20, {children: i=>('tab2-'+i)})}</TabBar.Item>
            <TabBar.Item title="title3" name="extension">{listGener(20, {children: i=>('tab3-'+i)})}</TabBar.Item>
          </TabBar>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Touchable" desc="触控">
        <Groups.Show>
          <Touchable recognizers={{'pan':{enable: true}}} onPan={()=>page.stateLog.update(['onPan'], {append: true})} bs-height={50} b-style="solid" b-theme="primary" />
        </Groups.Show>
        <Groups.Log logs={stateLog} />
      </Groups.Group>

    </Groups>
  );
};


Component.controller = app=>({
  stateLog: {initialization: []},
  stateCommonProps: app.plugins.getPluginById().stateCommonProps._id,
  stateComponentProps: app.plugins.getPluginById().stateComponentProps._id,
})


export default Component;