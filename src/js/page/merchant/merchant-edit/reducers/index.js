import { CHANGE_STATE, FETCH_DETAIL_SUCCESS } from '../actions';

const defaultState = {
  shopUsers: [],
  user: {}
};

function reducers(state = defaultState, action) {
  switch (action.type) {
  case CHANGE_STATE:
    const state1 = JSON.parse(JSON.stringify(state));
    return { ...state1, ...action.payload };
  case FETCH_DETAIL_SUCCESS:
    const state2 = JSON.parse(JSON.stringify(state));
    return { ...state2, ...action.payload };
  default:
    return state;
  }
}

export default reducers;
