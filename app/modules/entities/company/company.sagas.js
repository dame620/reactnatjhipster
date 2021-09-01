import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import CompanyActions from './company.reducer';

function* getCompany(api, action) {
  const { companyId } = action;
  // make the call to the api
  const apiCall = call(api.getCompany, companyId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CompanyActions.companySuccess(response.data));
  } else {
    yield put(CompanyActions.companyFailure(response.data));
  }
}

function* getAllCompanies(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllCompanies, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CompanyActions.companyAllSuccess(response.data, response.headers));
  } else {
    yield put(CompanyActions.companyAllFailure(response.data));
  }
}

function* updateCompany(api, action) {
  const { company } = action;
  // make the call to the api
  const idIsNotNull = !(company.id === null || company.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateCompany : api.createCompany, company);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CompanyActions.companyUpdateSuccess(response.data));
  } else {
    yield put(CompanyActions.companyUpdateFailure(response.data));
  }
}

function* deleteCompany(api, action) {
  const { companyId } = action;
  // make the call to the api
  const apiCall = call(api.deleteCompany, companyId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(CompanyActions.companyDeleteSuccess());
  } else {
    yield put(CompanyActions.companyDeleteFailure(response.data));
  }
}

export default {
  getAllCompanies,
  getCompany,
  deleteCompany,
  updateCompany,
};
