import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ManagerActions from './manager.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ManagerDeleteModal from './manager-delete-modal';
import styles from './manager-styles';

function ManagerDetailScreen(props) {
  const { route, getManager, navigation, manager, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = manager?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Manager');
      } else {
        setDeleteModalVisible(false);
        getManager(routeEntityId);
      }
    }, [routeEntityId, getManager, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Manager.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="managerDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{manager.id}</Text>
      {/* RegistrationNumber Field */}
      <Text style={styles.label}>RegistrationNumber:</Text>
      <Text testID="registrationNumber">{manager.registrationNumber}</Text>
      {/* Department Field */}
      <Text style={styles.label}>Department:</Text>
      <Text testID="department">{manager.department}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(manager.user ? manager.user.login : '')}</Text>
      <Text style={styles.label}>Company:</Text>
      <Text testID="company">{String(manager.company ? manager.company.name : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ManagerEdit', { entityId })}
          accessibilityLabel={'Manager Edit Button'}
          testID="managerEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Manager Delete Button'}
          testID="managerDeleteButton"
        />
        {deleteModalVisible && (
          <ManagerDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={manager}
            testID="managerDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    manager: state.managers.manager,
    error: state.managers.errorOne,
    fetching: state.managers.fetchingOne,
    deleting: state.managers.deleting,
    errorDeleting: state.managers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getManager: (id) => dispatch(ManagerActions.managerRequest(id)),
    getAllManagers: (options) => dispatch(ManagerActions.managerAllRequest(options)),
    deleteManager: (id) => dispatch(ManagerActions.managerDeleteRequest(id)),
    resetManagers: () => dispatch(ManagerActions.managerReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDetailScreen);
