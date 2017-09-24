import React, { Component } from 'react';
import { graphql, gql } from 'react-apollo';
import StatelessInput from 'components/StatelessInput';
import Container from 'components/Container';
import Button from 'components/Button';
import LinkList, { ALL_LINKS_QUERY } from 'components/LinkList';
import { USER_ID } from 'constants/tuts';
import { SECONDARY_KEY } from 'constants/theme';

class CreateLink extends Component {
  state = {
    description: '',
    url: ''
  };

  render() {
    return (
      <Container>
        <h1>GraphQl Links</h1>
        <StatelessInput
          value={this.state.description}
          onChange={e => this.setState({ description: e.target.value })}
          type="text"
          placeholder="A description for the link"
        />
        <StatelessInput
          value={this.state.url}
          onChange={e => this.setState({ url: e.target.value })}
          type="text"
          placeholder="The URL for the link"
        />
        <Button theme={SECONDARY_KEY} onClick={() => this._createLink()}>
          Submit
        </Button>
        <LinkList />
      </Container>
    );
  }

  _createLink = async () => {
    const postedById = localStorage.getItem(USER_ID);
    if (!postedById) {
      console.error('No user logged in');
      return;
    }
    const { description, url } = this.state;
    await this.props.createLinkMutation({
      variables: {
        description,
        url,
        postedById
      },
      update: (store, { data: { createLink } }) => {
        const data = store.readQuery({ query: ALL_LINKS_QUERY });
        data.allLinks.splice(0, 0, createLink);
        store.writeQuery({
          query: ALL_LINKS_QUERY,
          data
        });
      }
    });
  };
}

const CREATE_LINK_MUTATION = gql`
  mutation CreateLinkMutation($description: String!, $url: String!, $postedById: ID!) {
    createLink(description: $description, url: $url, postedById: $postedById) {
      id
      createdAt
      url
      description
      postedBy {
        id
        name
      }
    }
  }
`;

export default graphql(CREATE_LINK_MUTATION, { name: 'createLinkMutation' })(CreateLink);
