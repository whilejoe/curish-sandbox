import React from 'react';
import {NavLink} from 'react-router-dom';
import './AppHeader.css';
import Avatar from 'components/Avatar/Avatar';

const AppHeader = (props) => {
  const {user} = props;
  const providerPhotoURL = user.providerData ? user.providerData[0].photoURL : '';
  return (
    <header className="header">
      <div className="container clearfix">
        <nav className="float-left">
          <NavLink exact to="/" className="brand">Curish Lit</NavLink>
          <ul className="header__nav">
            <li className="nav-item">
              <NavLink to="/about" className="nav-action">101</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/create-story" className="nav-action">Create Story</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/stories" className="nav-action">Stories</NavLink>
            </li>
          </ul>
        </nav>
        {user.uid ?
          <NavLink
            to="/profile"
            activeClassName="header__avatar--active"
            className="float-right header__avatar">
            <Avatar
              src={providerPhotoURL || user.photoURL}
              alt="user-profile-header-link"
              small />
          </NavLink> :
          <div className="float-right nav-item">
            <NavLink to="/authenticate" className="nav-action">Login</NavLink>
          </div>
        }
      </div>
    </header>
  );
};

export default AppHeader;