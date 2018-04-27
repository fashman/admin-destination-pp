// 注册页面
const registerPage = {
  documentTitle: '目的地++_注册页面',
  step: {
    create: '创建账户',
    submit: '提交店铺信息',
    agreement: '签订合作协议',
    complete: '完成注册',
  },
  createAccount: {
    email: '邮箱',
    emailError: '邮箱格式错误',
    reqemailError: '您填写的邮箱已注册.',
    verification: '图形验证码',
    verificationError: '验证码格式错误',
    reqVerificationError: '验证码错误',
    password: '登录密码',
    passwordError: '密码格式不对：数字、字母或_组成',
    repassword: '确认密码',
    repasswordError: '两次填写的密码不一致',
    notenterpass: '请先填写密码',
    next: '下一步',
    apply: '已经注册? ',
    sign: '去登录'
  },
  success: {
    title: '注册成功',
    tips:'恭喜您完成注册，商户ID为<i>{code}</i>，登陆后可进行店铺内容维护和设置',
    login: '现在登录'
  }
};

export default registerPage;