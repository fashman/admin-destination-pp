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

const zh_CN = {
  appName: '目的地',
  // 表单类
  form: {
    email: {
      label: '邮箱',
      error: '请输入正确的邮箱格式',
      empty: '请输入邮箱'
    },
    password: {
      label: '密码',
      error: '请输入正确的密码格式(数字、字母或_组成)',
      empty: '请输入密码'
    }
  },
  // 操作类
  operation: {
    delete: {
      name: '删除',
      tips: '确认要删除该条记录吗？'
    },
    edit: '编辑',
    audit: '审核',
    copy: '复制'
  },
  // 请求类
  fetch: {
    success: {
      name: '成功',
      tips: '请求成功！'
    },
    error: {
      name: '失败',
      tips: '请求失败！'
    }
  },
  // 通用头部
  header: {
    logoutMsg: '确定要退出系统吗？',
    locales: {
      'zh_CN': '中文（简体）',
      'en_US': 'English',
    },
    topLevelMenu: {
      storeManage: '店铺管理',
      areaManage: '区域管理',
      merchantManage: '商家管理'
    },
    subMenu: {
      index: '首页',
      apply: '申请入驻',
      login: '商家登录',
      changePass: '修改密码',
      out: '退出登录',
      main: '店铺资料',
      shoplist: '店铺列表',
      detail: '基本信息',
      menu: '菜单信息',
      wechat: '店铺二维码',
      set: '设置',
      status: '状态审核',
    },
    passModal: {
      name: '个人信息',
      email: '邮箱',
      password: '密码',
      changepass: '修改密码',
      oldpass: '旧密码',
      oldpassWrong: '旧密码填写不正确',
      newpass: '新密码',
      success: '修改密码成功！',
      error: '修改密码失败！'
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
  showTotal: '共 {total} 条记录'
};

export default zh_CN;