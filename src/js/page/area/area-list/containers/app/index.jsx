import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Layout, Button } from 'antd';
import { actions } from '../../actions';
import styles from './style.mod.less';
import List from '../../components/list';
import AddModalForm from '../../components/add';
import LogoModalForm from '../../components/logo';
import BannerModalForm from '../../components/banner';
import RecommendModalForm from '../../components/recommend';
import Header from 'app/components/header';
import Footer from 'app/components/footer';

const { Content } = Layout;
const cx = classNames.bind(styles);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.fetchList();
  }
  render() {
    const { 
      changeState, fetchList, addArea, curData, addRecommend,
      listData, addVisible, isloading, recommendVisible,
      logoVisible, changeBannerAndLogo, bannerVisible, deleteArea
    } = this.props;
    return (
      <div>
        <Header />
        <Content className={cx('app')}>
          <div className={cx('inbox')}>
            <div className={cx('add')}>
              <span>区域管理</span>
              <Button type="primary" onClick={()=>changeState({addVisible: true})}>新增区域</Button>
            </div>
            <List 
              fetchList={fetchList}
              listData={listData}
              isloading={isloading}
              changeState={changeState}
              deleteArea={deleteArea}
            />
          </div>
        </Content>
        <Footer />
        <AddModalForm addArea={addArea} addVisible={addVisible} changeState={changeState}/>
        <LogoModalForm
          curData={curData}
          logoVisible={logoVisible}
          changeState={changeState}
          changeBannerAndLogo={changeBannerAndLogo}
        />
        <BannerModalForm
          curData={curData}
          bannerVisible={bannerVisible}
          changeState={changeState}
          changeBannerAndLogo={changeBannerAndLogo}
        />
        <RecommendModalForm
          curData={curData}
          recommendVisible={recommendVisible}
          changeState={changeState}
          changeBannerAndLogo={changeBannerAndLogo}
          addRecommend={addRecommend}
        />
      </div>
    )
  }
}

const mapStateToProps = ({
    isloading, listData, curData, addRecommend,
    addVisible, logoVisible, bannerVisible, recommendVisible
}) => ({
  isloading, listData, curData, addRecommend,
  addVisible, logoVisible, bannerVisible, recommendVisible
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: data => {
      dispatch(actions.changeState(data));
    },
    fetchList: data => {
      dispatch(actions.fetchList(data));
    },
    addArea: data => {
      dispatch(actions.addArea(data));
    },
    changeBannerAndLogo: data => {
      dispatch(actions.changeBannerAndLogo(data));
    },
    addRecommend: data => {
      dispatch(actions.addRecommend(data));
    },
    deleteArea: data => {
      dispatch(actions.deleteArea(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
