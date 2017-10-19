import Search from 'routes/Search';
import { connect } from 'react-redux';
import { gql, withApollo } from 'react-apollo';
import { set } from 'abyss-form/lib/actions';

const mapStateToProps = state => ({
  searchForm: state.forms.search
});

const mapDispatchToProps = dispatch => ({
  setSearchForm: val => dispatch(set('search.search', val))
});

export const ALL_STORIES_SEARCH_QUERY = gql`
  query AllStoriesSearchQuery($searchText: String!) {
    allStories(
      filter: {
        published: true
        OR: [{ titleText_contains: $searchText }, { description_contains: $searchText }]
      }
      orderBy: titleText_ASC
    ) {
      id
      updatedAt
      published
      titleText
      titleDelta
      bodyDelta
      description
      tags {
        id
        key
      }
      author {
        id
        userName
      }
    }
    allUsers(
      filter: { OR: [{ userName_starts_with: $searchText }, { fullName_starts_with: $searchText }] }
      first: 10
      orderBy: userName_ASC
    ) {
      id
      userName
      fullName
      photoURL
    }
  }
`;

const ConnectedSearch = connect(mapStateToProps, mapDispatchToProps)(Search);

export default withApollo(ConnectedSearch);