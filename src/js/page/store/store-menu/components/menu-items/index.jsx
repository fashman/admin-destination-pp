// 套餐子项
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import { Input, Select, Button, InputNumber, Icon } from 'antd';
import styles from './style.mod.less';
import Base from 'app/util/base';
import util from 'app/util/util';
import axios from 'axios';
import intl from 'react-intl-universal';
import staticData from 'app/util/static';
import JsCookie from 'js-cookie';

const lang = JsCookie.get('locale') || 'en_US';
const shopCode = util.getParaFromUrl('id');
const cx = classNames.bind(styles);
const Option = Select.Option;

class MenuItems extends Component {
  constructor(props) {
    super(props);
    const value = this.props.value || [];
    this.state = {
      setmenuItems: value,
      data: [{}]
    }
  }

  componentWillMount() {
    axios({
      url: `${Base.api}/dish/dishes/${shopCode}`,
      headers:{'Content-Type': 'application/json'}
    }).then(req => {
      const res = req.data;
      if ( res.result ) {
        const data = res.returnObject;
        this.setState({ data });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const setmenuItems = nextProps.value;
      this.setState({setmenuItems});
    }
  }

  handleChange = ( index, key, value ) => {
    let setmenuItems = this.state.setmenuItems;
    setmenuItems = setmenuItems.map((v,i) => {
      if ( i === index ) {
        v[key] = value;
      }
      return v;
    });
    this.triggerChange(setmenuItems);
  }

  handleAddMenu = () => {
    let setmenuItems = this.state.setmenuItems;
    setmenuItems.push({
      setmenuItemNameCn: '',
      setmenuItemNameEn: '',
      setmenuDishs: [],
      setmenuItemId: 0,
    });
    this.triggerChange(setmenuItems);
  }

  handleAddDish = (index, setmenuItemId) => {
    let { setmenuItems, data } = this.state;
    setmenuItems[index].setmenuDishs.push({
      dishNameCn: data.length > 0 ? data[0].dishNameCn : '',
      dishNamEn: data.length > 0 ? data[0].dishNamEn : '',
      raisePrice: 0,
      currency: 'CNY',
      sdId: 0,
      dishCode: data.length > 0 ? data[0].dishCode : '',
    });
    this.triggerChange(setmenuItems);
  }

  handleDelDish = (dishIndex, menuIndex) => {
    let { setmenuItems } = this.state;

    setmenuItems[menuIndex].setmenuDishs.splice(dishIndex, 1);
    this.triggerChange(setmenuItems);
  }

  handleDishChange = ( i, j, key, value ) => {
    let { setmenuItems, data } = this.state;
    if ( key === 'dishCode' ) {
      const dish = data.find(val => val.dishCode === value);
      setmenuItems[i].setmenuDishs[j].dishCode = value;
      setmenuItems[i].setmenuDishs[j].dishNameCn = dish.dishNameCn;
      setmenuItems[i].setmenuDishs[j].dishNamEn = dish.dishNamEn;
    } else {
      setmenuItems[i].setmenuDishs[j][key] = key === 'raisePrice' ? Number(value) : value;
    }
    this.triggerChange(setmenuItems);
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render() {
    const { setmenuItems, data } = this.state;
    return (
      <div>
        {
          setmenuItems.map((val,index) => (
            <div key={index} className={cx('menuitem')}>
              <div className={cx('dishitem')}>
                <span className={cx('th')}>{intl.get('pages.storeMenu.menuModal.item')}：</span>
                <Input
                  value={val.setmenuItemNameCn}
                  onChange={(e)=>this.handleChange(index,'setmenuItemNameCn',e.target.value)}
                  placeholder={intl.get('pages.storeMenu.menuModal.nameCn')}
                  style={{width: 135,marginRight: 20}}
                />
                <Input
                  value={val.setmenuItemNameEn}
                  onChange={(e)=>this.handleChange(index,'setmenuItemNameEn',e.target.value)}
                  placeholder={intl.get('pages.storeMenu.menuModal.nameEn')}
                  style={{width: 135,marginRight: 20}}
                />
                <Button
                  type='primary'
                  className={cx('addDish-btn')}
                  onClick={()=>this.handleAddDish(index, val.setmenuItemId || '')}
                >+ {intl.get('pages.storeMenu.menuModal.addDish')}</Button>
              </div>
              {
                val.setmenuDishs && val.setmenuDishs.map((v,i)=>(
                  <div key={i}>
                    <div className={cx('dishitem')}>
                      <span className={cx('th')}>{intl.get('pages.storeMenu.menuModal.dish')}{i + 1}：</span>
                      <Select style={{width: 290}} value={v.dishCode}
                        onChange={(e) => this.handleDishChange(index, i, 'dishCode', e)}
                        getPopupContainer={() => document.getElementsByClassName(cx('dishitem'))[1]}
                      >
                        {
                          data.map((val, index) => (
                            <Option key={index} value={val.dishCode}>{val.dishNamEn}</Option>
                          ))
                        }
                      </Select>
                      <span className={cx('delDish-btn')} onClick={() => this.handleDelDish(i, index)}>
                        <Icon type="close" style={{fontSize: '14px'}} />{intl.get('pages.operation.delete.name')}
                      </span>
                    </div>
                    <div className={cx('dishitem')}>
                      <span className={cx('th')}>{intl.get('pages.storeMenu.menuModal.addPrice')}：</span>
                      <InputNumber
                        value={v.raisePrice}
                        onChange={(e)=>this.handleDishChange(index, i, 'raisePrice', e)}
                      />
                      <Select
                        value={v.currency || 'CNY'}
                        onChange={(e)=>this.handleDishChange(index, i, 'currency', e)}
                        style={{width: 135}}
                        getPopupContainer={() => document.getElementsByClassName(cx('dishitem'))[2]}
                      >
                        {
                          staticData.currency.map((val,idx) => (
                            <Option value={val.code} key={idx}>{lang === 'en_US' ? val.code : val.name}</Option>
                          ))
                        }
                      </Select>
                    </div>
                  </div>
                ))
              }
            </div>
          ))
        }
        <Button className={cx('addMenu-btn')} onClick={this.handleAddMenu} type="primary">+ {intl.get('pages.storeMenu.menuModal.addItem')}</Button>
      </div>
    )
  }
}

export default MenuItems;
