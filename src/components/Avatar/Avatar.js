import React from 'react';
import './Avatar.css';

const Avatar = props => {
  const smallClass = props.small ? 'avatar__image--small' : '';
  return (
    <div className={`avatar ${props.className || ''}`}>
      {props.src &&
        props.alt &&
        <img src={props.src} alt={props.alt} className={`avatar__image ${smallClass}`} />}
      {props.name &&
        <span className="avatar__name">
          {props.name}
        </span>}
    </div>
  );
};

export default Avatar;
