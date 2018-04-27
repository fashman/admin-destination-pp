// 获取菜品类型列表
export const FETCH_DISHTYPE_LIST = 'FETCH_DISHTYPE_LIST';
export const FETCH_DISHTYPELIST_SUCCESS = 'FETCH_DISHTYPELIST_SUCCESS';

// 获取菜品列表
export const FETCH_DISH_LIST = 'FETCH_DISH_LIST';
export const FETCH_DISHLIST_SUCCESS = 'FETCH_DISHLIST_SUCCESS';

// 获取套餐列表
export const FETCH_MENU_LIST = 'FETCH_MENU_LIST';
export const FETCH_MENULIST_SUCCESS = 'FETCH_MENULIST_SUCCESS';

export const CHANGE_STATE = 'CHANGE_STATE';

// 新增菜品类型
export const ADD_DISHTYPE = 'ADD_DISHTYPE';

// 删除菜品类型
export const DELETE_DISHTYPE = 'DELETE_DISHTYPE';
export const DELETE_DISHTYPE_SUCCESS = 'DELETE_DISHTYPE_SUCCESS';

// 更新或新增菜品
export const SAVE_DISH = 'SAVE_DISH';
export const SAVE_DISH_SUCCESS = 'SAVE_DISH_SUCCESS';

// 删除菜品
export const DELETE_DISH = 'DELETE_DISH';
export const DELETE_DISH_SUCCESS = 'DELETE_DISH_SUCCESS';

// 更新或新增套餐
export const SAVE_MENU = 'SAVE_MENU';
export const SAVE_MENU_SUCCESS = 'SAVE_MENU_SUCCESS';

// 删除套餐
export const DELETE_MENU = 'DELETE_MENU';
export const DELETE_MENU_SUCCESS = 'DELETE_MENU_SUCCESS';

// action creator
export const actions = {
  fetchDishTypeList: () => ({
    type: FETCH_DISHTYPE_LIST
  }),
  fetchDishTypeListSuccess: data => ({
    type: FETCH_DISHTYPELIST_SUCCESS,
    payload: data
  }),
  fetchDishList: data => ({
    type: FETCH_DISH_LIST,
    payload: data
  }),
  fetchDishListSuccess: data => ({
    type: FETCH_DISHLIST_SUCCESS,
    payload: data
  }),
  fetchMenuList: data => ({
    type: FETCH_MENU_LIST,
    payload: data
  }),
  fetchMenuListSuccess: data => ({
    type: FETCH_MENULIST_SUCCESS,
    payload: data
  }),
  changeState: data => ({
    type: CHANGE_STATE,
    payload: data
  }),
  addDishType: data => ({
    type: ADD_DISHTYPE,
    payload: data
  }),
  deleteDishType: data => ({
    type: DELETE_DISHTYPE,
    payload: data
  }),
  deleteDishTypeSuccess: data => ({
    type: DELETE_DISHTYPE_SUCCESS,
    payload: data
  }),
  saveDish: data => ({
    type: SAVE_DISH,
    payload: data
  }),
  saveDishSuccess: data => ({
    type: SAVE_DISH_SUCCESS,
    payload: data
  }),
  deleteDish: data => ({
    type: DELETE_DISH,
    payload: data
  }),
  deleteDishSuccess: data => ({
    type: DELETE_DISH_SUCCESS,
    payload: data
  }),
  saveMenu: data => ({
    type: SAVE_MENU,
    payload: data
  }),
  saveMenuSuccess: data => ({
    type: SAVE_MENU_SUCCESS,
    payload: data
  }),
  deleteMenu: data => ({
    type: DELETE_MENU,
    payload: data
  }),
  deleteMenuSuccess: data => ({
    type: DELETE_MENU_SUCCESS,
    payload: data
  }),
};
