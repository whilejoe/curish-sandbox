import React from 'react';
import './AppHeader.css';
import { NavLink } from 'react-router-dom';
import Avatar from 'components/Avatar';

const AppHeader = props => {
  const { user } = props;
  const { isAuthed, userName, photoURL } = user;
  return (
    <header className="header">
      <div className="container clearfix">
        <nav className="float-left">
          <NavLink exact to="/" className="brand">
            Curish
          </NavLink>
          <ul className="header__nav">
            <li className="nav-item">
              <NavLink to="/about" className="nav-action">
                101
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/create-story" className="nav-action">
                Create Story
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/stories" className="nav-action">
                Stories
              </NavLink>
            </li>
          </ul>
        </nav>
        {isAuthed
          ? <NavLink
              to="/profile"
              activeClassName="header__avatar--active"
              className="float-right header__avatar"
            >
              {photoURL
                ? <Avatar src={photoURL} alt="user-profile-header-link" small />
                : userName &&
                  <span className="header__avatar-name">
                    @{userName}
                  </span>}
            </NavLink>
          : <div className="float-right nav-item">
              <NavLink to="/authenticate" className="nav-action">
                Login
              </NavLink>
            </div>}
      </div>
    </header>
  );
};

export default AppHeader;
