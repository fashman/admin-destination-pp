import {
  INIT_DATA,
  FETCH_BASE_INFO,
  FETCH_BASE_INFO_SUCCESS,
  SAVE_BASE_INFO,
  SAVE_BASE_INFO_SUCCESS
} from '../actions';

const defaultState = {
  loading: false,
  shopInfo: {
    shopNameCn: '',
    shopNameEn: '',
    budget: '',
    maxBudget: '',
    businessTime: [{
      startWeek: '',
      endWeek: '',
      businessStartTime: '08:00',
      businessEndTime: '20:00'
    }],
    chef: '',
    city: '',
    country: '',
    currency: '',
    dishesTaste: '',
    latitude: '',
    longitude: '',
    shopAddress: '',
    shopCode: '',
    shopDesc: '',
    shopType: '',
  }
};

function reducers(state = defaultState, action) {
  switch (action.type) {
  case INIT_DATA:
    const state1 = JSON.parse(JSON.stringify(state));
    return { ...state1, shopInfo: action.shopInfo };
  case FETCH_BASE_INFO:
    const state2 = JSON.parse(JSON.stringify(state));
    return { ...state2, loading: true };
  case FETCH_BASE_INFO_SUCCESS:
    const state3 = JSON.parse(JSON.stringify(state));
    return { ...state3, loading: false, shopInfo: action.shopInfo };
  case SAVE_BASE_INFO:
    const state4 = JSON.parse(JSON.stringify(state));
    return { ...state4, loading: true };
  case SAVE_BASE_INFO_SUCCESS:
    const state5 = JSON.parse(JSON.stringify(state));
    return { ...state5, loading: false, shopInfo: action.shopInfo };
  default:
    return state;
  }
}

export default reducers;
