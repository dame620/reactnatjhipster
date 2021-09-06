import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import AppointmentActions from './appointment.reducer';
import AdviserActions from '../adviser/adviser.reducer';
import ManagerActions from '../manager/manager.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './appointment-styles';

function AppointmentEditScreen(props) {
  const {
    getAppointment,
    updateAppointment,
    route,
    appointment,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllAdvisers,
    adviserList,
    getAllManagers,
    managerList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getAppointment(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getAppointment, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(appointment));
    }
  }, [appointment, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllAdvisers();
    getAllManagers();
  }, [getAllAdvisers, getAllManagers]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('AppointmentDetail', { entityId: appointment?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateAppointment(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const reasonRef = createRef();
  const dateRef = createRef();
  const stateRef = createRef();
  const reportreasonRef = createRef();
  const adviserRef = createRef();
  const managerRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="appointmentEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="reason"
              ref={reasonRef}
              label="MOTIF DU RENDEZ VOUS"
              placeholder="Entrer le motif du rendez vous"
              testID="reasonInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => dateRef.current?.focus()}
            />
            <FormField
              name="date"
              ref={dateRef}
              label="Date"
              placeholder="Entrer la  Date"
              testID="dateInput"
              inputType="datetime"
              onSubmitEditing={() => stateRef.current?.focus()}
            />
            <FormField
              name="ETAT RENDEZ VOUS"
              ref={stateRef}
              label="State"
              placeholder="Entrer état du rendez vous"
              testID="stateInput"
              inputType="boolean"
              onSubmitEditing={() => reportreasonRef.current?.focus()}
            />
            <FormField
              name="reportreason"
              ref={reportreasonRef}
              label="RAISON DU REPPORT"
              placeholder="ENTRER LA RAISON DU REPPORT"
              testID="reportreasonInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="adviser"
              inputType="select-one"
              ref={adviserRef}
              listItems={adviserList}
              listItemLabelField="registrationNumber"
              label="CONSEILLER"
              placeholder="SELECTIONNER LE CONSEILLER"
              testID="adviserSelectInput"
            />
            <FormField
              name="manager"
              inputType="select-one"
              ref={managerRef}
              listItems={managerList}
              listItemLabelField="registrationNumber"
              label="GERANT"
              placeholder="SELECTIONNER LE GERANT"
              testID="managerSelectInput"
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
    reason: value.reason ?? null,
    date: value.date ?? null,
    state: value.state ?? null,
    reportreason: value.reportreason ?? null,
    adviser: value.adviser && value.adviser.id ? value.adviser.id : null,
    manager: value.manager && value.manager.id ? value.manager.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    reason: value.reason ?? null,
    date: value.date ?? null,
    state: value.state === null ? false : Boolean(value.state),
    reportreason: value.reportreason ?? null,
  };
  entity.adviser = value.adviser ? { id: value.adviser } : null;
  entity.manager = value.manager ? { id: value.manager } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    adviserList: state.advisers.adviserList ?? [],
    managerList: state.managers.managerList ?? [],
    appointment: state.appointments.appointment,
    fetching: state.appointments.fetchingOne,
    updating: state.appointments.updating,
    updateSuccess: state.appointments.updateSuccess,
    errorUpdating: state.appointments.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAdvisers: (options) => dispatch(AdviserActions.adviserAllRequest(options)),
    getAllManagers: (options) => dispatch(ManagerActions.managerAllRequest(options)),
    getAppointment: (id) => dispatch(AppointmentActions.appointmentRequest(id)),
    getAllAppointments: (options) => dispatch(AppointmentActions.appointmentAllRequest(options)),
    updateAppointment: (appointment) => dispatch(AppointmentActions.appointmentUpdateRequest(appointment)),
    reset: () => dispatch(AppointmentActions.appointmentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentEditScreen);
