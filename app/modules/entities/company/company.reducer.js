import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  companyRequest: ['companyId'],
  companyAllRequest: ['options'],
  companyUpdateRequest: ['company'],
  companyDeleteRequest: ['companyId'],

  companySuccess: ['company'],
  companyAllSuccess: ['companyList', 'headers'],
  companyUpdateSuccess: ['company'],
  companyDeleteSuccess: [],

  companyFailure: ['error'],
  companyAllFailure: ['error'],
  companyUpdateFailure: ['error'],
  companyDeleteFailure: ['error'],

  companyReset: [],
});

export const CompanyTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  company: { id: undefined },
  companyList: [],
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
    company: INITIAL_STATE.company,
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
  const { company } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    company,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { companyList } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    companyList,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { company } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    company,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    company: INITIAL_STATE.company,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    company: INITIAL_STATE.company,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    companyList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    company: state.company,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    company: state.company,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COMPANY_REQUEST]: request,
  [Types.COMPANY_ALL_REQUEST]: allRequest,
  [Types.COMPANY_UPDATE_REQUEST]: updateRequest,
  [Types.COMPANY_DELETE_REQUEST]: deleteRequest,

  [Types.COMPANY_SUCCESS]: success,
  [Types.COMPANY_ALL_SUCCESS]: allSuccess,
  [Types.COMPANY_UPDATE_SUCCESS]: updateSuccess,
  [Types.COMPANY_DELETE_SUCCESS]: deleteSuccess,

  [Types.COMPANY_FAILURE]: failure,
  [Types.COMPANY_ALL_FAILURE]: allFailure,
  [Types.COMPANY_UPDATE_FAILURE]: updateFailure,
  [Types.COMPANY_DELETE_FAILURE]: deleteFailure,
  [Types.COMPANY_RESET]: reset,
});
