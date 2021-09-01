import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';
import FixtureAPI from '../services/fixture-api';
import AppConfig from '../../config/app-config';

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer';
import { LoginTypes } from '../../modules/login/login.reducer';
import { AccountTypes } from '../../shared/reducers/account.reducer';
import { RegisterTypes } from '../../modules/account/register/register.reducer';
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer';
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer';
import { UserTypes } from '../../shared/reducers/user.reducer';
import { AppointmentTypes } from '../../modules/entities/appointment/appointment.reducer';
import { ManagerTypes } from '../../modules/entities/manager/manager.reducer';
import { CompanyTypes } from '../../modules/entities/company/company.reducer';
import { BankTypes } from '../../modules/entities/bank/bank.reducer';
import { AdviserTypes } from '../../modules/entities/adviser/adviser.reducer';
// jhipster-react-native-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga';
import { login, logout, loginLoad } from '../../modules/login/login.sagas';
import { register } from '../../modules/account/register/register.sagas';
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas';
import { changePassword } from '../../modules/account/password/change-password.sagas';
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas';
import UserSagas from '../../shared/sagas/user.sagas';
import AppointmentSagas from '../../modules/entities/appointment/appointment.sagas';
import ManagerSagas from '../../modules/entities/manager/manager.sagas';
import CompanySagas from '../../modules/entities/company/company.sagas';
import BankSagas from '../../modules/entities/bank/bank.sagas';
import AdviserSagas from '../../modules/entities/adviser/adviser.sagas';
// jhipster-react-native-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = AppConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(AppointmentTypes.APPOINTMENT_REQUEST, AppointmentSagas.getAppointment, api),
    takeLatest(AppointmentTypes.APPOINTMENT_ALL_REQUEST, AppointmentSagas.getAllAppointments, api),
    takeLatest(AppointmentTypes.APPOINTMENT_UPDATE_REQUEST, AppointmentSagas.updateAppointment, api),
    takeLatest(AppointmentTypes.APPOINTMENT_DELETE_REQUEST, AppointmentSagas.deleteAppointment, api),

    takeLatest(ManagerTypes.MANAGER_REQUEST, ManagerSagas.getManager, api),
    takeLatest(ManagerTypes.MANAGER_ALL_REQUEST, ManagerSagas.getAllManagers, api),
    takeLatest(ManagerTypes.MANAGER_UPDATE_REQUEST, ManagerSagas.updateManager, api),
    takeLatest(ManagerTypes.MANAGER_DELETE_REQUEST, ManagerSagas.deleteManager, api),

    takeLatest(CompanyTypes.COMPANY_REQUEST, CompanySagas.getCompany, api),
    takeLatest(CompanyTypes.COMPANY_ALL_REQUEST, CompanySagas.getAllCompanies, api),
    takeLatest(CompanyTypes.COMPANY_UPDATE_REQUEST, CompanySagas.updateCompany, api),
    takeLatest(CompanyTypes.COMPANY_DELETE_REQUEST, CompanySagas.deleteCompany, api),

    takeLatest(BankTypes.BANK_REQUEST, BankSagas.getBank, api),
    takeLatest(BankTypes.BANK_ALL_REQUEST, BankSagas.getAllBanks, api),
    takeLatest(BankTypes.BANK_UPDATE_REQUEST, BankSagas.updateBank, api),
    takeLatest(BankTypes.BANK_DELETE_REQUEST, BankSagas.deleteBank, api),

    takeLatest(AdviserTypes.ADVISER_REQUEST, AdviserSagas.getAdviser, api),
    takeLatest(AdviserTypes.ADVISER_ALL_REQUEST, AdviserSagas.getAllAdvisers, api),
    takeLatest(AdviserTypes.ADVISER_UPDATE_REQUEST, AdviserSagas.updateAdviser, api),
    takeLatest(AdviserTypes.ADVISER_DELETE_REQUEST, AdviserSagas.deleteAdviser, api),
    // jhipster-react-native-saga-redux-connect-needle

    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(UserTypes.USER_REQUEST, UserSagas.getUser, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, UserSagas.updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, UserSagas.deleteUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, UserSagas.getAllUsers, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ]);
}
