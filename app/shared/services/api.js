// a library to wrap and simplify api calls
import apisauce from 'apisauce';

import AppConfig from '../../config/app-config';

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth);
  const removeAuthToken = () => api.deleteHeader('Authorization');
  const login = (userAuth) => api.post('api/authenticate', userAuth);
  const register = (user) => api.post('api/register', user);
  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    });

  const getAccount = () => api.get('api/account');
  const updateAccount = (account) => api.post('api/account', account);
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      { currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' } },
    );

  const getUser = (userId) => api.get('api/users/' + userId);
  const getAllUsers = (options) => api.get('api/users', options);
  const createUser = (user) => api.post('api/users', user);
  const updateUser = (user) => api.put('api/users', user);
  const deleteUser = (userId) => api.delete('api/users/' + userId);

  const getAppointment = (appointmentId) => api.get('api/appointments/' + appointmentId);
  const getAllAppointments = (options) => api.get('api/appointments', options);
  const createAppointment = (appointment) => api.post('api/appointments', appointment);
  const updateAppointment = (appointment) => api.put(`api/appointments/${appointment.id}`, appointment);
  const deleteAppointment = (appointmentId) => api.delete('api/appointments/' + appointmentId);

  const getManager = (managerId) => api.get('api/managers/' + managerId);
  const getAllManagers = (options) => api.get('api/managers', options);
  const createManager = (manager) => api.post('api/managers', manager);
  const updateManager = (manager) => api.put(`api/managers/${manager.id}`, manager);
  const deleteManager = (managerId) => api.delete('api/managers/' + managerId);

  const getCompany = (companyId) => api.get('api/companies/' + companyId);
  const getAllCompanies = (options) => api.get('api/companies', options);
  const createCompany = (company) => api.post('api/companies', company);
  const updateCompany = (company) => api.put(`api/companies/${company.id}`, company);
  const deleteCompany = (companyId) => api.delete('api/companies/' + companyId);

  const getBank = (bankId) => api.get('api/banks/' + bankId);
  const getAllBanks = (options) => api.get('api/banks', options);
  const createBank = (bank) => api.post('api/banks', bank);
  const updateBank = (bank) => api.put(`api/banks/${bank.id}`, bank);
  const deleteBank = (bankId) => api.delete('api/banks/' + bankId);

  const getAdviser = (adviserId) => api.get('api/advisers/' + adviserId);
  const getAllAdvisers = (options) => api.get('api/advisers', options);
  const createAdviser = (adviser) => api.post('api/advisers', adviser);
  const updateAdviser = (adviser) => api.put(`api/advisers/${adviser.id}`, adviser);
  const deleteAdviser = (adviserId) => api.delete('api/advisers/' + adviserId);
  // jhipster-react-native-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getAllUsers,
    getUser,
    deleteUser,

    createAppointment,
    updateAppointment,
    getAllAppointments,
    getAppointment,
    deleteAppointment,

    createManager,
    updateManager,
    getAllManagers,
    getManager,
    deleteManager,

    createCompany,
    updateCompany,
    getAllCompanies,
    getCompany,
    deleteCompany,

    createBank,
    updateBank,
    getAllBanks,
    getBank,
    deleteBank,

    createAdviser,
    updateAdviser,
    getAllAdvisers,
    getAdviser,
    deleteAdviser,
    // jhipster-react-native-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
