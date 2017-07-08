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
      return {...initialState}
    }
    case ActionTypes.CreateUserRequested: {
      return {
        ...state,
        inProgress: true,
        error: '',
        success: ''
      };
    }
    case ActionTypes.CreateUserRejected: {
      return {
        ...state,
        inProgress: false,
        error: action.error
      };
    }
    case ActionTypes.CreateUserFulfilled: {
      const {email, password} = action;
      console.log('reducer create user password', password);
      return {
        ...state,
        inProgress: false,
        success: `User With Email "${email}" Successfully Created`
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
      console.log('*****Action.User*****', action.user);
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
        success: 'User Logged Out.',
      };
    }
    default:
      return state;
  }
}