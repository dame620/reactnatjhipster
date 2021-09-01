import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import AppointmentActions from './appointment.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import AppointmentDeleteModal from './appointment-delete-modal';
import styles from './appointment-styles';

function AppointmentDetailScreen(props) {
  const { route, getAppointment, navigation, appointment, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = appointment?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Appointment');
      } else {
        setDeleteModalVisible(false);
        getAppointment(routeEntityId);
      }
    }, [routeEntityId, getAppointment, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Appointment.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="appointmentDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{appointment.id}</Text>
      {/* Reason Field */}
      <Text style={styles.label}>Reason:</Text>
      <Text testID="reason">{appointment.reason}</Text>
      {/* Date Field */}
      <Text style={styles.label}>Date:</Text>
      <Text testID="date">{String(appointment.date)}</Text>
      {/* State Field */}
      <Text style={styles.label}>State:</Text>
      <Text testID="state">{String(appointment.state)}</Text>
      {/* Reportreason Field */}
      <Text style={styles.label}>Reportreason:</Text>
      <Text testID="reportreason">{appointment.reportreason}</Text>
      <Text style={styles.label}>Adviser:</Text>
      <Text testID="adviser">{String(appointment.adviser ? appointment.adviser.registrationNumber : '')}</Text>
      <Text style={styles.label}>Manager:</Text>
      <Text testID="manager">{String(appointment.manager ? appointment.manager.registrationNumber : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('AppointmentEdit', { entityId })}
          accessibilityLabel={'Appointment Edit Button'}
          testID="appointmentEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Appointment Delete Button'}
          testID="appointmentDeleteButton"
        />
        {deleteModalVisible && (
          <AppointmentDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={appointment}
            testID="appointmentDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    appointment: state.appointments.appointment,
    error: state.appointments.errorOne,
    fetching: state.appointments.fetchingOne,
    deleting: state.appointments.deleting,
    errorDeleting: state.appointments.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAppointment: (id) => dispatch(AppointmentActions.appointmentRequest(id)),
    getAllAppointments: (options) => dispatch(AppointmentActions.appointmentAllRequest(options)),
    deleteAppointment: (id) => dispatch(AppointmentActions.appointmentDeleteRequest(id)),
    resetAppointments: () => dispatch(AppointmentActions.appointmentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetailScreen);
