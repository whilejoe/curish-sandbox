import React, { Component } from 'react';
import { gql, withApollo } from 'react-apollo';
import qs from 'qs';
import Container from 'components/Container';
import StatelessInput from 'components/StatelessInput';
import ListStory from 'components/ListStory';

class StorySearch extends Component {
  state = {
    stories: [],
    searchText: ''
  };

  componentWillMount() {
    console.log('this.props.location.search', this.props.location.search);
    if (this.props.location.search) {
      this._executeSearch(this.props.location.search);
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps.location.search', nextProps.location.search);
    if (this.props.location.search !== nextProps.location.search && nextProps.location.search) {
      // console.log('query', query);
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
    this.props.history.push({
      pathname: '/search',
      search: `q=${this.state.searchText}`
    });
    // this._executeSearch();
  };

  render() {
    return (
      <Container>
        <h1>Search Stories</h1>
        <form onSubmit={this.handleOnSubmit}>
          <StatelessInput
            type="search"
            value={this.state.searchText}
            onChange={e => this.setState({ searchText: e.target.value })}
            // onKeyDown={e => this.handleKeyDown(e)}
          />
        </form>
        {this.state.stories.map(story => <ListStory key={story.id} story={story} />)}
      </Container>
    );
  }

  _executeSearch = async queryString => {
    // const { searchText } = this.state;
    const query = qs.parse(queryString, { ignoreQueryPrefix: true });
    if (query.q) {
      const result = await this.props.client.query({
        query: ALL_STORIES_SEARCH_QUERY,
        variables: { searchText: query.q }
      });
      console.log('story search result', result);
      const stories = result.data.allStories;
      this.setState({ stories, searchText: query.q });
    }
  };
}

const ALL_STORIES_SEARCH_QUERY = gql`
  query AllStoriesSearchQuery($searchText: String!) {
    allStories(filter: { OR: [{ title_contains: $searchText }] }) {
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

export default withApollo(StorySearch);
