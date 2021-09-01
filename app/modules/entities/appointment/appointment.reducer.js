import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { loadMoreDataWhenScrolled } from '../../../shared/util/pagination-utils';
import { parseHeaderForLinks } from '../../../shared/util/url-utils';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  appointmentRequest: ['appointmentId'],
  appointmentAllRequest: ['options'],
  appointmentUpdateRequest: ['appointment'],
  appointmentDeleteRequest: ['appointmentId'],

  appointmentSuccess: ['appointment'],
  appointmentAllSuccess: ['appointmentList', 'headers'],
  appointmentUpdateSuccess: ['appointment'],
  appointmentDeleteSuccess: [],

  appointmentFailure: ['error'],
  appointmentAllFailure: ['error'],
  appointmentUpdateFailure: ['error'],
  appointmentDeleteFailure: ['error'],

  appointmentReset: [],
});

export const AppointmentTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: false,
  fetchingAll: false,
  updating: false,
  deleting: false,
  updateSuccess: false,
  appointment: { id: undefined },
  appointmentList: [],
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
    appointment: INITIAL_STATE.appointment,
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
  const { appointment } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    appointment,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { appointmentList, headers } = action;
  const links = parseHeaderForLinks(headers.link);
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    links,
    totalItems: parseInt(headers['x-total-count'], 10),
    appointmentList: loadMoreDataWhenScrolled(state.appointmentList, appointmentList, links),
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { appointment } = action;
  return state.merge({
    updateSuccess: true,
    updating: false,
    errorUpdating: null,
    appointment,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    appointment: INITIAL_STATE.appointment,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    appointment: INITIAL_STATE.appointment,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    appointmentList: [],
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updateSuccess: false,
    updating: false,
    errorUpdating: error,
    appointment: state.appointment,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    appointment: state.appointment,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.APPOINTMENT_REQUEST]: request,
  [Types.APPOINTMENT_ALL_REQUEST]: allRequest,
  [Types.APPOINTMENT_UPDATE_REQUEST]: updateRequest,
  [Types.APPOINTMENT_DELETE_REQUEST]: deleteRequest,

  [Types.APPOINTMENT_SUCCESS]: success,
  [Types.APPOINTMENT_ALL_SUCCESS]: allSuccess,
  [Types.APPOINTMENT_UPDATE_SUCCESS]: updateSuccess,
  [Types.APPOINTMENT_DELETE_SUCCESS]: deleteSuccess,

  [Types.APPOINTMENT_FAILURE]: failure,
  [Types.APPOINTMENT_ALL_FAILURE]: allFailure,
  [Types.APPOINTMENT_UPDATE_FAILURE]: updateFailure,
  [Types.APPOINTMENT_DELETE_FAILURE]: deleteFailure,
  [Types.APPOINTMENT_RESET]: reset,
});
