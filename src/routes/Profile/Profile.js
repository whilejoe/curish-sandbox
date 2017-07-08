import React, {Component} from 'react';
import Avatar from 'components/Avatar/Avatar';

class Profile extends Component {

  render() {
    const {user} = this.props;
    const providerName = user.providerData ? user.providerData[0].displayName : '';
    const providerPhotoURL = user.providerData ? user.providerData[0].photoURL : '';
    return (
      <div>
        <h1>Profile</h1>
        <Avatar
          src={providerPhotoURL || user.photoURL}
          alt="user-profile"
          name={providerName || user.displayName} />
        <p>Email: {user.email}</p>
        <button
          type="button"
          onClick={() => this.props.logoutUser()}>
          Logout
        </button>
      </div>
    );
  }
}

export default Profile;