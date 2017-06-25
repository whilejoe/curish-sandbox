import {connect} from 'react-redux';
import Invite from 'components/Invite/Invite';
import {getInvite} from 'actions/getInvite';
import {addToInvite} from 'actions/addToInvite';
import {watchGuestAddedEvent, removeGuestAddedEvent} from 'actions/guestAddedEvent';

const mapStateToProps = state => ({
  invite: state.invite
});

const mapDispatchToProps = dispatch => ({
  watchGuestAddedEvent: () => watchGuestAddedEvent(dispatch),
  removeGuestAddedEvent: () => removeGuestAddedEvent(dispatch),
  onGetInvite: () => dispatch(getInvite()),
  onAddToInvite: name => dispatch(addToInvite(name))
});

const InviteContainer = connect(mapStateToProps, mapDispatchToProps)(Invite);

export default InviteContainer;