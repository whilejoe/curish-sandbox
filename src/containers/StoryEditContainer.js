import StoryEdit from 'routes/StoryEdit';
import { gql, graphql, compose } from 'react-apollo';

export const STORY_QUERY = gql`
  query getStoryById($storyId: ID!) {
    Story(id: $storyId) {
      id
      published
      titleText
      titleDelta
      bodyDelta
      description
      tags {
        id
        key
      }
      author {
        id
        userName
      }
    }
  }
`;

const UPDATE_STORY_MUTATION = gql`
  mutation UpdateStoryMutation(
    $storyId: ID!
    $published: Boolean
    $titleText: String
    $titleDelta: String
    $bodyMarkup: String
    $bodyDelta: String
    $description: String
    $tagsIds: [ID!]
  ) {
    updateStory(
      id: $storyId
      published: $published
      titleText: $titleText
      titleDelta: $titleDelta
      bodyMarkup: $bodyMarkup
      bodyDelta: $bodyDelta
      description: $description
      tagsIds: $tagsIds
    ) {
      id
      published
      titleText
      titleDelta
      bodyDelta
      description
      tags {
        id
        key
      }
      author {
        id
        userName
      }
    }
  }
`;

export default compose(
  graphql(UPDATE_STORY_MUTATION, { name: 'updateStoryMutation' }),
  graphql(STORY_QUERY, {
    name: 'storyData',
    options: ({ match }) => ({ variables: { storyId: match.params.id } })
  })
)(StoryEdit);
