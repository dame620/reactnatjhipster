import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import AppointmentActions from './appointment.reducer';

import styles from './appointment-styles';

function AppointmentDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteAppointment(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Appointment');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Appointment {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    appointment: state.appointments.appointment,
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

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDeleteModal);
