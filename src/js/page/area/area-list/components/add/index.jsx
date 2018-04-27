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

class AddModal extends Component {
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addArea(values);
        this.props.form.resetFields();
      }
    })
  }
  handleValidatorName = (rule, value, callback) => {
    if ( value && value.indexOf('+') > -1 ) callback('不能包含符号+');
    else callback();
  }
  render() {
    const { form, changeState, addVisible } = this.props;
    const { getFieldDecorator } = form;
    return(
      <Modal
        title="创建区域"
        visible={addVisible}
        onOk={this.handleSubmit}
        onCancel={()=>{this.props.form.resetFields();changeState({addVisible: false})}}
        className={cx('add-modal')}
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
              initialValue: '',
              rules: [{ required: true, message: 'Please upload logo' }],
            })(
              // <UploadCom imgType={['png']} action={`${Base.img}/wximg/dppLogo/upload`}/>
              <WoxUpload imgType={['png']} action={`${Base.img}/wximg/dppLogo/upload`}/>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const AddModalForm = Form.create()(AddModal);

export default AddModalForm;
