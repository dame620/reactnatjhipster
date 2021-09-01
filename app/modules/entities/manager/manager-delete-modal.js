import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ManagerActions from './manager.reducer';

import styles from './manager-styles';

function ManagerDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteManager(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Manager');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Manager {entity.id}?</Text>
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
    manager: state.managers.manager,
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDeleteModal);
