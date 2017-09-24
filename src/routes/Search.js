import React, { Component } from 'react';
import { gql, withApollo } from 'react-apollo';
import Container from 'components/Container';
import StatelessInput from 'components/StatelessInput';
import Button from 'components/Button';
import Link from 'components/Link';

class Search extends Component {
  state = {
    links: [],
    searchText: ''
  };

  render() {
    return (
      <Container>
        <h1>Search</h1>
        <StatelessInput type="text" onChange={e => this.setState({ searchText: e.target.value })} />
        <Button theme="secondary" onClick={() => this._executeSearch()}>
          Search
        </Button>
        {this.state.links.map((link, index) => <Link key={link.id} link={link} index={index} />)}
      </Container>
    );
  }

  _executeSearch = async () => {
    const { searchText } = this.state;
    const result = await this.props.client.query({
      query: ALL_LINKS_SEARCH_QUERY,
      variables: { searchText }
    });
    const links = result.data.allLinks;
    this.setState({ links });
  };
}

const ALL_LINKS_SEARCH_QUERY = gql`
  query AllLinksSearchQuery($searchText: String!) {
    allLinks(
      filter: { OR: [{ url_contains: $searchText }, { description_contains: $searchText }] }
    ) {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

export default withApollo(Search);
