import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ManagerActions from './manager.reducer';
import styles from './manager-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ManagerScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { manager, managerList, getAllManagers, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Manager entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchManagers();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [manager, fetchManagers]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ManagerDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Managers Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchManagers = React.useCallback(() => {
    getAllManagers({ page: page - 1, sort, size });
  }, [getAllManagers, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchManagers();
  };
  return (
    <View style={styles.container} testID="managerScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={managerList}
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
    managerList: state.managers.managerList,
    manager: state.managers.manager,
    fetching: state.managers.fetchingAll,
    error: state.managers.errorAll,
    links: state.managers.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllManagers: (options) => dispatch(ManagerActions.managerAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerScreen);
