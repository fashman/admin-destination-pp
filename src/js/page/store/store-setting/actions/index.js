// action types
export const CHANGE_STATE = 'CHANGE_STATE';

export const FETCH_DETAIL = 'FETCH_DETAIL';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';

export const SUBMIT_DATA = 'SUBMIT_DATA';
export const SUBMIT_DATA_SUCCESS = 'SUBMIT_DATA_SUCCESS';

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';

// 获取区域列表
export const GET_AREALIST = 'GET_AREALIST';
export const GET_AREALIST_SUCCESS = 'GET_AREALIST_SUCCESS';

// action creator
export const actions = {
  fetchDetail: payload => ({
    type: FETCH_DETAIL,
    payload
  }),
  fetchDetailSuccess: payload => ({
    type: FETCH_DETAIL_SUCCESS,
    payload
  }),
  changeState: payload => ({
    type: CHANGE_STATE,
    payload
  }),
  submitData: payload => ({
    type: SUBMIT_DATA,
    payload
  }),
  submitDataSuccess: payload => ({
    type: SUBMIT_DATA_SUCCESS,
    payload
  }),
  changePassword: payload => ({
    type: CHANGE_PASSWORD,
    payload
  }),
  changePasswordSuccess: payload => ({
    type: CHANGE_PASSWORD_SUCCESS,
    payload
  }),
  getAreaList: payload => ({
    type: GET_AREALIST,
    payload
  }),
  getAreaListSuccess: payload => ({
    type: GET_AREALIST_SUCCESS,
    payload
  })
};
