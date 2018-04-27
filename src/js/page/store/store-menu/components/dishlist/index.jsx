// 菜品列表
import React, { Component } from 'react';
import { Pagination, Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import intl from 'react-intl-universal';

const cx = classNames.bind(styles);

export default class DishList extends Component {
  onPageChange = (page, pageSize) => {
    const { fetchDishList, curDishType } = this.props;
    fetchDishList({pageNo: page, dishTypeId: curDishType, pageSize});
  }

  onShowSizeChange = (cur, pageSize) => {
    const { fetchDishList, curDishType } = this.props;
    fetchDishList({pageSize, dishTypeId: curDishType});
  }

  showDishTypeModel = (index) => {
    const { data, changeState} = this.props;
    changeState({
      curDishData: data.resultList[index],
      dishVisible: true
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
                  val.dishPic && val.dishPic.length ? val.dishPic.map((v, i)=>{
                    return i === 0 ? (
                      <img
                        src={v.picPath}
                        alt={val.dishNameCn}
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
                <h3>{val.dishNameCn}</h3>
                <h3>{val.dishNamEn}</h3>
                <p>{intl.get('pages.storeMenu.price')}：{val.currency}{val.price}</p>
                <p>{intl.get('pages.storeMenu.priority')}：{val.priority}</p>
                <p>{val.description}</p>
                <div className={cx('do')}>
                  <Popconfirm
                    title={intl.get('pages.storeMenu.submitDelete')}
                    onConfirm={()=>this.props.deleteDish(val.dishCode)}
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
