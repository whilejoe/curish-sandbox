import React, {Component} from 'react';

class CreateProfile extends Component {
  state = {
    userName: '',
    displayName: '',
    email: '',
    photoURL: ''
  }

  componentWillMount() {
    const {user} = this.props;
    const providerName = user.providerData ? user.providerData[0].displayName : '';
    const providerPhotoURL = user.providerData ? user.providerData[0].photoURL : '';
    this.setState({
      displayName: providerName || user.displayName || '',
      email: user.email,
      photoURL: providerPhotoURL || user.photoURL || ''
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      const {user} = nextProps;
      const providerName = user.providerData ? user.providerData[0].displayName : '';
      const providerPhotoURL = user.providerData ? user.providerData[0].photoURL : '';
      this.setState({
        displayName: providerName || user.displayName || '',
        email: user.email,
        photoURL: providerPhotoURL || user.photoURL || ''
      })
    }
  }

  submitRegistration = () => {
    const {userName, displayName, email, photoURL} = this.state;
    const user = {
      userName,
      displayName,
      email,
      photoURL
    }
    this.props.createAppUser(user);
  }

  render() {
    const {userName, displayName, email} = this.state;
    return (
      <div style={{paddingBottom: '2rem'}}>
        <h1>Create Profile</h1>
        <h2>Update Or Fill In Info Below</h2>
        <div className="input-group">
          <label>Full Name: </label>
          <input
            type="text"
            value={displayName}
            placeholder="Marquis De Sade"
            onChange={e => this.setState({displayName: e.target.value})} />
        </div>
        <div className="input-group">
          <label>User Name: @</label>
          <input
            type="text"
            value={userName}
            placeholder="theoriginalsadist"
            onChange={e => this.setState({userName: e.target.value})} />
        </div>
        <div className="input-group">
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={e => this.setState({email: e.target.value})} />
        </div>
        <button onClick={(displayName && userName && email) && this.submitRegistration}>
          create profile
        </button>
      </div>
    );
  }
}

export default CreateProfile;