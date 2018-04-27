import React, { Component } from 'react';
import { Form, Radio, Input, Button, Alert } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import Base from 'app/util/base';
import Where from 'app/components/where';
import Util from 'app/util/util';
import WoxUpload from 'wox-upload';
import intl from 'react-intl-universal';

const username = Util.getParaFromUrl('username');
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

class Step extends Component {
  constructor(props) {
    super(props);
    this.state = { agree: 0 };
  }
  handlePrev = () => {
    const values = this.props.form.getFieldsValue();
    const data = {...values, ...values.where};
    delete data.where;
    this.props.changeState({step: 0, stepb: data});
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          ...values, ...values.where, username
        };
        delete data.where;
        delete data.agreement;
        this.props.changeState({isloading: true});
        this.props.saveSubmit(data);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { stepb, isloading } = this.props;
    return(
      <Form className={cx('form')} onSubmit={this.handleSubmit}>
        {
          stepb.auditStatus && stepb.auditStatus == 2 ? (
            <FormItem>
              <Alert 
                message={intl.get('pages.storeCreate.wrongDesc',{res: stepb.rejectReason})} 
                type="error" 
              />
            </FormItem>
          ) : null
        }
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
              initialValue: stepb.shopNameEn
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
              initialValue: stepb.shopType
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
              initialValue: {country: stepb.country, city: stepb.city, shopAddress: stepb.shopAddress}
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
              initialValue: stepb.postcode
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
              initialValue: stepb.description
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
              initialValue: stepb.pictureUrls
            })(
              <WoxUpload Max={5} notSimple={true}/>
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
              initialValue: stepb.contactor
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
              initialValue: stepb.contactPhone
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
              initialValue: stepb.contactEmail
            })(
              <Input placeholder={intl.get('pages.storeCreate.contactEmailTips')}/>
            )}
          </FormItem>
          <FormItem
            style={{paddingLeft: '24%'}}
          >
            {getFieldDecorator('agreement', {
              rules: [{
                validator: (rule, value, callback) => {
                  if ( value !== 1 ) callback(intl.get('pages.storeCreate.agreementTips'));
                  else callback();
                }
              }],
              initialValue: ''
            })(
              <RadioGroup>
                <Radio value={1}>{intl.get('pages.storeCreate.agree')}</Radio>
                <Radio value={2}>{intl.get('pages.storeCreate.disagree')}</Radio>
                <a href={`${Base.domain}/registry/assignment-page`} target="_blank">{intl.get('pages.storeCreate.agreement')}</a>
              </RadioGroup>
            )}
          </FormItem>
        </div>
        <p className={cx('btns')}>
          <Button 
            type="primary" 
            onClick={this.handleSubmit} 
            loading={isloading}
            disabled={username ? false : true}
          >
            {intl.get('pages.storeCreate.submit')}
          </Button>
        </p>
      </Form>
    )
  }
}

const StepB = Form.create()(Step);
export default StepB;
