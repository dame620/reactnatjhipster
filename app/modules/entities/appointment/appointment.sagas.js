import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import AppointmentActions from './appointment.reducer';
import { convertDateTimeFromServer } from '../../../shared/util/date-transforms';

function* getAppointment(api, action) {
  const { appointmentId } = action;
  // make the call to the api
  const apiCall = call(api.getAppointment, appointmentId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(AppointmentActions.appointmentSuccess(response.data));
  } else {
    yield put(AppointmentActions.appointmentFailure(response.data));
  }
}

function* getAllAppointments(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllAppointments, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AppointmentActions.appointmentAllSuccess(response.data, response.headers));
  } else {
    yield put(AppointmentActions.appointmentAllFailure(response.data));
  }
}

function* updateAppointment(api, action) {
  const { appointment } = action;
  // make the call to the api
  const idIsNotNull = !(appointment.id === null || appointment.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateAppointment : api.createAppointment, appointment);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data);
    yield put(AppointmentActions.appointmentUpdateSuccess(response.data));
  } else {
    yield put(AppointmentActions.appointmentUpdateFailure(response.data));
  }
}

function* deleteAppointment(api, action) {
  const { appointmentId } = action;
  // make the call to the api
  const apiCall = call(api.deleteAppointment, appointmentId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AppointmentActions.appointmentDeleteSuccess());
  } else {
    yield put(AppointmentActions.appointmentDeleteFailure(response.data));
  }
}
function mapDateFields(data) {
  data.date = convertDateTimeFromServer(data.date);
  return data;
}

export default {
  getAllAppointments,
  getAppointment,
  deleteAppointment,
  updateAppointment,
};
