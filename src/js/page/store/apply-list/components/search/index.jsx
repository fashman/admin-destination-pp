import React, { Component } from 'react';
import { Button, Select, Input } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import JsCookie from 'js-cookie';
import intl from 'react-intl-universal';
import staticData from 'app/util/static';

const lang = JsCookie.get('locale') || 'en_US';
const cx = classNames.bind(styles);
const Option = Select.Option;

class Search extends Component {
  componentWillMount() {
    const { getAreaList, fetchList } = this.props;
    fetchList(this.props.search);
    getAreaList();
  }

  handleClick = () => {
    this.props.fetchList(this.props.search);
  }

  render() {
    const { 
      auditStatus, city, country, keyword, shopType, claimAuditStatus, zoneId 
    } = this.props.search;
    const { areaList = [] } = this.props;
    const countryData = staticData.countryAndCity.find(v=>v.code === country) || {citys:[]};
    return(
      <div className={cx('search')}>
        {intl.get('pages.storeList.shopType.name')}：{/* 店铺类型 */}
        <Select value={`${shopType||''}`} onChange={(val)=>this.props.changeSearch({shopType: val})}>
          <Option value="">{intl.get('pages.storeList.all')}</Option>
          <Option value="1">{intl.get('pages.storeList.shopType.list.a')}</Option>
          <Option value="2">{intl.get('pages.storeList.shopType.list.b')}</Option>
        </Select>
        {intl.get('pages.storeList.country')}：{/* 国家 */}
        <Select value={country} onChange={(val)=>this.props.changeSearch({country: val,city:''})}>
          <Option value="">{intl.get('pages.storeList.all')}</Option>
          {
            staticData.countryAndCity.map((v,i)=>(
              <Option value={v.code} key={i}>{lang === 'en_US' ? v.enName : v.cnName}</Option>
            ))
          }
        </Select>
        {intl.get('pages.storeList.city')}：{/* 城市 */}
        <Select value={city} onChange={(val)=>this.props.changeSearch({city: val})}>
          <Option value="">{intl.get('pages.storeList.all')}</Option>
          {
            countryData.citys.map((v,i)=>(
              <Option value={v.code} key={i}>{lang === 'en_US' ? v.enName : v.cnName}</Option>
            ))
          }
        </Select>
        {intl.get('pages.storeList.area')}：{/* 区域 */}
        <Select value={zoneId ? `${zoneId}` : ''} onChange={(val)=>this.props.changeSearch({zoneId: val})}>
          <Option value="">{intl.get('pages.storeList.all')}</Option>
          <Option value="0">{intl.get('pages.storeList.notpush')}</Option>
          {
            areaList.map((val,ind)=>(
              <Option key={ind} value={`${val.id}`}>{val[lang === 'en' ? 'nameEn' : 'nameCn']}</Option>
            ))
          }
        </Select>
        {intl.get('pages.storeList.auditStatus.name')}：{/* 店铺审核状态 */}
        <Select value={auditStatus} onChange={(val)=>this.props.changeSearch({'auditStatus': val})}>
          <Option value="">{intl.get('pages.storeList.all')}</Option>
          <Option value="0">{intl.get('pages.storeList.auditStatus.list.a')}</Option>
          <Option value="1">{intl.get('pages.storeList.auditStatus.list.b')}</Option>
          <Option value="2">{intl.get('pages.storeList.auditStatus.list.c')}</Option>
        </Select>
        {intl.get('pages.storeList.storeClaimAudit.name')}：{/* 店铺认领状态 */}
        <Select value={`${claimAuditStatus||''}`} onChange={(val)=>this.props.changeSearch({claimAuditStatus: val,city:''})}>
          <Option value="">{intl.get('pages.storeList.all')}</Option>
          <Option value="0">{intl.get('pages.storeList.storeClaimAudit.list.a')}</Option>
          <Option value="1">{intl.get('pages.storeList.storeClaimAudit.list.b')}</Option>
          <Option value="2">{intl.get('pages.storeList.storeClaimAudit.list.c')}</Option>
          <Option value="3">{intl.get('pages.storeList.storeClaimAudit.list.d')}</Option>
        </Select>
        {intl.get('pages.storeList.name')}：{/* 关键字 */}
        <Input value={keyword} onChange={(e)=>this.props.changeSearch({keyword: e.target.value})}/>
        <Button type="primary" onClick={this.handleClick}>{intl.get('pages.storeList.query')}</Button>
      </div>
    )
  }
}

export default Search;
