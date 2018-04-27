import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import WoxUpload from 'wox-upload';
import Base from 'app/util/base';

const cx = classNames.bind(styles);
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class LogoModal extends Component {
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { changeBannerAndLogo, curData } = this.props;
        const { id, bannerUrl, createTime } = curData;
        changeBannerAndLogo({
          id, bannerUrl, createTime, ...values
        });
      }
    })
  }
  handleValidatorName = (rule, value, callback) => {
    if ( value && value.indexOf('+') > -1 ) callback('不能包含符号+');
    else callback();
  }
  render() {
    const { form, changeState, logoVisible, curData } = this.props;
    const { getFieldDecorator } = form;
    return(
      <Modal
        title="创建区域"
        visible={logoVisible}
        onOk={this.handleSubmit}
        onCancel={()=>{this.props.form.resetFields();changeState({logoVisible: false})}}
        className={cx('logo-modal')}
        width="632px"
      >
        <Form>
          <FormItem
            label="区域名称中文"
            {...formItemLayout}
          >
            {getFieldDecorator('nameCn', {
              rules: [{
                validator: this.handleValidatorName
              }, {
                required: true, message: '请填写区域名称中文'
              }, {
                max: 16
              }],
              initialValue: curData.nameCn || ''
            })(
              <Input placeholder="请填写区域名称中文" />
            )}
          </FormItem>
          <FormItem
            label="区域名称英文"
            {...formItemLayout}
          >
            {getFieldDecorator('nameEn', {
              rules: [{
                validator: this.handleValidatorName
              }, {
                required: true, message: '请填写区域名称英文'
              }, {
                max: 16
              }],
              initialValue: curData.nameEn || ''
            })(
              <Input placeholder="请填写区域名称英文" />
            )}
          </FormItem>
          <FormItem
            label="区域Logo"
            style={{marginBottom: 0}}
            {...formItemLayout}
          >
            <p>建议尺寸大于或等于：568 x 568px，图片大小不超过100kb</p>
            {getFieldDecorator('logoUrl', {
              rules: [{
                required: true, message: 'Please upload your logo'
              }],
              initialValue: curData.logoUrl || '',
            })(
              <WoxUpload imgType={['png']} action={`${Base.img}/wximg/dppLogo/upload`}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const LogoModalForm = Form.create()(LogoModal);

export default LogoModalForm;
