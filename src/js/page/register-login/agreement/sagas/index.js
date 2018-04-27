import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { Modal } from 'antd';
import axios from 'axios';
import { actions, ACCEPT_SUBMIT } from '../actions';
import Base from 'app/util/base';

const fetchData = data => axios({ ...data, headers:{'Content-Type': 'application/json'} }).then(res => res.data);

/**
 * 签订协议
 */
function* fetchList(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/registry/sign-agreement`,
      method: 'post',
      data: action.payload
    });
    if (res.result) {
      if (res.returnCode === '1') {      // 已经签署过协议的，`returnCode = 1` 作为判断标志，直接重定向到登录
        location.href = '//www.ipptraveltech.com/login';
        return;
      }
      yield put(actions.acceptSubmitSuccess());
    } else {
      Modal.error({
        title: `Failed, ${res.returnMessage}`,
        maskClosable: true,
      });
    }
  } catch (err) {
    Modal.error({
      title: 'Failed, Please try again later!',
      maskClosable: true,
    });
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(ACCEPT_SUBMIT, fetchList),
  ];
}
