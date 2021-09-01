import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import BankActions from './bank.reducer';

function* getBank(api, action) {
  const { bankId } = action;
  // make the call to the api
  const apiCall = call(api.getBank, bankId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BankActions.bankSuccess(response.data));
  } else {
    yield put(BankActions.bankFailure(response.data));
  }
}

function* getAllBanks(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllBanks, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BankActions.bankAllSuccess(response.data, response.headers));
  } else {
    yield put(BankActions.bankAllFailure(response.data));
  }
}

function* updateBank(api, action) {
  const { bank } = action;
  // make the call to the api
  const idIsNotNull = !(bank.id === null || bank.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateBank : api.createBank, bank);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BankActions.bankUpdateSuccess(response.data));
  } else {
    yield put(BankActions.bankUpdateFailure(response.data));
  }
}

function* deleteBank(api, action) {
  const { bankId } = action;
  // make the call to the api
  const apiCall = call(api.deleteBank, bankId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(BankActions.bankDeleteSuccess());
  } else {
    yield put(BankActions.bankDeleteFailure(response.data));
  }
}

export default {
  getAllBanks,
  getBank,
  deleteBank,
  updateBank,
};
