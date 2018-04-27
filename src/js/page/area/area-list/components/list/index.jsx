import React, { Component } from 'react';
import { Pagination, Spin, Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import Base from 'app/util/base';

const cx = classNames.bind(styles);

class List extends Component {
  render() {
    const { listData, fetchList, isloading, changeState, deleteArea } = this.props;
    const { resultList, total, currentPage } = listData;
    return(
      <Spin tip="Loading..." spinning={isloading}>
        <div className={cx('listbox')}>
          <ul className={cx('list')}>
            {
              resultList && resultList.length ? resultList.map((val,ind)=>(
                <li key={ind}>
                  <div className={cx('top')}>
                    {
                      val.logoUrl ? (
                        <img src={val.logoUrl} alt={val.nameCn}/>
                      ) : (<span className={cx('img')}>LOGO</span>)
                    }
                    <h3>{val.nameCn}++</h3>
                    <h4>{val.nameEn}</h4>
                    <p>
                      {val.createTime.replace(/\s[\s\S]+/g,'')}上线
                      <a href={`${Base.domain}/zone/detail-page?id=${val.id}`}>查看详情</a>
                    </p>
                  </div>
                  <div className={cx('bottom')}>
                    <span onClick={()=>changeState({curData: val, bannerVisible:true})}>设置首页大图</span>
                    <span onClick={()=>changeState({curData: val, recommendVisible:true})}>推荐产品</span>
                    <span onClick={()=>changeState({curData: val, logoVisible:true})}>设置区域logo</span>
                  </div>
                  <Popconfirm title={`确认要删除区域${val.nameCn}?`} onConfirm={()=>deleteArea(val.id)}>
                    <i className="ant-modal-close-x"></i>
                  </Popconfirm>
                </li>
              )) : (<div className={cx('nodata')}>暂无数据</div>)
            }
          </ul>
          {
            resultList && resultList.length ? (
              <Pagination 
                current={currentPage} 
                total={total}
                showQuickJumper 
                showSizeChanger
                onChange={(page, pageSize) => fetchList({
                  pageNo: page, pageSize
                })}
                onShowSizeChange={(current, size) => fetchList({
                  pageSize: size
                })}
              />
            ) : null
          }
        </div>
      </Spin>
    )
  }
}

export default List;
