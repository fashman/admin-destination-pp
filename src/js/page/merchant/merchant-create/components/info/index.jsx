import React, { Component } from 'react';
import { Form, Input, Button, Select } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';

const cx = classNames.bind(styles);
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = { type: '0' };
  }
  
  handleSubmit = (url) => {
    const { form, submitData } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.status = Number(values.status);
        values.userType = Number(values.userType);
        submitData({
          values,
          url
        });
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div className={cx('resform')}>
        <h3 className={cx('h3')}>创建商家</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label='角色'>
            {getFieldDecorator('userType', {
              initialValue: '0'
            })(
              <Select onChange={(v)=>this.setState({type:v})}>
                <Option value="0">商家</Option>
                <Option value="1">运营商</Option>
                <Option value="2">管理员</Option>
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='昵称'>
            {getFieldDecorator('nickName', {
              rules: [{
                type: 'string', message: '',
              }, {
                required: this.state.type !== '0', message: '',
              }],
              initialValue: ''
            })(
              <Input placeholder="请输入昵称" />
            )}
            <p className={cx('tips')} style={{right: '-226px'}}>当角色为管理员、运营商时需要填写昵称</p>
          </FormItem>
          <FormItem {...formItemLayout} label='注册邮箱'>
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: '',
              }, {
                required: true, message: '',
              }],
              initialValue: ''
            })(
              <Input placeholder="请输入邮箱" />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label='初始密码'>
            {getFieldDecorator('password', {
              rules: [{
                validator: (rule, value, callback) => {
                  if ( value && /^[0-9a-zA-Z_]{6,16}$/.test(value) ) {
                    callback();
                  } else {
                    callback('密码格式不对');
                  }
                }
              }],
              initialValue: ''
            })(
              <Input type="password" placeholder="请输入密码" />
            )}
            <p className={cx('tips')} style={{right: '-160px'}}>密码为6-16位数字、字母或_</p>
          </FormItem>
          <FormItem {...formItemLayout} label='状态'>
            {getFieldDecorator('status', {
              initialValue: '1'
            })(
              <Select>
                <Option value="1">审核通过</Option>
                <Option value="0">待审核</Option>
                <Option value="2">审核不通过</Option>
              </Select>
            )}
          </FormItem>
          <FormItem className={cx('item-last')}>
            <Button type="primary" onClick={()=>this.handleSubmit('list')} style={{marginRight: 20}}>保存</Button>
            <Button type="primary" onClick={()=>this.handleSubmit('edit')}>保存并关联店铺</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const InfoForm = Form.create()(Info);
export default InfoForm;
