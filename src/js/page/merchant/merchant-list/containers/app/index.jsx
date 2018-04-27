import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Layout } from 'antd';
import { actions } from '../../actions';
import styles from './style.mod.less';
import List from '../../components/list';
import Header from 'app/components/header';
import Search from '../../components/search';
import Footer from 'app/components/footer';

const { Content } = Layout;
const cx = classNames.bind(styles);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { 
      changeState, fetchList, deleteMerchant,
      listData, search
    } = this.props;
    return (
      <div>
        <Header />
        <Content className={cx('app')}>
          <h2>商家管理</h2>
          <Search
            changeState={changeState}
            fetchList={fetchList}
            search={search}
          />
          <List 
            fetchList={fetchList}
            search={search}
            listData={listData}
            deleteMerchant={deleteMerchant}
          />
        </Content>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({isloading, listData, search}) => ({
  isloading, listData, search
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: data => {
      dispatch(actions.changeState(data));
    },
    fetchList: data => {
      dispatch(actions.fetchList(data));
    },
    deleteMerchant: data => {
      dispatch(actions.deleteMerchant(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
