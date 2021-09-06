import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import AdviserActions from './adviser.reducer';

import styles from './adviser-styles';

function AdviserDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteAdviser(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Adviser');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Supprimer Conseiller {entity.id}?</Text>
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
    adviser: state.advisers.adviser,
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

export default connect(mapStateToProps, mapDispatchToProps)(AdviserDeleteModal);
