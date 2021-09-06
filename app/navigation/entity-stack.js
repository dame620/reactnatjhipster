import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { DrawerButton } from './drawer/drawer-button';
import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens
import EntitiesScreen from '../modules/entities/entities-screen';
import AppointmentScreen from '../modules/entities/appointment/appointment-screen';
import AppointmentDetailScreen from '../modules/entities/appointment/appointment-detail-screen';
import AppointmentEditScreen from '../modules/entities/appointment/appointment-edit-screen';
import ManagerScreen from '../modules/entities/manager/manager-screen';
import ManagerDetailScreen from '../modules/entities/manager/manager-detail-screen';
import ManagerEditScreen from '../modules/entities/manager/manager-edit-screen';
import CompanyScreen from '../modules/entities/company/company-screen';
import CompanyDetailScreen from '../modules/entities/company/company-detail-screen';
import CompanyEditScreen from '../modules/entities/company/company-edit-screen';
import BankScreen from '../modules/entities/bank/bank-screen';
import BankDetailScreen from '../modules/entities/bank/bank-detail-screen';
import BankEditScreen from '../modules/entities/bank/bank-edit-screen';
import AdviserScreen from '../modules/entities/adviser/adviser-screen';
import AdviserDetailScreen from '../modules/entities/adviser/adviser-detail-screen';
import AdviserEditScreen from '../modules/entities/adviser/adviser-edit-screen';
// jhipster-react-native-navigation-import-needle

export const entityScreens = [
  {
    name: 'Entities',
    route: '',
    component: EntitiesScreen,
    options: {
      headerLeft: DrawerButton,
      title: 'TACHES',
    },
  },
  {
    name: 'Appointment',
    route: 'appointment',
    component: AppointmentScreen,
    options: {
      title: 'RENDEZ VOUS',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('AppointmentEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'AppointmentDetail',
    route: 'appointment/detail',
    component: AppointmentDetailScreen,
    options: { title: 'DETAIL DU RENDEZ VOUS', headerLeft: () => <HeaderBackButton onPress={() => navigate('Appointment')} /> },
  },
  {
    name: 'AppointmentEdit',
    route: 'appointment/edit',
    component: AppointmentEditScreen,
    options: {
      title: 'MODIFIER LE RENDEZ VOUS',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('AppointmentDetail', 'Appointment')} />,
    },
  },
  {
    name: 'Manager',
    route: 'manager',
    component: ManagerScreen,
    options: {
      title: 'GERANT',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ManagerEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ManagerDetail',
    route: 'manager/detail',
    component: ManagerDetailScreen,
    options: { title: 'DETAIL DU GERANT', headerLeft: () => <HeaderBackButton onPress={() => navigate('Manager')} /> },
  },
  {
    name: 'ManagerEdit',
    route: 'manager/edit',
    component: ManagerEditScreen,
    options: {
      title: 'MODIFIER LE GERANT',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ManagerDetail', 'Manager')} />,
    },
  },
  {
    name: 'Company',
    route: 'company',
    component: CompanyScreen,
    options: {
      title: 'ENTREPRISES',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('CompanyEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'CompanyDetail',
    route: 'company/detail',
    component: CompanyDetailScreen,
    options: { title: 'DETAIL ENTREPRISE', headerLeft: () => <HeaderBackButton onPress={() => navigate('Company')} /> },
  },
  {
    name: 'CompanyEdit',
    route: 'company/edit',
    component: CompanyEditScreen,
    options: {
      title: 'MODIFIER ENTREPRISE',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CompanyDetail', 'Company')} />,
    },
  },
  {
    name: 'Bank',
    route: 'bank',
    component: BankScreen,
    options: {
      title: 'BANQUE',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('BankEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'BankDetail',
    route: 'bank/detail',
    component: BankDetailScreen,
    options: { title: 'DETAIL DE LA BANQUE', headerLeft: () => <HeaderBackButton onPress={() => navigate('Bank')} /> },
  },
  {
    name: 'BankEdit',
    route: 'bank/edit',
    component: BankEditScreen,
    options: { title: 'MODIFIER', headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('BankDetail', 'Bank')} /> },
  },
  {
    name: 'Adviser',
    route: 'adviser',
    component: AdviserScreen,
    options: {
      title: 'CONSEILLERS',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('AdviserEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'AdviserDetail',
    route: 'adviser/detail',
    component: AdviserDetailScreen,
    options: { title: 'DETAIL DU CONSEILLER', headerLeft: () => <HeaderBackButton onPress={() => navigate('Adviser')} /> },
  },
  {
    name: 'AdviserEdit',
    route: 'adviser/edit',
    component: AdviserEditScreen,
    options: {
      title: 'MODIFIER LE CONSEILLER',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('AdviserDetail', 'Adviser')} />,
    },
  },
  // jhipster-react-native-navigation-declaration-needle
];

export const getEntityRoutes = () => {
  const routes = {};
  entityScreens.forEach((screen) => {
    routes[screen.name] = screen.route;
  });
  return routes;
};

const EntityStack = createStackNavigator();

export default function EntityStackScreen() {
  return (
    <EntityStack.Navigator>
      {entityScreens.map((screen, index) => {
        return <EntityStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
      })}
    </EntityStack.Navigator>
  );
}
