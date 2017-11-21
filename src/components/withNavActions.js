import React from 'react';
import { connect } from 'react-redux';
import { set, update, reset } from 'state/contextNav/actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  setNavContext: (model, options) => dispatch(set(model, options)),
  updateNavContext: (model, options) => dispatch(update(model, options)),
  resetNavContext: model => dispatch(reset(model))
});

const withNavActions = (Component, model) => {
  const NavWrapper = props => <Component {...props} navModel={model} />;

  return connect(null, mapDispatchToProps)(NavWrapper);
};

export default withNavActions;
