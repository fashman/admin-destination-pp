import { CHANGE_STATE, SUBMIT_DATA_SUCCESS, FETCH_DETAIL_SUCCESS, CHECK_USERANDCODE_SUCCESS } from '../actions';

const defaultState = {
  isloading: false
};

function reducers(state = defaultState, action) {
  switch (action.type) {
  case CHANGE_STATE:
    const state1 = JSON.parse(JSON.stringify(state));
    return { ...state1, ...action.payload };
  case SUBMIT_DATA_SUCCESS:
    const state2 = JSON.parse(JSON.stringify(state));
    return { ...state2, step: 1.5, isloading: false };
  case FETCH_DETAIL_SUCCESS:
    const state3 = JSON.parse(JSON.stringify(state));
    return { ...state3, stepb: action.payload };
  case  CHECK_USERANDCODE_SUCCESS:
    const state4 = JSON.parse(JSON.stringify(state));
    return { ...state4, stepa: action.payload, step: 1 };
  default:
    return state;
  }
}

export default reducers;
