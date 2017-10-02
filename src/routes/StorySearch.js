import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { gql, withApollo } from 'react-apollo';
import { Flex, FlexContent } from 'components/Flex';
import StoryContainer from 'components/StoryContainer';
import InputGroup from 'components/InputGroup';
import SearchStoryList from 'components/SearchStoryList';
import Avatar from 'components/Avatar';
import debounce from 'lodash/debounce';
import { set, reset } from 'abyss-form/lib/actions';
import qs from 'qs';

const CategoryHeader = styled.h2`
  display: inline-block;
  margin-top: 0rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid #eee;
`;

class StorySearch extends Component {
  state = {
    stories: [],
    users: []
  };

  componentWillMount() {
    if (this.props.location.search) {
      this.executeSearch(this.props.location.search);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search && nextProps.location.search) {
      this.executeSearch(nextProps.location.search);
    }
  }

  handleKeyDown = e => {
    if (e && e.keyCode === 13) {
      console.log('e', e.target.value);
      const query = { q: this.props.storySearchForm.model.search };
      const str = qs.stringify(query);
      this.props.history.push({
        pathname: '/search',
        search: str
      });
    }
  };

  prepareQueryAndRoute() {
    console.log('prepareQueryAndRoute');
    const q = this.props.storySearchForm.model.search;
    const query = { q };
    const str = qs.stringify(query);
    return this.props.history.push({
      pathname: '/search',
      search: str
    });
    // if (input) {
    //   const query = { q: this.props.storySearchForm.model.search };
    //   const str = qs.stringify(query);
    //   return this.props.history.push({
    //     pathname: '/search',
    //     search: str
    //   });
    // }
    // return this.props.history.push({ pathname: '/search' });
  }

  // handleOnSubmit = e => {
  //   e.preventDefault();
  //   const query = { q: this.props.storySearchForm.model.search };
  //   const str = qs.stringify(query);
  //   this.props.history.push({
  //     pathname: '/search',
  //     search: str
  //   });
  // };

  debouncedOnChange = debounce(() => this.prepareQueryAndRoute(), 300);

  executeSearch = async queryString => {
    const query = qs.parse(queryString, { ignoreQueryPrefix: true });
    if (query.q !== 'undefined') {
      if (query.q.length) {
        this.props.setSearchForm(query.q);
        const result = await this.props.client.query({
          query: ALL_STORIES_SEARCH_QUERY,
          variables: { searchText: query.q }
        });
        console.log('story search result', result);
        const { allStories, allUsers } = result.data;
        this.setState({ stories: allStories, users: allUsers });
      } else {
        console.log('!query.q.length called');
        this.setState({ stories: [], users: [] });
        this.props.history.push({ pathname: '/search' });
      }
    }
  };

  render() {
    const { stories, users } = this.state;
    return (
      <StoryContainer>
        <h1>Search Curish</h1>
        <InputGroup
          autoFocus={!this.props.location.search}
          id="search"
          label="Search Users, Story titles/descriptions"
          hideLabel
          type="text"
          model="storySearch.search"
          placeholder="Search Users, Story titles/descriptions"
          // onKeyDown={this.handleKeyDown}
          onChange={this.debouncedOnChange}
        />
        <Flex gutters guttersVertical>
          {stories.length > 0 && (
            <FlexContent space={[100, { sm: 'reset' }]}>
              <div>
                <CategoryHeader>Stories</CategoryHeader>
              </div>
              {stories.map(story => (
                <SearchStoryList key={story.id} story={story} referrer={this.props.location} />
              ))}
            </FlexContent>
          )}
          {users.length > 0 && (
            <FlexContent space={[100, { sm: 45, md: 30, lg: 25 }]}>
              <div>
                <CategoryHeader>Users</CategoryHeader>
              </div>
              {users.map(user => (
                <Avatar
                  key={user.id}
                  user={user}
                  to={{ state: { referrer: this.props.location } }}
                />
              ))}
            </FlexContent>
          )}
        </Flex>
      </StoryContainer>
    );
  }
}

const ALL_STORIES_SEARCH_QUERY = gql`
  query AllStoriesSearchQuery($searchText: String!) {
    allStories(
      filter: { OR: [{ title_contains: $searchText }, { description_contains: $searchText }] }
      first: 10
      orderBy: title_ASC
    ) {
      id
      createdAt
      title
      description
      tags
      author {
        id
        userName
      }
    }
    allUsers(
      filter: { OR: [{ userName_contains: $searchText }, { fullName_contains: $searchText }] }
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

const mapStateToProps = state => ({
  storySearchForm: state.forms.storySearch
});

const mapDispatchToProps = dispatch => ({
  setSearchForm: val => dispatch(set('storySearch.search', val)),
  clearSearchForm: dispatch(reset('storySearch.search'))
});

const ConnectedStorySearch = connect(mapStateToProps, mapDispatchToProps)(StorySearch);

export default withApollo(ConnectedStorySearch);
