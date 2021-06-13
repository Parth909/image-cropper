import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { loadUser } from "./actions/auth";
import Loading from "./Loading";

const PrivateRoute = ({
  component: PassedComponent,
  auth: { isAuthenticated, loading },
  ...routeProps
}) => {
  React.useEffect(() => {
    let token = localStorage.getItem("__image_cropper_token__");
    if (token !== null) {
      loadUser(token);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Route
      {...routeProps}
      render={(props) =>
        !isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <PassedComponent {...props} />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser })(PrivateRoute);
