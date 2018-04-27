import { 
  CHANGE_STATE, 
  FETCH_LIST_SUCCESS,
  CHANGE_BL_SUCCESS,
  ADD_RECOMMEND_SUCCESS,
  ADD_AREA_SUCCESS
} from '../actions';

const defaultState = {
  listData: {
    resultList: [],
    total: 0,
    currentPage: 1
  },
  isloading: true,
  addVisible: false,
  logoVisible: false,
  bannerVisible: false,
  recommendVisible: false,
  curData: {}
};

function reducers(state = defaultState, action) {
  switch (action.type) {
  case CHANGE_STATE:
    const state1 = JSON.parse(JSON.stringify(state));
    return { ...state1, ...action.payload };
  case FETCH_LIST_SUCCESS:
    const state2 = JSON.parse(JSON.stringify(state));
    return { ...state2, ...{
      listData: action.payload,
      isloading: false
    }};
  case CHANGE_BL_SUCCESS:
    let state3 = JSON.parse(JSON.stringify(state));
    state3.listData.resultList =  state3.listData.resultList.map(val=>{
      return val.id === action.payload.id ? action.payload : val;
    });
    return { 
      ...state3,
      logoVisible: false,
      bannerVisible: false
    };
  case ADD_RECOMMEND_SUCCESS:
    let state4 = JSON.parse(JSON.stringify(state));
    return { ...state4, recommendVisible: false };
  case ADD_AREA_SUCCESS:
    let state5 = JSON.parse(JSON.stringify(state));
    return { ...state5, addVisible: false };
  default:
    return state;
  }
}

export default reducers;
