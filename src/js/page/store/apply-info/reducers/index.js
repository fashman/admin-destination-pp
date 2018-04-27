import { CHANGE_STATE, FETCH_DETAIL_SUCCESS } from '../actions';

const defaultState = {
  detail: {
    auditStatus: 0,
    belongMerchant: '',
    claimAuditStatus: 0,
    claimStatus: 0,
    operateStatus: 0,
    rejectReason: null,
    shopCode: null,
    shopId: ''
  },
  showModal: false
};

function reducers(state = defaultState, action) {
  switch (action.type) {
  case CHANGE_STATE:
    const state1 = JSON.parse(JSON.stringify(state));
    return { ...state1, ...action.payload };
  case FETCH_DETAIL_SUCCESS:
    const state2 = JSON.parse(JSON.stringify(state));
    return { ...state2, ...{
      detail: action.payload
    }};
  default:
    return state;
  }
}

export default reducers;
