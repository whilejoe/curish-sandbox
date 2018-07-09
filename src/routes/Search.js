import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import AllStoriesSearchQuery from 'graphql/AllStoriesSearchQuery.graphql';
import StoryByIdQuery from 'graphql/StoryByIdQuery.graphql';
import { Flex, FlexContent } from 'components/Flex';
import InputGroup from 'components/InputGroup';
import PageContainer from 'components/PageContainer';
import Container from 'components/Container';
import StoryCard from 'components/StoryCard';
import StoryCardLoading from 'components/StoryCardLoading';
import Avatar from 'components/Avatar';
import debounce from 'lodash/debounce';
import qs from 'qs';

class Search extends Component {
  state = {
    stories: [],
    users: [],
    isLoading: false,
    noResults: false
  };

  componentWillMount() {
    const { location, searchForm, clearSearchForm } = this.props;
    if (location.search) this.executeSearch(location.search);
    else if (searchForm.search) clearSearchForm(); // Component doesn't always unmount so clear form
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      if (nextProps.location.search) {
        this.executeSearch(nextProps.location.search);
      } else {
        // Clear state if input is cleared
        this.setState({
          stories: [],
          users: [],
          isLoading: false,
          noResults: false
        });
      }
    }
  }

  componentWillUnMount() {
    const { searchForm, clearSearchForm } = this.props;
    if (searchForm.search) clearSearchForm();
  }

  prepareQueryAndRoute = () => {
    const { searchForm, history } = this.props;
    const q = searchForm.search;
    if (q) {
      const query = { q };
      const str = qs.stringify(query);
      history.replace({
        pathname: '/search',
        search: str
      });
    } else {
      history.replace('/search'); // Remove query prefix
    }
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
          users: allUsers,
          noResults: !allStories.length && !allUsers.length
        });
      }
    }
  };

  onTitleMouseOver = async story => {
    // Prefetch data
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
    const { stories, users, isLoading, noResults } = this.state;
    return (
      <PageContainer>
        <Container>
          <h1>Search</h1>
          <InputGroup
            autoFocus={!searchForm.search}
            id="search-curish"
            label="Search Curish"
            hideLabel
            type="text"
            placeholder="search story titles/tags, users"
            model="search.search"
            onChange={this.debouncedOnChange}
            clearable
          />
          {isLoading ? (
            [
              <StoryCardLoading key="1" />,
              <StoryCardLoading key="2" />,
              <StoryCardLoading key="3" />
            ]
          ) : noResults ? (
            <p>No Results for {searchForm.search}</p>
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
        </Container>
      </PageContainer>
    );
  }
}

export default withApollo(Search);
