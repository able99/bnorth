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
      <Groups.Group title="Animation" desc="进入与退出动画组件">
        <Groups.Props data={{
          'type|动画类型，淡入淡出或是折叠': ['fade', 'collapse'],
          'in|进入或是退出': [true, false],
          'dimension|对于折叠动画，设定折叠方向': ['width', 'height'],
        }}/>
        <Groups.Show>
          <Animation>{listGener()}</Animation>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="AspectRatio" desc="横纵比自适应组件">
        <Groups.Props data={{
          'ratio|横纵比例': {type: 'range'},
        }}/>
        <Groups.Show>
          {props=><AspectRatio {...props} ratio={props.ratio/10}>ratio={props.ratio/10}</AspectRatio>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Backdrop" desc="幕布组件">
        <Groups.Props data={{
          'in|进入或者退出': [true, false],
        }}/>
        <Groups.Show>
          {props=><div className="position-relative">{listGener()}<Backdrop children="Backdrop" {...props}/></div>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="BackTop" desc="返回顶部按钮">
        <Groups.Show>
          {props=><Panel data-dock bc-position-relative><Panel bc-width-full bs-height="150px" bc-scrollable-y->{listGener(40)}<BackTop param="100%" dock {...props} /></Panel></Panel>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Button" desc="按钮组件">
        <Groups.Show>
          <Button>button</Button>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Carousel" desc="轮播组件">
        <Groups.Props data={{
          'controller|是否显示控制按钮': true,
          'pager|是否显示分页按钮': true,
          'autoPlay|是否自动播放': true,
          'pauseOnHover|是否支持悬停': false,
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
          {props=><Panel bc-position-relative bc-scrollable-y- bs-height="150px">
            {listGener(stateData.count||10)}
            <Dropload onLoad={()=>{page.stateData.update({isLoading: true}); setTimeout(()=>page.stateData.update({count: (stateData.count||10)+10, isLoading: false}), 3000)}} {...props} isLoading={stateData.isLoading}>loadding</Dropload>
          </Panel>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Fab" desc="浮动按钮">
        <Groups.Props data={{
          'h|悬浮位置': ['start','center','end'],
          'v|悬浮位置': ['start','center','end'],
          'margin|悬浮边距': [true, false],
          'dock|相对于具有 data-dock 属性元素还是父元素': [true, false],
        }}/>
        <Groups.Show>
          {props=><Panel data-dock bc-position-relative><Panel bc-position-relative bc-scrollable-y- bs-height="150px">{listGener(20)}<Fab {...props}>fab</Fab></Panel></Panel>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Field" desc="输入域">
        <Groups.Show>
          <Groups.Sep title="普通文本框" />
          <Field type="text" />
          <Groups.Sep title="受控普通文本框" />
          <Field type="text" onChange={e=>page.stateData.update({text: e.target.value})} value={stateData.text}/>
          <Groups.Sep title="模式输入框 patternName=number" />
          <Field type="text" onChange={e=>page.stateData.update({text1: e.target.value})} value={stateData.text1} patternName="number" />
          <Groups.Sep title="静态文本框 空值" />
          <Field type="static" />
          <Groups.Sep title="静态文本框 有值" />
          <Field type="static" value="value" />
          <Groups.Sep title="多行文本框" />
          <Field type="textarea" />
          <Groups.Sep title="checkbox" />
          <Field type="checkbox" />
          <Groups.Sep title="radio" />
          <Field type="radio" bp-input-name="r1" />
          <Field type="radio" bp-input-name="r1" />
          <Groups.Sep title="开关按钮" />
          <Field type="switch" />
          <Groups.Sep title="文本选择框" />
          <Field type="file">open</Field>
          <Groups.Sep title="带前后元素" />
          {props=><Field containerProps={props} before="前" after="后" />}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Icon" desc="图标组件">
        <Groups.Props data={{
          'rotate|旋转角度': [90,180],
        }}/>
        <Groups.Show>
          <Groups.Sep title="svg 图标，使用名称索引" />
          <Icon {...stateCommonProps} name="star" />
          <Groups.Sep title="图片图标，使用图片地址" />
          <Icon {...stateCommonProps} src={img} />
          <Groups.Sep title="字符图标" />
          <Icon {...stateCommonProps} char='B' />
          <Groups.Sep title="形状图标 - 三角形" />
          <Icon {...stateCommonProps} shape='triangle' />
          <Groups.Sep title="图标文本面板" />
          <PanelIcon name="star" iconSelected="settings" title="title" />
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Landscape" desc="自动横屏，宽度小于高度时自动旋转">
        <Groups.Show><Panel b-style="solid" b-theme="primary" bs-height={500} data-dock><Landscape>{listGener()}</Landscape></Panel></Groups.Show>
      </Groups.Group>
      
      <Groups.Group title="List" desc="列表">
        <Groups.Props data={{
          'separatorInset|缩进': false,
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

      <Groups.Group title="Loader" desc="加载指示器">
        <Groups.Props data={{
          'type|圆形或是线形': ['circle','line'],
          'isProgress|指示进度还是指示加载中': false,
          'progress|进度': {type: 'range', min: 1, max: 100},
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
        <Groups.Props data={{
          'type|类型，如警告，询问，弹出和自定义': ['alert', 'prompt', 'popup', 'document'],
        }}/>
        <Groups.Show>
          {props=><div style={{height: 500}} className="position-relative"><Modal title="title" close {...props}>body</Modal></div>}
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
          {props=><div style={{height: 300}} className="position-relative overflow-hidden"><Notice {...props}>notice</Notice></div>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Panel" desc="面板组件">
        <Groups.Show>
          <Panel>Panel</Panel>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="PanelContainer" desc="容器组件，可包含和组织子元素">
        <Groups.Props data={{
          'ctype|组织类型，如单件，平分，突出，flex 和 滑动': ['single', 'justify', 'primary', 'flex', 'scroll'],
          'selectedIndex|选中子元素序号': [0,1,2,3,4,5],
          'countToShow|滑动时指定显示个数': [1,2],
          'separator|是否显示分隔条': false,
        }}/>
        <Groups.Show>
          <PanelContainer {...stateData} onSelectedChange={selectedIndex=>page.stateData.update({selectedIndex})}>
            {listGener(5, {Component: Panel})}
          </PanelContainer>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Popover" desc="气泡弹出框">
        <Groups.Props data={{
          'placement|弹出位置': ['bottom-auto-full','right-auto-center'],
        }}/>
        <Groups.Show>
          {props=><div className="scrollable-y-" style={{height: 50}}>{listGener()}<Popover inline overlay={listGener()}  {...props}>popover</Popover></div>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="PullRefresh" desc="下拉刷新">
        <Groups.Show>
          {props=><div style={{height: 150}} className="scrollable-y-">
            <PullRefresh onLoad={()=>{page.stateData.update({isLoading: true}); setTimeout(()=>page.stateData.update({isLoading: false}), 3000)}} isLoading={stateData.isLoading} {...props}>{listGener(20, {onClick: ()=>alert(1)})}</PullRefresh>
          </div>}
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="ScrollSpy" desc="滚动监控，监控组件在列表中的位置和滚动事件">
        <Groups.Show>
          {props=><Panel bc-position-relative bc-width-full bs-height="100px" bc-scrollable-y->
            {listGener(10)}
            <div>*****</div>
            <ScrollSpy onRelativeChange={(p)=>page.stateLog.update([p], {append: true})} {...props} />
            <div>*****</div>
            {listGener(10)}
          </Panel>}
        </Groups.Show>
        <Groups.Log logs={stateLog} />
      </Groups.Group>

      <Groups.Group title="Space" desc="生成空白组件">
        <Groups.Props data={{
          'stacked|是否为垂直':  false,
          'count|空白个数': {type: 'range'},
        }}/>
        <Groups.Show>
          <Space count={1} />
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="TabBar" desc="标签页">
        <Groups.Props data={{
          'bp-nav-separator|是否显示分隔符': true, 
          'bp-nav-bp-panelItem-b-style|导航按钮样式风格': ['underline'],
          'position|导航与容器的位置': ['bottom'], 
          'bp-nav-bp-panelItem-position|导航按钮中图标位置': ['top', 'left'],
        }} />
        <Groups.Show>
          <TabBar bs-height={150} bp-container-bp-panelItem-className="scrollable-y-">
            <TabBar.Item title="title1" name="view_comfy">{listGener(20, {children: i=>('tab1-'+i)})}</TabBar.Item>
            <TabBar.Item title="title2" name="settings">{listGener(20, {children: i=>('tab2-'+i)})}</TabBar.Item>
            <TabBar.Item title="title3" name="extension">{listGener(20, {children: i=>('tab3-'+i)})}</TabBar.Item>
          </TabBar>
        </Groups.Show>
      </Groups.Group>

      <Groups.Group title="Touchable" desc="触控监控组件">
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
  stateComponentProps: {},
})


export default Component;