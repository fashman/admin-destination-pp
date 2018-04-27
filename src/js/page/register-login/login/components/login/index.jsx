import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import intl from 'react-intl-universal';

const cx = classNames.bind(styles);
const FormItem = Form.Item;

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //loginid: '',
      j_username: '',
      password: ''
    };
  }

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.refs.form.submit();
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userName, password } = this.state;
    return(
      <div className={cx('login-wrap')}>
        <div className={cx('login-wrapper')}>
          <div className={cx('left')}>
            <h2>{intl.get('appName')}<i></i></h2>
            <p className={cx(intl.get('pages.login.slogen'))}></p>
          </div>
          <div className={cx('resform')}>
            <form ref="form" action="//www.ipptraveltech.com/j_spring_security_check" method="post">
              <h3 className={cx('log-title')}>{intl.get('pages.login.title')}</h3>
              <FormItem>
                {getFieldDecorator('j_username', {
                  initialValue: userName,
                  rules: [{
                    type: 'string', message: 'Please enter your name!',
                  }, {
                    required: true, message: 'Please enter your name!',
                  }],
                })(
                  <Input 
                    prefix={<Icon type="user" style={{fontSize: 16,color: '#848484'}} />}
                    name="j_username" placeholder={intl.get('pages.login.usernamePlaceholder')}
                    autoComplete="on"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('j_password', {
                  initialValue: password,
                  rules: [{
                    type: 'string', message: 'Please enter your password!',
                  }, {
                    required: true, message: 'Please enter your password!',
                  }],
                })(
                  <Input 
                    prefix={<Icon type="lock" style={{fontSize: 16,color: '#848484'}} />}
                    type="password" name="j_password" placeholder={intl.get('pages.login.password')}
                    onPressEnter={this.handleSubmit}
                    autoComplete="off"
                  />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" onClick={this.handleSubmit} style={{width: '100%', height:'40px'}}>{intl.get('pages.login.login')}</Button>
              </FormItem>
              <p className={cx('registry')}>
                {intl.get('pages.login.noapply')}<a href="//www.ipptraveltech.com/registry/page">{intl.get('pages.login.sign')}</a>
                {/* &nbsp;&nbsp;&nbsp;&nbsp;<a href="">{loginPageText['forget']}</a> */}
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const InfoForm = Form.create()(Info);
export default InfoForm;
