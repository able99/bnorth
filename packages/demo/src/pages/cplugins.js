import React from 'react';
import NavBar from '../components/navbar'
import List from '../components/list'


export default props=>{
  let { app } = props;

  return (
    <div className="bg-color-white width-full height-full flex-display-block flex-direction-v">
      <NavBar title="组件插件列表" onBack={()=>app.router.back()} />
      <div className="scrollable-y- flex-sub-flex-extend">
        <List className="margin-bottom-2x">
          <List.Item title="modal" desc="模态对话框" className="text-weight-bold text-size-lg" />
          <List.Item title="打开" onClick={()=>app.modal.show('modal')} />
          <List.Item title="打开 alert" onClick={()=>app.modal.show('modal', {type: 'alert', onAction: index=>{index>=0&&alert('ok')}})} />
          <List.Item title="打开 prompt" onClick={()=>app.modal.show('modal', {type: 'prompt', onAction: index=>{index>0&&alert('ok')}})} />
          <List.Item title="打开 popup" onClick={()=>app.modal.show('modal', {type: 'popup', })} />
          <List.Item title="打开 带 title 带 close" onClick={()=>app.modal.show('modal', {title: 'title', close: true})} />
          <List.Item title="打开 带状态数据" onClick={()=>app.modal.show(props=>(
            <div>
              弹出层 - 状态 - {JSON.stringify(props.stateData)}
              <div onClick={()=>props.states.stateData.update({tick:props.stateData.tick+1})}>点击更新 tick</div>
              <div onClick={()=>props.app.modal.close(props._id)}>点击关闭</div>
            </div>
          ), {
            title: 'title', close: true, 
            onAction: (index, _id)=>{
              alert(JSON.stringify(app.router.getPopLayerStates(_id)));
            },
            options:{
              optionProps: ({stateData={}})=>({title: stateData.tick}), 
              data: {initialization: {tick: 1}}
            }
          })} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="notice" desc="消息通知" className="text-weight-bold text-size-lg" />
          <List.Item title="打开" onClick={()=>app.notice.show('notice')} />
          <List.Item title="关闭" onClick={()=>app.notice.close()} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="mask" desc="蒙层" className="text-weight-bold text-size-lg" />
          <List.Item title="打开" onClick={()=>{app.mask.show('3秒后关闭');window.setTimeout(()=>app.mask.close(), 3000)}} />
        </List>

        <List className="margin-bottom-2x">
          <List.Item title="loader" desc="加载指示器" className="text-weight-bold text-size-lg" />
          <List.Item title="打开 可多次点击" onClick={()=>app.loader.show()} />
          <List.Item title="关闭 需多次关闭" onClick={()=>app.loader.close()} />
        </List>
      </div>
    </div>
  )
}

// import React from 'react';
// import View from '@bnorth/components/lib/View'
// import Panel from '@bnorth/components/lib/Panel'
// import List from '@bnorth/components/lib/List'

// let length = 7;
// let data1 = [{id: -1, name: 'all'}];
// let data2 = [];
// let data3 = [];
// for(let i=0; i<=length; i++) {
//   data1.push({name: `${i}`});
// }
// for(let i=0; i<=length; i++) {
//   for(let j=0; j<=length; j++) {
//     data2.push({pid: `${i}`, name: `${i}${j}`});
//   }
// }
// for(let i=0; i<=length; i++) {
//   for(let j=0; j<=length; j++) {
//     for(let k=0; k<=length; k++) {
//       data3.push({pid: `${i}${j}`, name: `${i}${j}${k}`});
//     }
//   }
// }
// let data = [data1, data2, data3];


// let Component = aprops=>{
//   let { app,page,stateData } = aprops;

//   return (
//     <View>
//       <Panel main>
//         <List bc-margin-bottom->
//           <List.Item part="header">picker</List.Item>
//           <List.Item 
//             title="show" 
//             after={JSON.stringify(stateData.picker)}
//             onClick={()=>app.picker.show(data, {index: stateData.picker, onConfirm: (e,e2)=>page.stateData.set('picker', e)})} />
//           <List.Item 
//             title="time" 
//             after={stateData.pickertime}
//             onClick={()=>app.picker.time(stateData.pickertime, {onConfirm: (e,e2)=>{page.stateData.set('pickertime', e)}})} />
//           <List.Item 
//             title="date" 
//             after={stateData.pickerdate}
//             onClick={()=>app.picker.date(stateData.pickerdate, {onConfirm: (e,e2)=>{
//               if(e>'2020-00-00') { app.notice.show('can not more then 2020');return false;}
//               page.stateData.set('pickerdate', e)
//             }})} />
//         </List>

//         <List bc-margin-bottom->
//           <List.Item part="header">notice</List.Item>
//           <List.Item 
//             title="show" 
//             onClick={()=>app.notice.show('dismiss after 3s')} />
//           <List.Item 
//             title="close button" 
//             onClick={()=>app.notice.show('dismiss after 3s', {hasClose: true})} />
//           <List.Item 
//             title="theme" 
//             onClick={()=>app.notice.show('dismiss after 3s', {'b-theme': 'alert'})} />
//           <List.Item 
//             title="close notice" 
//             onClick={()=>app.notice.close()} />
//         </List>

//         <List bc-margin-bottom->
//           <List.Item part="header">mask</List.Item>
//           <List.Item 
//             title="show" 
//             after="dismiss after 3s"
//             onClick={()=>{app.mask.show();setTimeout(()=>app.mask.close(),3000)}} />
//           <List.Item 
//             title="content" 
//             after="dismiss after 3s"
//             onClick={()=>{app.mask.show({loaderProps:{children: 'waiting'}});setTimeout(()=>app.mask.close(),3000)}} />
//           <List.Item 
//             title="theme" 
//             onClick={()=>app.mask.show({cTheme: 'alert', mask: false})} />
//         </List>

//         <List bc-margin-bottom->
//           <List.Item part="header">loading</List.Item>
//           <List.Item 
//             title="show" 
//             onClick={()=>app.loading.show()} />
//           <List.Item 
//             title="show theme" 
//             onClick={()=>app.loading.show({'b-theme':'alert'})} />
//           <List.Item 
//             title="reset" 
//             after="set to 60"
//             onClick={()=>app.loading.reset(60)} />
//           <List.Item 
//             title="close" 
//             onClick={()=>app.loading.close()} />
//         </List>

//         <List bc-margin-bottom->
//           <List.Item part="header">modal</List.Item>
//           <List.Item 
//             title="normal" 
//             onClick={()=>app.modal.show('modal', {options:{_idPage:page._id}})} />
//           <List.Item 
//             title="title" 
//             onClick={()=>app.modal.show('modal', {title: 'title'})} />
//           <List.Item 
//             title="theme" 
//             onClick={()=>app.modal.show('modal', {title: 'title', 'b-theme': 'primary'})} />
//           <List.Item 
//             title="title and close button" 
//             onClick={()=>app.modal.show('modal', {title: 'title', hasTitleClose: true})} />
//           <List.Item 
//             title="role:alert" 
//             onClick={()=>app.modal.show('modal',{role: 'alert'})} />
//           <List.Item 
//             title="role:prompt" 
//             onClick={()=>app.modal.show('modal', {role: 'prompt'})} />
//           <List.Item 
//             title="role:popup" 
//             onClick={()=>app.modal.show('modal', {role: 'popup'})} />
//           <List.Item 
//             title="role:document" 
//             onClick={()=>app.modal.show('modal', {role: 'document'})} />
//           <List.Item 
//             title="state" 
//             onClick={()=>app.modal.show(
//               ({modalId, modalState, modalStateData})=>(
//                 <div>
//                   <strong>modalId: {modalId}</strong>
//                   <div>input: {modalStateData&&modalStateData.input}</div>
//                   <input className="border-set-a-" onChange={e=>modalState.update({input: e.target.value})} value={(modalStateData&&modalStateData.input)||''}/>
//                 </div>
//               ),{
//                 role: 'prompt',
//                 state: true,
//                 onAction: (index, state, close)=>{
//                   if(index<=0) return;
//                   if(!state||!state.data().input) {app.render.error('请输入'); return false;}
//                   close();
//                   app.render.notice('输入:'+state.data().input);
//                 }
//               })
//             } />
//         </List>
//       </Panel>
//     </View>
//   );
// };


// export default Component;