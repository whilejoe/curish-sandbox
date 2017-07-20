import database from './database';

export const ADD_TO_STORY_REQUESTED = 'ADD_TO_STORY_REQUESTED';
export const ADD_TO_STORY_REJECTED = 'ADD_TO_STORY_REJECTED';
export const ADD_TO_STORY_FULFILLED = 'ADD_TO_STORY_FULFILLED';

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
    newStoryKey
      .set({
        author: story.author,
        title: story.title,
        rawData: story.rawData
      })
      .then(() =>
        dispatch(addToStoryFulfilledAction({ ...newStory, key: newStoryKey.key.toString() }))
      )
      .catch(error => dispatch(addToStoryRejectedAction(error.message)));
  };
}

export const addToStoryRequestedAction = () => {
  return {
    type: ADD_TO_STORY_REQUESTED
  };
};

export const addToStoryRejectedAction = error => {
  return {
    type: ADD_TO_STORY_REJECTED,
    payload: error
  };
};

export const addToStoryFulfilledAction = story => {
  return {
    type: ADD_TO_STORY_FULFILLED,
    payload: story
  };
};
