import React, { Component } from 'react';
import { InputNumber } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import intl from 'react-intl-universal';

const cx = classNames.bind(styles);

class LatLng extends Component {
  constructor(props) {
    super(props);

    const value = this.props.value || {};
    this.state = {
      latitude: value.latitude,
      longitude: value.longitude
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState(nextProps.value);
    }
  }

  handleChange = (v, key) => {
    const value = v;
    const newState = {};

    newState[key] = value;
    if (!('value' in this.props)) {
      this.setState(Object.assign({}, this.state, newState));
    }
    this.triggerChange(Object.assign({}, this.state, newState));
  }

  triggerChange = (changedValue) => {
    const { onChange } = this.props;

    if (onChange) {
      onChange(Object.assign({}, this.state, changedValue));
    }
  }

  render() {
    const { latitude, longitude } = this.state;
    return (
      <div className={cx('lat-lng')}>
        <InputNumber 
          style={{marginRight:20}} 
          value={latitude} 
          placeholder={intl.get('pages.storeInfoBase.lat')}
          onChange={(e) => { this.handleChange(e, 'latitude'); }}
          max={90}
          min={-90}
        />
        <InputNumber 
          value={longitude} 
          placeholder={intl.get('pages.storeInfoBase.lng')}
          onChange={(e) => { this.handleChange(e, 'longitude'); }}
          max={180}
          min={-180}
        />
      </div>
    );
  }
}

module.exports = LatLng;
