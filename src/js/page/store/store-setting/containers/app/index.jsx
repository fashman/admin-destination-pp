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
      changeState, fetchDetail, changePassword, submitData, detail, getAreaList, areaList
    } = this.props;
    return (
      <div>
        <Header showMenu={'set'} />
        <Content className={cx('app')}>
          <div className={cx('inbox')}>
            <InfoForm 
              changeState={changeState} 
              fetchDetail={fetchDetail}
              detail={detail}
              changePassword={changePassword}
              submitData={submitData}
              getAreaList={getAreaList}
              areaList={areaList}
            />
          </div>
        </Content>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({detail, areaList}) => ({
  detail, areaList
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: data => {
      dispatch(actions.changeState(data));
    },
    fetchDetail: data => {
      dispatch(actions.fetchDetail(data));
    },
    changePassword: data => {
      dispatch(actions.changePassword(data));
    },
    submitData: data => {
      dispatch(actions.submitData(data));
    },
    getAreaList: data => {
      dispatch(actions.getAreaList(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
