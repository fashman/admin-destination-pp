import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import WoxUpload from 'wox-upload';

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

class BannerModal extends Component {
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { changeBannerAndLogo, curData } = this.props;
        changeBannerAndLogo({
          ...curData, ...values
        });
      }
    })
  }
  handleValidatorName = (rule, value, callback) => {
    if ( value && value.indexOf('+') > -1 ) callback('不能包含符号+');
    else callback();
  }
  render() {
    const { form, changeState, bannerVisible, curData } = this.props;
    const { getFieldDecorator } = form;
    return(
      <Modal
        title="设置首页大图"
        visible={bannerVisible}
        onOk={this.handleSubmit}
        onCancel={()=>{this.props.form.resetFields();changeState({bannerVisible: false})}}
        className={cx('banner-modal')}
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
                required: true, message: '请输入区域名称中文'
              }, {
                max: 16
              }],
              initialValue: curData.nameCn || ''
            })(
              <Input placeholder="请输入区域名称中文" />
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
                required: true, message: '请输入区域名称英文'
              }, {
                max: 16
              }],
              initialValue: curData.nameEn || ''
            })(
              <Input placeholder="请输入区域名称英文" />
            )}
          </FormItem>
          <FormItem
            label="首页大图"
            style={{marginBottom: 0}}
            {...formItemLayout}
          >
            <p>建议尺寸大小：750 x 388 px，图片大小不超过100kb</p>
            {getFieldDecorator('bannerUrl', {
              rules: [{ required: true, message: '请上传首页大图' }],
              initialValue: curData.bannerUrl || '',
            })(
              <WoxUpload />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const BannerModalForm = Form.create()(BannerModal);

export default BannerModalForm;
