import React, { Component } from 'react';
import { Form, Input,  Button,  } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import AverageFee from '../average-fee';
import ShopHours from '../shop-hours';
import LatLng from '../lat-lng';
import DishTaste from '../dish-taste';
import util from 'app/util/util';
import intl from 'react-intl-universal';

const id = util.getParaFromUrl('id');
const cx = classNames.bind(styles);
const FormItem = Form.Item;
const TextArea = Input.TextArea;

class EditForm extends Component {
  handleSubmit() {
    const { saveBaseInfo } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.longitude = values.latitude.longitude;
        values.latitude = values.latitude.latitude;
        values.budget = values.currency.budget;
        values.maxBudget = values.currency.maxBudget;
        values.currency = values.currency.currency;
        if(!values.pic) {values.pic = []}
        if(id){
          values.shopCode = id;
        }
        saveBaseInfo(values);
      }
    });
  }
 
  render() {
    const formItemLayout = {
      labelCol: {
        sm: { span: 5 },
      },
      wrapperCol: {
        sm: { span: 19 },
      },
    };
    const props = this.props;
    const { getFieldDecorator } = props.form;
    const { shopInfo } = props;
    const {
      budget,
      maxBudget,
      businessTime,
      currency,
      dishesTaste,
      latitude,
      longitude,
      chef,
      shopDesc,
      shopType,
    } = shopInfo;
    const latlng = { latitude, longitude };
    const consume = { budget, maxBudget, currency };
    
    return (
      <Form className={cx('edit-form')}>
        <h3>{intl.get('pages.storeInfoBase.title')}</h3>
        <FormItem
          {...formItemLayout}
          label={`${intl.get('pages.storeInfoBase.shopDesc')}：`}
        >
          {
            getFieldDecorator('shopDesc', {
              initialValue: shopDesc
            })(
              <TextArea rows={4} style={{width: 620}}/>
            )
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={`${intl.get('pages.storeInfoBase.consume')}：`}
        >
          {
            getFieldDecorator('currency', {
              initialValue: consume
            })(<AverageFee />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={`${intl.get('pages.storeInfoBase.businessTime')}：`}
        >
          {
            getFieldDecorator('businessTime', {
              initialValue: businessTime
            })(<ShopHours />)
          }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={`${intl.get('pages.storeInfoBase.latlng')}：`}
        >
          {
            getFieldDecorator('latitude', {
              initialValue: latlng
            })(
              <LatLng />
            )
          }
        </FormItem>
        {
          shopType === 1 ? (
          // true ? (
            <div>
              <FormItem
                {...formItemLayout}
                label={`${intl.get('pages.storeInfoBase.taste')}：`}
              >
                {
                  getFieldDecorator('dishesTaste', {
                    initialValue: dishesTaste
                  })(
                    <DishTaste />
                  )
                }
              </FormItem>
              <FormItem
                {...formItemLayout}
                label={`${intl.get('pages.storeInfoBase.chef')}：`}
              >
                {
                  getFieldDecorator('chef', {
                    initialValue: chef
                  })(
                    <Input style={{height: 40,width: 620}} placeholder={intl.get('pages.storeInfoBase.chef')} />
                  )
                }
              </FormItem>
            </div>
          ) : null
        }
        <FormItem
          className={cx('btn-wrap')}
          wrapperCol={{
            sm: { offset: 5, span: 19 }
          }}
        >
          <Button type="primary" onClick={this.handleSubmit.bind(this)}>{intl.get('pages.storeInfoBase.save')}</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedEditForm = Form.create()(EditForm);

module.exports = WrappedEditForm;
