import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { Modal } from 'antd';
import axios from 'axios';
import { actions, FETCH_LIST, ADD_AREA, CHANGE_BL, ADD_RECOMMEND, DELETE_AREA } from '../actions';
import Base from 'app/util/base';

const fetchData = data => axios({ ...data, headers:{
  'Content-Type': 'application/json',
  'Request-Type': 'ajax'
}}).then(res => res.data);

/**
 * 获取列表
 */
function* fetchList(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/zone/list`,
      method: 'post',
      data: {pageNo: 1, pageSize: 10, ...action.payload}
    });
    if (res.result) {
      yield put(actions.fetchListSuccess({
        resultList: res.resultList,
        total: res.total,
        currentPage: res.currentPage
      }));
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
    }
  } catch (err) {
    if ( err.toString().indexOf('401') > -1 ) {
      location.href = `${Base.api}/login`;
    };
    Modal.error({
      title: 'Failed,Please try again later!',
      maskClosable: true,
    });
  }
}

/**
 * 新增
 */
function* addArea(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/zone/add`,
      method: 'post',
      data: { ...action.payload }
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      yield put(actions.addAreaSuccess());
      yield put(actions.fetchList());
      setTimeout(() => ref.destroy(), 1000);
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
    }
  } catch (err) {
    if ( err.toString().indexOf('401') > -1 ) {
      location.href = `${Base.api}/login`;
    };
    Modal.error({
      title: 'Failed,Please try again later!',
      maskClosable: true,
    });
  }
}

/**
 * 删除
 */
function* deleteArea(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/zone/delete/${action.payload}`,
      method: 'post',
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      setTimeout(() => ref.destroy(), 1000);
      yield put(actions.fetchList());
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
    }
  } catch (err) {
    if ( err.toString().indexOf('401') > -1 ) {
      location.href = `${Base.api}/login`;
    };
    Modal.error({
      title: 'Failed,Please try again later!',
      maskClosable: true,
    });
  }
}

/**
 * 修改 banner logo
 */
function* changeBannerAndLogo(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/zone/update`,
      method: 'post',
      data: { ...action.payload }
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      yield put(actions.changeBannerAndLogoSuccess(action.payload));
      setTimeout(() => ref.destroy(), 1000);
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
    }
  } catch (err) {
    if ( err.toString().indexOf('401') > -1 ) {
      location.href = `${Base.api}/login`;
    };
    Modal.error({
      title: 'Failed,Please try again later!',
      maskClosable: true,
    });
  }
}

/**
 * 添加推荐
 */
function* addRecommend(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/recommend/add`,
      method: 'post',
      data: { ...action.payload }
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      yield put(actions.addRecommendSuccess());
      setTimeout(() => ref.destroy(), 1000);
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
    }
  } catch (err) {
    if ( err.indexOf('401') > -1 ) {
      location.href = `${Base.api}/login`;
    };
    Modal.error({
      title: 'Failed,Please try again later!',
      maskClosable: true,
    });
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(FETCH_LIST, fetchList),
    takeLatest(ADD_AREA, addArea),
    takeLatest(CHANGE_BL, changeBannerAndLogo),
    takeLatest(ADD_RECOMMEND, addRecommend),
    takeLatest(DELETE_AREA, deleteArea),
  ];
}
