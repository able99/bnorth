export default (app)=>({
  stateInit: { initialization: {tick: 111} },
  stateEvent: { },
  stateNetwork: {state: app.Request, fetchOnStart: true,},
  stateValidate: {state: app.Validate, initialization: {a: 1}, rules: {a: 'required'} },

  onStateUpdated_stateEvent: (data, prevData)=>{app.notice.show(`${JSON.stringify(prevData)}->${JSON.stringify(data)}`)}
});