import React from "react";
import "./css/Details.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import banner from "./image/banner.jpg";
import square from "./image/square.jpg";

const Details = ({ auth }) => {
  return (
    <div className="container-fluid mt-0 mb-5 px-1 d-flex justify-content-center">
      <div className="px-0 py-0 card-500">
        <div className="card-body px-0 py-1">
          <div className="vid-details-cover-prof">
            <div className="vid-details-cover-prof-wrapper">
              <div className="vid-ch-cover-img">
                <img src={banner} />
              </div>
              <div className="vid-ch-img d-flex mx-auto">
                <img src={square} />
              </div>
            </div>
          </div>
          <div className="user-details">
            <h3>
              {auth.firstname} {auth.lastname}
            </h3>
            <div className="mx-4 px-4 text-start">
              <h5 className="d-inline">Email</h5> : {auth.email}
              <h5 className="d-flex mx-auto">Bio</h5>
              <div>{auth.bio}</div>
            </div>
          </div>
          <div className="container mt-3">
            <Link to="/edit-details">
              <button className="btn btn-md btn-primary">Edit Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Details);
