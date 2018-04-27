import React, { Component } from 'react';
import { Form, Radio, Input, Button, Modal, message } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import Util from 'app/util/util';
import intl from 'react-intl-universal';

const id = Util.getParaFromUrl('id');
const cx = classNames.bind(styles);
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
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
  constructor(props) {
    super(props);
    this.state = {
      auditStatus: 999,
      claimAuditStatus: 999,
    };
  }

  componentWillMount() {
    id && this.props.fetchDetail(id);
  }

  handleCheckStatus = () => {
    this.props.form.setFieldsValue({
      auditStatus: 1,
      operateStatus: 1,
      claimAuditStatus: 1,
      claimStatus: 1
    });
    this.handleSubmit();
  }

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.submitData(values);
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { detail, showModal, changeState, sendEmail } = this.props;
    return(
      <div className={cx('resform')}>
        <h3>{intl.get('pages.applyInfo.name')}</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormItem style={{display: 'none'}}>
            {getFieldDecorator('shopCode', {initialValue: id || ''})(<Input type="hidden" />)}
          </FormItem>
          <FormItem style={{display: 'none'}}>
            {getFieldDecorator('shopId', {initialValue: detail.shopId || ''})(<Input type="hidden" />)}
          </FormItem>
          <FormItem {...formItemLayout} label={intl.get('pages.applyInfo.storeAudit.name')} style={{marginBottom: 15}}>
            {getFieldDecorator('auditStatus', {
              initialValue: detail.auditStatus || 0
            })(
              <RadioGroup name="auditStatus" onChange={(e)=>{
                this.setState({auditStatus: e.target.value});
              }}>
                <Radio value={0}>{intl.get('pages.applyInfo.storeAudit.status.pending')}</Radio>
                <Radio value={1}>{intl.get('pages.applyInfo.storeAudit.status.pass')}</Radio>
                <Radio value={2}>{intl.get('pages.applyInfo.storeAudit.status.refuse')}</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={intl.get('pages.applyInfo.storeOperationStatus.name')}  style={{marginBottom: 15}}>
            {getFieldDecorator('operateStatus', {
              initialValue: detail.operateStatus || 0
            })(
              // <span>{['确认中','正常经营','停业','未开业'][detail.operateStatus || 0]}</span>
              <RadioGroup name="operateStatus">
                <Radio value={0}>{intl.get('pages.applyInfo.storeOperationStatus.status.confirming')}</Radio>
                <Radio value={1}>{intl.get('pages.applyInfo.storeOperationStatus.status.inOperation')}</Radio>
                <Radio value={2}>{intl.get('pages.applyInfo.storeOperationStatus.status.outOfBusiness')}</Radio>
                <Radio value={3}>{intl.get('pages.applyInfo.storeOperationStatus.status.notOpen')}</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={intl.get('pages.applyInfo.storeClaimAudit.name')} style={{marginBottom: 15}}>
            {getFieldDecorator('claimAuditStatus', {
              initialValue: detail.claimAuditStatus || 0
            })(
              <RadioGroup name="claimAuditStatus" onChange={(e)=>{
                this.setState({claimAuditStatus:e.target.value});
              }}>
                <Radio disabled={!!detail.claimAuditStatus} value={0}>{intl.get('pages.applyInfo.storeClaimAudit.status.notClaim')}</Radio>
                <Radio disabled={!detail.claimAuditStatus} value={1}>{intl.get('pages.applyInfo.storeClaimAudit.status.pass')}</Radio>
                <Radio disabled={!detail.claimAuditStatus} value={2}>{intl.get('pages.applyInfo.storeClaimAudit.status.refuse')}</Radio>
                <Radio disabled={!detail.claimAuditStatus} value={3}>{intl.get('pages.applyInfo.storeClaimAudit.status.pending')}</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={intl.get('pages.applyInfo.storeClaimStatus.name')} style={{marginBottom: 15}}>
            {getFieldDecorator('claimStatus', {
              initialValue: detail.claimStatus || 0
            })(
              <span>{intl.get(`pages.applyInfo.storeClaimStatus.status.${['unclaimed','claimed'][detail.claimStatus]}`)}</span>
            )}
          </FormItem>
          {
            detail.belongMerchant ? (
              <FormItem {...formItemLayout} label={intl.get('pages.applyInfo.relatedMerchant')} style={{marginBottom: 15}}>
                {getFieldDecorator('belongMerchant', {
                  initialValue: detail.belongMerchant
                })(
                  <span>{detail.belongMerchant}</span>
                )}
              </FormItem>
            ) : null
          }
          {
            this.state.auditStatus === 2 || this.state.claimAuditStatus === 2 ? (
              <FormItem {...formItemLayout} label={intl.get('pages.applyInfo.auditFailureReason')}>
                {getFieldDecorator('rejectReason', {
                  rules: [{
                    type: 'string', message: intl.get('pages.applyInfo.auditFailureTips'),
                  }, {
                    required: true, message: intl.get('pages.applyInfo.auditFailureTips'),
                  }],
                  initialValue: detail.rejectReason || ''
                })(
                  <Input />
                )}
              </FormItem>
            ) : null
          }
          <FormItem className={cx('item-last')}>
            { // 店铺审核状态 和 店铺认领审核状态 为待审核时显示一键审核按钮
              detail.auditStatus === 0 && detail.claimAuditStatus === 3 ? (
                <Button type="primary" onClick={this.handleCheckStatus} style={{marginRight:20}}>{intl.get('pages.applyInfo.oneclickAudit')}</Button>
              ) : null
            }
            <Button type="primary" onClick={this.handleSubmit}>{intl.get('pages.applyInfo.save')}</Button>
          </FormItem>
        </Form>
        <Modal
          title={intl.get('pages.applyInfo.success')}
          visible={showModal}
          onOk={()=>{
            if (detail.belongMerchant) {
              sendEmail(detail.belongMerchant)
            } else {
              message.error(intl.get('pages.applyInfo.emailEmptyTips'), 3);
            }
          }}
          onCancel={()=>changeState({showModal: false})}
          cancelText={intl.get('pages.applyInfo.notSendEmail')}
          okText={intl.get('pages.applyInfo.sendEmail')}
        >
          <p>{intl.get('pages.applyInfo.passTips')}</p>
          <p>{intl.get('pages.applyInfo.email')}：{detail.belongMerchant}</p>
        </Modal>
      </div>
    )
  }
}

const InfoForm = Form.create()(Info);
export default InfoForm;
