import ActionTypes from 'constants/actionTypes';
import {
  CREATE_APP_USER_REQUESTED,
  CREATE_APP_USER_REJECTED,
  CREATE_APP_USER_FULFILLED
} from 'actions/createAppUser';
import {
  SEND_VERIFICATION_EMAIL_REQUESTED,
  SEND_VERIFICATION_EMAIL_REJECTED,
  SEND_VERIFICATION_EMAIL_FULFILLED
} from 'actions/sendVerificationEmail';

const initialState = {
  inProgress: false,
  error: '',
  success: '',
  isAuthed: false,
  displayName: null,
  email: null,
  emailVerified: null,
  isAnonymous: null,
  photoURL: null,
  providerData: null,
  uid: null,
  userSince: null
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.ListenToAuth: {
      const user = action.payload;
      if (user) {
        return {
          ...state,
          ...user,
          isAuthed: true
        };
      } else return { ...initialState }; // null is passed to clear state
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
        error: action.payload
      };
    }
    case ActionTypes.CreateUserWithEmailFulfilled: {
      return {
        ...state,
        inProgress: false,
        success: `User With Email "${action.payload}" Successfully Created`
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
        error: action.payload
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
        error: action.payload
      };
    }
    case ActionTypes.LogoutUserFulfilled: {
      return {
        ...initialState,
        inProgress: false,
        success: 'User Logged Out.'
      };
    }
    case CREATE_APP_USER_REQUESTED: {
      return {
        ...state,
        inProgress: true,
        error: '',
        success: ''
      };
    }
    case CREATE_APP_USER_REJECTED: {
      return {
        ...state,
        inProgress: false,
        error: action.payload,
        success: ''
      };
    }
    case CREATE_APP_USER_FULFILLED: {
      const { userName } = action.payload;
      return {
        ...state,
        ...action.payload,
        inProgress: false,
        error: '',
        success: `App User @${userName} Successfully Created`
      };
    }
    case SEND_VERIFICATION_EMAIL_REQUESTED: {
      return {
        ...state,
        inProgress: true,
        error: '',
        success: ''
      };
    }
    case SEND_VERIFICATION_EMAIL_REJECTED: {
      return {
        ...state,
        inProgress: false,
        error: action.payload,
        success: ''
      };
    }
    case SEND_VERIFICATION_EMAIL_FULFILLED: {
      return {
        ...state,
        inProgress: false,
        error: '',
        success: 'Email has been verified'
      };
    }
    default:
      return state;
  }
}
