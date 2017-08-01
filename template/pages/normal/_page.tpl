import { stateHoc,StateHocBasetateHocContainer } from '{{ levels }}bnorth';

export default stateHoc(class {{ name }}Container extends StateHocBasetateHocContainer{
  constructor(ownProps) {
    super(ownProps);

    this.Wraps.data = this.ActionWraps.actionsDataWrap({
      initData: {
      }
    });

    this.Wraps.{{ name }} = this.ActionWraps.actionsHttpifFetchWrap({
      updateOnStart: true,
      options:{
        resource: '{{ name }}',
      }
    });
  }

  submit() {
    this.Actions.actionOperateSubmit({
      resource: '{{ name }}',
      data:{
        ...this.Wraps.data.data(),
      },
      success:(result)=>{
        this.Actions.actionNoticeMessage('提交成功');
      },
    }); 
  }
})
