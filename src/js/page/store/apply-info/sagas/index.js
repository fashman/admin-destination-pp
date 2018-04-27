import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { Modal } from 'antd';
import axios from 'axios';
import { actions, FETCH_DETAIL, SUBMIT_DATA, SEND_EMAIL } from '../actions';
import Base from 'app/util/base';

const fetchData = data => axios({ ...data, headers:{'Content-Type': 'application/json'} }).then(res => res.data);

/**
 * 拉取商家信息
 */
function* fetchDetail(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/shop/status/${action.payload}`,
    });
    if (res.result) {
      yield put(actions.fetchDetailSuccess(res.returnObject));
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
 * 修改商家信息
 */
function* submitData(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/shop/status/update`,
      method: 'post',
      data: action.payload
    });
    if (res.result) {
      const ref = Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      if (res.returnCode === '1') {
        yield put(actions.changeState({showModal: true, detail: action.payload}));
      } else {
        setTimeout(() => location.reload(), 1000);
      }
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
 * 发送邮件
 */
function* sendEmail(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/shop/status/email`,
      method: 'post',
      data: { email: action.payload }
    });
    if (res.result) {
      const ref = Modal.success({
        title: '发送邮件成功',
        maskClosable: true,
      });
      yield put(actions.changeState({ showModal: false }));
      setTimeout(() => ref.destroy(), 1000);
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
        maskClosable: true,
      });
    }
  } catch (err) {
    Modal.success({
      title: 'Failed,Please try again later!',
      maskClosable: true,
    });
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(FETCH_DETAIL, fetchDetail),
    takeLatest(SUBMIT_DATA, submitData),
    takeLatest(SEND_EMAIL, sendEmail),
  ];
}
