import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CompanyActions from './company.reducer';

import styles from './company-styles';

function CompanyDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteCompany(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Company');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Company {entity.id}?</Text>
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
    company: state.companies.company,
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDeleteModal);
