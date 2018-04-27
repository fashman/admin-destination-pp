import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { Modal } from 'antd';
import axios from 'axios';
import { actions, SUBMIT_DATA, FETCH_DETAIL, CHECK_USERANDCODE } from '../actions';
import Base from 'app/util/base';
import intl from 'react-intl-universal';

const fetchData = data => axios({ ...data, headers:{'Content-Type': 'application/json'} }).then(res => res.data);

/**
 * 提交商户信息
 */
function* saveApply(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/shop/addHomePage`,
      method: 'post',
      data: action.payload
    });
    if (res.result) {
      Modal.success({
        title: '创建店铺成功！'
      });
      setTimeout(()=>location.href = `${Base.domain}/merchant/edit-page?id=${res.returnCode}`, 1000);
    } else {
      Modal.error({
        title: `${intl.get('fetch.error.tips')}，${res.returnMessage}`,
        maskClosable: true,
      });
      yield put(actions.changeState({isloading: false}));
    }
  } catch (err) {
    Modal.error({
      title: intl.get('fetch.error.tips'),
      maskClosable: true,
    });
    yield put(actions.changeState({isloading: false}));
  }
}

/**
 * 获取商户信息
 */
function* fetchDetail(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/merchant/merchant-detail-${action.payload}`,
    });
    if (res.result) {
      yield put(actions.fetchDetailSuccess(res.returnObject));
    } else {
      Modal.error({
        title: `${intl.get('fetch.error.tips')}，${res.returnMessage}`,
        maskClosable: true,
      });
    }
  } catch (err) {
    Modal.error({
      title: intl.get('fetch.error.tips'),
      maskClosable: true,
    });
  }
}

/**
 * 检测用户名 和 验证码
 */
function* checkUserAndCode(action) {
  try {
    const [userRes, codeRes] = yield [
      call(fetchData, {
        url: `${Base.api}/registry/check-exsiting?username=${action.payload.username}`,
      }),
      call(fetchData, {
        url: `${Base.api}/registry/check-random-${action.payload.randomCode}`,
      }),
    ];
    if (userRes.result) {
      Modal.error({
        title: intl.get('pages.register.createAccount.reqemailError'),
        maskClosable: true,
      });
      return;
    }
    if (!codeRes.result) {
      Modal.error({
        title: intl.get('pages.register.createAccount.reqVerificationError'),
        maskClosable: true,
      });
      return;
    }
    if (!userRes.result && codeRes.result) {
      yield put(actions.checkUserAndCodeSuccess(action.payload));
    }
  } catch (err) {
    Modal.error({
      title: intl.get('fetch.error.tips'),
      maskClosable: true,
    });
  }
}

export default function* rootSaga() {
  yield [
    takeLatest(SUBMIT_DATA, saveApply),
    takeLatest(FETCH_DETAIL, fetchDetail),
    takeLatest(CHECK_USERANDCODE, checkUserAndCode),
  ];
}
