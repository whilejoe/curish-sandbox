import React, { Component } from 'react';
import styled from 'styled-components';
import { withApollo } from 'react-apollo';
import qs from 'qs';
import { Flex, FlexContent } from 'components/Flex';
import StatelessInput from 'components/StatelessInput';
import Icon from 'components/Icon';
import { PALETTE } from 'constants/theme';

const OmniIcon = styled(Icon)`
  width: 1.15em;
  height: 1.15em;
  margin-right: 0.1em;
  color: ${PALETTE.GRAY.MEDIUM};
  vertical-align: middle;
`;
const OmniInput = styled(StatelessInput)`
  height: 2rem;
  max-width: 20rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-bottom: 0;
  font-size: 0.9em;
  border-radius: 0px;
`;

class OmniSearch extends Component {
  state = {
    searchText: ''
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const query = { q: this.state.searchText };
    const str = qs.stringify(query);
    this.executeSearch(str);
    console.log('str', str);
  };

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <Flex align="center">
          <FlexContent space="self">
            <OmniIcon type="search" />
          </FlexContent>
          <FlexContent>
            <OmniInput
              type="input"
              placeholder="Search Curish"
              value={this.state.searchText}
              onChange={e => this.setState({ searchText: e.target.value })}
            />
          </FlexContent>
        </Flex>
      </form>
    );
  }

  executeSearch = async queryString => {
    const query = qs.parse(queryString, { ignoreQueryPrefix: true });
    if (query.q) {
      console.log('query.q', query.q);
      this.setState({ searchText: query.q });
    }
  };
}

// const ALL_STORIES_SEARCH_QUERY = gql`
//   query AllStoriesSearchQuery($searchText: String!) {
//     allStories(
//       filter: { OR: [{ title_contains: $searchText }, { description_contains: $searchText }] }
//       first: 10
//       orderBy: title_ASC
//     ) {
//       id
//       title
//       description
//       tags
//       author {
//         id
//         userName
//       }
//     }
//   }
// `;

export default withApollo(OmniSearch);
