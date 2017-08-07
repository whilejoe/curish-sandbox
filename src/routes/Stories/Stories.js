import React, { Component } from 'react';
import styled from 'styled-components';
import StoryContainer from 'components/StoryContainer';
import Story from './Story';

const StoryItem = styled.article`
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 1px;

  &:not(:last-child) {
    margin-bottom: 1.2rem;
  }

  & h1,
  & h2 {
    margin-top: 0;
  }
`;

class Stories extends Component {
  componentWillMount() {
    this.props.getStories();
  }

  render() {
    const { stories } = this.props;
    return !stories
      ? null
      : <StoryContainer>
          <h1>Stories</h1>
          {Object.keys(stories).map(story =>
            <StoryItem key={story}>
              <h2>
                {stories[story].title}
              </h2>
              <h3>
                @{stories[story].author}
              </h3>
              <Story rawData={stories[story].rawData} />
            </StoryItem>
          )}
        </StoryContainer>;
  }
}

export default Stories;
