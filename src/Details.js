import React from "react";
import "./css/Details.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import noBannerImg from "./image/no_banner_image.jpg";
import noProfileImg from "./image/no_image_found.jpg";
import ContentEditable from "react-contenteditable";
// actions
import { deleteUser, logoutUser } from "./actions/auth";

const Details = ({ auth, deleteUser, logoutUser }) => {
  const bioRef = React.useRef("");

  React.useEffect(() => {
    bioRef.current = auth.bio;
  }, [auth]);

  return (
    auth && (
      <div className="container-fluid mt-0 mb-5 px-1 d-flex justify-content-center">
        <div className="px-0 py-0 card-500">
          <div className="card-body px-0 py-1">
            <div className="vid-details-cover-prof">
              <div className="vid-details-cover-prof-wrapper">
                <div className="vid-ch-cover-img">
                  {auth.bannerimg.length < 10 ? (
                    <img src={noBannerImg} alt=".." />
                  ) : (
                    <img src={auth.bannerimg} alt=".." />
                  )}
                </div>
                <div className="vid-ch-img d-flex mx-auto">
                  {auth.profileimg.length < 10 ? (
                    <img src={noProfileImg} alt=".." />
                  ) : (
                    <img src={auth.profileimg} alt=".." />
                  )}
                </div>
              </div>
            </div>
            <div className="user-details">
              <h3>
                {auth.firstname} {auth.lastname}
              </h3>
              <div className="mx-4 px-4 text-start">
                <div className="d-block">
                  <h5 className="d-inline mt-2">Username:</h5> {auth.username}
                </div>
                <h5 className="d-inline mt-2">Email :</h5> {auth.email}
                <h5 className="d-block mt-2">Bio :</h5>
                <ContentEditable
                  className="m-0 p-0"
                  html={bioRef.current} // innerHTML of the editable div
                  disabled={true} // use true to disable editing
                />
                <div className="d-block">
                  <h5 className="d-block mt-2">Hobbies :</h5>
                  {auth.hobbies.length > 0 &&
                    auth.hobbies.map(
                      (hob, i) =>
                        hob.trim().length > 0 && (
                          <span
                            key={i}
                            className="d-inline-block m-2 upload-details-hobs-t"
                            title={hob}
                          >
                            {hob}
                          </span>
                        )
                    )}
                </div>
              </div>
            </div>
            <div className="container mt-3">
              <Link to="/edit-details">
                <button className="btn btn-md btn-primary">Edit Details</button>
              </Link>
            </div>

            {(auth.facebookAuth && auth.facebookAuth === true) ||
            (auth.googleAuth && auth.googleAuth === true) ? null : (
              <div className="container mt-3">
                <button
                  className="btn btn-md btn-primary"
                  onClick={(e) => logoutUser(auth.token)}
                >
                  Logout
                </button>
              </div>
            )}

            <div className="container mt-3">
              <button
                className="btn btn-md btn-danger"
                onClick={(e) => deleteUser(auth.token)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteUser, logoutUser })(Details);
