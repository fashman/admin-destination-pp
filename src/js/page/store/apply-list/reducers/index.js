import { 
  CHANGE_STATE, 
  FETCH_LIST_SUCCESS,
  DELETE_MERCHANT_SUCCESS,
  CHANGE_SEARCH,
  COPY_STORE_SUCCESS,
  GET_AREALIST_SUCCESS
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
    country: '',
    city: '',
    auditStatus: '',
    keyword: '',
    shopType: '',
    claimAuditStatus: '',
    zoneId: '',
  },
  curData: {},
  showCopy: false,
  areaList: []
};

function reducers(state = defaultState, action) {
  switch (action.type) {
  case CHANGE_SEARCH:
    const state1 = JSON.parse(JSON.stringify(state));
    const search = JSON.parse(JSON.stringify(state1.search));
    return { ...state1, ...{
      search: {...search, ...action.payload}
    }};
  case CHANGE_STATE:
    const state4 = JSON.parse(JSON.stringify(state));
    return { ...state4, ...action.payload };
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
  case  COPY_STORE_SUCCESS:
    const state5 = JSON.parse(JSON.stringify(state));
    let curData = JSON.parse( JSON.stringify(state5.curData));
    curData.shopCode = action.payload.shopCode;
    curData.shopNameEn = action.payload.shopNameEn;
    curData.auditStatus = 0;
    curData.operateStatus = 1;
    curData.claimAuditStatus = 3;
    curData.claimStatus = 0;
    state5.listData.resultList.unshift(curData);
    return { ...state5, showCopy: false, curData: {} };
  case GET_AREALIST_SUCCESS:
    const state6 = JSON.parse(JSON.stringify(state));
    return { ...state6, areaList: action.payload };
  default:
    return state;
  }
}

export default reducers;
