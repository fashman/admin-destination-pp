import { call } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga';
import { Modal } from 'antd';
import axios from 'axios';
import { SUBMIT_DATA } from '../actions';
import Base from 'app/util/base';

const fetchData = data => axios({ ...data, headers:{
  'Content-Type': 'application/json',
  'Request-Type': 'ajax'
}}).then(res => res.data);

/**
 * 创建商家
 */
function* submitData(action) {
  try {
    const res = yield call(fetchData, {
      url: `${Base.api}/user/add`,
      method: 'post',
      data: action.payload.values
    });
    if (res.rs === 1) {
      Modal.success({
        title: 'Success',
        maskClosable: true,
        width: 200
      });
      setTimeout(() => {
        if ( action.payload.url === 'edit' ) {
          location.href = `${Base.domain}/user/edit-page?id=${res.data.id}`;
        } else {
          location.href = `${Base.domain}/user/list-page`;
        }
      }, 1500);
    } else {
      if ( res.rs === 0 && res.code === 1000 ) {
        location.href = `${Base.api}/login`;
      }
      Modal.error({
        title: `Failed，${res.msg}`,
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
    takeLatest(SUBMIT_DATA, submitData),
  ];
}
