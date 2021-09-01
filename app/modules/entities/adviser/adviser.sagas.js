import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import AdviserActions from './adviser.reducer';

function* getAdviser(api, action) {
  const { adviserId } = action;
  // make the call to the api
  const apiCall = call(api.getAdviser, adviserId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AdviserActions.adviserSuccess(response.data));
  } else {
    yield put(AdviserActions.adviserFailure(response.data));
  }
}

function* getAllAdvisers(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllAdvisers, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AdviserActions.adviserAllSuccess(response.data, response.headers));
  } else {
    yield put(AdviserActions.adviserAllFailure(response.data));
  }
}

function* updateAdviser(api, action) {
  const { adviser } = action;
  // make the call to the api
  const idIsNotNull = !(adviser.id === null || adviser.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateAdviser : api.createAdviser, adviser);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AdviserActions.adviserUpdateSuccess(response.data));
  } else {
    yield put(AdviserActions.adviserUpdateFailure(response.data));
  }
}

function* deleteAdviser(api, action) {
  const { adviserId } = action;
  // make the call to the api
  const apiCall = call(api.deleteAdviser, adviserId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(AdviserActions.adviserDeleteSuccess());
  } else {
    yield put(AdviserActions.adviserDeleteFailure(response.data));
  }
}

export default {
  getAllAdvisers,
  getAdviser,
  deleteAdviser,
  updateAdviser,
};
