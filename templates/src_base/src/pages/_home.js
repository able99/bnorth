export default function(app, props, container) {
  container.actions.test = ()=>()=>{
    alert('welcome');
  }
}