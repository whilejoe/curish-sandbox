import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Flex, FlexContent } from 'components/Flex';
import Button from 'components/Button';
import { USER_ID } from 'constants/tuts';
import { timeDifferenceForDate } from 'utils/timeDifferenceForDate';

class Link extends Component {
  render() {
    const userId = localStorage.getItem(USER_ID);
    return (
      <Flex gutters align="center">
        <FlexContent space="self">
          {this.props.index + 1}.&nbsp;
          {userId && <Button onClick={() => this._voteForLink()}>Vote</Button>}
        </FlexContent>
        <FlexContent>
          <div>
            {this.props.link.description} ({this.props.link.url})
          </div>
          <div>
            {this.props.link.votes.length} votes | by{' '}
            {this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown'}{' '}
            {timeDifferenceForDate(this.props.link.createdAt)}
          </div>
        </FlexContent>
      </Flex>
    );
  }

  _voteForLink = async () => {
    const userId = localStorage.getItem(USER_ID);
    const voterIds = this.props.link.votes.map(vote => vote.user.id);
    if (voterIds.includes(userId)) {
      console.log(`User (${userId}) already voted for this link.`);
      return;
    }

    const linkId = this.props.link.id;
    await this.props.createVoteMutation({
      variables: {
        userId,
        linkId
      },
      update: (store, { data: { createVote } }) => {
        this.props.updateStoreAfterVote(store, createVote, linkId);
      }
    });
  };
}
const CREATE_VOTE_MUTATION = gql`
  mutation CreateVoteMutation($userId: ID!, $linkId: ID!) {
    createVote(userId: $userId, linkId: $linkId) {
      id
      link {
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;

export default graphql(CREATE_VOTE_MUTATION, {
  name: 'createVoteMutation'
})(Link);
