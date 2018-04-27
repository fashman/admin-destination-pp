// action types
export const CHANGE_STATE = 'CHANGE_STATE';

// 获取列表
export const FETCH_LIST = 'FETCH_LIST';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';

// 删除商家
export const DELETE_MERCHANT = 'DELETE_MERCHANT';
export const DELETE_MERCHANT_SUCCESS = 'DELETE_MERCHANT_SUCCESS';

// action creator
export const actions = {
  changeState: payload => ({
    type: CHANGE_STATE,
    payload
  }),
  fetchList: payload => ({
    type: FETCH_LIST,
    payload
  }),
  fetchListSuccess: payload => ({
    type: FETCH_LIST_SUCCESS,
    payload
  }),
  deleteMerchant: payload => ({
    type: DELETE_MERCHANT,
    payload
  }),
  deleteMerchantSuccess: payload => ({
    type: DELETE_MERCHANT_SUCCESS,
    payload
  })
};
