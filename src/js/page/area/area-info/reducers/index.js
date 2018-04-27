import { 
  CHANGE_STATE, 
  FETCH_DETAIL_SUCCESS,
  CHANGE_BL_SUCCESS,
  DELETE_RECOMMEND_SUCCESS,
  ADD_RECOMMEND_SUCCESS,
} from '../actions';

const defaultState = {
  detail: {},
  isloading: true,
  addVisible: false,
  logoVisible: false,
  // bannerVisible: false,
  recommendVisible: false,
  curData: {}
};

function reducers(state = defaultState, action) {
  switch (action.type) {
  case CHANGE_STATE:
    const state1 = JSON.parse(JSON.stringify(state));
    return { ...state1, ...action.payload };
  case FETCH_DETAIL_SUCCESS:
    const state2 = JSON.parse(JSON.stringify(state));
    return { ...state2, ...action.payload, isloading: false };
  case CHANGE_BL_SUCCESS:
    let state3 = JSON.parse(JSON.stringify(state));
    state3.detail = { ...state3.detail, ...action.payload };
    return { ...state3, logoVisible: false };
  case DELETE_RECOMMEND_SUCCESS:
    let state4 = JSON.parse(JSON.stringify(state));
    state4.detail.recommends = state4.detail.recommends.filter(val=>{
      return action.payload !== val.id;
    });
    return state4;
  case ADD_RECOMMEND_SUCCESS:
    let state5 = JSON.parse(JSON.stringify(state));
    let data = action.payload;
    if (data.id) {
      state5.detail.recommends = state5.detail.recommends.map(val=>{
        return data.id === val.id ? {...val, ...data} : val;
      });
    } else {
      state5.detail.recommends.push(data);
    }
    return { ...state5, recommendVisible: false, curData: {}, isloading: true };
  default:
    return state;
  }
}

export default reducers;
