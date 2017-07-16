import React, {Component} from 'react';
import Avatar from 'components/Avatar/Avatar';

class Profile extends Component {

  render() {
    const {user, logoutUser} = this.props;
    const {photoURL, displayName, userName, email} = user;
    return (
      <div>
        <h1>Profile</h1>
        {photoURL ?
          <Avatar
            src={photoURL}
            alt="user-profile"
            name={displayName} /> : 
           <p>Name: {displayName}</p>
        }
        <p>Pseudonym: @{userName}</p>
        <p>Email: {email}</p>
        <button
          type="button"
          onClick={logoutUser}>
          Logout
        </button>
      </div>
    );
  }
}

export default Profile;