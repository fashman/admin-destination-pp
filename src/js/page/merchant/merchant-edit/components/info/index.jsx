import React, { Component } from 'react';
import { Form, Input, Button, Select, Spin, message, Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import axios from 'axios';
import Base from 'app/util/base';
import debounce from 'lodash.debounce';

const cx = classNames.bind(styles);
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetching: false,
      data: [],
      value: [],
      select: [],
    }
    this.fetchShop = debounce(this.fetchShop, 800);
  }
  componentWillMount() {
    this.props.fetchDetail();
  }
  handleSubmit = () => {
    const { form, submitData, shopUsers, user } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { status, password } = values;
        submitData({
          user: {...user,password, status: Number(status)},
          shopUsers: shopUsers.map((v, i)=>({shopId:v.shopId}))
        });
      }
    });
  }
  fetchShop = (value) => { // 搜索店铺
    if ( value && !/^\s*$/.test(value) ) {
      this.setState({fetching: true, data: []});
      axios.get(`${Base.api}/shop/search/${value}`).then((req)=>{
        const res = req.data;
        if ( res.rs === 1 ) {
          this.setState({data: res.data, fetching: false});
        } else {
          message.error(`获取店铺列表失败！`, 3);
        }
      });
    }
  }
  checkShop = () => { // 检测店铺是否已被关联，若未被关联，则该条数据会添加到已关联数据
    const { value, data } = this.state;
    const { changeState, shopUsers } = this.props;
    const hasCheck = shopUsers.some(v=>v.shopId == value[0].key);
    if(hasCheck){
      message.error('您已选择了改店铺！', 3);
      return;
    }
    axios.get(`${Base.api}/user/claim/${value[0].key}`).then((req)=>{
      const res = req.data;
      if ( res.rs === 1 ) {
        if(!res.data){
          const addShop = data.find(v=>v.shopId == value[0].key);
          changeState({shopUsers: [...shopUsers, {...addShop, id:''}]});
          this.setState({value: []});
        } else {
          message.error(`改店铺已被认领！`, 3);
        }
      } else {
        message.error(`查询店铺认领状态失败！`, 3);
      }
    });
  }
  handleSelect = (index) => { // 选中（关联操作）
    let { select } = this.state;
    const has = select.some(v=>v===index);
    if(has){
      select = select.filter(v=>v!==index);
    }else{
      select.push(index);
    }
    this.setState({select});
  }
  handleDeleteSop = () => { // 删除关联（页面层删除，保存后才生效）
    const { select } = this.state;
    let { shopUsers, changeState } = this.props;
    shopUsers = shopUsers.filter(val=>{
      const has = select.some(v=>v===val.shopId);
      return !has;
    });
    changeState({shopUsers});
    this.setState({select: []});
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { user, shopUsers } = this.props;
    const { fetching, data, value, select } = this.state;
    return(
      <div className={cx('resform')}>
        <h3 className={cx('h3')}>修改商家</h3>
        <Form className={cx('left')}>
          <FormItem {...formItemLayout} label='商家ID' style={{marginBottom:0}}>
            <span>{user.id}</span>
          </FormItem>
          <FormItem {...formItemLayout} label='角色' style={{marginBottom:0}}>
            <span>{['商家','运营','管理员'][user.userType || 0]}</span>
          </FormItem>
          <FormItem {...formItemLayout} label='昵称' style={{marginBottom:0}}>
            <span>{user.nickName || '未填写'}</span>
          </FormItem>
          <FormItem {...formItemLayout} label='注册时间' style={{marginBottom:0}}>
            <span>{user.createTimeStr}</span>
          </FormItem>
          <FormItem {...formItemLayout} label='注册邮箱' style={{marginBottom:20}}>
            <span>{user.email || '未填写'}</span>
          </FormItem>
          <FormItem {...formItemLayout} label='重置密码'>
            {getFieldDecorator('password', {
              rules: [{
                validator: (rule, value, callback) => {
                  if ( value && !/^[0-9a-zA-Z_]{6,16}$/.test(value) ) {
                    callback('密码格式不对,密码为6-16位数字、字母或_');
                  } else {
                    callback();
                  }
                }
              }],
              initialValue: ''
            })(
              <Input type="password" placeholder="" />
            )}
            <p className={cx('tips')}>需要重置时在输入密码，密码为6-16位数字、字母或_</p>
          </FormItem>
          <FormItem {...formItemLayout} label='状态'>
            {getFieldDecorator('status', {
              initialValue: user.status ? `${user.status}` : '0'
            })(
              <Select>
                <Option value="1">审核通过</Option>
                <Option value="0">待审核</Option>
                <Option value="2">审核不通过</Option>
              </Select>
            )}
          </FormItem>
          <FormItem className={cx('item-last')}>
            <Button type="primary" onClick={this.handleSubmit}>保存修改</Button>
          </FormItem>
        </Form>
        {
          user && user.userType !== 2 ? (
            <div className={cx('right')}>
              <FormItem {...formItemLayout} label='已关联店铺' style={{marginBottom:10}}>
                <div className={cx('shopusers')}>
                  {
                    (shopUsers||[]).map((v,i)=>{
                      const has = select.some(val=>val===v.shopId);
                      return (
                        <p key={i} className={cx(has ? 'cur' : '')} onClick={()=>this.handleSelect(v.shopId)}>【{v.shopCode}】{v.shopNameEn}</p>
                      );
                    })
                  }
                </div>
                <Popconfirm title="确认删除关联选中的店铺吗？" onConfirm={this.handleDeleteSop}>
                  <Button disabled={select.length ? false : true} className={cx('shopusers-btn')} type="primary">删除关联</Button>
                </Popconfirm>
              </FormItem>
              <FormItem {...formItemLayout} label='关联新店铺'>
                <Select
                  mode="multiple"
                  labelInValue
                  value={value}
                  placeholder="请输入店铺code或名称"
                  notFoundContent={fetching ? <Spin size="small" /> : null}
                  filterOption={false}
                  onSearch={this.fetchShop}
                  onChange={(v)=>this.setState({value:v.length ? [v[v.length-1]]:[]})}
                  style={{ width: '100%' }}
                >
                  {data.map(d => <Option key={d.shopId}>{d.shopCode} {d.shopNameEn}</Option>)}
                </Select>
                <Button disabled={value.length ? false : true} className={cx('shopusers-btn')} type="primary" onClick={this.checkShop}>+关联</Button>
              </FormItem>
            </div>
          ) : null
        }
      </div>
    )
  }
}

const InfoForm = Form.create()(Info);
export default InfoForm;
