import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Layout, Spin } from 'antd';
import Header from 'app/components/header';
import Tabs from '../../components/tabs';
import DishList from '../../components/dishlist';
import MenuList from '../../components/menulist';
import EditDish from '../../components/edit-dish';
import EditSetmenu from '../../components/edit-setmenu';
import EditDishType from '../../components/edit-dishtype';
import { actions } from '../../actions';
import styles from './style.mod.less';
import Footer from 'app/components/footer';

const { Content } = Layout;
const cx = classNames.bind(styles);

class App extends Component {
  componentWillMount() {
    this.props.fetchDishTypeList();
  }

  render() {
    const { 
      dishType, dishListData, loading, curDishType,
      dishVisible, curDishData, dishTypeVisible, menuVisible, curMenuData,
      fetchDishList, changeState, addDishType, deleteDishType, fetchMenuList,
      saveDish, deleteDish, saveMenu, deleteMenu
    } = this.props;
    return (
      <div>
        <Spin spinning={loading} tip='Loading...'>
          <Header showMenu={'menu'} />
          <Content className={cx('app')}>
            <div className={cx('inbox')}>
              <Tabs 
                data={dishType} 
                changeState={changeState} 
                fetchDishList={fetchDishList}
                fetchMenuList={fetchMenuList}
              />
              {
                curDishType !== 0 ? (
                  <DishList 
                    data={dishListData} 
                    changeState={changeState} 
                    fetchDishList={fetchDishList}
                    curDishType={curDishType}
                    deleteDish={deleteDish}
                  />
                ) : (
                  <MenuList 
                    data={dishListData} 
                    changeState={changeState} 
                    fetchMenuList={fetchMenuList}
                    deleteMenu={deleteMenu}
                  />
                )
              }
              <EditDish 
                dishType={dishType} 
                data={curDishData || {}} 
                changeState={changeState}
                dishVisible={dishVisible}
                addDishType={addDishType}
                deleteDishType={deleteDishType}
                saveDish={saveDish}
              />
              <EditSetmenu
                dishType={dishType} 
                data={curMenuData || {}} 
                changeState={changeState}
                menuVisible={menuVisible}
                saveMenu={saveMenu}
              />
              <EditDishType
                dishType={dishType}
                deleteDishType={deleteDishType}
                addDishType={addDishType}
                dishTypeVisible={dishTypeVisible}
                changeState={changeState}
              />
            </div>
          </Content>
        </Spin>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dishType: state.dishType,
    dishListData: state.dishListData,
    loading: state.loading,
    curDishType: state.curDishType,
    dishVisible: state.dishVisible,
    menuVisible: state.menuVisible,
    dishTypeVisible: state.dishTypeVisible,
    curDishData: state.curDishData,
    curMenuData: state.curMenuData,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDishTypeList: () => {
      dispatch(actions.fetchDishTypeList());
    },
    fetchDishList: data => {
      dispatch(actions.fetchDishList(data));
    },
    fetchMenuList: data => {
      dispatch(actions.fetchMenuList(data));
    },
    changeState: data => {
      dispatch(actions.changeState(data));
    },
    addDishType: data => {
      dispatch(actions.addDishType(data));
    },
    deleteDishType: data => {
      dispatch(actions.deleteDishType(data));
    },
    saveDish: data => {
      dispatch(actions.saveDish(data));
    },
    deleteDish: data => {
      dispatch(actions.deleteDish(data));
    },
    saveMenu: data => {
      dispatch(actions.saveMenu(data));
    },
    deleteMenu: data => {
      dispatch(actions.deleteMenu(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
