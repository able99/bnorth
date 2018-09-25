import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel.PullRefresh'
import List from '@bnorth/components/lib/List'
import InfiniteScroll from '@bnorth/components/lib/InfiniteScroll';
import BackTop from '@bnorth/components/lib/BackTop';


let Component = aprops=>{
  let { page, stateData } = aprops;

  return (
    <View>
      <Panel main>
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
    </View>
  );
};


export default Component;