import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Layout  } from 'antd';
import Header from 'app/components/header';
import EditForm from '../../components/edit-form';
import { actions } from '../../actions';
import styles from './style.mod.less';
import Footer from 'app/components/footer';

const { Content } = Layout;
const cx = classNames.bind(styles);

class App extends Component {
  componentDidMount(){
    this.props.featchBaseInfo();
  }
  render() {
    const { shopInfo, saveBaseInfo } = this.props;

    return (
      <div>
        <Header showMenu={'detail'}/>
        <Content className={cx('app')}>
          {/* <Row gutter={10}>
            <Col span={16}> */}
            <div className={cx('inbox')}>
              <EditForm shopInfo={shopInfo} saveBaseInfo={saveBaseInfo} />
            </div>
            {/* </Col>
            <Col span={8}>
              <div className={cx('weapp-preview')}>小程序预览预留位置</div>
            </Col>
          </Row> */}
        </Content>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    shopInfo: state.shopInfo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

    saveBaseInfo: (shopInfo) => {
      dispatch(actions.saveBaseInfo(shopInfo));
    },
    featchBaseInfo: (code) => {
      dispatch(actions.featchBaseInfo(code));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
