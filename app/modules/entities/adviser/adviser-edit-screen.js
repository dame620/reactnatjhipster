import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import AdviserActions from './adviser.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import BankActions from '../bank/bank.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './adviser-styles';

function AdviserEditScreen(props) {
  const {
    getAdviser,
    updateAdviser,
    route,
    adviser,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllUsers,
    userList,
    getAllBanks,
    bankList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getAdviser(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getAdviser, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(adviser));
    }
  }, [adviser, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllUsers();
    getAllBanks();
  }, [getAllUsers, getAllBanks]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('AdviserDetail', { entityId: adviser?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateAdviser(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const registrationNumberRef = createRef();
  const companyRef = createRef();
  const departmentRef = createRef();
  const userRef = createRef();
  const bankRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="adviserEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="registrationNumber"
              ref={registrationNumberRef}
              label="Registration Number"
              placeholder="Enter Registration Number"
              testID="registrationNumberInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => companyRef.current?.focus()}
            />
            <FormField
              name="company"
              ref={companyRef}
              label="Company"
              placeholder="Enter Company"
              testID="companyInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => departmentRef.current?.focus()}
            />
            <FormField
              name="department"
              ref={departmentRef}
              label="Department"
              placeholder="Enter Department"
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
              name="bank"
              inputType="select-one"
              ref={bankRef}
              listItems={bankList}
              listItemLabelField="name"
              label="Bank"
              placeholder="Select Bank"
              testID="bankSelectInput"
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
    company: value.company ?? null,
    department: value.department ?? null,
    user: value.user && value.user.id ? value.user.id : null,
    bank: value.bank && value.bank.id ? value.bank.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    registrationNumber: value.registrationNumber ?? null,
    company: value.company ?? null,
    department: value.department ?? null,
  };
  entity.user = value.user ? { id: value.user } : null;
  entity.bank = value.bank ? { id: value.bank } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.userList ?? [],
    bankList: state.banks.bankList ?? [],
    adviser: state.advisers.adviser,
    fetching: state.advisers.fetchingOne,
    updating: state.advisers.updating,
    updateSuccess: state.advisers.updateSuccess,
    errorUpdating: state.advisers.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getAllBanks: (options) => dispatch(BankActions.bankAllRequest(options)),
    getAdviser: (id) => dispatch(AdviserActions.adviserRequest(id)),
    getAllAdvisers: (options) => dispatch(AdviserActions.adviserAllRequest(options)),
    updateAdviser: (adviser) => dispatch(AdviserActions.adviserUpdateRequest(adviser)),
    reset: () => dispatch(AdviserActions.adviserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdviserEditScreen);
