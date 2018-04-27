import React, { Component } from 'react';
import { Table, Button, Pagination } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import Base from 'app/util/base';

const cx = classNames.bind(styles);

class List extends Component {
  render() {
    const { listData, fetchList, isloading, search } = this.props;
    const { resultList, total, currentPage } = listData;
    const columns = [{
      title: '商家ID',
      dataIndex: 'id',
      width: '10%'
    }, {
      title: '角色',
      dataIndex: 'userType',
      width: '10%',
      render: text => ['普通商家','运营商','管理员'][text]
    }, {
      title: '注册邮箱',
      dataIndex: 'email',
      width: '15%',
      render: text => text
    }, {
      title: '关联店铺',
      dataIndex: 'claimCount',
      width: '10%',
      render: text => text || 0
    }, {
      title: '注册时间',
      dataIndex: 'createTimeStr',
      width: '10%',
      // render: text => text && new Date(text).toLocaleDateString()
    }, {
      title: '状态',
      dataIndex: 'status',
      width: '10%',
      render: text => (
        <span className={cx(`color${text}`)}>
          {['待审核','审核通过','审核不通过'][text]}
        </span>
      )
    }, {
      title: '操作人/操作时间',
      dataIndex: 'modifier',
      width: '20%',
      render: (text, record, index) => (
        <div><p>{record.modifier}</p><p>{record.modifyTimeStr}</p></div>
      )
    }, {
      title: '操作',
      dataIndex: '',
      width: '15%',
      render: (text, record, index) => (
        <div>
          <a href={`${Base.domain}/user/edit-page?id=${record.id}`} target="_blank">
            <Button type='primary' style={{marginRight: 10}}>编辑</Button>
          </a>
          {/* {
            record.claimCount > 0 ? ( */}
              <a href={`${Base.domain}/shop/list-page?e=${record.email}`} target="_blank">
                <Button type='primary'>查看店铺</Button>
              </a>
            {/* ) : null
          } */}
        </div>
      )
    }];
    return(
      <div className={cx('list')}>
        <Table bordered 
          loading={isloading}
          dataSource={resultList ? resultList.map((v,i)=>({...v,key:i})) : []} 
          columns={columns}
          pagination={false}
        />
        {
          resultList && resultList.length ? (
            <Pagination 
              current={currentPage} 
              total={total}
              showQuickJumper 
              showSizeChanger
              onChange={(page, pageSize) => fetchList({
                ...search, pageNo: page, pageSize
              })}
              onShowSizeChange={(current, size) => fetchList({
                ...search, pageSize: size
              })}
              showTotal={total => `共 ${total} 条记录`}
            />
          ) : null
        }
      </div>
    )
  }
}

export default List;
