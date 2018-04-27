import { CHANGE_STATE, FETCH_DETAIL_SUCCESS, GET_AREALIST_SUCCESS } from '../actions';

const defaultState = {
  detail: {
    shopAddress: '',	
    city: '',
    contactEmail: '',	
    contactor: '',
    country: '',
    postcode: '',	
    description: '',
    email: '',
    logoUrl: '',
    shopNameEn: '',
    shopType: '',
    contactPhone: '',
    platform: '',
    rejectReason: '',
    skinType: '',
  },
  areaList: []
};

function reducers(state = defaultState, action) {
  switch (action.type) {
  case CHANGE_STATE:
    const state1 = JSON.parse(JSON.stringify(state));
    return { ...state1, ...action.payload };
  case FETCH_DETAIL_SUCCESS:
    const state2 = JSON.parse(JSON.stringify(state));
    return { ...state2, detail: action.payload };
  case GET_AREALIST_SUCCESS:
    const state3 = JSON.parse(JSON.stringify(state));
    return { ...state3, areaList: action.payload };
  default:
    return state;
  }
}

export default reducers;
