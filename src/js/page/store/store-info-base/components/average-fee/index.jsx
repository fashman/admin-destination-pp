import React, { Component } from 'react';
import { Input, Select } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import intl from 'react-intl-universal';
import staticData from 'app/util/static';
import JsCookie from 'js-cookie';

const lang = JsCookie.get('locale') || 'en_US';
const cx = classNames.bind(styles);
const Option = Select.Option;
class AverageFee extends Component {
  constructor(props) {
    super(props);
    const value = this.props.value || {};
    this.state = {
      budget: value.budget ,
      maxBudget: value.maxBudget,
      currency: value.currency 
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState(nextProps.value);
    }
  }

  handleCurrencyChange = (currency) => {
    if (!('value' in this.props)) {
      this.setState({ currency });
    }
    this.triggerChange({ currency });
  }

  handleNumberChange = (key , value) => {
    if (isNaN(value)) {
      return;
    }
    if (!('value' in this.props)) {
      this.setState({ [key]: value });
    }
    this.triggerChange({ [key]: value });
  }

  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    const { budget, currency, maxBudget } = this.state;

    return (
      <div className={cx('average')}>
          <Input size="large" 
            placeholder={intl.get('pages.storeInfoBase.consumeMinTips')} 
            value={budget} 
            onChange={(e) => this.handleNumberChange('budget', e.target.value)}
          />
          <span className={cx('to')}>to</span>
          <Input size="large" 
            placeholder={intl.get('pages.storeInfoBase.consumeMaxTips')} 
            value={maxBudget} 
            onChange={(e) => this.handleNumberChange('maxBudget', e.target.value)}
            style={{marginRight: 20}}
          />
          <Select size="large" 
            value={currency || ''} 
            onChange={this.handleCurrencyChange}
          >
            <Option value="">{lang === 'en_US' ? 'Choose Currency' : '请选择币种'}</Option>
            {
              staticData.currency.map((val,idx) => (
                <Option value={val.code} key={idx}>{lang === 'en_US' ? val.code : val.name}</Option>
              ))
            }
          </Select>
      </div>
    );
  }
}

module.exports = AverageFee;
