import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const Public = ({ loggingIn, authenticated, component, ...rest }) => (
  <div className="public">
    <Route
      {...rest}
      render={props => (
        !authenticated ?
        (React.createElement(component, { ...props, loggingIn, authenticated })) :
        (<Redirect to="/documents" />)
      )}
    />
  </div>
);

Public.propTypes = {
  loggingIn: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default Public;
