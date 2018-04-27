import React from 'react';
import { call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { Modal, notification } from 'antd';
import axios from 'axios';
import { actions, FETCH_LIST, DELETE_MERCHANT, COPY_STORE, GET_AREALIST } from '../actions';
import Base from 'app/util/base';
import Util from 'app/util/util';
import intl from 'react-intl-universal';

const fetchData = data => axios({ ...data, headers:{'Content-Type': 'application/json'} }).then(res => res.data);
const email = Util.getParaFromUrl('e') || '';
/**
 * 获取列表
 */
function* fetchList(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/merchant/list`,
      method: 'post',
      data: {email,pageNo: 1, pageSize: 10, ...action.payload}
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

/**
 * 复制
 */
function* copyStore(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/shop/copy/${action.payload.shopCode}/${encodeURI(action.payload.shopNameEn)}`,
    });
    if (res.rs === 1) {
      yield put(actions.copyStoreSuccess({...res.data, shopNameEn: action.payload.shopNameEn}));
      const description = (
        <p>
          {intl.get('pages.applyList.copyModal.storeId')}：{res.data.shopCode}，
          <a href={`${Base.domain}/merchant/edit-page?id=${res.data.shopCode}`} target="_blank">{intl.get('pages.applyList.copyModal.goedit')}</a>
        </p>
      );
      notification.success({
        message: 'Success',
        description,
        duration: null
      });
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

export default function* rootSaga() {
  yield [
    takeLatest(FETCH_LIST, fetchList),
    takeLatest(DELETE_MERCHANT, deleteMerchant),
    takeLatest(COPY_STORE, copyStore),
    takeLatest(GET_AREALIST, getAreaList),
  ];
}
