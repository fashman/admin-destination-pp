import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import Where from 'app/components/where';
import intl from 'react-intl-universal';
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
    sm: { span: 19 },
  },
};

class Info extends Component {
  componentWillMount() {
    this.props.fetchDetail();
  }

  handleSubmit = () => {
    const { detail, form, submitData } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {...detail, ...values, ...values.where};
        delete data.where;
        submitData(data);
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { detail } = this.props;
    const intloperateStatus = ['confirming','inOperation','outOfBusiness','notOpen'];
    return(
      <div className={cx('resform')}>
        <h3 className={cx('h3')}>{intl.get('pages.storeInfo.name')}</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeInfo.merchantId')}
            style={{marginBottom: 2}}
          >
            {getFieldDecorator('shopCode', {
              initialValue: detail.shopCode
            })(
              <span>{detail.shopCode}</span>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeInfo.merchantName')}
            style={{marginBottom: 2}}
          >
            {getFieldDecorator('shopNameEn', {
              initialValue: detail.shopNameEn
            })(
              <span>{detail.shopNameEn}</span>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeInfo.operateStatus')}
            style={{marginBottom: 12}}
          >
            <span>{intl.get(`pages.storeInfo.operateStatusArr.${intloperateStatus[detail.operateStatus||0]}`)}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeInfo.claimStatus')}
            style={{marginBottom: 12}}
          >
            <span>{intl.get(`pages.storeInfo.claimStatusArr.${['unclaimed','claimed'][detail.claimStatus||0]}`)}</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeInfo.merchantType')}
            style={{marginBottom: 16}}
          >
            {getFieldDecorator('shopType', {
              initialValue: detail.shopType
            })(
              <span>{detail.shopType === 1 ? intl.get('pages.storeInfo.restaurant') : intl.get('pages.storeInfo.other')}</span>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeInfo.merchantAddress')}
          >
            {getFieldDecorator('where', {
              initialValue: {
                country: detail.country || '', 
                city: detail.city || '', 
                shopAddress: detail.shopAddress || ''
              }
            })(
              <Where />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={intl.get('pages.storeInfo.postcode')}>
            {getFieldDecorator('postcode', {
              initialValue: detail.postcode
            })(
              <Input placeholder={intl.get('pages.storeInfo.postcode')} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeInfo.description')}
            hasFeedback
          >
            {getFieldDecorator('description', {
              rules: [{
                type: 'string', message: `${intl.get('pages.storeInfo.description')}!`,
              }, {
                required: true, message: intl.get('pages.storeInfo.description'),
              }],
              initialValue: detail.description || ''
            })(
              <Input type="textarea" placeholder={intl.get('pages.storeInfo.description')}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeInfo.pic')}
            style={{marginBottom: 0}}
          >
            {getFieldDecorator('pictureUrls', {
              initialValue: detail.pictureUrls || []
            })(
              <WoxUpload notSimple={true} Max={20}/>
            )}
          </FormItem>
          <p style={{margin:'0 0 30px 173px ',color:'#848484',fontSize:'12px',lineHeight:'12px'}}>{intl.get('pages.storeInfo.picTips')}</p>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeInfo.logo')}
            style={{marginBottom: 0}}
          >
            {getFieldDecorator('logoUrl', {
              initialValue: detail.logoUrl || ''
            })(
              <WoxUpload />
            )}
          </FormItem>
          <p style={{margin:'0 0 30px 173px ',color:'#848484',fontSize:'12px',lineHeight:'12px'}}>{intl.get('pages.storeInfo.logoTips')}</p>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label={intl.get('pages.storeInfo.contactor')}
          >
            {getFieldDecorator('contactor', {
              rules: [{
                type: 'string', message: `${intl.get('pages.storeInfo.contactor')}!`,
              }, {
                required: true, message: intl.get('pages.storeInfo.contactorTips'),
              }],
              initialValue: detail.contactor || ''
            })(
              <Input placeholder={intl.get('pages.storeInfo.contactorTips')} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label={intl.get('pages.storeInfo.mobile')}
          >
            {getFieldDecorator('contactPhone', {
              rules: [{
                pattern: /^[0-9-]+$/, message: `${intl.get('pages.storeInfo.mobile')}!`,
              }, {
                required: true, message: intl.get('pages.storeInfo.mobileTips'),
              }],
              initialValue: detail.contactPhone || ''
            })(
              <Input placeholder={intl.get('pages.storeInfo.mobileTips')}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            hasFeedback
            label={intl.get('pages.storeInfo.email')}
          >
            {getFieldDecorator('contactEmail', {
              rules: [{
                type: 'email', message: `${intl.get('pages.storeInfo.email')}!`,
              }, {
                required: true, message: intl.get('pages.storeInfo.emailTips'),
              }],
              initialValue: detail.contactEmail || ''
            })(
              <Input placeholder={intl.get('pages.storeInfo.emailTips')}/>
            )}
          </FormItem>
          <FormItem className={cx('item-last')}>
            <Button type="primary" onClick={this.handleSubmit}>{intl.get('pages.storeInfo.ok')}</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const InfoForm = Form.create()(Info);
export default InfoForm;
