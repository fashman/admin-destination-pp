import { CHANGE_STATE, ACCEPT_SUBMIT_SUCCESS } from '../actions';
import Util from 'app/util/util';

const shopCode = Util.getParaFromUrl('id');
const defaultState = {
  step: 2,
  // step: 3,
  isloading: false,
  shopCode,
  content: ''
};

function reducers(state = defaultState, action) {
  switch (action.type) {
  case CHANGE_STATE:
    const state1 = JSON.parse(JSON.stringify(state));
    return { ...state1, ...action.payload };
  case ACCEPT_SUBMIT_SUCCESS:
    const state2 = JSON.parse(JSON.stringify(state));
    return { ...state2, isloading: false, step: 3 };
  default:
    return state;
  }
}

export default reducers;
