import React, { Component } from 'react';
import { Button, Select, Input } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import Base from 'app/util/base';

const cx = classNames.bind(styles);
const Option = Select.Option;

class Search extends Component {
  componentWillMount() {
    this.props.fetchList(this.props.search);
  }
  handleClick = () => {
    this.props.fetchList(this.props.search);
  }
  render() {
    const { status, userType, email } = this.props.search;
    return(
      <div className={cx('search')}>
        状态：
        <Select value={status} onChange={(val)=>this.props.changeState({status: val})}>
          <Option value="">所有</Option>
          <Option value="1">审核通过</Option>
          <Option value="0">待审核</Option>
          <Option value="2">审核不通过</Option>
        </Select>
        角色：
        <Select value={userType} onChange={(val)=>this.props.changeState({userType: val})}>
          <Option value="">所有</Option>
          <Option value="0">商家</Option>
          <Option value="1">运营商</Option>
          <Option value="2">管理员</Option>
        </Select>
        邮箱：
        <Input value={email} onChange={(e)=>this.props.changeState({email: e.target.value.replace(/(^\s+)|(\s+$)/,'')})}/>
        <Button type="primary" onClick={this.handleClick}>搜索</Button>
        <a href={`${Base.domain}/user/create-page`} className={cx('add')} target="_blank" rel="noopener noreferrer">
          <Button type="primary">添加商家</Button>
        </a>
      </div>
    )
  }
}

export default Search;
