import StoryPublished from 'routes/StoryPublished';
import { graphql } from 'react-apollo';
import StoryByIdQuery from 'graphql/StoryByIdQuery.graphql';
import withNavActions from 'components/withNavActions';

const ConnectedStory = withNavActions(StoryPublished, 'PublishedNav');

export default graphql(StoryByIdQuery, {
  name: 'storyData',
  skip: ({ storyData }) => storyData && storyData.loading,
  options: ({ match }) => ({ variables: { storyId: match.params.id } }),
  props: ({ storyData: { Story = {}, loading } }) => ({
    loading,
    titleText: Story.titleText,
    titleDelta: Story.titleDelta,
    bodyDelta: Story.bodyDelta,
    author: Story.author
  })
})(ConnectedStory);
