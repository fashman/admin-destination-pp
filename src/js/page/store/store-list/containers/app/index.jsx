import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Layout, Button } from 'antd';
import { actions } from '../../actions';
import styles from './style.mod.less';
import List from '../../components/list';
import Header from 'app/components/header';
import CopyModal from '../../components/copy';
import Footer from 'app/components/footer';
import intl from 'react-intl-universal';

const { Content } = Layout;
const cx = classNames.bind(styles);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentWillMount() {
    const { fetchList, search, getAreaList } = this.props;
    fetchList(search);
    getAreaList();
  }
  
  render() {
    const { 
      changeState, fetchList, deleteMerchant, areaList, copyStore,
      listData, search, curData, showCopy, isloading
    } = this.props;
    return (
      <div>
        <Header />
        <Content className={cx('app')}>
          <div className={cx('add')}>
            <a href="//www.ipptraveltech.com/shop/create-page" target="_blank" rel="noopener noreferrer">
              <Button type="primary">+ {intl.get('pages.storeList.addNew')}</Button>
            </a>
          </div>
          <List 
            fetchList={fetchList}
            search={search}
            listData={listData}
            deleteMerchant={deleteMerchant}
            changeState={changeState}
            areaList={areaList}
          />
          <CopyModal 
            showCopy={showCopy} 
            curData={curData} 
            changeState={changeState}
            copyStore={copyStore}
            isloading={isloading}
          />
        </Content>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({isloading, listData, search, curData, showCopy, areaList}) => ({
  isloading, listData, search, curData, showCopy, areaList
})

const mapDispatchToProps = (dispatch) => {
  return {
    changeState: data => {
      dispatch(actions.changeState(data));
    },
    changeSearch: data => {
      dispatch(actions.changeSearch(data));
    },
    fetchList: data => {
      dispatch(actions.fetchList(data));
    },
    deleteMerchant: data => {
      dispatch(actions.deleteMerchant(data));
    },
    copyStore: data => {
      dispatch(actions.copyStore(data));
    },
    getAreaList: data => {
      dispatch(actions.getAreaList(data));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
