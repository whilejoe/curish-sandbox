import React from 'react';
import { Portal } from 'react-portal';
import Fade from 'components/Fade';
import { SUBNAV_PORTAL_ID } from 'constants/portals';

const SubHeaderPortal = ({ children, show, ...props }) => {
  return (
    <Portal node={document && document.getElementById(SUBNAV_PORTAL_ID)}>
      <Fade {...props} in>
        {children}
      </Fade>
    </Portal>
  );
};

export default SubHeaderPortal;
