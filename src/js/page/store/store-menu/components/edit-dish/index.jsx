// 编辑菜品弹层
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Modal, Form, Input, InputNumber, Select, Radio, Button } from 'antd';
import styles from './style.mod.less';
import Base from 'app/util/base';
import WoxUpload from 'wox-upload';
import intl from 'react-intl-universal';
import staticData from 'app/util/static';
import JsCookie from 'js-cookie';

const lang = JsCookie.get('locale') || 'en_US';
const cx = classNames.bind(styles);
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
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
      dishVisible: false,
      curDishData: null,
    });
  }

  handleSave = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.dishPic = values.dishPic.map(val => ({picPath: val}));
        values.dishTypeId = Number(values.dishTypeId);
        values.price = Number(values.price);
        values.priority = Number(values.priority);
        values.hotPush = values.hotPush ? true : false;
        this.props.saveDish(values);
        this.props.form.resetFields();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { dishType, data, dishVisible, changeState } = this.props;
    const currencyfixSelector = getFieldDecorator('currency',{
      rules: [{
        required: true, message: lang === 'en_US' ? 'Choose Currency' : '请选择币种',
      }],
      initialValue: data.currency || '',
    })(
      <Select
        getPopupContainer={() => document.getElementsByClassName('dish-currency-select')[0]}
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
        title={intl.get('pages.storeMenu.dishModal.title')}
        visible={dishVisible}
        onOk={this.handleSave}
        onCancel={this.handleCancel}
        className={cx('edit-dish')}
        width="632"
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem style={{display: 'none'}}>
            {getFieldDecorator('dishCode', {
              initialValue: data.dishCode || ''
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.dishModal.nameCn')}
            hasFeedback
          >
            {getFieldDecorator('dishNameCn', {
              rules: [{
                // pattern: /^[\u4e00-\u9fa5]+[\u4e00-\u9fa5\s]*$/, message: 'Please enter a vaild chinese Name',
                type: 'string', message: 'Please enter a vaild chinese Name',
              }],
              initialValue: data.dishNameCn || ''
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.dishModal.nameEn')}
            hasFeedback
          >
            {getFieldDecorator('dishNamEn', {
              rules: [{
                type: 'string', message: 'Please enter a vaild english Name',
              }, {
                required: true, message: 'Please enter a vaild english Name',
              }],
              initialValue: data.dishNamEn || ''
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.dishModal.price')}
            className='dish-currency-select'
            hasFeedback
          >
            {getFieldDecorator('price', {
              rules: [{
                pattern: /^[\d/.]+$/, message: 'Please enter a valid price number！',
              }, {
                required: true, message: 'Please enter a valid price number！',
              }],
              initialValue: data.price || ''
            })(
              <Input placeholder={intl.get('pages.storeMenu.dishModal.priceTips')} addonAfter={currencyfixSelector} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.dishModal.pic')}
          >
            {getFieldDecorator('dishPic', {
              initialValue: data.dishPic ? data.dishPic.map(val=>val.picPath) : []
            })(
              <WoxUpload notSimple={true} Max={10} action={`${Base.img}/wximg/dpp/upload`}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.dishModal.description')}
            hasFeedback
          >
            {getFieldDecorator('description', {
              initialValue: data.description || ''
            })(
              <Input type='textarea' style={{height: 80}}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.dishModal.dishType')}
          >
            {getFieldDecorator('dishTypeId', {
              rules: [{
                required: true, message: 'Please choose dish type！',
              }],
              initialValue: data.dishTypeId ? data.dishTypeId.toString() : ''
            })(
              <Select getPopupContainer={() => document.getElementsByClassName(cx('edit-dish'))[0]}>
                <Option value=''>{lang === 'en_US' ? 'Choose Type' : '请选择菜品类型'}</Option>
                <Option value='-1'>{intl.get('pages.storeMenu.dishModal.all')}</Option>
                {
                  dishType.typeList.filter(val=>val.dishTypeId > 0).map(val =>(
                    <Option
                      value={val.dishTypeId.toString()}
                      key={val.dishTypeId}
                    >{val.dishTypeName}</Option>
                  ))
                }
              </Select>
            )}
            <Button type="primary" className={cx('addDishType')} onClick={()=>changeState({dishTypeVisible: true})}>+{intl.get('pages.storeMenu.add')}</Button>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.dishModal.priority')}
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
            <span className={cx('priority-tips')}>{intl.get('pages.storeMenu.dishModal.priorityTips')}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeMenu.dishModal.ishot')}
          >
            {getFieldDecorator('hotPush', {
              rules: [{
                required: true, message: 'Please check Hot！',
              }],
              initialValue: data.hotPush == undefined ? 1 : (data.hotPush ? 1 : 0)
            })(
              <RadioGroup>
                <Radio value={1}>{intl.get('pages.storeMenu.dishModal.true')}</Radio>
                <Radio value={0}>{intl.get('pages.storeMenu.dishModal.false')}</Radio>
              </RadioGroup>
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
