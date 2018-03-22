import React from 'react';
import { Portal } from 'react-portal';
import { SUBNAV_PORTAL_ID } from 'constants/portals';

const SubHeaderPortal = ({ children }) => {
  const element = document.getElementById(SUBNAV_PORTAL_ID);
  return !element ? null : <Portal node={element}>{children}</Portal>;
};

export default SubHeaderPortal;
