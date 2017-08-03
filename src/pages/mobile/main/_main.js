import { stateHoc,StateHocBasetateHocContainer } from '../../../bnorth';

export default stateHoc(class MainContainer extends StateHocBasetateHocContainer{
  constructor(ownProps) {
    super(ownProps);
    
    this.Wraps.home = this.ActionWraps.actionsHttpifFetchWrap({
      updateOnStart: false,
      options:{
        resource: 'home',
      }
    });
  }
})