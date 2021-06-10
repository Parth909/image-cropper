import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Login = ({ auth: { isAuthenticated } }) => {
  if (isAuthenticated) {
    return <Redirect to="/details" />;
  }

  return <h1>This is the login page</h1>;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Login);
