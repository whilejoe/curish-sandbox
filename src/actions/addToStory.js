import ActionTypes from 'constants/actionTypes';
import database from './database';

export function addToStory(story) {
  return dispatch => {
    dispatch(addToStoryRequestedAction());
    const newStory = {
      author: story.author,
      title: story.title,
      rawData: story.rawData
    };
    const storiesRef = database.ref('/stories');
    const newStoryKey = storiesRef.push();
    newStoryKey.set({
      author: story.author,
      title: story.title,
      rawData: story.rawData
    })
    .then(() => dispatch(addToStoryFulfilledAction({...newStory, key: newStoryKey.key.toString()})))
    .catch(error => dispatch(addToStoryRejectedAction(error)));
  }
}

function addToStoryRequestedAction() {
  return {
    type: ActionTypes.AddToStoryRequested
  };
}

function addToStoryRejectedAction() {
  return {
    type: ActionTypes.AddToStoryRejected
  }
}

function addToStoryFulfilledAction(story) {
  return {
    type: ActionTypes.AddToStoryFulfilled,
    story
  };
}