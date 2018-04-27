import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Layout } from 'antd';
import { actions } from '../../actions';
import styles from './style.mod.less';
import LoginForm from '../../components/login';
import Header from 'app/components/header';
import Footer from 'app/components/footer';

const { Content } = Layout;
const cx = classNames.bind(styles);

class App extends Component {
  render() {
    const { changeState, fetchDetail, detail } = this.props;
    return (
      <div>
        <Header />
        <Content className={cx('app')}>
          <LoginForm 
            changeState={changeState} 
            fetchDetail={fetchDetail}
            detail={detail}
          />
        </Content>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({detail}) => ({
  detail
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: data => {
      dispatch(actions.changeState(data));
    },
    fetchDetail: data => {
      dispatch(actions.fetchDetail(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
