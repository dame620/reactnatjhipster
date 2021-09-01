import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import BankSagas from '../../../../../app/modules/entities/bank/bank.sagas';
import BankActions from '../../../../../app/modules/entities/bank/bank.reducer';

const { getBank, getAllBanks, updateBank, deleteBank } = BankSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getBank(1);
  const step = stepper(getBank(FixtureAPI, { bankId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BankActions.bankSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getBank(FixtureAPI, { bankId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BankActions.bankFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllBanks();
  const step = stepper(getAllBanks(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BankActions.bankAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllBanks(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BankActions.bankAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateBank({ id: 1 });
  const step = stepper(updateBank(FixtureAPI, { bank: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BankActions.bankUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateBank(FixtureAPI, { bank: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BankActions.bankUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteBank({ id: 1 });
  const step = stepper(deleteBank(FixtureAPI, { bankId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(BankActions.bankDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteBank(FixtureAPI, { bankId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(BankActions.bankDeleteFailure()));
});
