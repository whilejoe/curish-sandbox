import database from './database';

export const GET_STORIES_REQUESTED = 'GET_STORIES_REQUESTED';
export const GET_STORIES_REJECTED = 'GET_STORIES_REJECTED';
export const GET_STORIES_FULFILLED = 'GET_STORIES_FULFILLED';

export function getStories() {
  return dispatch => {
    dispatch(getStoriesRequestedAction());
    return database
      .ref('/stories')
      .once('value', snap => dispatch(getStoriesFulfilledAction(snap.val())))
      .catch(error => dispatch(getStoriesRejectedAction(error.message)));
  };
}

export const getStoriesRequestedAction = () => {
  return {
    type: GET_STORIES_REQUESTED
  };
};

export const getStoriesRejectedAction = error => {
  return {
    type: GET_STORIES_REJECTED,
    payload: error
  };
};

export const getStoriesFulfilledAction = stories => {
  return {
    type: GET_STORIES_FULFILLED,
    payload: stories
  };
};
