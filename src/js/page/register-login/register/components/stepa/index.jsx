import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import axios from 'axios';
import Base from 'app/util/base';
import debounce from 'lodash.debounce';
import intl from 'react-intl-universal';

const cx = classNames.bind(styles);
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomCode: '//www.ipptraveltech.com/registry/random-code',
    };
    this.handleCheckUsername = debounce(this.handleCheckUsername, 300);
    this.handleCheckCode = debounce(this.handleCheckCode, 300);
  }

  handleResetVcode = () => {
    this.refs.randomCode.src = `//www.ipptraveltech.com/registry/random-code?${Math.random()}`;
  }

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if ( values.repassword !== values.password ) {
          message.error(intl.get('pages.register.createAccount.repasswordError'), 3);
          return;
        }
        const { password, username, randomCode } = values;
        this.props.createUser({password, username, randomCode});
      }
    })
  }

  handleConfirmPassword = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if ( /^\s*$/.test( getFieldValue('password') ) ) {
      callback(intl.get('pages.register.createAccount.notenterpass'));
      return;
    }
    if (value && value !== getFieldValue('password')) {
      callback(intl.get('pages.register.createAccount.repasswordError'));
      return;
    }
    callback();
  }

  handleCheckUsername = (rule, value, callback) => {
    if ( value ) {
      axios.get(`${Base.api}/registry/check-exsiting?username=${value}`).then((req)=>{
        const data = req.data;
        if ( data.result ) {
          callback(intl.get('pages.register.createAccount.reqemailError'));
        } else {
          callback();
        }
      });
    } else {
      callback();
    }
  }

  handleCheckCode = (rule, value, callback) => {
    if ( value ) {
      axios.get(`${Base.api}/registry/check-random-${value}`).then((req)=>{
        const data = req.data;
        if ( !data.result ) {
          callback(intl.get('pages.register.createAccount.reqVerificationError'));
        } else {
          callback();
        }
      });
    } else {
      callback();
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { stepa } = this.props;
    return(
      <div className={cx('resform')}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.register.createAccount.email')}
            hasFeedback
          >
            {getFieldDecorator('username', {
              rules: [{
                type: 'email', message: intl.get('pages.register.createAccount.emailError'),
              }, {
                required: true, message: intl.get('pages.register.createAccount.emailError'),
              }, {
                validator: this.handleCheckUsername
              }],
              initialValue: stepa.username
            })(
              <Input autoComplete="on" onBlur={this.handleBlur} placeholder={intl.get('pages.register.createAccount.email')}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.register.createAccount.verification')}
            hasFeedback
            className={cx('verification-item')}
          >
            {getFieldDecorator('randomCode', {
              rules: [{
                type: 'string', message: intl.get('pages.register.createAccount.verificationError'),
              }, {
                required: true, message: intl.get('pages.register.createAccount.verification'),
              }, {
                validator: this.handleCheckCode
              }],
              initialValue: stepa.randomCode
            })(
              <Input 
                addonAfter={
                  <img onClick={this.handleResetVcode} 
                    ref="randomCode" 
                    src={this.state.randomCode} alt="验证码"
                  />
                } 
                placeholder={intl.get('pages.register.createAccount.verification')}
                autoComplete="on"
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.register.createAccount.password')}
            hasFeedback
          >
            {getFieldDecorator('password', {
              rules: [{
                pattern: /^[0-9a-zA-Z_]+$/, message: intl.get('pages.register.createAccount.passwordError'),
              }, {
                required: true, message: intl.get('pages.register.createAccount.passwordError'),
              }],
              initialValue: stepa.password
            })(
              <Input autoComplete="off" placeholder={intl.get('pages.register.createAccount.password')} type="password"/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.register.createAccount.repassword')}
            hasFeedback
          >
            {getFieldDecorator('repassword', {
              rules: [{
                pattern: /^[0-9a-zA-Z_]+$/, message: intl.get('pages.register.createAccount.passwordError'),
              }, {
                required: true, message: intl.get('pages.register.createAccount.passwordError'),
              }, {
                validator: this.handleConfirmPassword
              }],
              initialValue: stepa.repassword
            })(
              <Input autoComplete="off" placeholder={intl.get('pages.register.createAccount.repassword')} type="password"/>
            )}
          </FormItem>
          <FormItem
            wrapperCol={{ span: 16, offset: 8 }}
          >
            <Button type="primary" onClick={this.handleSubmit} style={{width: '100%',height:40}}>{intl.get('pages.register.createAccount.next')}</Button>
          </FormItem>
          <FormItem
            wrapperCol={{ span: 16, offset: 8 }}
            style={{marginBottom: 0}}
          >
            {intl.get('pages.register.createAccount.apply')}<a href="//www.ipptraveltech.com/login">{intl.get('pages.register.createAccount.sign')}</a>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const StepA = Form.create()(Step);
export default StepA;
