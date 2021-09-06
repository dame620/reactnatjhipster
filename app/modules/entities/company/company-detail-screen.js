import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import CompanyActions from './company.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import CompanyDeleteModal from './company-delete-modal';
import styles from './company-styles';

function CompanyDetailScreen(props) {
  const { route, getCompany, navigation, company, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = company?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Company');
      } else {
        setDeleteModalVisible(false);
        getCompany(routeEntityId);
      }
    }, [routeEntityId, getCompany, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Company.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="companyDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{company.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>NOM:</Text>
      <Text testID="name">{company.name}</Text>
      {/* Ninea Field */}
      <Text style={styles.label}>NINEA:</Text>
      <Text testID="ninea">{company.ninea}</Text>
      {/* Rc Field */}
      <Text style={styles.label}>RC:</Text>
      <Text testID="rc">{company.rc}</Text>
      {/* Address Field */}
      <Text style={styles.label}>ADRESSE:</Text>
      <Text testID="address">{company.address}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('CompanyEdit', { entityId })}
          accessibilityLabel={'Company Edit Button'}
          testID="companyEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Company Delete Button'}
          testID="companyDeleteButton"
        />
        {deleteModalVisible && (
          <CompanyDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={company}
            testID="companyDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    company: state.companies.company,
    error: state.companies.errorOne,
    fetching: state.companies.fetchingOne,
    deleting: state.companies.deleting,
    errorDeleting: state.companies.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCompany: (id) => dispatch(CompanyActions.companyRequest(id)),
    getAllCompanies: (options) => dispatch(CompanyActions.companyAllRequest(options)),
    deleteCompany: (id) => dispatch(CompanyActions.companyDeleteRequest(id)),
    resetCompanies: () => dispatch(CompanyActions.companyReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetailScreen);
