import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import AppointmentSagas from '../../../../../app/modules/entities/appointment/appointment.sagas';
import AppointmentActions from '../../../../../app/modules/entities/appointment/appointment.reducer';

const { getAppointment, getAllAppointments, updateAppointment, deleteAppointment } = AppointmentSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getAppointment(1);
  const step = stepper(getAppointment(FixtureAPI, { appointmentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AppointmentActions.appointmentSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getAppointment(FixtureAPI, { appointmentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AppointmentActions.appointmentFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllAppointments();
  const step = stepper(getAllAppointments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AppointmentActions.appointmentAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllAppointments(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AppointmentActions.appointmentAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateAppointment({ id: 1 });
  const step = stepper(updateAppointment(FixtureAPI, { appointment: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AppointmentActions.appointmentUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateAppointment(FixtureAPI, { appointment: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AppointmentActions.appointmentUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteAppointment({ id: 1 });
  const step = stepper(deleteAppointment(FixtureAPI, { appointmentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AppointmentActions.appointmentDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteAppointment(FixtureAPI, { appointmentId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AppointmentActions.appointmentDeleteFailure()));
});
