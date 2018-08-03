import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({
  component: Component,
  user,
  requiredRole,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        user.isAuthenticated === true && user.user.role === requiredRole ? (
          <Component {...props} />
        ) : (
          <Redirect to="/pagenotfound" />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
