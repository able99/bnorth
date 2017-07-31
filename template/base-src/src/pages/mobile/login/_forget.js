import { stateHoc,StateHocBasetateHocContainer } from '../../../bnorth';

export default stateHoc(class ForgetContainer extends StateHocBasetateHocContainer{
  getVerifyCode() {
    this.Actions.actionOperateSubmit({
      resource: 'public/user/sendVerifyCode',
      data: this.Wraps.data.data(),
      success:()=>{
        this.Actions.actionNoticeMessage('获取验证码成功');
        this.Wraps.data.update({'__sended': true});
      },
    });
  }

  submit() {
    this.Actions.actionOperateSubmit({
      resource: 'public/user/resetPassword',
      data: this.Wraps.data.data(),
      success:()=>{
        this.Actions.actionNoticeMessage('重置成功');
      },
    });
  } 
})
