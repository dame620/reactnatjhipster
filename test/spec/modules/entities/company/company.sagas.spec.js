import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import CompanySagas from '../../../../../app/modules/entities/company/company.sagas';
import CompanyActions from '../../../../../app/modules/entities/company/company.reducer';

const { getCompany, getAllCompanies, updateCompany, deleteCompany } = CompanySagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getCompany(1);
  const step = stepper(getCompany(FixtureAPI, { companyId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CompanyActions.companySuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getCompany(FixtureAPI, { companyId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CompanyActions.companyFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllCompanies();
  const step = stepper(getAllCompanies(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CompanyActions.companyAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllCompanies(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CompanyActions.companyAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateCompany({ id: 1 });
  const step = stepper(updateCompany(FixtureAPI, { company: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CompanyActions.companyUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateCompany(FixtureAPI, { company: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CompanyActions.companyUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteCompany({ id: 1 });
  const step = stepper(deleteCompany(FixtureAPI, { companyId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(CompanyActions.companyDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteCompany(FixtureAPI, { companyId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(CompanyActions.companyDeleteFailure()));
});
