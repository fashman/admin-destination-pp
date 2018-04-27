import React, {Component} from 'react';
import { Layout, Menu, Icon, Modal, Dropdown, Input, Form } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import axios from 'axios';
import Base from 'app/util/base';
import Util from 'app/util/util';
import debounce from 'lodash.debounce';
import JsCookie from 'js-cookie';

// 多语言
import intl from 'react-intl-universal';
import zh_CN from 'app/locales/zh_CN';
import en_US from 'app/locales/en_US';

const currentLocale =  JsCookie.get('locale') || 'en_US';
intl.init({ currentLocale, locales: { zh_CN, en_US } });

const id = Util.getParaFromUrl('id');
const confirm = Modal.confirm;
const cx = classNames.bind(styles);
const { Header } = Layout;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class ChangePassModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      oldpass: '',
      newpass: '',
    };
    this.handleCheckPass = debounce(this.handleCheckPass, 300);
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios({
          url: `${Base.api}/user/change-password`,
          method: 'post',
          headers:{'Content-Type': 'application/json'},
          data: {
            username: values.username,
            originalPassword: values.oldpass,
            newPassword: values.newpass
          }
        }).then(res => {
          const data = res.data;
          if ( data.result ) {
            Modal.success({
              title: intl.get('header.passModal.success'),
              maskClosable: true,
              width: 230
            });
          } else {
            Modal.error({
              title: `${intl.get('header.passModal.error')}${data.returnMessage}`,
              maskClosable: true,
              width: 230
            });
          }
          this.props.form.resetFields();
          this.props.hidePassModal();
        });
      }
    })
  }
  handleCheckPass = (rule, value, callback) => {
    if ( value ) {
      axios({
        url: `${Base.api}/user/verify`,
        method: 'post',
        headers:{'Content-Type': 'application/json'},
        data: {
          username: this.props.userInfo.username,
          originalPassword: value,
        }
      }).then((req)=>{
        const data = req.data;
        if ( !data.result ) {
          callback(intl.get('header.passModal.oldpassWrong'));
        } else {
          callback();
        }
      });
    } else {
      callback();
    }
  }
  render() {
    const { visible, userInfo, hidePassModal } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { oldpass, newpass } = this.state;
    return(
      <Modal
        title={intl.get('header.passModal.name')}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={()=>{this.props.form.resetFields();hidePassModal()}}
        className={cx('changepass-modal')}
        width={'632px'}
      >
        <Form>
          <FormItem
            style={{display: 'none'}}
          >
            {getFieldDecorator('username', {
              initialValue: userInfo ? userInfo.username : ''
            })(
              <Input type="hidden" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label={intl.get('form.email.label')}
            style={{marginBottom: 0}}
          >
            <p>{userInfo ? userInfo.username : 'not log in'}</p>
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label={intl.get('form.password.label')}
            style={{marginBottom: 10}}
          >
            <p>**********</p>
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label={intl.get('header.passModal.oldpass')}
          >
            {getFieldDecorator('oldpass', {
              rules: [{
                pattern: /^[0-9a-zA-Z_]+$/, message: intl.get('form.password.error'),
              }, {
                required: true, message: intl.get('form.password.empty'),
              }, {
                validator: this.handleCheckPass
              }],
              initialValue: oldpass
            })(
              <Input autoComplete="off" type="password" placeholder={intl.get('header.passModal.oldpass')}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label={intl.get('header.passModal.newpass')}
          >
            {getFieldDecorator('newpass', {
              rules: [{
                pattern: /^[0-9a-zA-Z_]+$/, message: intl.get('form.password.error'),
              }, {
                required: true, message: intl.get('form.password.empty'),
              }],
              initialValue: newpass
            })(
              <Input autoComplete="off" type="password" placeholder={intl.get('header.passModal.newpass')}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const ChangePassForm = Form.create()(ChangePassModal);

export default class HeaderCom extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      visible: false,
      showQrcode: false,
      defaultLogo: '//www.quimg.com/fixed/restaurant/home/default-logo.jpg',
      currentLang: JsCookie.get('locale') || 'en_US',
    };
  }
  changeLanguage = (type) => {
    JsCookie.set('locale', type, { expires: 360, path: '/' });
    location.reload();
  }
  handleClick = (type) => {
    if (type === '1') {
      this.setState({ visible: true });
    } else {
      confirm({
        title: intl.get('header.logoutMsg'),
        onOk() {
          location.href = `${Base.domain}/logout`;
        },
        width: 290,
        maskClosable: true,
      });
    }
  }
  componentWillMount() {
    axios({
      url: `${Base.api}/user/current-user?code=${id ? id : ''}`,
      headers:{'Content-Type': 'application/json'}
    }).then(res => {
      const data = res.data;
      if ( data.result ) {
        this.setState({userInfo: data.returnObject});
      }
    });
  }
  render() {
    const { userInfo, visible } = this.state;
    const isZone = location.href.indexOf('zone') > -1;
    const isMerchant = location.href.indexOf('user') > -1;

    const languageMenu = (
      <Menu className={cx('header-languageMenu')} onClick={({key})=>this.changeLanguage(key)}>
        <Menu.Item key={'zh_CN'} disabled={currentLocale === 'zh_CN'}>中文（简体）</Menu.Item>
        <Menu.Item key={'en_US'} disabled={currentLocale === 'en_US'}>English</Menu.Item>
      </Menu>
    );

    const userMenu = (
      <Menu className={cx('header-userMenu')} onClick={({key})=>this.handleClick(key)} selectedKeys={[]}>
        <Menu.Item key="1">{intl.get('header.subMenu.changePass')}</Menu.Item>
        <Menu.Item key="2">{intl.get('header.subMenu.out')}</Menu.Item>
      </Menu>
    );

    const isNotloginOrregistry = location.href.indexOf('registry') < 0 && location.href.indexOf('login') < 0;

    return(
      <div>
        <Header className={cx('header')}>
          <div>
            <a className={cx('logo')} href={Base.domain} rel="noopener noreferrer">
              <h3><span>{intl.get('appName')}</span></h3>
            </a>
            <span className={cx('slogen')}></span>
            {
              userInfo && userInfo.type === 2 &&  isNotloginOrregistry ? (
              // true ? (
                <div className={cx('manage-tab')}>
                  <a className={cx(isMerchant ? 'cur' : '' )} href={`${Base.domain}/user/list-page`}>{intl.get('header.topLevelMenu.merchantManage')}</a>
                  <a className={cx(!isZone && !isMerchant ? 'cur' : '' )} href={`${Base.domain}/shop/list-page`}>{intl.get('header.topLevelMenu.storeManage')}</a>
                  <a className={cx(isZone ? 'cur' : '' )} href={`${Base.domain}/zone/list-page`}>{intl.get('header.topLevelMenu.areaManage')}</a>
                </div>
              ) : null
            }
            {
              userInfo && (userInfo.type === 0||userInfo.type === 1) &&  isNotloginOrregistry ? (
              // true ? (
                <div className={cx('manage-tab')}>
                  <a className={cx('cur')} href={`${Base.domain}/shop/list-page`}>{intl.get('header.topLevelMenu.storeManage')}</a>
                </div>
              ) : null
            }
          </div>
          <div className={cx('info')}>
            {
              userInfo &&  isNotloginOrregistry ? (
              // true ? (
                <Dropdown style={{marginLeft: 20}} overlay={userMenu} placement="bottomRight">
                  <span className="ant-dropdown-link">
                    <Icon type="user" />
                    {userInfo.username}
                    {/* xxxxx */}
                    <Icon type="down" />
                  </span>
                </Dropdown>
              ) : null
            }
            <Dropdown overlay={languageMenu} placement="bottomRight">
              <span className="ant-dropdown-link">
                {intl.get(`header.locales.${currentLocale}`)}<Icon type="down" />
              </span>
            </Dropdown>
            {
              !userInfo ? (
                <Menu
                  selectedKeys={[]}
                  mode="horizontal"
                >
                  <Menu.Item key="index">
                    <a href={`${Base.domain}`} rel="noopener noreferrer">
                      {intl.get('header.subMenu.index')}
                    </a>
                  </Menu.Item>
                  <Menu.Item key="apply">
                    <a href={`${Base.domain}/registry/page`} rel="noopener noreferrer">
                      {intl.get('header.subMenu.apply')}
                    </a>
                  </Menu.Item>
                  <Menu.Item key="login">
                    <a href={`${Base.domain}/login`} rel="noopener noreferrer">
                      {intl.get('header.subMenu.login')}
                    </a>
                  </Menu.Item>
                </Menu>
              ) : null
            }
          </div>
        </Header>
        {
          this.props.showMenu ? (
            <div className={cx('nav')}>
              <Menu
                selectedKeys={[this.props.showMenu]}
                mode="horizontal"
              >
                <Menu.Item key="main">
                  <a href={`${Base.domain}/merchant/edit-page?id=${id}`} rel="noopener noreferrer">
                    <Icon type="home" />{intl.get('header.subMenu.main')}
                  </a>
                </Menu.Item>
                <Menu.Item key="detail">
                  <a href={`${Base.domain}/shop-edit?id=${id}`} rel="noopener noreferrer">
                    <Icon type="shop" />{intl.get('header.subMenu.detail')}
                  </a>
                </Menu.Item>
                <Menu.Item key="menu">
                  <a href={`${Base.domain}/restaurant-menu?id=${id}`} rel="noopener noreferrer">
                    <Icon type="appstore-o" />{intl.get('header.subMenu.menu')}
                  </a>
                </Menu.Item>
                <Menu.Item key="set">
                  <a href={`${Base.domain}/shop/setting?id=${id}`} rel="noopener noreferrer">
                    <Icon type="setting" />{intl.get('header.subMenu.set')}
                  </a>
                </Menu.Item>
                {
                  userInfo && userInfo.type === 2 ? (
                    <Menu.Item key="apply">
                      <a href={`${Base.domain}/merchant/audit-page?id=${id}`} rel="noopener noreferrer">
                        <Icon type="exclamation-circle-o" />{intl.get('header.subMenu.status')}
                      </a>
                    </Menu.Item>
                  ) : null
                }
              </Menu>
            </div>
          ) : null
        }
        {
          userInfo ? (
            <ChangePassForm
              userInfo={userInfo}
              visible={visible}
              hidePassModal={()=>this.setState({visible: false})}
            />
          ) : null
        }
      </div>
    )
  }
}
