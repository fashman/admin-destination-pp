// action types
export const CHANGE_STATE = 'CHANGE_STATE';

export const FETCH_DETAIL = 'FETCH_DETAIL';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';

export const SUBMIT_DATA = 'SUBMIT_DATA';
export const SUBMIT_DATA_SUCCESS = 'SUBMIT_DATA_SUCCESS';

// 发送邮件
export const SEND_EMAIL = 'SEND_EMAIL';
export const SEND_EMAIL_SUCCESS = 'SEND_EMAIL_SUCCESS';

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
  sendEmail: payload => ({
    type: SEND_EMAIL,
    payload
  }),
  sendEmailSuccess: payload => ({
    type: SEND_EMAIL_SUCCESS,
    payload
  })
};
