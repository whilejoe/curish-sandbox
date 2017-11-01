import StoryPublished from 'routes/StoryPublished';
import { graphql } from 'react-apollo';
import { STORY_QUERY } from 'containers/StoryEditContainer';

export default graphql(STORY_QUERY, {
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
})(StoryPublished);
