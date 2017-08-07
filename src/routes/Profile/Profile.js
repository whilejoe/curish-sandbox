import React, { Component } from 'react';
import Avatar from 'components/Avatar';
import Button from 'components/Button';

class Profile extends Component {
  render() {
    const { user, logoutUser } = this.props;
    const { photoURL, displayName, userName, email } = user;
    return (
      <div>
        <h1>Profile</h1>
        <p>
          <Avatar src={photoURL} alt="user-profile" name={userName} />
        </p>
        <p>
          Full Name: {displayName}
        </p>
        <p>
          Email: {email}
        </p>
        <Button onClick={logoutUser}>Logout</Button>
      </div>
    );
  }
}

export default Profile;
