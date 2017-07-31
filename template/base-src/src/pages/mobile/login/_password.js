import { stateHoc,StateHocBasetateHocContainer } from '../../../bnorth';

export default stateHoc(class PasswordContainer extends StateHocBasetateHocContainer{
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
      resource: 'user/password',
      data: this.Wraps.data.data(),
      method: 'put',
      success:()=>{
        this.Actions.actionNoticeMessage('修改成功');
      },
    });
  } 
})
