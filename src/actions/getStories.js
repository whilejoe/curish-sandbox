import ActionTypes from 'constants/actionTypes';
import database from './database';

export function getStories() {
  return dispatch => {
    dispatch(getStoriesRequestedAction());
    return database.ref('/stories')
      .once('value', snap => dispatch(getStoriesFulfilledAction(snap.val())))
      .catch(error => dispatch(getStoriesRejectedAction(error)));
  }
}

function getStoriesRequestedAction() {
  return {
    type: ActionTypes.GetStoriesRequested
  };
}

function getStoriesRejectedAction() {
  return {
    type: ActionTypes.GetStoriesRejected
  }
}

function getStoriesFulfilledAction(stories) {
  console.log('stories', stories);
  return {
    type: ActionTypes.GetStoriesFulfilled,
    stories
  };
}
