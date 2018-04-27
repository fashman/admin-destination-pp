import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { Modal } from 'antd';
import axios from 'axios';
import { actions, FETCH_DETAIL, SUBMIT_DATA } from '../actions';
import Base from 'app/util/base';
import Util from 'app/util/util';

const fetchData = data => axios({ ...data, headers:{
  'Content-Type': 'application/json',
  'Request-Type': 'ajax'
}}).then(res => res.data);
const id = Util.getParaFromUrl('id');

/**
 * 拉取商家信息
 */
function* fetchDetail(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/user/${id}`,
    });
    if (res.rs === 1) {
      yield put(actions.fetchDetailSuccess(res.data));
    } else {
      Modal.error({
        title: `Failed, ${res.msg}`,
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

/**
 * 修改商家信息
 */
function* submitData(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/user/update`,
      method: 'post',
      data: action.payload
    });
    if (res.rs === 1) {
      Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      // yield fork(fetchDetail);
      setTimeout(() => {    // 保存成功后刷新当前页面，处理页头`店铺二维码`不更新的问题
        location.reload();
      }, 1500);
    } else {
      Modal.error({
        title: `Failed，${res.returnMessage}`,
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
    takeLatest(FETCH_DETAIL, fetchDetail),
    takeLatest(SUBMIT_DATA, submitData),
  ];
}
