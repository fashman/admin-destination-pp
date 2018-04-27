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
      changeState, fetchDetail, shopUsers, user, submitData
    } = this.props;
    return (
      <div>
        <Header />
        <Content className={cx('app')}>
          <div className={cx('inbox')}>
            <InfoForm 
              changeState={changeState} 
              fetchDetail={fetchDetail}
              shopUsers={shopUsers}
              submitData={submitData}
              user={user}
            />
          </div>
        </Content>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({shopUsers, user}) => ({
  shopUsers, user
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: data => {
      dispatch(actions.changeState(data));
    },
    fetchDetail: data => {
      dispatch(actions.fetchDetail(data));
    },
    submitData: data => {
      dispatch(actions.submitData(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
