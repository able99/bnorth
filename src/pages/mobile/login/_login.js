import { stateHoc,StateHocBasetateHocContainer } from '../../../bnorth';

export default stateHoc(class LoginContainer extends StateHocBasetateHocContainer{
  constructor(ownProps) {
    super(ownProps);

    let types =  !this.Config.is2b
      ?[{name:'密码登录',type:0},{name:'验证码登录',type:1}]
      :[{name:'验证码登录',type:1}];

    this.Wraps.data = this.ActionWraps.actionsDataWrap({
      initData: {
        type: this.getLoginType(ownProps.location.query.type)||types[0].type,
        types,
      }
    });

    this.Wraps.login = this.ActionWraps.actionsDataWrap({
      initData: {
        sended: false,
      }
    });

    this.Wraps.loginNormal = this.ActionWraps.actionsDataWrap({
      rules: {
        userName: 'required',
        password: 'required',
      },
    });

    this.Wraps.loginVerify = this.ActionWraps.actionsDataWrap({
      rules: {
        email: 'required',
        verifyCode: 'number',
      },
    });
  }

  getLoginType(type) {
    switch(Number(type)){
      case 1:
        return 1;
      default:
        return 0;
    }
  }

  getVerifyCode(account) {
    this.Actions.actionOperateSubmit({
      resource: 'interface/user/getVerifyCode',
      data:{
        verifyCodeType:"8",
        phoneNo: account,
      },
      success:(result)=>{
        this.Actions.actionNoticeMessage('获取验证码成功');
        this.Wraps.login.update({sended:true});
      },
    }); 
  }
})
