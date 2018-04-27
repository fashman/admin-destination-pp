import React from 'react';
import classNames from 'classnames/bind';
import styles from './style.mod.less';

const cx = classNames.bind(styles);

module.exports = () => {
  return (
    <div className={cx('footer')}>
      <div className={cx('footer-wrapper')}>
        <div className={cx('left')}>
          <h3>关于目的地++</h3>
          <p>致力于帮助海外商家为中国游客提供中文服务、店内场景服务，解决语言沟通障碍、海外支付等痛点，目前已覆盖北美、欧洲、澳新等地区的热门城市。</p>
          <h3 style={{marginTop: 30}}>联系我们</h3>
          <p>pp-help@ipptravel.com</p>
        </div>
        <div className={cx('right')}>
          <h3>合作伙伴</h3>
          <p></p>
        </div>
      </div>
      <p>
        ©2017 i++ Travel Group - 
        <a href="http://www.ipptraveltech.com" target="_blank" rel="nofollow noopener noreferrer">ipptraveltech.com</a>  
        All Rights Reserved 深圳市揽胜天下国际旅行社有限公司 版权所有 
        <a href="http://www.miibeian.gov.cn" target="_blank" rel="nofollow noopener noreferrer">粤ICP备13084118号-10</a>
      </p>
    </div>
  );
}
