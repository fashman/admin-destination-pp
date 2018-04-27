import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Layout } from 'antd';
import { actions } from '../../actions';
import styles from './style.mod.less';
import InfoForm from '../../components/info';
import Header from 'app/components/header';
import Footer from 'app/components/footer';

const { Content } = Layout;
const cx = classNames.bind(styles);

class App extends Component {
  render() {
    const { 
      changeState, saveSubmit,fetchDetail, isloading
    } = this.props;
    return (
      <div className={cx('content-wrap')}>
        <Header />
        <Content className={cx('app')}>
          <div className={cx('inbox')}>
            <InfoForm 
              saveSubmit={saveSubmit} 
              changeState={changeState}
              fetchDetail={fetchDetail}
              isloading={isloading}
            />
          </div>
        </Content>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({isloading}) => ({
  isloading
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: data => {
      dispatch(actions.changeState(data));
    },
    saveSubmit: data => {
      dispatch(actions.saveSubmit(data));
    },
    fetchDetail: data => {
      dispatch(actions.fetchDetail(data));
    },
    checkUserAndCode: data => {
      dispatch(actions.checkUserAndCode(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
