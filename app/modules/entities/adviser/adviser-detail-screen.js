import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import AdviserActions from './adviser.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import AdviserDeleteModal from './adviser-delete-modal';
import styles from './adviser-styles';

function AdviserDetailScreen(props) {
  const { route, getAdviser, navigation, adviser, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = adviser?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Adviser');
      } else {
        setDeleteModalVisible(false);
        getAdviser(routeEntityId);
      }
    }, [routeEntityId, getAdviser, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Adviser.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="adviserDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{adviser.id}</Text>
      {/* RegistrationNumber Field */}
      <Text style={styles.label}>NUMERO MATRICULE</Text>
      <Text testID="registrationNumber">{adviser.registrationNumber}</Text>
      {/* Company Field */}
      <Text style={styles.label}>ENTREPRISE</Text>
      <Text testID="company">{adviser.company}</Text>
      {/* Department Field */}
      <Text style={styles.label}>Department:</Text>
      <Text testID="department">{adviser.department}</Text>
      <Text style={styles.label}>User:</Text>
      <Text testID="user">{String(adviser.user ? adviser.user.login : '')}</Text>
      <Text style={styles.label}>BANQUE</Text>
      <Text testID="bank">{String(adviser.bank ? adviser.bank.name : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="MODIFIER"
          onPress={() => navigation.navigate('AdviserEdit', { entityId })}
          accessibilityLabel={'Adviser Edit Button'}
          testID="adviserEditButton"
        />
        <RoundedButton
          text="SUPPRIMER"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Adviser Delete Button'}
          testID="adviserDeleteButton"
        />
        {deleteModalVisible && (
          <AdviserDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={adviser}
            testID="adviserDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    adviser: state.advisers.adviser,
    error: state.advisers.errorOne,
    fetching: state.advisers.fetchingOne,
    deleting: state.advisers.deleting,
    errorDeleting: state.advisers.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAdviser: (id) => dispatch(AdviserActions.adviserRequest(id)),
    getAllAdvisers: (options) => dispatch(AdviserActions.adviserAllRequest(options)),
    deleteAdviser: (id) => dispatch(AdviserActions.adviserDeleteRequest(id)),
    resetAdvisers: () => dispatch(AdviserActions.adviserReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdviserDetailScreen);
