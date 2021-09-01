import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import ManagerSagas from '../../../../../app/modules/entities/manager/manager.sagas';
import ManagerActions from '../../../../../app/modules/entities/manager/manager.reducer';

const { getManager, getAllManagers, updateManager, deleteManager } = ManagerSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getManager(1);
  const step = stepper(getManager(FixtureAPI, { managerId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ManagerActions.managerSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getManager(FixtureAPI, { managerId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ManagerActions.managerFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllManagers();
  const step = stepper(getAllManagers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ManagerActions.managerAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllManagers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ManagerActions.managerAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateManager({ id: 1 });
  const step = stepper(updateManager(FixtureAPI, { manager: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ManagerActions.managerUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateManager(FixtureAPI, { manager: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ManagerActions.managerUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteManager({ id: 1 });
  const step = stepper(deleteManager(FixtureAPI, { managerId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(ManagerActions.managerDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteManager(FixtureAPI, { managerId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(ManagerActions.managerDeleteFailure()));
});
