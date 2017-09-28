import React from 'react';
import styled from 'styled-components';

const ICONS = {
  story: require('material-design-icons-svg/paths/feather'),
  message: require('material-design-icons-svg/paths/message-text'),
  userCool: require('material-design-icons-svg/paths/emoticon-cool'),
  menu: require('material-design-icons-svg/paths/menu'),
  plus: require('material-design-icons-svg/paths/plus'),
  search: require('material-design-icons-svg/paths/magnify')
};

const SvgIcon = styled.svg`
  width: 1.25rem;
  height: 1.25rem;
  fill: currentColor;
`;

const Icon = ({ type, title, ...props }) => {
  const icon = ICONS[type];
  if (!icon) return null;
  return (
    <SvgIcon
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden={title ? false : true}
    >
      {title && <title>{title}</title>}
      <path d={ICONS[type]} />
    </SvgIcon>
  );
};

export default Icon;
