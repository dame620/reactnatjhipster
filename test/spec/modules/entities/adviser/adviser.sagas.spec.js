import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import AdviserSagas from '../../../../../app/modules/entities/adviser/adviser.sagas';
import AdviserActions from '../../../../../app/modules/entities/adviser/adviser.reducer';

const { getAdviser, getAllAdvisers, updateAdviser, deleteAdviser } = AdviserSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getAdviser(1);
  const step = stepper(getAdviser(FixtureAPI, { adviserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AdviserActions.adviserSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getAdviser(FixtureAPI, { adviserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AdviserActions.adviserFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllAdvisers();
  const step = stepper(getAllAdvisers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AdviserActions.adviserAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllAdvisers(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AdviserActions.adviserAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateAdviser({ id: 1 });
  const step = stepper(updateAdviser(FixtureAPI, { adviser: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AdviserActions.adviserUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateAdviser(FixtureAPI, { adviser: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AdviserActions.adviserUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteAdviser({ id: 1 });
  const step = stepper(deleteAdviser(FixtureAPI, { adviserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(AdviserActions.adviserDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteAdviser(FixtureAPI, { adviserId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(AdviserActions.adviserDeleteFailure()));
});
