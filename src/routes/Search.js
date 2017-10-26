import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import styled from 'styled-components';
import { ALL_STORIES_SEARCH_QUERY } from 'containers/SearchContainer';
import { STORY_QUERY } from 'containers/StoryEditContainer';
import { Flex, FlexContent } from 'components/Flex';
import InputGroup from 'components/InputGroup';
import StoryContainer from 'components/StoryContainer';
import StoryCard from 'components/StoryCard';
import Avatar from 'components/Avatar';
import debounce from 'lodash/debounce';
import qs from 'qs';

const SearchInput = styled.div`
  padding-top: 0.6rem;
`;

class Search extends Component {
  state = {
    stories: [],
    users: [],
    isLoading: false
  };

  componentWillMount() {
    const { location } = this.props;
    if (location.search) this.executeSearch(location.search);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search && nextProps.location.search) {
      this.executeSearch(nextProps.location.search);
    }
  }

  componentWillUnMount() {
    if (this.props.searchForm.search) this.props.clearSearchForm();
  }

  prepareQueryAndRoute() {
    const q = this.props.searchForm.search;
    const query = { q };
    const str = qs.stringify(query);
    return this.props.history.push({
      pathname: '/search',
      search: str
    });
  }

  debouncedOnChange = debounce(() => this.prepareQueryAndRoute(), 350);

  executeSearch = async queryString => {
    const query = qs.parse(queryString, { ignoreQueryPrefix: true });
    if (query.q !== undefined) {
      if (query.q.length) {
        const { setSearchForm, client } = this.props;
        const { stories, users } = this.state;

        // Only set loading when data is empty
        if (stories.length === 0 && users.length === 0) this.setState({ isLoading: true });

        // Set search form and input
        setSearchForm(query.q);

        const result = await client.query({
          query: ALL_STORIES_SEARCH_QUERY,
          variables: { searchText: query.q }
        });
        const { allStories, allUsers } = result.data;

        // Set results and only set loading to false when it was true
        this.setState(prevState => {
          if (prevState.isLoading) {
            return {
              isLoading: false,
              stories: allStories,
              users: allUsers
            };
          } else
            return {
              stories: allStories,
              users: allUsers
            };
        });
      } else {
        // Reset state and remove search query when input is emptied
        this.setState({ stories: [], users: [] });
        this.props.history.push({ pathname: '/search' });
      }
    }
  };

  onTitleMouseOver = async story => {
    if (story) {
      const { client } = this.props;
      const { id } = story;
      const result = await client.query({
        query: STORY_QUERY,
        variables: { storyId: id }
      });
      console.log('result from mouseOver', result);
    }
  };

  render() {
    const { location, searchForm } = this.props;
    const { stories, users } = this.state;
    return (
      <StoryContainer>
        <SearchInput>
          <InputGroup
            autoFocus={!searchForm.search}
            id="search-curish"
            label="Search Curish"
            hideLabel
            type="text"
            placeholder="search story titles and tags, users"
            model="search.search"
            onChange={this.debouncedOnChange}
            clearable
          />
        </SearchInput>
        <Flex gutters guttersVertical>
          {stories.length > 0 && (
            <FlexContent space={[100, { sm: 'reset' }]}>
              {stories.map(story => (
                <StoryCard
                  key={story.id}
                  story={story}
                  referrer={location}
                  searchValue={searchForm.search}
                  onMouseOverCallback={() => this.onTitleMouseOver(story)}
                />
              ))}
            </FlexContent>
          )}
          {users.length > 0 && (
            <FlexContent space={[100, { sm: 45, md: 30, lg: 25 }]}>
              {users.map(user => (
                <Avatar key={user.id} user={user} to={{ state: { referrer: location } }} />
              ))}
            </FlexContent>
          )}
        </Flex>
      </StoryContainer>
    );
  }
}

export default withApollo(Search);
