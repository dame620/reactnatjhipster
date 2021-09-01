import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  managerRequest: ['managerId'],
  managerAllRequest: ['options'],
  managerUpdateRequest: ['manager'],
  managerDeleteRequest: ['managerId'],

  managerSuccess: ['manager'],
  managerAllSuccess: ['managerList', 'headers'],
  managerUpdateSuccess: ['manager'],
  managerDeleteSuccess: [],

  managerFailure: ['error'],
  managerAllFailure: ['error'],
  managerUpdateFailure: ['error'],
  managerDeleteFailure: ['error'],

  managerReset: [],
});

export const ManagerTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  manager: { id: undefined },
  managerList: [],
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
    manager: INITIAL_STATE.manager,
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
  const { manager } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    manager,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { managerList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    managerList: loadMoreDataWhenScrolled(state.managerList, managerList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { manager } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    manager,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    manager: INITIAL_STATE.manager,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    manager: INITIAL_STATE.manager,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    managerList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    manager: state.manager,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    manager: state.manager,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MANAGER_REQUEST]: request,
  [Types.MANAGER_ALL_REQUEST]: allRequest,
  [Types.MANAGER_UPDATE_REQUEST]: updateRequest,
  [Types.MANAGER_DELETE_REQUEST]: deleteRequest,

  [Types.MANAGER_SUCCESS]: success,
  [Types.MANAGER_ALL_SUCCESS]: allSuccess,
  [Types.MANAGER_UPDATE_SUCCESS]: updateSuccess,
  [Types.MANAGER_DELETE_SUCCESS]: deleteSuccess,

  [Types.MANAGER_FAILURE]: failure,
  [Types.MANAGER_ALL_FAILURE]: allFailure,
  [Types.MANAGER_UPDATE_FAILURE]: updateFailure,
  [Types.MANAGER_DELETE_FAILURE]: deleteFailure,
  [Types.MANAGER_RESET]: reset,
});
