import React, { Component } from 'react';
import { TimePicker, Select, Button, Icon } from 'antd';
import classNames from 'classnames/bind';
import moment from 'moment';
import styles from './style.mod.less';
import intl from 'react-intl-universal';
import staticData from 'app/util/static';
import JsCookie from 'js-cookie';

const lang = JsCookie.get('locale') || 'en_US';
const cx = classNames.bind(styles);
const Option = Select.Option;
const defaultRange = {
  startWeek: '',
  endWeek: '',
  businessStartTime: '08:00',
  businessEndTime: '20:00'
};

class ShopHours extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeRangeArr: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const arr = nextProps.value;
      this.setState({
        timeRangeArr: arr && arr.length ? arr : [{ ...defaultRange }]
      });
    }
  }

  handleChange = (index, day, key) => {
    const timeRangeArr = [...this.state.timeRangeArr];
    const item = timeRangeArr[index];
    item[key] = day;

    this.setState({
      timeRangeArr
    });
    this.triggerChange({
      timeRangeArr
    });
  }

  handleAddTimeRange = () => {
    const timeRangeArr = [...this.state.timeRangeArr];
    timeRangeArr.push({ ...defaultRange });
    this.setState({
      timeRangeArr
    });
    this.triggerChange({
      timeRangeArr
    });
  }

  handleCloseTimeRange = (index) => {
    const timeRangeArr = [...this.state.timeRangeArr];

    timeRangeArr.splice(index, 1);
    this.setState({
      timeRangeArr
    });
    this.triggerChange({
      timeRangeArr
    });
  }

  triggerChange = (changedValue) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue.timeRangeArr);
    }
  }

  render() {
    const { timeRangeArr } = this.state;
    return (
      <div className={cx('shop-hours')}>
        {
          (timeRangeArr.length ? timeRangeArr : [{...defaultRange}]).map((value, index) => {
            return (
              <div key={index}>
                <Select
                  size="large"
                  value={value.startWeek}
                  onChange={(day) => {
                    this.handleChange(index, day, 'startWeek');
                  }}
                >
                  {
                    staticData.weekSelect.map((val,ind)=> (
                      <Option value={val.code} key={ind}>{lang === 'en_US' ? val.enName : val.cnName}</Option>
                    ))
                  }
                </Select>
                <span className={cx('to')}>to</span>
                <Select
                  size="large"
                  value={value.endWeek}
                  onChange={(day) => {
                    this.handleChange(index, day, 'endWeek');
                  }}
                  style={{marginRight: 20}}
                >
                  {
                    staticData.weekSelect.map((val,ind)=> (
                      <Option value={val.code} key={ind}>{lang === 'en_US' ? val.enName : val.cnName}</Option>
                    ))
                  }
                </Select>
                <TimePicker
                  className={cx('time-picker')}
                  value={moment(value.businessStartTime || '08:00', 'HH:mm')}
                  format="HH:mm"
                  onChange={(time, timeStr) => {
                    this.handleChange(index, timeStr, 'businessStartTime');
                  }}
                />
                <span className={cx('to')}>to</span>
                <TimePicker
                  className={cx('time-picker')}
                  value={moment(value.businessEndTime || '23:00', 'HH:mm')}
                  format="HH:mm"
                  onChange={(time, timeStr) => {
                    this.handleChange(index, timeStr, 'businessEndTime');
                  }}
                />
                {
                  index === 0 ? null : (
                    <a onClick={() => { this.handleCloseTimeRange(index); }}>
                      <Icon type="close" />
                    </a>
                  )
                }
              </div>
            );
          })
        }
        <p>
          <Button type="primary" onClick={this.handleAddTimeRange}><Icon type="plus" />{intl.get('pages.storeInfoBase.addBusinessTime')}</Button>
        </p>
      </div>
    );
  }
}

module.exports = ShopHours;
