import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import axios from 'axios';
import { Modal } from 'antd';
import { actions, FETCH_BASE_INFO, SAVE_BASE_INFO } from '../actions';
import base from 'app/util/base';
import util from 'app/util/util';


const fetchData = data => axios(data).then(res => res.data);
const id = util.getParaFromUrl('id');
const mcode = util.getParaFromUrl('mcode');

/**
 * 拉取商家基本信息
 */
function* fetchBaseInfo(payload) {
  try {
    if(!id){
      return;
    }
    const res = yield call(fetchData, {
      url: `${base.api}/shop/shop-detail-${id}`,
    });
    if (res.result) {
      yield put(actions.featchBaseInfoSuccess(res.returnObject));
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

/**
 * 保存商家基本信息
 */
function* saveBaseInfo(payload) {

  try {
    const res = yield call(fetchData, {
      url: `${base.api}/shop/addOrUpdate`,
      method: 'post',
      data: {...payload.shopInfo}
    });
    if (res.result) {
      Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      yield put(actions.featchBaseInfo());
      if(res.returnCode){
        setTimeout(function(){
          window.location.href = `${base.domain}/shop-edit?id=${res.returnCode}&mcode=${mcode}`
        },1000)
      }
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
    takeLatest(FETCH_BASE_INFO, fetchBaseInfo),
    takeLatest(SAVE_BASE_INFO, saveBaseInfo),
  ];
}
