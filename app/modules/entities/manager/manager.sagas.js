import { call, put } from 'redux-saga/effects';
import { callApi } from '../../../shared/sagas/call-api.saga';
import ManagerActions from './manager.reducer';

function* getManager(api, action) {
  const { managerId } = action;
  // make the call to the api
  const apiCall = call(api.getManager, managerId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ManagerActions.managerSuccess(response.data));
  } else {
    yield put(ManagerActions.managerFailure(response.data));
  }
}

function* getAllManagers(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getAllManagers, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ManagerActions.managerAllSuccess(response.data, response.headers));
  } else {
    yield put(ManagerActions.managerAllFailure(response.data));
  }
}

function* updateManager(api, action) {
  const { manager } = action;
  // make the call to the api
  const idIsNotNull = !(manager.id === null || manager.id === undefined);
  const apiCall = call(idIsNotNull ? api.updateManager : api.createManager, manager);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ManagerActions.managerUpdateSuccess(response.data));
  } else {
    yield put(ManagerActions.managerUpdateFailure(response.data));
  }
}

function* deleteManager(api, action) {
  const { managerId } = action;
  // make the call to the api
  const apiCall = call(api.deleteManager, managerId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(ManagerActions.managerDeleteSuccess());
  } else {
    yield put(ManagerActions.managerDeleteFailure(response.data));
  }
}

export default {
  getAllManagers,
  getManager,
  deleteManager,
  updateManager,
};
