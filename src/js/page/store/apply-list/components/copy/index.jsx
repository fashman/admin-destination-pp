import React, { Component } from 'react';
import { Modal, Input, Form } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import intl from 'react-intl-universal';

const cx = classNames.bind(styles);
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

class Copy extends Component {
  handleOk = () => {
    const { form, copyStore, changeState } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        copyStore(values);
        changeState({isloading: true});
      }
    })
  }
  render() {
    const { curData, form, showCopy, changeState, isloading } = this.props;
    const { getFieldDecorator } = form;
    return(
      <Modal
        title={intl.get('pages.storeList.copyModal.title')}
        visible={showCopy}
        onOk={this.handleOk}
        confirmLoading={isloading}
        onCancel={()=>changeState({showCopy:false,curData:{}})}
      >
        <Form>
          <FormItem style={{display:'none'}}>
            {getFieldDecorator('shopCode', {
              initialValue: curData.shopCode || ''
            })( <Input /> )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeList.copyModal.name')}
            style={{marginBottom: 2}}
          >
            {getFieldDecorator('shopNameEn', {
              initialValue: `【copy】${curData.shopNameEn || ''}`,
              rules: [{
                type: 'string', message: intl.get('pages.storeList.copyModal.nametips'),
              }, {
                required: true, message: intl.get('pages.storeList.copyModal.nametips'),
              }],
            })(
              <Input placeholder={intl.get('pages.storeList.copyModal.nametips')} />
            )}
          </FormItem>
        </Form>
        <div className={cx('tips')}>
          <p>{intl.get('pages.storeList.copyModal.tips.tit')}：</p>
          <p>{intl.get('pages.storeList.copyModal.tips.a')}</p>
          <p>{intl.get('pages.storeList.copyModal.tips.b')}</p>
          <p>{intl.get('pages.storeList.copyModal.tips.c')}</p>
        </div>
      </Modal>
    )
  }
}

const CopyModal = Form.create()(Copy);
export default CopyModal;
