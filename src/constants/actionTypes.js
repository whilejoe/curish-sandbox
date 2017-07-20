const actionTypes = {
  GetInviteRequested: 'GET_INVITE_REQUESTED',
  GetInviteRejected: 'GET_INVITE_REJECTED',
  GetInviteFulfilled: 'GET_INVITE_FULFILLED',

  AddToInviteRequested: 'ADD_TO_INVITE_REQUESTED',
  AddToInviteRejected: 'ADD_TO_INVITE_REJECTED',
  AddToInviteFulfilled: 'ADD_TO_INVITE_FULFILLED',

  GuestAdded: 'GUEST_ADDED',

  GetStoriesRequested: 'GET_STORIES_REQUESTED',
  GetStoriesRejected: 'GET_STORIES_REJECTED',
  GetStoriesFulfilled: 'GET_STORIES_FULFILLED',

  AddToStoryRequested: 'ADD_TO_STORY_REQUESTED',
  AddToStoryRejected: 'ADD_TO_STORY_REJECTED',
  AddToStoryFulfilled: 'ADD_TO_STORY_FULFILLED',

  CreateUserWithEmailRequested: 'CREATE_USER_WITH_EMAIL_REQUESTED',
  CreateUserWithEmailRejected: 'CREATE_USER_WITH_EMAIL_REJECTED',
  CreateUserWithEmailFulfilled: 'CREATE_USER_WITH_EMAIL_FULFILLED',

  LoginUserRequested: 'LOGIN_USER_REQUESTED',
  LoginUserRejected: 'LOGIN_USER_REJECTED',
  LoginUserFulfilled: 'LOGIN_USER_FULFILLED',

  LogoutUserRequested: 'LOGOUT_USER_REQUESTED',
  LogoutUserRejected: 'LOGOUT_USER_REJECTED',
  LogoutUserFulfilled: 'LOGOUT_USER_FULFILLED',

  ListenToAuth: 'LISTEN_TO_AUTH'
};

export default actionTypes;
