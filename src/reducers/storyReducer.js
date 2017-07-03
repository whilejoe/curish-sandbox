import ActionTypes from 'constants/actionTypes';

export function storyReducer(state = {}, action) {
  switch(action.type) {
    case ActionTypes.GetStoriesRequested: {
      return {
        ...state,
        inProgress: true,
        error: '',
        success: ''
      };
    }
    case ActionTypes.GetStoriesRejected: {
      return {
        ...state,
        inProgress: false,
        error: action.error
      };
    }
    case ActionTypes.GetStoriesFulfilled: {
      const {stories} = action;
      return {
        ...state,
        inProgress: false,
        success: 'Story Received.',
        stories
      };
    }
    case ActionTypes.AddToStoryRequested: {
      return {
        ...state,
        inProgress: true,
        error: '',
        success: '',
      };
    }
    case ActionTypes.AddToStoryRejected: {
      return {
        ...state,
        inProgress: false,
        error: action.error
      };
    }
    case ActionTypes.AddToStoryFulfilled: {
      console.log('story', action.story);
      const {story} = action;
      const {key, ...rest} = story;
      return {
        ...state,
        inProgress: false,
        success: 'Added To Story.',
        [key]: rest
      };
    }
    default:
      return state;
  }
}