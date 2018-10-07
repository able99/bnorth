import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel.PullRefresh'
import List from '@bnorth/components/lib/List'
import InfiniteScroll from '@bnorth/components/lib/InfiniteScroll';
import BackTop from '@bnorth/components/lib/BackTop';
import Field from '@bnorth/components/lib/Field';
import Popover from '@bnorth/components/lib/Popover';
import Button from '@bnorth/components/lib/Button';
import Icon from '@bnorth/components/lib/Icon';


let Component = aprops=>{
  let { app, page, stateData, stateList, stateListExt } = aprops;
  app.log.debug('page: c-list',stateData,stateList,stateListExt);

  return (
    <View>
        <Field 
          containerProps={{className: 'padding-a- border-set-bottom-'}}
          className="padding-a- border-set-a- border-radius- bg-color-white bg-none-- border-none-a--"
          value={stateData.keyword||'input search keyword'}
          onClick={e=>app.router.push(['search', stateData.keyword||'', page._id])}
          before=" " />

        <Panel className="border-set-bottom- bg-color-white flex-display-block flex-align-center">
          <Popover 
            component={Button}
            b-style="plain"
            className="flex-sub-flex-extend"
            overlay={
              <List>
                {types.map(v=>(
                  <List.Item 
                    onClick={()=>page.stateList.fetch({type: v})}
                    title={v} />
                ))}
              </List>
            }
            placement="bottom-auto-full">
            {stateData.type||'All types'}
          </Popover>
          <Button b-style="plain" className="flex-sub-flex-extend" onClick={()=>{
            if(!stateData.order) page.stateList.fetch({order: 'asc'});
            if(stateData.order==='asc') page.stateList.fetch({order: 'desc'});
            if(stateData.order==='desc') page.stateList.fetch({order: ''});
          }}>
            <div className="flex-display-block flex-justify-center flex-align-center">
              <span>order</span>
              <span className="flex-display-inline flex-direction-v">
                <Icon name="up" b-size="xs" b-theme={stateData.order==='asc'&&'primary'} />
                <Icon name="down" b-size="xs" b-theme={stateData.order==='desc'&&'primary'} />
              </span>
            </div>
          </Button>
        </Panel>

        <Panel.PullRefresh 
          bc-height-full bc-scrollable-y- 
          onLoad={()=>page.stateList.fetch(null)}
          isLoading={stateListExt.fetching} >
          <List separatorInset>
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
    </View>
  );
};

Component.controller = (app,page)=>({
  stateData: {
    initialization: {
      pageStart: 0,
      pageSize: 20,
      order: '',
      type: '',
      keyword: page.props.route.params.keyword,
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
        let result = listData;
        if(data.order==='desc') result = Array.from(listData).reverse();
        result = result
          .filter(v=>!data.keyword?true:v.includes(data.keyword))
          .slice(data.pageStart, data.pageStart+data.pageSize)
          .map(v=>(data.type?data.type:'')+v)
        setTimeout(()=>resolve({ data: result}), append?1500:1000);
      });
    },
  },

  onPageSearchKeyword: keyword=>{
    page.stateList.fetch({keyword, order: '', type: ''});
  }
})

let listData = Array.from({length: 168}, (v,i)=>String(i).padStart(3,'0'));
let types = ['A','B','C'];

export default Component;