import Tags from 'routes/Tags';
import { graphql, compose } from 'react-apollo';
import AllTagsOrderedQuery from 'graphql/AllTagsOrderedQuery.graphql';
import TagByKeyQuery from 'graphql/TagByKeyQuery.graphql';

export default compose(
  graphql(TagByKeyQuery, {
    name: 'tagQuery',
    skip: ({ match }) => !match.params.key,
    options: ({ match }) => ({ variables: { key: match.params.key } })
  }),
  graphql(AllTagsOrderedQuery, {
    name: 'allTagsQuery',
    skip: ({ match }) => match.params.key
  })
)(Tags);
