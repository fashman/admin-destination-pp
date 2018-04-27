import { 
  CHANGE_STATE, 
  FETCH_LIST_SUCCESS,
  DELETE_MERCHANT_SUCCESS
} from '../actions';

const defaultState = {
  step: 2,
  listData: {
    resultList: [],
    total: 0,
    currentPage: 1
  },
  isloading: true,
  search: {
    userType: '',
    status: '',
    email: '',
  }
};

function reducers(state = defaultState, action) {
  switch (action.type) {
  case CHANGE_STATE:
    const state1 = JSON.parse(JSON.stringify(state));
    const search = JSON.parse(JSON.stringify(state1.search));
    return { ...state1, ...{
      search: {...search, ...action.payload}
    }};
  case FETCH_LIST_SUCCESS:
    const state2 = JSON.parse(JSON.stringify(state));
    return { ...state2, ...{
      listData: action.payload,
      isloading: false
    }};
  case DELETE_MERCHANT_SUCCESS:
    const state3 = JSON.parse(JSON.stringify(state));
    let listData = JSON.parse( JSON.stringify(state3.listData));
    listData.resultList = listData.resultList.filter(val => val.shopCode !== action.payload);
    return { ...state3, listData };
  default:
    return state;
  }
}

export default reducers;
