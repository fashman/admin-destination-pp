// action types
export const CHANGE_STATE = 'CHANGE_STATE';

// 检测用户名和验证码
export const CHECK_USERANDCODE = 'CHECK_USERANDCODE';
export const CHECK_USERANDCODE_SUCCESS = 'CHECK_USERANDCODE_SUCCESS';

// 获取店铺信息
export const FETCH_DETAIL = 'FETCH_DETAIL';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';

// 提交店铺信息
export const SUBMIT_DATA = 'SUBMIT_DATA';
export const SUBMIT_DATA_SUCCESS = 'SUBMIT_DATA_SUCCESS';

// 创建用户
export const CREATE_USER = 'CREATE_USER';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';

// action creator
export const actions = {
  changeState: payload => ({
    type: CHANGE_STATE,
    payload
  }),
  checkUserAndCode: payload => ({
    type: CHECK_USERANDCODE,
    payload
  }),
  checkUserAndCodeSuccess: payload => ({
    type: CHECK_USERANDCODE_SUCCESS,
    payload
  }),
  fetchDetail: payload => ({
    type: FETCH_DETAIL,
    payload
  }),
  fetchDetailSuccess: payload => ({
    type: FETCH_DETAIL_SUCCESS,
    payload
  }),
  saveSubmit: payload => ({
    type: SUBMIT_DATA,
    payload
  }),
  saveSubmitSuccess: payload => ({
    type: SUBMIT_DATA_SUCCESS,
    payload
  }),
  createUser: payload => ({
    type: CREATE_USER,
    payload
  }),
  createUserSuccess: payload => ({
    type: CREATE_USER_SUCCESS,
    payload
  }),
};
