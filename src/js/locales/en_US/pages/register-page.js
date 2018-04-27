// 注册页面
const registerPage = {
  documentTitle: 'Destination++_Registry',
  step: {
    create: 'Create Account',
    submit: 'Submit Store Information',
    agreement: 'Sign Agreement',
    complete: 'Complete Registration',
  },
  createAccount: {
    email: 'Email',
    emailError: 'Please enter a valid email address.',
    reqemailError: 'This email address is already registered.',
    verification: 'Verification code',
    verificationError: 'Please enter Verification code',
    reqVerificationError: 'The code entered does not match the code displayed on the page',
    password: 'Password',
    passwordError: 'password can input number、letter and _',
    repassword: 'Confirm Password',
    repasswordError: 'The passwords you entered do not match. Please try again',
    notenterpass: 'please enter your password first!',
    next: 'Next',
    apply: 'Registered? ',
    sign: 'Log In'
  },
  success: {
    title: 'Success',
    tips:'Congratulations that you have completed your registration, merchant ID is <i>{code}</i>. You can maintian your store content and settings once you log in.',
    login: 'Now log in'
  }
};

export default registerPage;