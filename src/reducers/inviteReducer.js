import ActionTypes from 'constants/actionTypes';

const initialState = {
  inProgress: false,
  error: '',
  success: '',
  host: '',
  agenda: '',
  guests: []
}

export function inviteReducer(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.GetInviteRequested: {
      return {
        ...state,
        inProgress: true,
        error: '',
        success: ''
      };
    }
    case ActionTypes.GetInviteRejected: {
      return {
        ...state,
        inProgress: false,
        error: action.payload
      };
    }
    case ActionTypes.GetInviteFulfilled: {
      const {host, agenda, guests} = action.payload;
      const guestList = guests ? Object.keys(guests).map(key => guests[key]) : [];
      return {
        ...state,
        inProgress: false,
        success: 'Got invite.',
        host,
        agenda,
        guests: guestList
      };
    }
    case ActionTypes.AddToInviteRequested: {
      return {
        ...state,
        inProgress: true,
        error: '',
        success: '',
      };
    }
    case ActionTypes.AddToInviteRejected: {
      return {
        ...state,
        inProgress: false,
        error: action.payload
      };
    }
    case ActionTypes.AddToInviteFulfilled: {
      return {
        ...state,
        inProgress: false,
        success: 'Added guest.'
      };
    }
    case ActionTypes.GuestAdded: {
      return {
        ...state,
        guests: [
          ...state.guests,
          action.payload
        ]
      };
    }
    default:
      return state;
  }
}