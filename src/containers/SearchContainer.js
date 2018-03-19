import Search from 'routes/Search';
import { connect } from 'react-redux';
import { withApollo } from 'react-apollo';
import { set, reset } from 'abyss-form/lib/actions';

const mapStateToProps = state => ({
  searchForm: state.forms.search.model
});

const mapDispatchToProps = dispatch => ({
  setSearchForm: val => dispatch(set('search.search', val)),
  clearSearchForm: () => dispatch(reset('search'))
});

const ConnectedSearch = connect(mapStateToProps, mapDispatchToProps)(Search);

export default withApollo(ConnectedSearch);
