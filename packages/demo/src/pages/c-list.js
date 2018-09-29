import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel.PullRefresh'
import List from '@bnorth/components/lib/List'
import InfiniteScroll from '@bnorth/components/lib/InfiniteScroll';
import BackTop from '@bnorth/components/lib/BackTop';


let Component = aprops=>{
  let { page, stateData, stateList } = aprops;

  return (
    <View>
      <Panel main>
        <Panel.PullRefresh 
          bc-height-full bc-scrollable-y- 
          onLoad={()=>page.stateList.fetch({append:false})}
          isLoading={stateData.isLoading} >
          <List>
            <List.Item part='header'>header</List.Item>
            {stateList.map(i=>(
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
            onLoading={()=>{page.stateData.update({isLoadingMore: true}); page.stateList.fetch({append:true}); setTimeout(()=>page.stateData.update({isLoadingMore: false}), 5000)}}  />
        </Panel.PullRefresh>
      </Panel>
    </View>
  );
};

Component.controller = (app,page)=>({
  stateList: {state: app.Request, initialization: [], request: ({append}, request)=>(new Promise((resolve, reject)=>{
    setTimeout(()=>{
      let count = append?request.data().length:0;
      resolve({ data: Array.from({length:20},(v,k)=>k+count) });
    }, 1000);
  }))},
})


export default Component;