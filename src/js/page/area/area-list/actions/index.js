// action types
export const CHANGE_STATE = 'CHANGE_STATE';

// 获取列表
export const FETCH_LIST = 'FETCH_LIST';
export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';

// 添加区域
export const ADD_AREA = 'ADD_AREA';
export const ADD_AREA_SUCCESS = 'ADD_AREA_SUCCESS';

// 删除区域
export const DELETE_AREA = 'DELETE_AREA';
export const DELETE_AREA_SUCCESS = 'DELETE_AREA_SUCCESS';

// 修改 banner logo
export const CHANGE_BL = 'CHANGE_BL';
export const CHANGE_BL_SUCCESS = 'CHANGE_BL_SUCCESS';

// 添加推荐
export const ADD_RECOMMEND = 'ADD_RECOMMEND';
export const ADD_RECOMMEND_SUCCESS = 'ADD_RECOMMEND_SUCCESS';

// action creator
export const actions = {
  changeState: payload => ({
    type: CHANGE_STATE, payload
  }),
  fetchList: payload => ({
    type: FETCH_LIST, payload
  }),
  fetchListSuccess: payload => ({
    type: FETCH_LIST_SUCCESS, payload
  }),
  addArea: payload => ({
    type: ADD_AREA, payload
  }),
  addAreaSuccess: payload => ({
    type: ADD_AREA_SUCCESS, payload
  }),
  deleteArea: payload => ({
    type: DELETE_AREA, payload
  }),
  deleteAreaSuccess: payload => ({
    type: DELETE_AREA_SUCCESS, payload
  }),
  changeBannerAndLogo: payload => ({
    type: CHANGE_BL, payload
  }),
  changeBannerAndLogoSuccess: payload => ({
    type: CHANGE_BL_SUCCESS, payload
  }),
  addRecommend: payload => ({
    type: ADD_RECOMMEND, payload
  }),
  addRecommendSuccess: payload => ({
    type: ADD_RECOMMEND_SUCCESS, payload
  }),
};
