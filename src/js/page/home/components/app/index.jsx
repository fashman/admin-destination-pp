import React from 'react';
import classNames from 'classnames/bind';
import styles from './style.mod.less';
import Header from 'app/components/header';
import Footer from 'app/components/footer';
import intl from 'react-intl-universal';

const cx = classNames.bind(styles);

module.exports = () => (
  <div className={cx('home')}>
    <Header />
    <div className={cx('banner')}>
      <div className={cx('info')}>
        <h2>{intl.get('pages.index.name')}<i></i></h2>
        <p className={cx(intl.get('pages.index.slogen'))}></p>
        <a href="//www.ipptraveltech.com/registry/page">{intl.get('pages.index.apply')}</a>
      </div>
    </div>
    <div className={cx('step')}>
      <h3>{intl.get('pages.index.step')}</h3>
      <ul>
        <li className={cx('step1')}><p>{intl.get('pages.index.step1')}</p></li>
        <li className={cx('step2')}><p>{intl.get('pages.index.step2')}</p></li>
        <li className={cx('step3')}><p>{intl.get('pages.index.step3')}</p></li>
        <li className={cx('step4')}><p>{intl.get('pages.index.step4')}</p></li>
      </ul>
    </div>
    <div className={cx('shops')}>
      <div>
        <h3>{intl.get('pages.index.shops')}</h3>
        <ul className={cx('group')}>
          <li className={cx('vr')}>
            <div className={cx(['pic', 'pic1'])}></div>
            <div className={cx('text')}>
              <h4>Mr Bing</h4>
              <h5>中餐</h5>
              <p>Mr Bing老金煎饼目前在纽约中央车站Grand Central和时代广场Time Square都有商铺。许多中国游客在美国旅游的时候非常想念中国食物，热腾腾并有饱足感的煎饼可以缓解他们饮食上的不习惯。</p>
              <div className={cx('wechat')}>
                <p>
                  <img src="https://www.quimg.com/wximg/qrcode/private/171211/160457818cd.jpg" alt="" width="124" height="124" />
                </p>
                <h5>{intl.get('pages.index.scan')}</h5>
              </div>
            </div>
          </li>
          <li className={cx('hr')}>
            <div className={cx(['pic', 'pic2'])}></div>
            <div className={cx('text')}>
              <h4>Tonkotsu</h4>
              <h5>日式，拉面</h5>
              <p>主打日式美食，绝对不要错过本店的招牌豚骨拉面，熬制了16小时的猪骨浓汤配上手工拉面， 搭配以笋，豆芽，烤猪肚，半熟蛋，以香葱，海盐，以及香蒜油调味，给您满口的浓郁味觉。</p>
              <div className={cx('wechat')}>
                <p>
                <img src="https://www.quimg.com/wximg/qrcode/private/171212/1604b58e207.jpg" alt="" width="124" height="124" />
                </p>
                <h5>{intl.get('pages.index.scan')}</h5>
              </div>
            </div>
          </li>
          <li className={cx('hr')}>
            <div className={cx(['pic', 'pic3'])}></div>
            <div className={cx('text')}>
              <h4>柯信租车</h4>
              <h5>租车、包车服务</h5>
              <p>柯信租车为美国本地华人客户和中国赴美国游客提供一站式租车丶包车服务，柯信租车华人服务团队，将为您提供全程中文服务，中文保险说明，解决了华人在美租车期间遇到的语言障碍。</p>
              <div className={cx('wechat')}>
                <p>
                <img src="https://www.quimg.com/wximg/qrcode/private/180117/161020bf289.jpg" alt="" width="124" height="124" />
                </p>
                <h5>{intl.get('pages.index.scan')}</h5>
              </div>
            </div>
          </li>
        </ul>
        <ul className={cx('group')}>
          <li className={cx('vr')}>
            <div className={cx(['pic', 'pic4'])}></div>
            <div className={cx('text')}>
              <h4>Fantasea Grill</h4>
              <h5>海鲜餐厅</h5>
              <p>常有大导演、明星光顾的海鲜餐厅。餐厅主打创意海鲜料理，以健康为诉求。Grace非常健谈，如果是熟客，她还可能会即兴依据当天的食材做一些菜单上没有的菜，有种“私房菜”的感觉。</p>
              <div className={cx('wechat')}>
                <p>
                <img src="https://www.quimg.com/wximg/qrcode/private/171211/16043920253.jpg" alt="" width="124" height="124" />
                </p>
                <h5>{intl.get('pages.index.scan')}</h5>
              </div>
            </div>
          </li>
          <li className={cx('vr')}>
            <div className={cx(['pic', 'pic5'])}></div>
            <div className={cx('text')}>
              <h4>Dongpo Kitchen</h4>
              <h5>中餐厅</h5>
              <p>眉州东坡在洛杉矶设有多家分店，是一家经营四川菜的高档中餐厅。东坡厨房位于 Universal Studios，位置得天独厚，适合到环球影城玩耍之余来饕餮一番。</p>
              <div className={cx('wechat')}>
                <p>
                <img src="https://www.quimg.com/wximg/qrcode/private/171211/160444351d8.jpg" alt="" width="124" height="124" />
                </p>
                <h5>{intl.get('pages.index.scan')}</h5>
              </div>
            </div>
          </li>
          <li className={cx('vr')}>
            <div className={cx(['pic', 'pic6'])}></div>
            <div className={cx('text')}>
              <h4>Miyabi Uni</h4>
              <h5>日式餐厅</h5>
              <p>Miyabi Uni 的两位主厨（海胆职人）就是先前 Maruhide Uni Club 的主厨，他们和海胆打交道的年月恐怕比我们的岁数还要长，40多年的从业经验绝非普通人可以匹敌的。</p>
              <div className={cx('wechat')}>
                <p>
                <img src="https://www.quimg.com/wximg/qrcode/private/171211/1604443c07e.jpg" alt="" width="124" height="124" />
                </p>
                <h5>{intl.get('pages.index.scan')}</h5>
              </div>
            </div>
          </li>
        </ul>
        <ul className={cx('group')}>
          <li className={cx('vr')}>
            <div className={cx(['pic', 'pic7'])}></div>
            <div className={cx('text')}>
              <h4>Benares A La carte</h4>
              <h5>印度风味</h5>
              <p>Michelin-starred restaurant, Benares is based in the upscale Mayfair neighbourhood of central London.</p>
              <div className={cx('wechat')}>
                <p>
                <img src="https://www.quimg.com/wximg/qrcode/private/180201/161511025f6.jpg" alt="" width="124" height="124" />
                </p>
                <h5>{intl.get('pages.index.scan')}</h5>
              </div>
            </div>
          </li>
          <li className={cx('vr')}>
            <div className={cx(['pic', 'pic8'])}></div>
            <div className={cx('text')}>
              <h4>Heliot Steak House (24 hr menu)</h4>
              <h5>英国风味</h5>
              <p>这家餐厅以二十世纪初期在本赌场表演的驰名世界的性感驯狮女郎克拉海丽特的名字命名。克拉海丽特经常和十四只狮子同台表演，把狮子驯服得像小马和小猫一样温顺可爱。</p>
              <div className={cx('wechat')}>
                <p>
                <img src="https://www.quimg.com/wximg/qrcode/private/180117/16102377ec2.jpg" alt="" width="124" height="124" />
                </p>
                <h5>{intl.get('pages.index.scan')}</h5>
              </div>
            </div>
          </li>
          <li className={cx('vr')}>
            <div className={cx(['pic', 'pic9'])}></div>
            <div className={cx('text')}>
              <h4>Savini at Criterion</h4>
              <h5>意大利风味</h5>
              <p>Savini是意大利米兰本土最为著名的餐厅品牌，而在伦敦的这家Saviniat Criterion也完美地将伦敦的历史与米兰的美食结合到了一起。</p>
              <div className={cx('wechat')}>
                <p>
                <img src="https://www.quimg.com/wximg/qrcode/private/180116/160fe58e6ce.jpg" alt="" width="124" height="124" />
                </p>
                <h5>{intl.get('pages.index.scan')}</h5>
              </div>
            </div>
          </li>
        </ul>
        <ul className={cx('group')}>
          <li className={cx('vr')}>
            <div className={cx(['pic', 'pic10'])}></div>
            <div className={cx('text')}>
              <h4>PIED A TERRE</h4>
              <h5>法国风味</h5>
              <p>Pied-à-terre是伦敦最具代表性的长青米其林餐厅之一，它以卓越的品质征服美食家，连续25年在米其林餐厅指南中刊登，在其中12年为米其林二星餐厅。</p>
              <div className={cx('wechat')}>
                <p>
                <img src="https://www.quimg.com/wximg/qrcode/private/180209/161796255ec.jpg" alt="" width="124" height="124" />
                </p>
                <h5>{intl.get('pages.index.scan')}</h5>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Footer />
  </div>
);
