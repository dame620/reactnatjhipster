import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ManagerActions from './manager.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import CompanyActions from '../company/company.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './manager-styles';

function ManagerEditScreen(props) {
  const {
    getManager,
    updateManager,
    route,
    manager,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllUsers,
    userList,
    getAllCompanies,
    companyList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getManager(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getManager, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(manager));
    }
  }, [manager, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllUsers();
    getAllCompanies();
  }, [getAllUsers, getAllCompanies]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('ManagerDetail', { entityId: manager?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateManager(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const registrationNumberRef = createRef();
  const departmentRef = createRef();
  const userRef = createRef();
  const companyRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="managerEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="registrationNumber"
              ref={registrationNumberRef}
              label="Numero de matricule"
              placeholder="Entrer le numero de matricule"
              testID="registrationNumberInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => departmentRef.current?.focus()}
            />
            <FormField
              name="department"
              ref={departmentRef}
              label="Department"
              placeholder="Entrer le Department"
              testID="departmentInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="user"
              inputType="select-one"
              ref={userRef}
              listItems={userList}
              listItemLabelField="login"
              label="User"
              placeholder="Select User"
              testID="userSelectInput"
            />
            <FormField
              name="company"
              inputType="select-one"
              ref={companyRef}
              listItems={companyList}
              listItemLabelField="name"
              label="ENTREPRISE"
              placeholder="SELECTIONNER L'ENTREPRISE"
              testID="companySelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    registrationNumber: value.registrationNumber ?? null,
    department: value.department ?? null,
    user: value.user && value.user.id ? value.user.id : null,
    company: value.company && value.company.id ? value.company.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    registrationNumber: value.registrationNumber ?? null,
    department: value.department ?? null,
  };
  entity.user = value.user ? { id: value.user } : null;
  entity.company = value.company ? { id: value.company } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.userList ?? [],
    companyList: state.companies.companyList ?? [],
    manager: state.managers.manager,
    fetching: state.managers.fetchingOne,
    updating: state.managers.updating,
    updateSuccess: state.managers.updateSuccess,
    errorUpdating: state.managers.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getAllCompanies: (options) => dispatch(CompanyActions.companyAllRequest(options)),
    getManager: (id) => dispatch(ManagerActions.managerRequest(id)),
    getAllManagers: (options) => dispatch(ManagerActions.managerAllRequest(options)),
    updateManager: (manager) => dispatch(ManagerActions.managerUpdateRequest(manager)),
    reset: () => dispatch(ManagerActions.managerReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerEditScreen);
