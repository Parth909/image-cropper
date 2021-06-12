import React from "react";
import Brain from "./image/brain.png";
import { useParams, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";
// actions
import { activateUser } from "./actions/auth";

const ConfirmRegistration = ({ auth, activateUser }) => {
  const [firstname, setFirstname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { token } = useParams();

  React.useEffect(() => {
    if (token) {
      const data = jwt.decode(token);
      if (data) {
        setFirstname(data.firstname);
        setEmail(data.email);
      }
    }
  }, [token]);

  const clickSubmit = (e) => {
    e.preventDefault();
    activateUser(token, email);
  };

  return (
    <div className="container mt-2 mb-5 d-flex justify-content-center">
      <div className="card px-1 py-4">
        <div className="card-body text-center">
          <img
            src={Brain}
            style={{ height: "100px", width: "100px" }}
            alt=".."
          />
          <h4 className="information mt-4">
            Hello {firstname}, confirm your registration !
          </h4>

          <button
            className="btn btn-primary btn-lg py-2 mt-3"
            type="submit"
            onClick={(e) => clickSubmit(e)}
            style={{ boxShadow: "none" }}
          >
            Confirm Registration
          </button>

          <div className="my-3">
            <h6>
              <Link to="/register" style={{ textDecoration: "none" }}>
                Token expired ? Register again
              </Link>
            </h6>
          </div>
          <div className="my-3">
            <h6>
              <Link to="/login" style={{ textDecoration: "none" }}>
                Registered successfully ? Login
              </Link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { activateUser })(ConfirmRegistration);
