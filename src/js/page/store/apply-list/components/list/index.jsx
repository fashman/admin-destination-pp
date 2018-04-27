import React, { Component } from 'react';
import { Table, Button, Pagination } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import Base from 'app/util/base';
import JsCookie from 'js-cookie';
import intl from 'react-intl-universal';
import staticData from 'app/util/static';

const lang = JsCookie.get('locale') || 'en_US';
const cx = classNames.bind(styles);

class List extends Component {
  render() {
    const { listData, fetchList, isloading, search, changeState } = this.props;
    const { resultList, total, currentPage } = listData;
    const intlIndex = ['a', 'b', 'c', 'd'];
    const columns = [{
      title: intl.get('pages.storeList.table.merchantCode'),
      dataIndex: 'shopCode',
      width: '8%'
    }, {
      title: intl.get('pages.storeList.shopType.name'),
      dataIndex: 'shopType',
      width: '8%',
      render: text => intl.get(`pages.storeList.shopType.list.${intlIndex[text ? text-1 : 0]}`)
    }, {
      title: intl.get('pages.storeList.table.merchantName'),
      dataIndex: 'shopNameEn',
      width: '8%'
    }, {
      title: intl.get('pages.storeList.table.country'),
      dataIndex: 'country',
      width: '8%',
      render: text => {
        const country = staticData.countryAndCity.find(val=>val.code === text);
        return country ? (lang === 'en_US' ? country.enName : country.cnName) : '';
      }
    }, {
      title: intl.get('pages.storeList.table.city'),
      dataIndex: 'city',
      width: '10%',
      render: (text, record, index) => {
        const country = staticData.countryAndCity.find(val=>val.code === record.country);
        const city = country ? country.citys.find(val=>val.code === text) : null;
        return city ? (lang === 'en_US' ? city.enName : city.cnName) : '';
      }
    }, {
      title: intl.get('pages.storeList.area'),
      dataIndex: `zoneName${lang==='en_US'? 'En':'Cn'}`,
      width: '8%',
      render: text => text || intl.get('pages.storeList.notpush')
    }, { // 店铺审核/经营状态
      title: `${intl.get('pages.storeList.auditStatus.name')} / ${intl.get('pages.storeList.operateStatus.name')}`,
      dataIndex: 'auditStatus',
      width: '10%',
      render: (text, record, index) => (
        <p>
          <span className={cx(`color${text||0}`)}>{intl.get(`pages.storeList.auditStatus.list.${intlIndex[text||0]}`)}</span> /
          <span className={cx(`color${record.operateStatus||0}`)}>{intl.get(`pages.storeList.operateStatus.list.${intlIndex[record.operateStatus||0]}`)}</span>
        </p>
      )
    }, { // 店铺认领审核/认领状态
      title: `${intl.get('pages.storeList.storeClaimAudit.name')} / ${intl.get('pages.storeList.claimStatus.name')}`,
      dataIndex: 'claimAuditStatus',
      width: '10%',
      render: (text, record, index) => (
        <p>
          <span className={cx(`color${text||0}`)}>{intl.get(`pages.storeList.storeClaimAudit.list.${intlIndex[text||0]}`)}</span> /
          <span className={cx(`color${record.claimStatus||0}`)}>{intl.get(`pages.storeList.claimStatus.list.${intlIndex[record.claimStatus||0]}`)}</span>
        </p>
      )
    }, { 
      title: intl.get('pages.storeList.modify'),
      dataIndex: 'modifier',
      width: '10%',
      render: (text, record, index) => (
        <div>
          <p>{record.modifier}</p>
          <p>{record.modifyTimeStr}</p>
        </div>
      )
    }, {
      title: intl.get('pages.storeList.table.do'),
      dataIndex: '',
      width: '20%',
      render: (text, record, index) => (
        <div>
          <Button type='primary' style={{marginRight: 10}} onClick={()=>changeState({showCopy: true, curData: record})}>{intl.get('operation.copy')}</Button>
          <a href={`${Base.domain}/merchant/edit-page?id=${record.shopCode}`} target="_blank">
            <Button type='primary' style={{marginRight: 10}}>{intl.get('operation.edit')}</Button>
          </a>
          <a href={`${Base.domain}/merchant/audit-page?id=${record.shopCode}`} target="_blank">
            <Button type='primary'>{intl.get('operation.audit')}</Button>
          </a>
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
              showTotal={()=>intl.get('showTotal', {total})}
            />
          ) : null
        }
      </div>
    )
  }
}

export default List;
