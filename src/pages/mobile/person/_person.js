import { stateHoc,StateHocBasetateHocContainer } from '../../../bnorth';

export default stateHoc(class PersonContainer extends StateHocBasetateHocContainer{
  constructor(ownProps) {
    super(ownProps);

    this.Wraps.user = this.Apis.User.wrapGet(); 
  }

  onResume() {
    if(this.Apis.User.isLogin())this.Wraps.user.update();
  }
})