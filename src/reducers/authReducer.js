import ActionTypes from 'constants/actionTypes';

const initialState = {
  inProgress: false,
  error: '',
  success: '',
  displayName: null,
  email: null,
  emailVerified: null,
  photoURL: null,
  isAnonymous: null,
  uid: null,
  providerData: null
}

export function authReducer(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.ListenToAuth: {
      if (action.user) {
        const {displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData} = action.user;
        return {
          ...state,
          displayName,
          email,
          emailVerified,
          photoURL,
          isAnonymous,
          uid,
          providerData
        };
      }
      return {...initialState};
    }
    case ActionTypes.CreateUserWithEmailRequested: {
      return {
        ...state,
        inProgress: true,
        error: '',
        success: ''
      };
    }
    case ActionTypes.CreateUserWithEmailRejected: {
      return {
        ...state,
        inProgress: false,
        error: action.error
      };
    }
    case ActionTypes.CreateUserWithEmailFulfilled: {
      return {
        ...state,
        inProgress: false,
        success: `User With Email "${action.email}" Successfully Created`
      };
    }
    case ActionTypes.LoginUserRequested: {
      return {
        ...state,
        inProgress: true,
        error: '',
        success: ''
      };
    }
    case ActionTypes.LoginUserRejected: {
      return {
        ...state,
        inProgress: false,
        error: action.error
      };
    }
    case ActionTypes.LoginUserFulfilled: {
      return {
        ...state,
        inProgress: false,
        success: `User Successfully Logged In`
      };
    }
    case ActionTypes.LogoutUserRequested: {
      return {
        ...state,
        inProgress: true,
        error: '',
        success: ''
      };
    }
    case ActionTypes.LogoutUserRejected: {
      return {
        ...state,
        inProgress: false,
        error: action.error
      };
    }
    case ActionTypes.LogoutUserFulfilled: {
      return {
        ...initialState,
        inProgress: false,
        success: 'User Logged Out.',
      };
    }
    default:
      return state;
  }
}