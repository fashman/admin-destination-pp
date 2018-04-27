import { call, put, fork } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import axios from 'axios';
import { Modal } from 'antd';
import {
  actions,
  FETCH_DISHTYPE_LIST,
  FETCH_DISH_LIST,
  ADD_DISHTYPE,
  DELETE_DISHTYPE,
  FETCH_MENU_LIST,
  SAVE_DISH,
  DELETE_DISH,
  SAVE_MENU,
  DELETE_MENU,
} from '../actions';
import Base from 'app/util/base';
import util from 'app/util/util';

const shopCode = util.getParaFromUrl('id');

// const fetchData = data => axios(data).then(res => res.data);
const fetchData = data => axios({ ...data, headers:{'Content-Type': 'application/json'} }).then(res => res.data);

/**
 * 获取菜品类型列表
 */
function* fetchDishTypeList(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/dishtype/dishtypes/${shopCode}`,
    });
    if (res.result) {
      const dishType = res.returnObject;
      if ( dishType.dishTypes && dishType.dishTypes.length ) {
        const dishTypeId = dishType.dishTypes[0].dishTypeId;
        dishTypeId !== 0 ? yield fork(fetchDishList,  {
          payload: {dishTypeId: -1}
        }) : yield fork(fetchMenuList,  {
          payload: {}
        })
      }
      yield put(actions.fetchDishTypeListSuccess(res.returnObject));
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
    }
  } catch (err) {
    //throw new Error(err);
  }
}

/**
 * 获取菜品列表
 */
function* fetchDishList(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/dish/list`,
      method: 'post',
      data: {
        pageNo: 1, pageSize: 20, shopCode, ...action.payload
      }
    });
    if (res.result) {
      yield put(actions.fetchDishListSuccess({
        curDishType: action.payload.dishTypeId,
        dishListData: {
          currentPage: res.currentPage,
          pageSize: res.pageSize,
          resultList: res.resultList,
          total: res.total
        }
      }));
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
      yield put(actions.changeState({loading: false}));
    }
  } catch (err) {
    yield put(actions.changeState({loading: false}));
    //throw new Error(err);
  }
}

/**
 * 获取套餐列表
 */
function* fetchMenuList(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/setmenu/list`,
      method: 'post',
      data: {pageNo: 1, pageSize: 20, shopCode}
    });
    if (res.result) {
      yield put(actions.fetchDishListSuccess({
        curDishType: 0,
        dishListData: {
          currentPage: res.currentPage,
          pageSize: res.pageSize,
          resultList: res.resultList,
          total: res.total
        }
      }));
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
      yield put(actions.changeState({loading: false}));
    }
  } catch (err) {
    yield put(actions.changeState({loading: false}));
    //throw new Error(err);
  }
}

/**
 * 添加菜品类型
 */
function* addDishType(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/dishtype/add`,
      method: 'post',
      data: {dishTypeName: action.payload, shopCode}
    });
    if (res.result) {
      const { dishTypes, typeList } = res.returnObject;
      yield put(actions.fetchDishTypeListSuccess({ dishTypes, typeList }));
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
      yield put(actions.changeState({loading: false}));
    }
  } catch (err) {
    yield put(actions.changeState({loading: false}));
    //throw new Error(err);
  }
}

/**
 * 删除菜品类型
 */
function* deleteDishType(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/dishtype/delete/${action.payload}`,
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      yield put(actions.deleteDishTypeSuccess(action.payload));
      setTimeout(() => ref.destroy(), 1000);
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
      yield put(actions.changeState({loading: false}));
    }
  } catch (err) {
    yield put(actions.changeState({loading: false}));
    //throw new Error(err);
  }
}

/**
 * 保存菜品
 */
function* saveDish(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/dish/editoradd`,
      method: 'post',
      data: { ...action.payload, shopCode }
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      yield put(actions.saveDishSuccess(res.resultList[0]));
      setTimeout(() => ref.destroy(), 1000);
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
      yield put(actions.changeState({loading: false}));
    }
  } catch (err) {
    yield put(actions.changeState({loading: false}));
    //throw new Error(err);
  }
}

/**
 * 删除菜品
 */
function* deleteDish(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/dish/delete/${action.payload}`,
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      yield put(actions.deleteDishSuccess(action.payload));
      setTimeout(() => ref.destroy(), 1000);
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
      yield put(actions.changeState({loading: false}));
    }
  } catch (err) {
    yield put(actions.changeState({loading: false}));
    //throw new Error(err);
  }
}

/**
 * 保存套餐
 */
function* saveMenu(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/setmenu/addoredit`,
      method: 'post',
      data: {...action.payload, shopCode}
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      yield put(actions.saveMenuSuccess(res.resultList[0]));
      setTimeout(() => ref.destroy(), 1000);
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
      yield put(actions.changeState({loading: false}));
    }
  } catch (err) {
    yield put(actions.changeState({loading: false}));
    //throw new Error(err);
  }
}

/**
 * 删除套餐
 */
function* deleteMenu(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/setmenu/delete/${action.payload}`,
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      yield put(actions.deleteMenuSuccess(action.payload));
      setTimeout(() => ref.destroy(), 1000);
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
      yield put(actions.changeState({loading: false}));
    }
  } catch (err) {
    yield put(actions.changeState({loading: false}));
    //throw new Error(err);
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(FETCH_DISHTYPE_LIST, fetchDishTypeList),
    takeLatest(FETCH_DISH_LIST, fetchDishList),
    takeLatest(FETCH_MENU_LIST, fetchMenuList),
    takeLatest(ADD_DISHTYPE, addDishType),
    takeLatest(DELETE_DISHTYPE, deleteDishType),
    takeLatest(SAVE_DISH, saveDish),
    takeLatest(DELETE_DISH, deleteDish),
    takeLatest(SAVE_MENU, saveMenu),
    takeLatest(DELETE_MENU, deleteMenu),
  ];
}
