import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Layout, Spin, Popconfirm, Form } from 'antd';
import { actions } from '../../actions';
import styles from './style.mod.less';
import LogoModalForm from '../../components/logo';
import RecommendModalForm from '../../components/recommend';
import WoxUpload from 'wox-upload';
import Header from 'app/components/header';
import Footer from 'app/components/footer';
import Util from '../../../../../util/util';

const { Content } = Layout;
const cx = classNames.bind(styles);
const id = Util.getParaFromUrl('id');
const FormItem = Form.Item;

class UploadForm extends Component {
  render() {
    const { bannerUrl, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Form>
        <FormItem>
          {getFieldDecorator('bannerUrl', {
            rules: [
              { required: true, message: '请上传banner图片' },
            ],
            initialValue: bannerUrl || ''
          })(
            <WoxUpload />
          )}
        </FormItem>
      </Form>
    )
  }
}

const UploadFormCom = Form.create({
  onValuesChange: (props, value) => {
    if ( value && value.bannerUrl ) {
      const { changeBannerAndLogo, detail } = props;
      const { id, logoUrl, createTime, nameCn, nameEn } = detail;
      changeBannerAndLogo({
        id, logoUrl, createTime, nameCn, nameEn, bannerUrl: value.bannerUrl
      });
    }
  }
})(UploadForm);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    id && this.props.fetchDetail(id);
  }
  render() {
    const { 
      changeState, detail, curData, addRecommend,
      isloading, recommendVisible, deleteRecommend,
      logoVisible, changeBannerAndLogo
    } = this.props;
    const { nameCn, nameEn, logoUrl, bannerUrl, createTime, recommends } = detail;
    return (
      <div>
        <Header />
        <Content className={cx('app')}>
          <div className={cx('inbox')}>
            <Spin tip="Loading..." spinning={isloading}>
              <div className={cx('add')}>
                <span>区域详情</span>
              </div>
              {/* logo */}
              <div className={cx('logo')}>
                <img src={logoUrl} alt={nameCn || ''} />
                <h3>
                  {nameCn || ''}++
                  <span onClick={()=>changeState({logoVisible: true})} className={cx('changelogo')}>修改</span>
                </h3>
                <h4>{nameEn || ''}</h4>
                <p>{createTime ? createTime.replace(/\s[\s\S]+/g,'') : ''}上线</p>
              </div>
              {/* banner */}
              <div className={cx('banner')}>
                <h3>首页大图</h3>
                <p>建议尺寸大小：750 x 388 px，图片大小不超过100kb</p>
                <UploadFormCom
                  bannerUrl={bannerUrl} 
                  detail={detail}
                  changeBannerAndLogo={changeBannerAndLogo}
                />
              </div>
              <div className={cx('recommend')}>
                <h3>推荐产品<span onClick={()=>changeState({recommendVisible:true})}>+ 推荐产品</span></h3>
                <ul>
                  {
                    recommends && recommends.length ? recommends.map((val, ind)=>(
                      <li key={ind}>
                        <div className={cx('img')}>
                          {
                            val.pictureUrl ? (
                              <img src={val.pictureUrl} alt={val.name}/>
                            ) : (<span>image</span>)
                          }
                        </div>
                        <h3>{val.productName}</h3>
                        <p>推荐语：{val.description}</p>
                        <div className={cx('do')}>
                          {val.currency} {val.budget}
                          <span onClick={()=>changeState({recommendVisible:true,curData:val})}>编辑</span>
                          <Popconfirm title="确定删除吗？" onConfirm={()=>deleteRecommend(val.id)}>
                            <span>删除</span>
                          </Popconfirm>
                        </div>
                      </li>
                    )) : ((<div className={cx('nodata')}>暂无数据</div>))
                  }
                </ul>
              </div>
            </Spin>
          </div>
        </Content>
        <Footer />
        <LogoModalForm
          curData={detail}
          logoVisible={logoVisible}
          changeState={changeState}
          changeBannerAndLogo={changeBannerAndLogo}
        />
        <RecommendModalForm
          curData={curData}
          detail={detail}
          recommendVisible={recommendVisible}
          changeState={changeState}
          addRecommend={addRecommend}
          recommends={detail.recommends || []}
        />
      </div>
    )
  }
}

const mapStateToProps = ({
  isloading, detail, curData,
  logoVisible, recommendVisible
}) => ({
  isloading, detail, curData,
  logoVisible, recommendVisible
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: data => {
      dispatch(actions.changeState(data));
    },
    fetchDetail: data => {
      dispatch(actions.fetchDetail(data));
    },
    addRecommend: data => {
      dispatch(actions.addRecommend(data));
    },
    changeBannerAndLogo: data => {
      dispatch(actions.changeBannerAndLogo(data));
    },
    deleteRecommend: data => {
      dispatch(actions.deleteRecommend(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
