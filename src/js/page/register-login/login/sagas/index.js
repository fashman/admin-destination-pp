import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { Modal } from 'antd';
import axios from 'axios';
import { actions, FETCH_DETAIL } from '../actions';
import Base from 'app/util/base';
import Util from 'app/util/util';

const fetchData = data => axios({ ...data, headers:{'Content-Type': 'application/json'} }).then(res => res.data);
const id = Util.getParaFromUrl('id');

/**
 * 拉取商家信息
 */
function* fetchDetail(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/merchant/merchant-detail-${id}`,
    });
    if (res.result) {
      yield put(actions.fetchDetailSuccess(res.returnObject));
    } else {
      Modal.error({
        title: `Failed, ${res.returnMessage}`,
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
  ];
}
