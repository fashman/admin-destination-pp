import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { Modal } from 'antd';
import axios from 'axios';
import { actions, FETCH_LIST, DELETE_MERCHANT } from '../actions';
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
      url: `${Base.api}/user/list`,
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
    Modal.error({
      title: 'Failed,Please try again later!',
      maskClosable: true,
    });
  }
}

/**
 * 删除
 */
function* deleteMerchant(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/merchant/delete/${action.payload}`,
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      yield put(actions.deleteMerchantSuccess(action.payload));
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
    takeLatest(FETCH_LIST, fetchList),
    takeLatest(DELETE_MERCHANT, deleteMerchant),
  ];
}
