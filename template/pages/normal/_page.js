import { stateHoc,StateHocBasetateHocContainer } from '../../../bnorth';

export default stateHoc(class PageContainer extends StateHocBasetateHocContainer{
  constructor(ownProps) {
    super(ownProps);

    this.Wraps.data = this.ActionWraps.actionsDataWrap({
      initData: {
      }
    });

    this.Wraps.page = this.ActionWraps.actionsHttpifFetchWrap({
      updateOnStart: true,
      options:{
        resource: '',
      }
    });
  }

  submit() {
    this.Actions.actionOperateSubmit({
      resource: '',
      data:{
        ...this.Wraps.data.data(),
      },
      success:(result)=>{
        this.Actions.actionNoticeMessage('提交成功');
      },
    }); 
  }
})
