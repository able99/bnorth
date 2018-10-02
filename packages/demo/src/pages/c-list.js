import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel.PullRefresh'
import List from '@bnorth/components/lib/List'
import InfiniteScroll from '@bnorth/components/lib/InfiniteScroll';
import BackTop from '@bnorth/components/lib/BackTop';


let Component = aprops=>{
  let { app, page, stateData, stateList, stateListExt } = aprops;
  app.log.debug('page: c-list',stateData,stateList,stateListExt);

  return (
    <View>
      <Panel main>
        <Panel.PullRefresh 
          bc-height-full bc-scrollable-y- 
          onLoad={()=>page.stateList.fetch(null)}
          isLoading={stateListExt.fetching} >
          <List>
            {stateList.length?<List.Item part='header'>header</List.Item>:null}
            {stateList.map(i=>(
              <List.Item name="aaa"
                title={'title'+i} media={'media'+i} subTitle={'subTitle'+i} desc={'desc'+i} after={'after'+i} 
                onClick={()=>alert(i)} 
                key={i}/>
            ))}
            {stateList.length?<List.Item part='footer'>footer</List.Item>:null}
          </List>
          <BackTop container />
          <InfiniteScroll
            disabled={!stateList.length||(stateList.length%stateData.pageSize)}
            isLoading={stateListExt.fetching}  
            onLoading={()=>page.stateList.fetch(null, true)}  />
        </Panel.PullRefresh>
      </Panel>
    </View>
  );
};

Component.controller = (app,page)=>({
  stateData: {
    initialization: {
      pageStart: 0,
      pageSize: 20,
      keyword: '',
    }
  },

  stateList: {
    state: {
      constructor: app.Request, 
      fetch: (data, more)=>{
        let stateData = page.stateData.data();
        page.stateData.update({pageStart: !more?0:(stateData.pageStart+stateData.pageSize),...data})
          .then(()=>app.Request.prototype.fetch.apply(page.stateList, [{append: more}]))
      },
    },
    initialization: [], fetchOnStart: true, trackState: true, 
    data: ()=>page.stateData.data(),
    request: ({data, append}, request)=>{
      data = data();
      return new Promise((resolve, reject)=>{
        setTimeout(()=>{
          resolve({ data: Array.from({length:data.pageStart<120?20:8},(v,k)=>k+data.pageStart) });
        }, append?3000:1000);
      });
    },
  },
})


export default Component;