export const SET = 'CONTEXT_NAV/SET';
export const UPDATE = 'CONTEXT_NAV/UPDATE';
export const RESET = 'CONTEXT_NAV/RESET';

export const set = (componentName = '', componentProps = {}) => {
  return {
    type: SET,
    payload: {
      componentName,
      componentProps
    }
  };
};

export const update = (componentName = '', componentProps = {}) => {
  return {
    type: UPDATE,
    payload: {
      componentName,
      componentProps
    }
  };
};

export const reset = (componentName = '', componentProps = {}) => {
  return {
    type: RESET,
    payload: {
      componentName,
      componentProps: {}
    }
  };
};
