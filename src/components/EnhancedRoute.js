import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import ScrollToTopOnMount from 'components/ScrollToTopOnMount';
import { isAuthed } from 'utils/AuthService';

const EnhancedRoute = ({ component: Component, requireAuth, scrollToTop, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        // Combine passed props with route props
        // cleanest way atm for passing props to component. revisit.
        const merged = { ...rest, ...props };
        return requireAuth && !isAuthed() ? (
          <Redirect to="/login" />
        ) : (
          <Component {...merged}>{scrollToTop && <ScrollToTopOnMount />}</Component>
        );
      }}
    />
  );
};

export default EnhancedRoute;
