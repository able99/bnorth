import React from 'react';
import View from '@bnorth/components/lib/View'
import Panel from '@bnorth/components/lib/Panel.PullRefresh'
import List from '@bnorth/components/lib/List'
import Field from '@bnorth/components/lib/Field'
import Button from '@bnorth/components/lib/Button';
import Icon from '@bnorth/components/lib/Icon';


let Component = aprops=>{
  let { page, stateData } = aprops;

  return (
    <View>
      <Panel main>
        <Field 
          containerProps={{className: 'padding-a- border-set-bottom-'}}
          className="padding-a- border-set-a- border-radius- bg-color-white bg-none-- border-none-a--"
          value={stateData.keyword}
          onInput={e=>page.stateData.set('keyword', e.target.value)}
          placeholder="input search keyword"
          before={(
            <Button onClick={()=>page.actionGoBack()} b-style="plain"><Icon name="left" /></Button>
          )}
          after={(
            <Button onClick={()=>page.actionSubmit()} b-style="plain">搜索</Button>
          )} />
        <List>
        </List>
      </Panel>
    </View>
  );
};

Component.controller = (app,page)=>({
  stateData: {
    initialization: {
      keyword: page.props.route.params.keyword,
    }
  },

  // onPageAction: (...args)=>console.log('action', args),
  // onPageUpdate: (...args)=>console.log('update', args),

  actionSubmit: ()=>{
    let keyword = page.stateData.data().keyword;
    app.event.emit(page.props.route.params.pageid||app._id, 'onPageSearchKeyword', keyword);
    app.router.back();
  }
})


export default Component;