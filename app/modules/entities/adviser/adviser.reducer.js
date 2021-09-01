import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  adviserRequest: ['adviserId'],
  adviserAllRequest: ['options'],
  adviserUpdateRequest: ['adviser'],
  adviserDeleteRequest: ['adviserId'],

  adviserSuccess: ['adviser'],
  adviserAllSuccess: ['adviserList', 'headers'],
  adviserUpdateSuccess: ['adviser'],
  adviserDeleteSuccess: [],

  adviserFailure: ['error'],
  adviserAllFailure: ['error'],
  adviserUpdateFailure: ['error'],
  adviserDeleteFailure: ['error'],

  adviserReset: [],
});

export const AdviserTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  adviser: { id: undefined },
  adviserList: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
  links: { next: 0 },
  totalItems: 0,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    errorOne: false,
    adviser: INITIAL_STATE.adviser,
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
  const { adviser } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    adviser,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { adviserList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    adviserList: loadMoreDataWhenScrolled(state.adviserList, adviserList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { adviser } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    adviser,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    adviser: INITIAL_STATE.adviser,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    adviser: INITIAL_STATE.adviser,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    adviserList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    adviser: state.adviser,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    adviser: state.adviser,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ADVISER_REQUEST]: request,
  [Types.ADVISER_ALL_REQUEST]: allRequest,
  [Types.ADVISER_UPDATE_REQUEST]: updateRequest,
  [Types.ADVISER_DELETE_REQUEST]: deleteRequest,

  [Types.ADVISER_SUCCESS]: success,
  [Types.ADVISER_ALL_SUCCESS]: allSuccess,
  [Types.ADVISER_UPDATE_SUCCESS]: updateSuccess,
  [Types.ADVISER_DELETE_SUCCESS]: deleteSuccess,

  [Types.ADVISER_FAILURE]: failure,
  [Types.ADVISER_ALL_FAILURE]: allFailure,
  [Types.ADVISER_UPDATE_FAILURE]: updateFailure,
  [Types.ADVISER_DELETE_FAILURE]: deleteFailure,
  [Types.ADVISER_RESET]: reset,
});
