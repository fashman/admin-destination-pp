import React, { Component } from 'react';
import { Select, Input } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import JsCookie from 'js-cookie';
import staticData from 'app/util/static';

const lang = JsCookie.get('locale') || 'en_US';
const cx = classNames.bind(styles);
const Option = Select.Option;

class Where extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const where = nextProps.value;
      this.setState(where);
    }
  }

  handleChangeCountry = (value) => {
    const where = {...this.state, ...value, city: ''};
    this.setState(where);
    this.triggerChange(where);
  }

  handleChange = (value) => {
    const where = {...this.state, ...value };
    this.setState(where);
    this.triggerChange(where);
  }

  triggerChange = (changedValue) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render() {
    const { country, city, shopAddress } = this.state;
    const countryData = staticData.countryAndCity.find(v=>v.code === country);
    return(
      <div className={cx('where')}>
        <Select value={country} onChange={(val)=>this.handleChangeCountry({country: val})}>
          <Option value="">{lang === 'en_US' ? 'Choose Country' : '请选择国家'}</Option>
          {
            staticData.countryAndCity.map((v,i)=>(
              <Option value={v.code} key={i}>{lang === 'en_US' ? v.enName : v.cnName}</Option>
            ))
          }
        </Select>
        {
          countryData ? (
            <Select value={city} onChange={(val)=>this.handleChange({city: val})}>
              <Option value="">{lang === 'en_US' ? 'Choose City' : '请选择城市'}</Option>
              {
                countryData.citys.map((v,i)=>(
                  <Option value={v.code} key={i}>{lang === 'en_US' ? v.enName : v.cnName}</Option>
                ))
              }
            </Select>
          ) : (
            <Select value={city} onChange={(val)=>this.handleChange({city: val})}>
              <Option value="">{lang === 'en_US' ? 'Choose City' : '请选择城市'}</Option>
            </Select>
          )
        }
        <p>
          <Input
            onChange={(e)=>this.handleChange({shopAddress: e.target.value})} 
            value={shopAddress} placeholder={lang === 'en_US' ? 'Address' : '地址'}
          />
        </p>
      </div>
    )
  }
}

export default Where;