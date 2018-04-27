// action types
export const CHANGE_STATE = 'CHANGE_STATE';

export const CHANGE_SEARCH = 'CHANGE_SEARCH';

// 获取列表
export const FETCH_LIST = 'FETCH_LIST';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';

// 删除商家
export const DELETE_MERCHANT = 'DELETE_MERCHANT';
export const DELETE_MERCHANT_SUCCESS = 'DELETE_MERCHANT_SUCCESS';

// 复制店铺
export const COPY_STORE = 'COPY_STORE';
export const COPY_STORE_SUCCESS = 'COPY_STORE_SUCCESS';

// 获取区域列表
export const GET_AREALIST = 'GET_AREALIST';
export const GET_AREALIST_SUCCESS = 'GET_AREALIST_SUCCESS';

// action creator
export const actions = {
  changeState: payload => ({
    type: CHANGE_STATE,
    payload
  }),
  changeSearch: payload => ({
    type: CHANGE_SEARCH,
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
  }),
  copyStore: payload => ({
    type: COPY_STORE,
    payload
  }),
  copyStoreSuccess: payload => ({
    type: COPY_STORE_SUCCESS,
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
