import React from 'react';
import NavBar from '../components/navbar'
import List from '../components/list'


export default props=>{
  let { app, page } = props;

  return (
    <div className="bg-color-white width-full height-full flex-display-block flex-direction-v">
      <NavBar title="功能插件" onBack={()=>app.router.back()} />
      <div className="scrollable-y- flex-sub-flex-extend">
        <List className="margin-bottom-2x">
          <List.Item title="base64" desc="base64 编码" className="text-weight-bold text-size-lg" />
          <List.Item title="编码 - abc" desc={app.utils.base64encode('abc')} />
          <List.Item title="解码 - YWJj" desc={app.utils.base64decode('YWJj')} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="md5" desc="md5 编码" className="text-weight-bold text-size-lg" />
          <List.Item title="编码 - abc" desc={app.utils.md5('abc')} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="format" desc="格式化输出" className="text-weight-bold text-size-lg" />
          <List.Item title="货币 - 1.2" desc={app.format.money(1.2)} />
          <List.Item title="时间 - now" desc={app.format.time(new Date())} />
          <List.Item title="字节大小 - 2018" desc={app.format.byteSize(2018)} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="storage - 本地存储" desc={JSON.stringify(app.storage.getObj('demo-storage-obj')||{})} className="text-weight-bold text-size-lg" />
          <List.Item title="add tick" onClick={()=>{ let obj = app.storage.getObj('demo-storage-obj')||{}; app.storage.setObj('demo-storage-obj', { count: Number(obj.count||0)+1 }); page.forceUpdate() }} />
          <List.Item title="移除" onClick={()=>{ app.storage.remove('demo-storage-obj'); page.forceUpdate() }} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="browser" desc="浏览器操作" className="text-weight-bold text-size-lg" />
          <List.Item title="修改浏览器标题" onClick={()=>{ app.browser.title = (Number(app.browser.title)||0)+1; }} />
          <List.Item title="修改浏览器图标" desc="http://www.faviconico.org/favicon.ico" onClick={()=>{ app.browser.icon = 'http://www.faviconico.org/favicon.ico'; }} />
          <List.Item title="修改 cookie - add tick" desc={app.browser.getCookie('democookie')} onClick={()=>{ app.browser.setCookie('democookie', (Number(app.browser.getCookie('democookie')||0))+1); page.forceUpdate() }} />
          <List.Item title="移除 cookie" desc={app.browser.getCookie('democookie')} onClick={()=>{ app.browser.clearCookie('democookie'); page.forceUpdate() }} />
          <List.Item title="解析查询字符串 a=1&b=2" desc={JSON.stringify(app.browser.queryParse('?a=1&b=2'))} />
          <List.Item title="解析当前地址" desc={JSON.stringify(app.browser.urlParse())}  />
          <List.Item title="格式化地址 - {query: {a:1}}" desc={app.browser.urlFormat({query: {a:1}})} />
          <List.Item title="浏览器外部跳转" desc="http://www.baidu.com/s - {query: {wd:'bnorth'}}" onClick={()=>app.browser.push('http://www.baidu.com/s', {wd:'bnorth'})} />
        </List>
      </div>
    </div>
  )
}