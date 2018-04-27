// action types
export const CHANGE_STATE = 'CHANGE_STATE';


export const ACCEPT_SUBMIT = 'ACCEPT_SUBMIT';
export const ACCEPT_SUBMIT_SUCCESS = 'ACCEPT_SUBMIT_SUCCESS';

// action creator
export const actions = {
  changeState: (payload) => ({
    type: CHANGE_STATE,
    payload
  }),
  acceptSubmit: (payload) => ({
    type: ACCEPT_SUBMIT,
    payload
  }),
  acceptSubmitSuccess: (payload) => ({
    type: ACCEPT_SUBMIT_SUCCESS,
    payload
  }),
};
