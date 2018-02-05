export default function(app, props, container) {
  container.states.detail = app.actionStates.request({
    updateOnStart: true,
    resource: '',
  });

  container.states.data = app.actionStates.data({
    initData: {},
  })


  container.actions.submit = ()=>()=>{
    
  }


  container.handlers.onStart = ()=>{

  }
}