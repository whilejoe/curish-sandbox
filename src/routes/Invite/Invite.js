import React, {Component} from 'react';
import Button from 'components/Button';

class Invite extends Component {

  state = {
    name: ''
  };

  async componentWillMount() {
    await this.props.onGetInvite();
    await this.props.watchGuestAddedEvent();
  }

  componentWillUnmount() {
    this.props.removeGuestAddedEvent();
  }

  render() {
    const {host, agenda, guests} = this.props.invite;
    const {name} = this.state;
    return (
      <div>
        <h1>Meeting invite</h1>
        <p>Host: {host}</p>
        <p>Agenda: {agenda}</p>
        <p>Name:
          <input
            type="text"
            value={name}
            onChange={e => this.setState({ name: e.target.value })} />
        </p>
        <Button onClick={() => (name && this.props.onAddToInvite(name))}>
          I am coming!
        </Button>
        <h2>Guests</h2>
        {guests.length ? (
          <ul>
            {guests.map((guest, index) => <li key={index}>{guest.name}</li>)}
          </ul>
        ) : null}
      </div>
    );
  }
}

export default Invite;