import React, { Component } from 'react';
import { Form, Radio, Button, Select, Spin } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import axios from 'axios';
import Base from 'app/util/base';
import Util from 'app/util/util';
import JsCookie from 'js-cookie';
import intl from 'react-intl-universal';

const lang = JsCookie.get('locale') || 'en_US';
const id = Util.getParaFromUrl('id');
const Option = Select.Option;
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
      detail: {},
      type: 'styleA',
      wechat: null,
      isloading: true
    };
  }

  componentWillMount() {
    const { fetchDetail, getAreaList } = this.props;
    fetchDetail();
    getAreaList();
    this.getWechat();
  }

  componentWillReceiveProps(nextProps) {
    const { detail } = nextProps;
    !detail.zoneId && this.setState({ isloading: false });
  }

  getWechat = () => {
    if ( id ) {
      this.setState({ isloading: true });
      axios({
        url: `${Base.domain}/shop/qr/${id}`,
      }).then(res => {
        const data = res.data;
        if ( data.rs === 1 ) {
          this.setState({wechat: data.data, isloading: false});
        } else {
          // message.error(`Failed, ${data.msg}`);
          this.setState({ isloading: false });
        }
      });
    }
  }

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.zoneId = values.zoneId ? Number(values.zoneId) : null;
        const { detail } = this.props;
        this.props.submitData({ ...detail, zoneId: values.zoneId, skinType: values.skinType});
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { detail, areaList } = this.props;
    const { wechat, type, isloading } = this.state;
    return(
      <div className={cx('resform')}>
        <Form onSubmit={this.handleSubmit}>
          <h3>{intl.get('pages.storeSet.name')}</h3>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeSet.skin')}
            style={{marginBottom: 12}}
          >
            {getFieldDecorator('skinType', {
              initialValue: detail.skinType || 1
            })(
              <RadioGroup>
                <Radio value={1}>{intl.get('pages.storeSet.skinA')}</Radio>
                <Radio value={2}>{intl.get('pages.storeSet.skinB')}</Radio>
                <Radio value={3}>{intl.get('pages.storeSet.skinC')}</Radio>
                <Radio value={4}>{intl.get('pages.storeSet.skinD')}</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeSet.platform')}
            style={{marginBottom: 12}}
          >
            {getFieldDecorator('zoneId', {
              initialValue: detail.zoneId ? `${detail.zoneId}` : ''
            })(
              <Select style={{width: 140}}>
                <Option value=''>{lang === 'en_US' ? 'Choose Area' : '暂不投放'}</Option>
                {
                  areaList.map((val,ind)=>(
                    <Option key={ind} value={`${val.id}`}>{val[lang === 'en_US' ? 'nameEn' : 'nameCn']}</Option>
                  ))
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={intl.get('pages.storeSet.qrcode')}
            style={{marginBottom: 12}}
          >
            <Spin spinning={this.state.isloading}>
            {
              !wechat ? (
                <p className={cx('error')}>{intl.get('pages.storeSet.qrmsg')}</p>
              ) : (
                <div className={cx('imgbox')}>
                  <div className={cx('imgleft')}>
                    <h4><span className={cx('th')}>{intl.get('pages.storeSet.hd')}</span></h4>
                    <img src={wechat.general} alt={intl.get('pages.storeSet.hd')} width="200"/>
                    <p>
                      {
                        wechat.general ? (
                          <a href={wechat.general} target="_blank">{intl.get('pages.storeSet.bigimg')}</a>
                        ) : null
                      }
                      {
                        wechat.general ? (
                          <a href={wechat.general} download={intl.get('pages.storeSet.download')}>
                            {intl.get('pages.storeSet.download')}
                          </a>
                        ) : null
                      }
                    </p>
                    <h5>{intl.get('pages.storeSet.sizea')}</h5>
                  </div>
                  <div className={cx('imgright')}>
                    <h4>
                      <span className={cx('th')}>{intl.get('pages.storeSet.sticker')}</span>
                      <Select style={{width: 150}} value={type} onChange={(v)=>this.setState({type:v})}>
                        <Option value="styleA">{intl.get('pages.storeSet.stylea')}</Option>
                        <Option value="styleB">{intl.get('pages.storeSet.styleb')}</Option>
                        <Option value="styleC">{intl.get('pages.storeSet.stylec')}</Option>
                        <Option value="styleD">{intl.get('pages.storeSet.styled')}</Option>
                        <Option value="styleE">{intl.get('pages.storeSet.stylee')}</Option>
                        <Option value="styleF">{intl.get('pages.storeSet.stylef')}</Option>
                      </Select>
                    </h4>
                    <img src={wechat.sticker[type]} alt={intl.get('pages.storeSet.sticker')} width="200"/>
                    <p>
                      <a href={wechat.sticker[type]} target="_blank">{intl.get('pages.storeSet.bigimg')}</a>
                      <a href={wechat.sticker[type]} download={intl.get('pages.storeSet.download')}>
                        {intl.get('pages.storeSet.download')}
                      </a>
                    </p>
                    <h5>{intl.get('pages.storeSet.sizeb')}</h5>
                  </div>
                </div>
              )
            }
            </Spin>
          </FormItem>
          <FormItem className={cx('item-last')}>
            <Button type="primary" disabled={isloading || detail.auditStatus !== 1} onClick={this.handleSubmit}>{intl.get('pages.storeSet.ok')}</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const InfoForm = Form.create()(Info);
export default InfoForm;
