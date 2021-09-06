import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import BankActions from './bank.reducer';
import styles from './bank-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function BankScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { bank, bankList, getAllBanks, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Bank entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchBanks();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [bank, fetchBanks]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('BankDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>NOM: {item.name}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Banks Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchBanks = React.useCallback(() => {
    getAllBanks({ page: page - 1, sort, size });
  }, [getAllBanks, page, sort, size]);

  const handleLoadMore = () => {
    if (bankList.length) {
      return;
    }
    setPage(page + 1);
    fetchBanks();
  };
  return (
    <View style={styles.container} testID="bankScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={bankList}
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
    bankList: state.banks.bankList,
    bank: state.banks.bank,
    fetching: state.banks.fetchingAll,
    error: state.banks.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllBanks: (options) => dispatch(BankActions.bankAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BankScreen);
