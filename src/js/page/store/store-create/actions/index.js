// action types
export const CHANGE_STATE = 'CHANGE_STATE';

export const CHECK_USERANDCODE = 'CHECK_USERANDCODE';
export const CHECK_USERANDCODE_SUCCESS = 'CHECK_USERANDCODE_SUCCESS';

export const FETCH_DETAIL = 'FETCH_DETAIL';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';

export const SUBMIT_DATA = 'SUBMIT_DATA';
export const SUBMIT_DATA_SUCCESS = 'SUBMIT_DATA_SUCCESS';

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
};
