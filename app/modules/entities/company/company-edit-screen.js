import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CompanyActions from './company.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './company-styles';

function CompanyEditScreen(props) {
  const { getCompany, updateCompany, route, company, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getCompany(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getCompany, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(company));
    }
  }, [company, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('CompanyDetail', { entityId: company?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateCompany(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nameRef = createRef();
  const nineaRef = createRef();
  const rcRef = createRef();
  const addressRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="companyEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="name"
              ref={nameRef}
              label="Name"
              placeholder="Enter Name"
              testID="nameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => nineaRef.current?.focus()}
            />
            <FormField
              name="ninea"
              ref={nineaRef}
              label="Ninea"
              placeholder="Enter Ninea"
              testID="nineaInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => rcRef.current?.focus()}
            />
            <FormField
              name="rc"
              ref={rcRef}
              label="Rc"
              placeholder="Enter Rc"
              testID="rcInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => addressRef.current?.focus()}
            />
            <FormField
              name="address"
              ref={addressRef}
              label="Address"
              placeholder="Enter Address"
              testID="addressInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => formRef.current?.submitForm()}
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
    name: value.name ?? null,
    ninea: value.ninea ?? null,
    rc: value.rc ?? null,
    address: value.address ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    ninea: value.ninea ?? null,
    rc: value.rc ?? null,
    address: value.address ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    company: state.companies.company,
    fetching: state.companies.fetchingOne,
    updating: state.companies.updating,
    updateSuccess: state.companies.updateSuccess,
    errorUpdating: state.companies.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompany: (id) => dispatch(CompanyActions.companyRequest(id)),
    getAllCompanies: (options) => dispatch(CompanyActions.companyAllRequest(options)),
    updateCompany: (company) => dispatch(CompanyActions.companyUpdateRequest(company)),
    reset: () => dispatch(CompanyActions.companyReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyEditScreen);
