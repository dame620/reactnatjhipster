import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import BankActions from './bank.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import BankDeleteModal from './bank-delete-modal';
import styles from './bank-styles';

function BankDetailScreen(props) {
  const { route, getBank, navigation, bank, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = bank?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Bank');
      } else {
        setDeleteModalVisible(false);
        getBank(routeEntityId);
      }
    }, [routeEntityId, getBank, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Bank.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="bankDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{bank.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{bank.name}</Text>
      {/* Address Field */}
      <Text style={styles.label}>Address:</Text>
      <Text testID="address">{bank.address}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('BankEdit', { entityId })}
          accessibilityLabel={'Bank Edit Button'}
          testID="bankEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Bank Delete Button'}
          testID="bankDeleteButton"
        />
        {deleteModalVisible && (
          <BankDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={bank}
            testID="bankDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    bank: state.banks.bank,
    error: state.banks.errorOne,
    fetching: state.banks.fetchingOne,
    deleting: state.banks.deleting,
    errorDeleting: state.banks.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBank: (id) => dispatch(BankActions.bankRequest(id)),
    getAllBanks: (options) => dispatch(BankActions.bankAllRequest(options)),
    deleteBank: (id) => dispatch(BankActions.bankDeleteRequest(id)),
    resetBanks: () => dispatch(BankActions.bankReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BankDetailScreen);
