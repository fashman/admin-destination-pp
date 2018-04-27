import React, { Component } from 'react';
import { Form, Radio, Input, Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import Base from 'app/util/base';
import Where from 'app/components/where';
import WoxUpload from 'wox-upload';
import intl from 'react-intl-universal';

const cx = classNames.bind(styles);
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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

class Info extends Component {
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {...values, ...values.where};
        delete data.where;
        this.props.changeState({isloading: true});
        this.props.saveSubmit(data);
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isloading } = this.props;
    return(
      <Form className={cx('form')} onSubmit={this.handleSubmit}>
        <div className={cx('resform')}>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeCreate.merchantname')}
            hasFeedback
          >
            {getFieldDecorator('shopNameEn', {
              rules: [{
                type: 'string', message: intl.get('pages.storeCreate.merchantnameTips'),
              }, {
                required: true, message: intl.get('pages.storeCreate.merchantnameTips'),
              }],
              initialValue: ''
            })(
              <Input placeholder={intl.get('pages.storeCreate.merchantnameTips')}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeCreate.type')}
          >
            {getFieldDecorator('shopType', {
              rules: [{
                type: 'number', message: intl.get('pages.storeCreate.type'),
              }, {
                required: true, message: intl.get('pages.storeCreate.type'),
              }],
              initialValue: 1
            })(
              <RadioGroup>
                <Radio value={1}>{intl.get('pages.storeCreate.restaurant')}</Radio>
                <Radio value={2}>{intl.get('pages.storeCreate.other')}</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeCreate.address')}
          >
            {getFieldDecorator('where', {
              rules: [{
                type: 'object', message: intl.get('pages.storeCreate.address'),
              }, {
                required: true, message: intl.get('pages.storeCreate.address'),
              }],
              initialValue: {country: '', city: '', shopAddress: ''}
            })(
              <Where />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeCreate.postcode')}
            hasFeedback
          >
            {getFieldDecorator('postcode', {
              rules: [{
                type: 'string', message: intl.get('pages.storeCreate.postcodeTips'),
              }, {
                required: true, message: intl.get('pages.storeCreate.postcodeTips'),
              }],
              initialValue: ''
            })(
              <Input placeholder={intl.get('pages.storeCreate.postcodeTips')}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeCreate.description')}
            hasFeedback
          >
            {getFieldDecorator('description', {
              rules: [{
                type: 'string', message: intl.get('pages.storeCreate.descriptionTips'),
              }, {
                required: true, message: intl.get('pages.storeCreate.descriptionTips'),
              }],
              initialValue: ''
            })(
              <Input type="textarea" placeholder={intl.get('pages.storeCreate.descriptionMsg')}/>
            )}
          </FormItem>
        </div>
        <div className={cx('resform')}>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeCreate.pic')}
            style={{marginBottom: 0}}
          >
            {getFieldDecorator('pictureUrls', {
              initialValue: []
            })(
              <WoxUpload Max={5} action={`${Base.img}/wximg/dpp/upload`} notSimple={true}/>
            )}
          </FormItem>
          <p style={{margin:'0 0 30px 148px ',color:'#848484',fontSize:'12px',lineHeight:'12px'}}>{intl.get('pages.storeCreate.picTips')}</p>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeCreate.contactor')}
            hasFeedback
          >
            {getFieldDecorator('contactor', {
              rules: [{
                type: 'string', message: intl.get('pages.storeCreate.contactorTips'),
              }, {
                required: true, message: intl.get('pages.storeCreate.contactorTips'),
              }],
              initialValue: ''
            })(
              <Input placeholder={intl.get('pages.storeCreate.contactorTips')}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeCreate.mobile')}
            hasFeedback
          >
            {getFieldDecorator('contactPhone', {
              rules: [{
                pattern: /^[0-9-]+$/, message: intl.get('pages.storeCreate.mobileTips'),
              }, {
                required: true, message: intl.get('pages.storeCreate.mobileTips'),
              }],
              initialValue: ''
            })(
              <Input placeholder={intl.get('pages.storeCreate.mobileTips')}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeCreate.contactEmail')}
            hasFeedback
          >
            {getFieldDecorator('contactEmail', {
              rules: [{
                type: 'email', message: intl.get('pages.storeCreate.contactEmailTips'),
              }, {
                required: true, message: intl.get('pages.storeCreate.contactEmailTips'),
              }],
              initialValue: ''
            })(
              <Input placeholder={intl.get('pages.storeCreate.contactEmailTips')}/>
            )}
          </FormItem>
        </div>
        <p className={cx('btns')}>
          <Button 
            type="primary" 
            onClick={this.handleSubmit} 
            loading={isloading}
            disabled={isloading}
          >
            {intl.get('pages.storeCreate.submit')}
          </Button>
        </p>
      </Form>
    )
  }
}

const InfoForm = Form.create()(Info);
export default InfoForm;
