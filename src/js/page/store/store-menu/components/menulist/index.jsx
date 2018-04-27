// 套餐列表
import React, { Component } from 'react';
import { Pagination, Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import intl from 'react-intl-universal';

const cx = classNames.bind(styles);

export default class MenuList extends Component {
  onPageChange = (page, pageSize) => {
    this.props.fetchMenuList({pageNo: page, pageSize});
  }

  onShowSizeChange = (cur, pageSize) => {
    this.props.fetchMenuList({pageSize});
  }

  showDishTypeModel = (index) => {
    const { data, changeState} = this.props;
    changeState({
      curMenuData: data.resultList[index],
      menuVisible: true
    });
  }

  render() {
    const { currentPage, pageSize, total, resultList } = this.props.data;
    return (
      <div className={cx('menubox')}>
        <ul className={cx('list')}>
          {
            resultList && resultList.length ? resultList.map((val, index) => (
              <li key={index}>
                {
                  val.picPaths && val.picPaths.length ? val.picPaths.map((v, i)=>{
                    return i === 0 ? (
                      <img
                        src={v.picPath}
                        alt={val.setmenuNameCn}
                        width='60' height='60'
                        key={i}
                      />
                    ) : null
                  }) : (
                    <div className={cx('img')} onClick={()=>this.showDishTypeModel(index)}>
                      <span>+</span>
                      <p>Upload</p>
                    </div>
                  )
                }
                <h3>{val.setmenuNameCn}</h3>
                <h3>{val.setmenuNameEn}</h3>
                <p>{intl.get('pages.storeMenu.price')}：{val.currency}{val.setmenuPrice}</p>
                <p>{intl.get('pages.storeMenu.priority')}：{val.priority}</p>
                <p>{val.setmenuDes}</p>
                <div className={cx('do')}>
                  <Popconfirm
                    title={intl.get('pages.storeMenu.submitDelete')}
                    onConfirm={()=>this.props.deleteMenu(val.setmenuCode)}
                  >
                    <span>{intl.get('pages.storeMenu.delete')}</span>
                  </Popconfirm>
                  <span style={{marginLeft: 20}} onClick={()=>this.showDishTypeModel(index)}>{intl.get('pages.storeMenu.edit')}</span>
                </div>
              </li>
            )) : (<li className={cx('nothing')}>{intl.get('pages.storeMenu.nothing')}</li>)
          }
        </ul>
        {
          resultList && resultList.length ? (
            <Pagination
              showSizeChanger
              showQuickJumper
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.onPageChange}
              current={currentPage}
              total={total}
              pageSize={pageSize}
            />
          ) : null
        }
      </div>
    );
  }
}
