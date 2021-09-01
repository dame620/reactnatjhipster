export default {
  // Functions return fixtures

  // entity fixtures
  updateAppointment: (appointment) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-appointment.json'),
    };
  },
  getAllAppointments: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-appointments.json'),
    };
  },
  getAppointment: (appointmentId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-appointment.json'),
    };
  },
  deleteAppointment: (appointmentId) => {
    return {
      ok: true,
    };
  },
  updateManager: (manager) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-manager.json'),
    };
  },
  getAllManagers: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-managers.json'),
    };
  },
  getManager: (managerId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-manager.json'),
    };
  },
  deleteManager: (managerId) => {
    return {
      ok: true,
    };
  },
  updateCompany: (company) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-company.json'),
    };
  },
  getAllCompanies: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-companies.json'),
    };
  },
  getCompany: (companyId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-company.json'),
    };
  },
  deleteCompany: (companyId) => {
    return {
      ok: true,
    };
  },
  updateBank: (bank) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-bank.json'),
    };
  },
  getAllBanks: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-banks.json'),
    };
  },
  getBank: (bankId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-bank.json'),
    };
  },
  deleteBank: (bankId) => {
    return {
      ok: true,
    };
  },
  updateAdviser: (adviser) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-adviser.json'),
    };
  },
  getAllAdvisers: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-advisers.json'),
    };
  },
  getAdviser: (adviserId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-adviser.json'),
    };
  },
  deleteAdviser: (adviserId) => {
    return {
      ok: true,
    };
  },
  // jhipster-react-native-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    };
  },
  getAllUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    };
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    };
  },
  deleteUser: (userId) => {
    return {
      ok: true,
    };
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      };
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      };
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      };
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    };
  },
  updateAccount: () => {
    return {
      ok: true,
    };
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Password error',
      };
    }
  },
};
