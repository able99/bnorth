import React from 'react';
import Panel from '@bnorth/components/lib/Panel'
import PullRefresh from '@bnorth/components/lib/PullRefresh'
import List from '@bnorth/components/lib/List'
import Dropload from '@bnorth/components/lib/Dropload';
import BackTop from '@bnorth/components/lib/BackTop';
import Field from '@bnorth/components/lib/Field';
import Popover from '@bnorth/components/lib/Popover';
import Button from '@bnorth/components/lib/Button';
import Icon from '@bnorth/components/lib/Icon';





export let Search = aprops=>{
  let { page, stateData } = aprops;

  return (
    <Panel page main>
      <Field 
        containerProps={{className: 'border-set-bottom- padding-a-xxs', 'b-style': 'white'}} 
        value={stateData.keyword} onChange={e=>page.stateData.set('keyword', e.target.value)} placeholder="输入查询字符串" autoFocus="autofocus"
        before={<Button onClick={()=>page.actionGoBack()} b-style="plain"><Icon name="left" /></Button>}
        onEnterPress={()=>page.actionSubmit()} after={<Button onClick={()=>page.actionSubmit()} b-style="plain">搜索</Button>} />
      <List>
      </List>
    </Panel>
  );
};

Search.controller = (app,page)=>({
  stateData: { initialization: {keyword: page.props.route.params.keyword} },

  actionSubmit: ()=>{
    let keyword = page.stateData.data().keyword;
    app.event.emit(page.props.route.params.pageid||app._id, 'onPageSearchKeyword', keyword);
    app.router.back();
  }
})







let Component = aprops=>{
  let { app, page, stateData, stateList, stateListExt } = aprops;

  return (
    <Panel page full>
      <Field 
        containerProps={{className: 'border-set-bottom- padding-a-xxs', 'b-style': 'white'}} b-theme="light"
        type="static" value={stateData.keyword||'输入查询字符串'} onClick={e=>app.router.push(['search', stateData.keyword, page._id])}
        before={<Button onClick={()=>page.actionGoBack()} b-style="plain"><Icon name="left" /></Button>} />

      <Panel className="border-set-bottom- bg-color-white flex-display-block flex-align-center">
        <Popover 
          componentTransform={Button} b-style="plain" className="flex-sub-flex-extend" placement="bottom-auto-full"
          overlay={<List>{['分类A','分类B','分类C'].map(v=><List.Item onClick={()=>page.stateList.fetch({type: v})} title={v} key={v} />)}</List>} >
          {stateData.type||'全部分类'}
        </Popover>
        <Button b-style="plain" className="flex-sub-flex-extend" onClick={()=>{
          if(!stateData.order) page.stateList.fetch({order: 'asc'});
          if(stateData.order==='asc') page.stateList.fetch({order: 'desc'});
          if(stateData.order==='desc') page.stateList.fetch({order: ''});
        }}>
          <div className="flex-display-block flex-justify-center flex-align-center">
            <span>排序</span>
            <span className="flex-display-inline flex-direction-v">
              <Icon name="up" b-size="xs" b-theme={stateData.order==='asc'&&'primary'} />
              <Icon name="down" b-size="xs" b-theme={stateData.order==='desc'&&'primary'} />
            </span>
          </div>
        </Button>
      </Panel>
      <PullRefresh bc-flex-sub-flex-extend onLoad={()=>page.stateList.fetch(null)} isLoading={stateListExt.fetching} >
        <List>
          {stateList.map(({type, data, num:i})=>(
            <List.Item
              mediaProps={{className: 'bg-color-view flex-display-block flex-justify-center flex-align-center', style:{width: 40, height: 40}}} media={String(i)}
              titleProps={{className: 'text-truncate-1'}} title={data+'-abcdefghijklmnopqrstuvwxyz'}  
              desc={type||'全部分类'} after={(i/10).toFixed(2)} onClick={()=>alert(data)} key={i}/>
          ))}
        </List>
        <BackTop dock />
        <Dropload disabled={!stateList.length||(stateList.length%stateData.pageSize)} isLoading={stateListExt.fetching}  onLoad={()=>page.stateList.fetch(null, true)} />
      </PullRefresh>
    </Panel>
  );
};


Component.controller = (app,page)=>({
  stateData: {initialization: { pageStart: 0, pageSize: 20, order: '', type: '', keyword: page.props.route.params.keyword||'' }},

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
    url: '/test/lists',
    data: ()=>page.stateData.data(),
  },

  onPageSearchKeyword: keyword=>{
    page.stateList.fetch({keyword, order: '', type: ''});
  }
})


export default Component;