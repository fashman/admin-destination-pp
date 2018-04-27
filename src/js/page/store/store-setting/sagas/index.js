import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { Modal } from 'antd';
import axios from 'axios';
import { actions, FETCH_DETAIL, SUBMIT_DATA, GET_AREALIST } from '../actions';
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
      url: `${Base.api}/shop/homepage/${id}`,
    });
    if (res.result) {
      yield put(actions.fetchDetailSuccess(res.returnObject));
    } else {
      Modal.error({
        title: `Failed, ${res}`,
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
 * 拉取区域列表
 */
function* getAreaList(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/zone/list`,
      method: 'post',
      data: { pageNo: 1, pageSize: 100 }
    });
    if (res.result) {
      yield put(actions.getAreaListSuccess(res.resultList));
    } else {
      Modal.error({
        title: `Failed, ${res}`,
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
      url: `${Base.api}/shop/updateHomePage`,
      method: 'post',
      data: {...action.payload, shopCode: id}
    });
    if (res.result) {
      Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      // yield fork(fetchDetail);
      setTimeout(() => {    
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
    takeLatest(GET_AREALIST, getAreaList),
  ];
}
