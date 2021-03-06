import React from 'react';
import styled from 'styled-components';

const ICONS = {
  story: require('material-design-icons-svg/paths/feather'),
  message: require('material-design-icons-svg/paths/comment-multiple-outline'),
  sendMessage: require('material-design-icons-svg/paths/send'),
  user: require('material-design-icons-svg/paths/account'),
  // menu: require('material-design-icons-svg/paths/menu'),
  // plus: require('material-design-icons-svg/paths/plus'),
  search: require('material-design-icons-svg/paths/magnify'),
  // home: require('material-design-icons-svg/paths/home-outline'),
  alert: require('material-design-icons-svg/paths/bell-outline'),
  // trending: require('material-design-icons-svg/paths/pulse'),
  back: require('material-design-icons-svg/paths/arrow-left'),
  plus: require('material-design-icons-svg/paths/plus'),
  formatHeader: require('material-design-icons-svg/paths/format-size'),
  formatQuote: require('material-design-icons-svg/paths/format-quote-close'),
  formatClean: require('material-design-icons-svg/paths/format-clear')
};

const SvgIcon = styled.svg`
  display: inline-block;
  width: 1.25em;
  height: 1.25em;
  fill: currentColor;
  vertical-align: bottom;
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
