import * as actions from './actions';

const initialState = {
  componentName: '',
  componentProps: {}
};

function contextNavReducer(state = initialState, action) {
  const { payload = {} } = action;
  const { componentName, componentProps } = payload;
  switch (action.type) {
    case actions.SET: {
      return {
        ...state,
        componentName,
        componentProps
      };
    }
    case actions.UPDATE: {
      return {
        ...state,
        componentName,
        componentProps
      };
    }
    case actions.RESET: {
      return componentName === state.componentName
        ? {
            ...state,
            componentName: initialState.componentName,
            componentProps: initialState.componentProps
          }
        : { ...state };
    }
    default:
      return state;
  }
}

export default contextNavReducer;
