import React, {Component} from 'react';
import Story from './Story/Story';
import './Stories.css';

class Stories extends Component {

  componentWillMount() {
    this.props.getStories();
  }

  render() {
    const {stories} = this.props;
    return !stories ? null : (
      <div>
        <h1>Stories</h1>
        {Object.keys(stories).map(story => 
          <article key={story} className="story">
            <h2>{stories[story].title}</h2>
            <h3>@{stories[story].author}</h3>
            <Story rawData={stories[story].rawData} />
          </article>
        )}
      </div>
    );
  }
}

export default Stories;