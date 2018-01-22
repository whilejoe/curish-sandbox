import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import styled from 'styled-components';
import AllStoriesSearchQuery from 'graphql/AllStoriesSearchQuery.graphql';
import StoryByIdQuery from 'graphql/StoryByIdQuery.graphql';
import { Flex, FlexContent } from 'components/Flex';
import InputGroup from 'components/InputGroup';
import StoryContainer from 'components/StoryContainer';
import StoryCard from 'components/StoryCard';
import StoryCardLoading from 'components/StoryCardLoading';
import Avatar from 'components/Avatar';
import debounce from 'lodash/debounce';
import qs from 'qs';

const SearchInput = styled.div`
  padding-top: 0.4rem;
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

  prepareQueryAndRoute = () => {
    const q = this.props.searchForm.search;
    const query = { q };
    const str = qs.stringify(query);
    return this.props.history.push({
      pathname: '/search',
      search: str
    });
  };

  debouncedOnChange = debounce(this.prepareQueryAndRoute, 350);

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
          query: AllStoriesSearchQuery,
          variables: { searchText: query.q }
        });
        const { allStories, allUsers } = result.data;

        // Set results and loading
        this.setState({
          isLoading: false,
          stories: allStories,
          users: allUsers
        });
      } else {
        // Reset state and remove search query when input is emptied
        this.setState({ stories: [], users: [], isLoading: false });
        this.props.history.push({ pathname: '/search' });
      }
    }
  };

  onTitleMouseOver = async story => {
    if (story) {
      const { client } = this.props;
      const { id } = story;
      await client.query({
        query: StoryByIdQuery,
        variables: { storyId: id }
      });
    }
  };

  render() {
    const { location, searchForm } = this.props;
    const { stories, users, isLoading } = this.state;
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
        {isLoading ? (
          [<StoryCardLoading key="1" />, <StoryCardLoading key="2" />, <StoryCardLoading key="3" />]
        ) : (
          <Flex gutters guttersVertical>
            {stories.length > 0 && (
              <FlexContent space={[100, { sm: 'reset' }]}>
                {stories.map(story => (
                  <StoryCard
                    key={story.id}
                    story={story}
                    referrer={location}
                    matchValue={searchForm.search}
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
        )}
      </StoryContainer>
    );
  }
}

export default withApollo(Search);
