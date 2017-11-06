import React from 'react';
import { Portal } from 'react-portal';
import { SUBNAV_PORTAL_ID } from 'constants/portals';

const SubHeaderPortal = ({ children }) => {
  return <Portal node={document && document.getElementById(SUBNAV_PORTAL_ID)}>{children}</Portal>;
};

export default SubHeaderPortal;
