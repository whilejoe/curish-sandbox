import React, { Component } from 'react';
import { connect } from 'react-redux';
import { gql, withApollo } from 'react-apollo';
import qs from 'qs';
import StoryContainer from 'components/StoryContainer';
import InputGroup from 'components/InputGroup';
import ListStory from 'components/ListStory';
import { set, reset } from 'abyss-form/lib/actions';

class StorySearch extends Component {
  state = {
    stories: []
  };

  componentWillMount() {
    if (this.props.location.search) {
      this._executeSearch(this.props.location.search);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search && nextProps.location.search) {
      this._executeSearch(nextProps.location.search);
    }
  }

  handleKeyDown = e => {
    if (e && (e.keyCode === 9 || e.keyCode === 13)) {
      console.log('e', e.target.value);
      // this._executeSearch();
      // console.log('this.props', this.props);
      // this.props.history.push({
      //   pathname: '/search',
      //   search: `q=${e.target.value}`
      // });
    }
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const query = { q: this.props.storySearchForm.model.search };
    const str = qs.stringify(query);
    this.props.history.push({
      pathname: '/search',
      search: str
    });
  };

  render() {
    return (
      <StoryContainer>
        <h1>Search Stories</h1>
        <form onSubmit={this.handleOnSubmit}>
          <InputGroup
            autoFocus
            id="search"
            label="Search Stories"
            hideLabel
            type="text"
            model="storySearch.search"
            placeholder="Search titles, tags, descriptions"
            // onKeyDown={e => this.handleKeyDown(e)}
          />
        </form>
        {this.state.stories.map(story => (
          <ListStory key={story.id} story={story} referrer={this.props.location} />
        ))}
      </StoryContainer>
    );
  }

  _executeSearch = async queryString => {
    const query = qs.parse(queryString, { ignoreQueryPrefix: true });
    if (query.q) {
      this.props.setSearchForm(query.q);
      const result = await this.props.client.query({
        query: ALL_STORIES_SEARCH_QUERY,
        variables: { searchText: query.q }
      });
      console.log('story search result', result);
      const stories = result.data.allStories;
      this.setState({ stories });
    }
  };
}

const ALL_STORIES_SEARCH_QUERY = gql`
  query AllStoriesSearchQuery($searchText: String!) {
    allStories(
      filter: { OR: [{ title_contains: $searchText }, { description_contains: $searchText }] }
      first: 10
      orderBy: title_ASC
    ) {
      id
      title
      description
      tags
      author {
        id
        userName
      }
    }
  }
`;

const mapStateToProps = state => ({
  storySearchForm: state.forms.storySearch
});

const mapDispatchToProps = dispatch => ({
  setSearchForm: val => dispatch(set('storySearch.search', val)),
  clearSearchForm: dispatch(reset('storySearch.search'))
});

const ConnectedStorySearch = connect(mapStateToProps, mapDispatchToProps)(StorySearch);

export default withApollo(ConnectedStorySearch);
