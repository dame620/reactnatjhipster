import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  bankRequest: ['bankId'],
  bankAllRequest: ['options'],
  bankUpdateRequest: ['bank'],
  bankDeleteRequest: ['bankId'],

  bankSuccess: ['bank'],
  bankAllSuccess: ['bankList', 'headers'],
  bankUpdateSuccess: ['bank'],
  bankDeleteSuccess: [],

  bankFailure: ['error'],
  bankAllFailure: ['error'],
  bankUpdateFailure: ['error'],
  bankDeleteFailure: ['error'],

  bankReset: [],
});

export const BankTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  bank: { id: undefined },
  bankList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    bank: INITIAL_STATE.bank,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: false,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updateSuccess: false,
    updating: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { bank } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    bank,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { bankList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    bankList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { bank } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    bank,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    bank: INITIAL_STATE.bank,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    bank: INITIAL_STATE.bank,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    bankList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    bank: state.bank,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    bank: state.bank,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.BANK_REQUEST]: request,
  [Types.BANK_ALL_REQUEST]: allRequest,
  [Types.BANK_UPDATE_REQUEST]: updateRequest,
  [Types.BANK_DELETE_REQUEST]: deleteRequest,

  [Types.BANK_SUCCESS]: success,
  [Types.BANK_ALL_SUCCESS]: allSuccess,
  [Types.BANK_UPDATE_SUCCESS]: updateSuccess,
  [Types.BANK_DELETE_SUCCESS]: deleteSuccess,

  [Types.BANK_FAILURE]: failure,
  [Types.BANK_ALL_FAILURE]: allFailure,
  [Types.BANK_UPDATE_FAILURE]: updateFailure,
  [Types.BANK_DELETE_FAILURE]: deleteFailure,
  [Types.BANK_RESET]: reset,
});
