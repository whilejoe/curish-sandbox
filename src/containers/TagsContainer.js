import Tags from 'routes/Tags';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

export const TAG_QUERY = gql`
  query getTagById($key: String!) {
    Tag(key: $key) {
      id
      key
      stories(filter: { published: true }, orderBy: updatedAt_DESC) {
        id
        updatedAt
        published
        titleText
        description
        tags {
          id
          key
        }
      }
    }
  }
`;

export const ALL_TAGS_QUERY = gql`
  query getAllTags {
    allTags(orderBy: key_ASC) {
      id
      key
    }
  }
`;

export default compose(
  graphql(TAG_QUERY, {
    name: 'tagQuery',
    skip: ({ match }) => !match.params.key,
    options: ({ match }) => ({ variables: { key: match.params.key } })
  }),
  graphql(ALL_TAGS_QUERY, {
    name: 'allTagsQuery',
    skip: ({ match }) => match.params.key
  })
)(Tags);
