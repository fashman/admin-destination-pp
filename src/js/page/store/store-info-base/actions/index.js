// action types
export const INIT_DATA = 'INIT_DATA';
export const FETCH_BASE_INFO = 'FETCH_BASE_INFO';
export const FETCH_BASE_INFO_SUCCESS = 'FETCH_BASE_INFO_SUCCESS';
export const SAVE_BASE_INFO = 'SAVE_BASE_INFO';
export const SAVE_BASE_INFO_SUCCESS = 'SAVE_BASE_INFO_SUCCESS';

// action creator
export const actions = {
  initData: (shopInfo) => ({
    type: INIT_DATA,
    shopInfo
  }),
  featchBaseInfo: (code) => ({
    type: FETCH_BASE_INFO,
    code
  }),
  featchBaseInfoSuccess: (shopInfo) => ({
    type: FETCH_BASE_INFO_SUCCESS,
    shopInfo
  }),
  saveBaseInfo: (shopInfo) => ({
    type: SAVE_BASE_INFO,
    shopInfo
  }),
  saveBaseInfoSuccess: (shopInfo) => ({
    type: SAVE_BASE_INFO_SUCCESS,
    shopInfo
  })
};
