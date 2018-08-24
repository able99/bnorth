export default (app)=>({
  stateInit: {
    initialization: {tick: 111}
  },

  stateEvent: {
    
  },

  onStateUpdated_stateEvent: (data, prevData)=>{app.notice.show(`${JSON.stringify(prevData)}->${JSON.stringify(data)}`)}
});