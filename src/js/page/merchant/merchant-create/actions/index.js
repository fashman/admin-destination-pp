// action types
export const CHANGE_STATE = 'CHANGE_STATE';

export const SUBMIT_DATA = 'SUBMIT_DATA';
export const SUBMIT_DATA_SUCCESS = 'SUBMIT_DATA_SUCCESS';

// action creator
export const actions = {
  changeState: payload => ({
    type: CHANGE_STATE,
    payload
  }),
  submitData: payload => ({
    type: SUBMIT_DATA,
    payload
  }),
  submitDataSuccess: payload => ({
    type: SUBMIT_DATA_SUCCESS,
    payload
  }),
};
