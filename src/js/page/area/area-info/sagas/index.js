import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { Modal } from 'antd';
import axios from 'axios';
import { actions, FETCH_DETAIL, ADD_RECOMMEND, CHANGE_BL, DELETE_RECOMMEND } from '../actions';
import Base from 'app/util/base';
import Util from 'app/util/util';

const fetchData = data => axios({ ...data, headers:{
  'Content-Type': 'application/json',
  'Request-Type': 'ajax'
}}).then(res => res.data);
const zoneId = Util.getParaFromUrl('id');
/**
 * 获取列表
 */
function* fetchDetail(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/zone/${action.payload}?isShowRecommend=true`,
    });
    if (res.result) {
      yield put(actions.fetchDetailSuccess({
        detail: res.returnObject
      }));
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
    }
  } catch (err) {
    Modal.error({
      title: 'Failed,Please try again later!',
      maskClosable: true,
    });
  }
}

/**
 * 新增
 */
function* addRecommend(action) {
  try {
    const keyWord = action.payload.id ? 'update' : 'add';
    const res = yield call(fetchData, {
      url: `${Base.api}/recommend/${keyWord}`,
      method: 'post',
      data: { ...action.payload }
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      yield put(actions.addRecommendSuccess(action.payload));
      yield put(actions.fetchDetail(zoneId));
      setTimeout(() => ref.destroy(), 1000);
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
    }
  } catch (err) {
    Modal.error({
      title: 'Failed,Please try again later!',
      maskClosable: true,
    });
  }
}

/**
 * 删除推荐
 */
function* deleteRecommend(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/recommend/delete/${action.payload}`,
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      yield put(actions.deleteRecommendSuccess(action.payload));
      setTimeout(() => ref.destroy(), 1000);
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
    }
  } catch (err) {
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
    Modal.error({
      title: 'Failed,Please try again later!',
      maskClosable: true,
    });
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(FETCH_DETAIL, fetchDetail),
    takeLatest(ADD_RECOMMEND, addRecommend),
    takeLatest(CHANGE_BL, changeBannerAndLogo),
    takeLatest(DELETE_RECOMMEND, deleteRecommend),
  ];
}
