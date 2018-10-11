import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel'
import NavBar from '@bnorth/components/lib/NavBar'
import List from '@bnorth/components/lib/List'


export default aprops=>{
  let { app, page } = aprops;

  return (
    <View>
      <NavBar>
        <NavBar.Item icon="left" iconProps={{defaultName: '<'}} onClick={()=>app.router.back()} />
        <NavBar.Title>Plugins</NavBar.Title>
      </NavBar>
      <Panel main>
        <List bc-margin-bottom->
          <List.Item part="header">network</List.Item>
          <List.Item title="link to demo - data" />
        </List>

        <List bc-margin-bottom->
          <List.Item part="header">request</List.Item>
          <List.Item title="link to demo - data" />
        </List>

        <List bc-margin-bottom->
          <List.Item part="header">validate</List.Item>
          <List.Item title="link to demo - data" />
        </List>

        <List bc-margin-bottom->
          <List.Item part="header">base64</List.Item>
          <List.Item 
            title="encode - abc" 
            after={app.utils.base64encode('abc')} />
          <List.Item 
            title="encode - YWJj" 
            after={app.utils.base64decode('YWJj')} />
        </List>

        <List bc-margin-bottom->
          <List.Item part="header">md5</List.Item>
          <List.Item 
            title="md5 - abc" 
            desc={app.utils.md5('abc')} />
        </List>

        <List bc-margin-bottom->
          <List.Item part="header">format</List.Item>
          <List.Item 
            title="money - 1.2" 
            after={app.format.money(1.2)} />
          <List.Item 
            title="time - now" 
            after={app.format.time(new Date())} />
          <List.Item 
            title="byteSize - 2018" 
            after={app.format.byteSize(2018)} />
        </List>

        <List bc-margin-bottom->
          <List.Item part="header">storage</List.Item>
          <List.Item 
            title="click to add the local storage" 
            onClick={()=>{
              app.storage.set('demo-storage', (Number(app.storage.get('demo-storage')||0))+1);
              page.forceUpdate()
            }}
            after={app.storage.get('demo-storage')} />
          <List.Item 
            title="click to add the local storage object" 
            onClick={()=>{
              let obj = app.storage.getObj('demo-storage-obj')||{};
              app.storage.setObj('demo-storage-obj', {
                count: Number(obj.count||0)+1,
              });
              page.forceUpdate()
            }}
            after={JSON.stringify(app.storage.getObj('demo-storage-obj'))} />
          <List.Item
            title="click to remove the local storage obj"
            onClick={()=>{
              app.storage.remove('demo-storage-obj');
              page.forceUpdate();
            }} />
          <List.Item 
            title="click to add the session storage" 
            onClick={()=>{
              app.storageSession.set('demo-storage', (Number(app.storageSession.get('demo-storage')||0))+1);
              page.forceUpdate()
            }}
            after={app.storageSession.get('demo-storage')} />
        </List>

        <List bc-margin-bottom->
          <List.Item part="header">browser</List.Item>
          <List.Item 
            title="click to add browser title" 
            onClick={()=>{ app.browser.title = (Number(app.browser.title)||0)+1; }} />
          <List.Item 
            title="click to set icon http://www.faviconico.org/favicon.ico" 
            onClick={()=>{ app.browser.icon = 'http://www.faviconico.org/favicon.ico'; }} />
          <List.Item 
            title="click to add cookie" 
            onClick={()=>{
              app.browser.setCookie('democookie', (Number(app.browser.getCookie('democookie')||0))+1);
              page.forceUpdate()
            }}
            after={app.browser.getCookie('democookie')} />
          <List.Item
            title="click to remove cookie"
            onClick={()=>{
              app.browser.clearCookie('democookie');
              page.forceUpdate();
            }} />
          <List.Item 
            title="parse query string a=1&b=2" 
            desc={JSON.stringify(app.browser.queryParse('?a=1&b=2'))} />
          <List.Item 
            title="query stringify {a:1,b:2}" 
            desc={JSON.stringify(app.browser.queryStringify({a:1,b:2}))} />
          <List.Item 
            title="parse url" 
            desc={JSON.stringify(app.browser.urlParse())} />
          <List.Item 
            title="format url {query: {a:1}}" 
            desc={app.browser.urlFormat({query: {a:1}})} />
          <List.Item 
            title="click to push to baidu with {a:1}" 
            onClick={()=>app.browser.push('http://www.baidu.com', {a:1})} />
          <List.Item 
            title="click to back" 
            onClick={()=>app.browser.back()} />
        </List>
      </Panel>
    </View>
  );
};