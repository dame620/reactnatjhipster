import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import BankActions from './bank.reducer';

import styles from './bank-styles';

function BankDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteBank(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Bank');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Supprimer la Bank {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Annuler</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Supprimer</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    bank: state.banks.bank,
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

export default connect(mapStateToProps, mapDispatchToProps)(BankDeleteModal);
