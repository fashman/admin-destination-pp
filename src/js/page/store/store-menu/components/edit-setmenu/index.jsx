// 编辑套餐弹层
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Modal, Form, Input, InputNumber, Select } from 'antd';
import styles from './style.mod.less';
import Base from 'app/util/base';
import MenuItems from '../menu-items';
import WoxUpload from 'wox-upload';
import intl from 'react-intl-universal';
import staticData from 'app/util/static';
import JsCookie from 'js-cookie';

const lang = JsCookie.get('locale') || 'en_US';
const cx = classNames.bind(styles);
const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 11 },
  },
};

class Dish extends Component {
  handleCancel = () => {
    this.setState({ fileList: null });
    this.props.form.resetFields();
    this.props.changeState({
      menuVisible: false,
      curMenuData: null,
    });
  }

  handleSave = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.picPaths = values.picPaths.map(val => ({picPath: val}));;
        this.props.saveMenu(values);
        this.props.form.resetFields();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data, menuVisible } = this.props;
    const currencyfixSelector = getFieldDecorator('currency',{
      rules: [{
        required: true, message: lang === 'en_US' ? 'Choose Currency' : '请选择币种',
      }],
      initialValue: data.currency || '',
    })(
      <Select style={{ width: 60 }}
        getPopupContainer={() => document.getElementsByClassName('setmenu-currency-select')[0]}
      >
        <Option value="">{lang === 'en_US' ? 'Choose Currency' : '请选择币种'}</Option>
        {
          staticData.currency.map((val,idx) => (
            <Option value={val.code} key={idx}>{lang === 'en_US' ? val.code : val.name}</Option>
          ))
        }
      </Select>
    )
    return (
      <div>
      <Modal
        title={intl.get('pages.storeMenu.menuModal.title')}
        visible={menuVisible}
        onOk={this.handleSave}
        onCancel={this.handleCancel}
        className={cx('edit-setmenu')}
        width="632"
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem style={{display: 'none'}}>
            {getFieldDecorator('setmenuCode', {
              initialValue: data.setmenuCode || ''
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.menuModal.nameCn')}
            hasFeedback
          >
            {getFieldDecorator('setmenuNameCn', {
              rules: [{
                type: 'string', message: 'Please enter a valid chinese name!',
              }],
              initialValue: data.setmenuNameCn || ''
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.menuModal.nameEn')}
            hasFeedback
          >
            {getFieldDecorator('setmenuNameEn', {
              rules: [{
                type: 'string', message: 'Please enter a valid english name!',
              }, {
                required: true, message: 'Please enter a valid english name!',
              }],
              initialValue: data.setmenuNameEn || ''
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.menuModal.price')}
            className='setmenu-currency-select'
          >
            {getFieldDecorator('setmenuPrice', {
              rules: [{
                pattern: /^[\d/.]+$/, message: 'Please enter a valid price number!',
              }, {
                required: true, message: 'Please enter a valid price number!',
              }],
              initialValue: data.setmenuPrice || ''
            })(
              <Input placeholder={intl.get('pages.storeMenu.menuModal.priceTips')} addonAfter={currencyfixSelector} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.menuModal.pic')}
          >
            {getFieldDecorator('picPaths', {
              initialValue: data.picPaths ? data.picPaths.map(val=>val.picPath) : []
            })(
              <WoxUpload notSimple={true} Max={10} action={`${Base.img}/wximg/dpp/upload`}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.menuModal.description')}
          >
            {getFieldDecorator('setmenuDes', {
              initialValue: data.setmenuDes || ''
            })(
              <Input type='textarea' style={{height: 80}}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.menuModal.priority')}
          >
            {getFieldDecorator('priority', {
              rules: [{
                required: true,
                message: 'Please enter a valid number！',
              }],
              initialValue: data.priority || 0
            })(
              <InputNumber max={100} min={0} precision={0} />
            )}
            <span className={cx('priority-tips')}>{intl.get('pages.storeMenu.menuModal.priorityTips')}</span>
          </FormItem>
          <FormItem style={{marginBottom: 0}} label={intl.get('pages.storeMenu.menuModal.set')} {...formItemLayout} />
          <FormItem>
            {getFieldDecorator('setmenuItems', {
              initialValue: data.setmenuItems || []
            })(
              <MenuItems />
            )}
          </FormItem>
        </Form>
      </Modal>
      </div>
    )
  }
}

const EditDish = Form.create()(Dish);

export default EditDish;
