import applyInfoPage from './pages/apply-info-page';
import indexPage from './pages/index-page';
import loginPage from './pages/login-page';
import storeInfoBasePage from './pages/store-info-base-page';
import storeInfoPage from './pages/store-info-page';
import storeListPage from './pages/store-list-page';
import storeMenuPage from './pages/store-menu-page';
import storeSetPage from './pages/store-set-page';
import storeCreatePage from './pages/store-create-page';
import registerPage from './pages/register-page';

const en_US = {
  appName: 'Destination',
  // 表单类
  form: {
    errorByName: `Please entry the right ${name}`,
    email: {
      label: 'Email',
      error: 'Please entry the right email',
      empty: 'Please entry your email'
    },
    password: {
      label: 'Password',
      error: 'Please entry the right password(number、letter or _)',
      empty: 'Please entry your password'
    }
  },
  // 操作类
  operation: {
    delete: {
      name: 'Delete',
      tips: 'Are you sure to delete this record?'
    },
    edit: 'Edit',
    audit: 'Audit',
    copy: 'Copy'
  },
  // 请求类
  fetch: {
    success: {
      name: 'Success',
      tips: 'Fetch Success'
    },
    error: {
      name: 'Failed',
      tips: 'Fetch Failed'
    }
  },
  // 通用头部
  header: {
    logoutMsg: 'Are you sure to log out?',
    locales: {
      'zh_CN': '中文（简体）',
      'en_US': 'English',
    },
    topLevelMenu: {
      storeManage: 'Store Manage',
      areaManage: 'Area Manage',
      merchantManage: 'Merchant Manage'
    },
    subMenu: {
      index: 'Homepage',
      apply: 'Join Us',
      login: 'Log In',
      changePass: 'Change Password',
      out: 'Log Out',
      main: 'Store Homepage',
      shoplist: 'Shops',
      detail: 'Basic Information',
      menu: 'Menu',
      wechat: 'QR Code',
      set: 'Settings',
      status: 'Status Audits',
    },
    passModal: {
      name: 'Personal Information',
      email: 'Email',
      password: 'Password',
      changepass: 'Change Password',
      oldpass: 'Old Password',
      oldpassWrong: 'The passwords you entered do not match. Please try again',
      newpass: 'New Password',
      success: 'Success!',
      error: 'Error'
    }
  },
  // 页面类
  pages: {
    applyInfo: applyInfoPage,
    index: indexPage,
    login: loginPage,
    storeInfoBase: storeInfoBasePage,
    storeInfo: storeInfoPage,
    storeList: storeListPage,
    storeMenu: storeMenuPage,
    storeSet: storeSetPage,
    storeCreate: storeCreatePage,
    register: registerPage
  },
  // 分页插件
  showTotal: 'Total {total} items',

};

export default en_US;