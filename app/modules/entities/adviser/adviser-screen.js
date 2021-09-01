import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AdviserActions from './adviser.reducer';
import styles from './adviser-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function AdviserScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { adviser, adviserList, getAllAdvisers, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Adviser entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchAdvisers();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [adviser, fetchAdvisers]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('AdviserDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Advisers Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchAdvisers = React.useCallback(() => {
    getAllAdvisers({ page: page - 1, sort, size });
  }, [getAllAdvisers, page, sort, size]);

  const handleLoadMore = () => {
    if (page < props.links.next || props.links.next === undefined || fetching) {
      return;
    }
    setPage(page + 1);
    fetchAdvisers();
  };
  return (
    <View style={styles.container} testID="adviserScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={adviserList}
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
    adviserList: state.advisers.adviserList,
    adviser: state.advisers.adviser,
    fetching: state.advisers.fetchingAll,
    error: state.advisers.errorAll,
    links: state.advisers.links,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAdvisers: (options) => dispatch(AdviserActions.adviserAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdviserScreen);
