// action types
export const CHANGE_STATE = 'CHANGE_STATE';

// 获取列表
export const FETCH_DETAIL = 'FETCH_DETAIL';
export const FETCH_DETAIL_SUCCESS = 'FETCH_DETAIL_SUCCESS';

// 添加推荐
export const ADD_RECOMMEND = 'ADD_RECOMMEND';
export const ADD_RECOMMEND_SUCCESS = 'ADD_RECOMMEND_SUCCESS';

// 删除推荐
export const DELETE_RECOMMEND = 'DELETE_RECOMMEND';
export const DELETE_RECOMMEND_SUCCESS = 'DELETE_RECOMMEND_SUCCESS';

// 修改 banner logo
export const CHANGE_BL = 'CHANGE_BL';
export const CHANGE_BL_SUCCESS = 'CHANGE_BL_SUCCESS';

// action creator
export const actions = {
  changeState: payload => ({
    type: CHANGE_STATE, payload
  }),
  fetchDetail: payload => ({
    type: FETCH_DETAIL, payload
  }),
  fetchDetailSuccess: payload => ({
    type: FETCH_DETAIL_SUCCESS, payload
  }),
  addRecommend: payload => ({
    type: ADD_RECOMMEND, payload
  }),
  addRecommendSuccess: payload => ({
    type: ADD_RECOMMEND_SUCCESS, payload
  }),
  deleteRecommend: payload => ({
    type: DELETE_RECOMMEND, payload
  }),
  deleteRecommendSuccess: payload => ({
    type: DELETE_RECOMMEND_SUCCESS, payload
  }),
  changeBannerAndLogo: payload => ({
    type: CHANGE_BL, payload
  }),
  changeBannerAndLogoSuccess: payload => ({
    type: CHANGE_BL_SUCCESS, payload
  })
};
