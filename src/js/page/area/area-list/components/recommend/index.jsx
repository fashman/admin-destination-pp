import React, { Component } from 'react';
import { Modal, Form, Input, Select, InputNumber, message } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import WoxUpload from 'wox-upload';
import staticData from 'app/util/static';
import axios from 'axios';
import Base from 'app/util/base';
import debounce from 'lodash.debounce';

const Option = Select.Option;
const cx = classNames.bind(styles);
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

class RecommendModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = debounce(this.handleChange, 500);
  }
  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { addRecommend } = this.props;
        addRecommend(values);
        this.props.form.resetFields();
      }
    })
  }
  handleCheckCode = (rule, value, callback) => {
    if ( value && isNaN(value) ) {
      callback('产品编码只能为数字');
    } else callback();
  }
  handleChange = (value) => {
    if ( value && !isNaN(value) ) {
      const { getFieldValue } = this.props.form;
      const type = getFieldValue('type');
      axios.get(`${Base.api}/recommend/product/${this.props.curData.id}/${type}/${value}`).then((req)=>{
        const data = req.data;
        if ( data.rs === 1 ) {
          const {budget, currency, description, pictureUrl, productName} = data.data;
          this.props.form.setFieldsValue({
            budget, currency, description, pictureUrl, productName
          });
        } else if ( data.rs === 2 ) {
          message.error('未找到该编码对应的产品');
          // this.props.form.setFieldsValue({ productCode: ''});
        } else if ( data.rs === 3 ) {
          message.error('该区域已经添加过这条产品');
          // this.props.form.setFieldsValue({ productCode: ''});
        } else {
          message.error('获取产品信息失败');
        }
      });
    }
  }
  render() {
    const { form, changeState, recommendVisible, curData } = this.props;
    const { getFieldDecorator } = form;
    const currencyfixSelector = getFieldDecorator('currency',{
      initialValue: ''
    })(
      <Select
        getPopupContainer={() => document.getElementsByClassName('price-select')[0]}
      >
        {
          staticData.currency.map((val,idx) => (
            <Option value={val.code} key={idx}>{val.name}</Option>
          ))
        }
      </Select>
    )
    return(
      <Modal
        title="特别推荐"
        visible={recommendVisible}
        onOk={this.handleSubmit}
        onCancel={()=>{this.props.form.resetFields();changeState({recommendVisible: false})}}
        className={cx('recommend-modal')}
        width="632px"
      >
        <Form>
          <FormItem style={{display:'none'}}>
            {getFieldDecorator('zoneId', {
              initialValue: curData.id
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="类型"
            {...formItemLayout}
          >
            {getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择类型' }],
              initialValue: '1'
            })(
              <Select style={{width: '100%'}} onChange={()=>{
                this.props.form.resetFields([
                  'productCode','productName','budget','weight','description','pictureUrl'
                ]);
              }}>
                <Option value="1">玩乐</Option>
                {/* <Option value="2">店铺</Option>
                <Option value="3">图文</Option> */}
                <Option value="4">我行参团</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            label="路路行产品编码"
            {...formItemLayout}
          >
            {getFieldDecorator('productCode', {
              rules: [{
                validator: this.handleCheckCode
              }],
              initialValue: ''
            })(
              <InputNumber onChange={this.handleChange} style={{width: '100%',height:40}} min={1}/>
            )}
          </FormItem>
          <FormItem
            label="产品名称"
            {...formItemLayout}
          >
            {getFieldDecorator('productName', {
              rules: [{
                required: true, message: '请填写产品名称'
              }, {
                max: 200
              }],
              initialValue: ''
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            label="产品售价"
            {...formItemLayout}
            className="price-select"
          >
            {getFieldDecorator('budget', {
              rules: [{
                validator: (r,v,c)=>{
                  if(v){
                    if (v === '') return c()
                    else if( isNaN(v) || (!isNaN(v) && v < 0) ) return c('产品售价只能为大于0的数字')
                    else return c();
                  }else return c();
                }
              }],
              initialValue: ''
            })(
              <Input placeholder="请输入金额" addonAfter={currencyfixSelector}/>
            )}
          </FormItem>
          <FormItem
            label="权重"
            {...formItemLayout}
          >
            {getFieldDecorator('weight', {
              initialValue: ''
            })(
              <InputNumber style={{width: '100%',height:40}} max={100} min={1}  />
            )}
          </FormItem>
          <FormItem
            label="推荐语"
            {...formItemLayout}
          >
            {getFieldDecorator('description', {
              initialValue: ''
            })(
              <Input type="textarea" style={{height: 80,lineHeight:'20px'}} />
            )}
          </FormItem>
          <FormItem
            label="图片"
            style={{marginBottom: 0}}
            {...formItemLayout}
          >
            {getFieldDecorator('pictureUrl', {
              initialValue: '',
            })(
              <WoxUpload />
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

const RecommendModalForm = Form.create()(RecommendModal);

export default RecommendModalForm;
