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
        error: action.payload
      };
    }
    case ActionTypes.GetStoriesFulfilled: {
      return {
        ...state,
        inProgress: false,
        success: 'Story Received.',
        stories: action.payload
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
        error: action.payload
      };
    }
    case ActionTypes.AddToStoryFulfilled: {
      const {key, ...rest} = action.payload;
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