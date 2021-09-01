import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AppointmentActions from './appointment.reducer';
import styles from './appointment-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function AppointmentScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { appointment, appointmentList, getAllAppointments, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Appointment entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchAppointments();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [appointment, fetchAppointments]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('AppointmentDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Appointments Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchAppointments = React.useCallback(() => {
    getAllAppointments({ page: page - 1, sort, size });
  }, [getAllAppointments, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchAppointments();
  };
  return (
    <View style={styles.container} testID="appointmentScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={appointmentList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    appointmentList: state.appointments.appointmentList,
    appointment: state.appointments.appointment,
    fetching: state.appointments.fetchingAll,
    error: state.appointments.errorAll,
    links: state.appointments.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAppointments: (options) => dispatch(AppointmentActions.appointmentAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentScreen);
