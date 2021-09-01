import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CompanyActions from './company.reducer';
import styles from './company-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function CompanyScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { company, companyList, getAllCompanies, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Company entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchCompanies();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [company, fetchCompanies]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CompanyDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Companies Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchCompanies = React.useCallback(() => {
    getAllCompanies({ page: page - 1, sort, size });
  }, [getAllCompanies, page, sort, size]);

  const handleLoadMore = () => {
    if (companyList.length) {
      return;
    }
    setPage(page + 1);
    fetchCompanies();
  };
  return (
    <View style={styles.container} testID="companyScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={companyList}
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
    companyList: state.companies.companyList,
    company: state.companies.company,
    fetching: state.companies.fetchingAll,
    error: state.companies.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCompanies: (options) => dispatch(CompanyActions.companyAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyScreen);
