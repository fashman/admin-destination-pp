import {
  FETCH_DISHTYPELIST_SUCCESS,
  FETCH_DISHLIST_SUCCESS,
  FETCH_MENULIST_SUCCESS,
  CHANGE_STATE,
  DELETE_DISHTYPE_SUCCESS,
  SAVE_DISH_SUCCESS,
  DELETE_DISH_SUCCESS,
  SAVE_MENU_SUCCESS,
  DELETE_MENU_SUCCESS
} from '../actions';
import objectAssign from 'object-assign';

const defaultState = {
  // loading: true,
  loading: false,
  dishType: {
    dishTypes: [],
    typeList: []
  },
  dishListData: {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    resultList: [],
  },
  curDishType: -1,
  dishVisible: false,
  menuVisible: false,
  dishTypeVisible: false,
  curDishData: null,
  curMenuData: null,
};

function reducers(state = defaultState, action) {
  switch (action.type) {
  case FETCH_DISHTYPELIST_SUCCESS:
    const state1 = JSON.parse(JSON.stringify(state));
    return { ...state1, dishType: action.payload };
  case FETCH_DISHLIST_SUCCESS:
    const state2 = JSON.parse(JSON.stringify(state));
    return { ...state2, loading: false, ...action.payload };
  case FETCH_MENULIST_SUCCESS:
    const state3 = JSON.parse(JSON.stringify(state));
    return { ...state3, loading: false, ...action.payload };
  case CHANGE_STATE:
    const state4 = JSON.parse(JSON.stringify(state));
    return { ...state4, ...action.payload };
  case DELETE_DISHTYPE_SUCCESS:
    let state5 = JSON.parse( JSON.stringify(state) );
    state5.dishType.typeList = state5.dishType.typeList.filter(val=> val.dishTypeId !== action.payload);
    return state5;
  case SAVE_DISH_SUCCESS:
    let state6 = JSON.parse( JSON.stringify(state));
    let has = state6.dishListData.resultList.find(val=>action.payload.dishCode === val.dishCode);
    if ( has ) {
      state6.dishListData.resultList = state6.dishListData.resultList.map(val => {
        return val.dishCode === action.payload.dishCode ? action.payload : val;
      });
    } else {
      if (state6.curDishType === action.payload.dishTypeId) {
        state6.dishListData.resultList.unshift(action.payload);
      }
    }
    return { ...state6,curDishData: null, dishVisible: false };
  case DELETE_DISH_SUCCESS:
    let state7 = JSON.parse( JSON.stringify(state) );
    state7.dishListData.resultList = state7.dishListData.resultList.filter(val => {
      return val.dishCode !== action.payload;
    });
    return state7;
  case SAVE_MENU_SUCCESS:
    let state8 = JSON.parse( JSON.stringify(state));
    let has2 = state8.dishListData.resultList.find(val=>action.payload.setmenuCode === val.setmenuCode);
    if ( has2 ) {
      state8.dishListData.resultList = state8.dishListData.resultList.map(val => {
        return val.setmenuCode === action.payload.setmenuCode ? action.payload : val;
      });
    } else {
      if (state8.curDishType === 0) {
        state8.dishListData.resultList.unshift(action.payload);
      }
    }
    return { ...state8,curMenuData: null, menuVisible: false };
  case DELETE_MENU_SUCCESS:
    let state9 = JSON.parse( JSON.stringify(objectAssign({}, state)));
    state9.dishListData.resultList = state9.dishListData.resultList.filter(val => {
      return val.setmenuCode !== action.payload;
    });
    return state9;
  default:
    return state;
  }
}

export default reducers;
