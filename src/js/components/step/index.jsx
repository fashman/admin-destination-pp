import React from 'react';
import { Steps } from 'antd';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import intl from 'react-intl-universal';

const cx = classNames.bind(styles);
const Step = Steps.Step;

module.exports = (props) => {
  const { current } = props;
  return (
    <Steps className={cx('steps')} current={current}>
      <Step title={intl.get('pages.register.step.create')} description="" />
      <Step title={intl.get('pages.register.step.submit')} description="" />
      {/* <Step title={stepText['agreement']} description="" /> */}
      <Step title={intl.get('pages.register.step.complete')} description="" />
    </Steps>
  );
}
