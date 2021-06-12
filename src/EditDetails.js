import React, { useState } from "react";
import { connect } from "react-redux";
import Brain from "./image/brain.png";
import "react-image-crop/dist/ReactCrop.css";
import ContentEditable from "react-contenteditable";
import ImageCropper from "./ImageCropper";
import { Redirect, Link } from "react-router-dom";
// actions
import { setAlert } from "./actions/alert";
import { editUserProfile } from "./actions/auth";
import noImageFound from "./image/no_image_found.png";
import "./css/Details.css";

const EditDetails = ({ auth, setAlert, editUserProfile }) => {
  // banner, profile
  const [imgCropSec, setImgCropSec] = React.useState(null);
  const bioRef = React.useRef("");
  const [details, setDetails] = React.useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    bio: "",
    bannerimg: "",
    profileimg: "",
    currpass: "",
    pass: "",
    cpass: "",
  });
  const [bannerimg, setBannerImg] = React.useState(null);
  const [profileimg, setProfileImg] = React.useState(null);

  const { firstname, lastname, username, email, bio, currpass, pass, cpass } =
    details;

  React.useEffect(() => {
    setDetails({
      ...details,
      firstname: auth.firstname,
      lastname: auth.lastname,
      username: auth.username,
      email: auth.email,
      bio: auth.bio,
      bannerimg: auth.bannerimg,
      profileimg: auth.profileimg,
    });
    bioRef.current = auth.bio;
    setBannerImg(auth.bannerimg);
    setProfileImg(auth.profileimg);
  }, [auth]);

  React.useEffect(() => {
    console.log(details.bio);
  }, [bio]);

  if (!auth.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const showPassword = (e, classname) => {
    e.preventDefault();

    if (classname === "currpassword") {
      let input = document.querySelector(`.${classname}`);
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    }

    if (classname === "password") {
      let inputs = document.querySelectorAll(`.${classname}`);
      for (let input of inputs) {
        if (input.type === "password") {
          input.type = "text";
        } else {
          input.type = "password";
        }
      }
    }
  };

  const confirmPassword = (e) => {
    e.preventDefault();
    let parent = e.target.parentNode;
    let msgDiv = parent.querySelector(".small");

    if (e.target.value === pass) {
      msgDiv.innerText = "Passwords match !";
    } else {
      msgDiv.innerText = "Passwords don't match !";
    }

    setDetails({ ...details, cpass: e.target.value });
  };

  const handleInput = (e, regex) => {
    e.preventDefault();
    let parent = e.target.parentNode;
    let msgDiv = parent.querySelector(".small");
    if (!regex.test(e.target.value)) {
      msgDiv.innerText = e.target.title;
    } else {
      msgDiv.innerText = "";
    }
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let key of Object.keys(details)) {
      //  no field empty
      if (details[key].length < 3) {
        setAlert("Please enter valid details", "uni-blue", 5000);
        return;
      }
    }
    editUserProfile({ ...details, bannerimg, profileimg });
  };

  const patterns = {
    firstpt: new RegExp("^[a-zA-Z]{3,}$"),
    lastpt: new RegExp("^[a-zA-Z]{3,}$"),
    // /^\w(\w|\.){1,28}\w$/i
    // /^\w(\w|\.(?!\.)){1,28}\w$/i - using negative lookahead
    usernamept: /^\w(\w|\.(?![._])){1,28}\w$/i,
    emailpt: /^\S+@\S+\.\S+$/i,
    passpt: /^.{6,}$/i,
  };

  const { firstpt, lastpt, usernamept, emailpt, passpt } = patterns;

  // additional
  const handleBioChange = (e) => {
    bioRef.current = e.target.value;
    // https://github.com/lovasoa/react-contenteditable/issues/161
    setDetails({ ...details, bio: bioRef.current });
  };

  return (
    <div className="container mt-2 mb-5 d-flex justify-content-center">
      <div className="card px-1 py-4">
        <div className="card-body">
          <h4 className="information mt-4">Edit your profile</h4>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="firstname"
                  value={firstname}
                  placeholder="First Name"
                  onChange={(e) => handleInput(e, firstpt)}
                  autoComplete="turn_off_autocomplete"
                  title="More than 3 characters long containing only alphabets"
                />{" "}
                <div className="small warning-msg"></div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="lastname"
                  value={lastname}
                  placeholder="Last name"
                  onChange={(e) => handleInput(e, lastpt)}
                  autoComplete="turn_off_autocomplete"
                  title="More than 3 characters long containing only alphabets"
                />{" "}
                <div className="small warning-msg"></div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => handleInput(e, usernamept)}
                  autoComplete="off"
                  title="Alphanumeric less than 30 characters with no consecutive periods and shouldn't end and start with period"
                />{" "}
                <div className="small warning-msg"></div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className=" form-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => handleInput(e, emailpt)}
                  autoComplete="off"
                  title="Email of the form anonymous@domain.com"
                />{" "}
                <div className="small warning-msg"></div>
              </div>
            </div>
            {/* Bio */}
            <div className="col-sm-12">
              <div className="section-head text-start mt-2">Your Bio</div>
              <ContentEditable
                className="m-0 p-0"
                html={bioRef.current} // innerHTML of the editable div
                disabled={false} // use true to disable editing
                onChange={handleBioChange} // handle innerHTML change
              />
            </div>
            <div className="col-sm-12">{/* Date of Birth */}</div>
            <div className="col-sm-12">{/* Social Links */}</div>
            {/* Banner Image */}
            <div className="col-sm-12">
              <div className="section-head text-start mt-2">Banner Image</div>
              {imgCropSec !== "banner" ? (
                <div className="p-0 m-0">
                  {bannerimg && bannerimg.length < 5 ? (
                    <img
                      src={noImageFound}
                      style={{
                        width: "50%",
                        height: "auto",
                        borderRadius: "0.7rem",
                      }}
                    />
                  ) : (
                    <img
                      src={bannerimg}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "0.7rem",
                      }}
                    />
                  )}
                  <div className="text-center">
                    <button
                      className="btn btn-primary btn-md py-1 mt-3"
                      type="submit"
                      onClick={(e) => setImgCropSec("banner")}
                      style={{ boxShadow: "none" }}
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              ) : (
                <ImageCropper
                  aspectRatio="4/1"
                  setImgCropSec={setImgCropSec}
                  setCustomImage={setBannerImg}
                />
              )}
            </div>
            {/* Profile Image */}
            <div className="col-sm-12">
              <div className="section-head text-start mt-2">Profile Image</div>
              {imgCropSec !== "profile" ? (
                <div className="p-0 m-0">
                  {bannerimg && bannerimg.length < 5 ? (
                    <img
                      src={noImageFound}
                      style={{
                        width: "50%",
                        height: "auto",
                        borderRadius: "0.7rem",
                      }}
                    />
                  ) : (
                    <img
                      src={profileimg}
                      style={{
                        width: "60%",
                        height: "auto",
                        borderRadius: "0.7rem",
                      }}
                    />
                  )}
                  <div className="text-center">
                    <button
                      className="btn btn-primary btn-md py-1 mt-3"
                      type="submit"
                      onClick={(e) => setImgCropSec("profile")}
                      style={{ boxShadow: "none" }}
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              ) : (
                <ImageCropper
                  aspectRatio="1/1"
                  setImgCropSec={setImgCropSec}
                  setCustomImage={setProfileImg}
                />
              )}
            </div>
            {/* -----------PASSWORD--------------- */}
            <div className="col-sm-12 text-start mt-3 mb-0">
              <h6 className="mb-0">Change Password</h6>
            </div>
            <div className="col-sm-12">
              <div className="input-group form-group">
                <input
                  className="form-control currpassword"
                  type="password"
                  name="currpass"
                  value={currpass}
                  placeholder="Current Password"
                  onChange={(e) => handleInput(e, passpt)}
                  autoComplete="turn_off_autocomplete"
                  aria-describedby="button-addon2"
                  title="Current password with atleast 6 characters long"
                />{" "}
                <button
                  className="btn btn-sm btn-view-pass"
                  type="button"
                  onClick={(e) => showPassword(e, "currpassword")}
                  id="button-addon2"
                >
                  <i className="fa fa-eye-slash" aria-hidden="true"></i>
                </button>
                <div className="d-block small warning-msg"></div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="input-group form-group">
                <input
                  className="form-control password"
                  type="password"
                  name="pass"
                  value={pass}
                  placeholder="New Password"
                  onChange={(e) => handleInput(e, passpt)}
                  autoComplete="turn_off_autocomplete"
                  aria-describedby="button-addon2"
                  title="Choose a strong password with atleast 6 characters long"
                />{" "}
                <button
                  className="btn btn-sm btn-view-pass"
                  type="button"
                  onClick={(e) => showPassword(e, "password")}
                  id="button-addon2"
                >
                  <i className="fa fa-eye-slash" aria-hidden="true"></i>
                </button>
                <div className="d-block small warning-msg"></div>
              </div>
            </div>
            <div className="col-sm-12">
              <div className="form-group">
                <input
                  className="form-control password"
                  type="password"
                  name="cpass"
                  value={cpass}
                  placeholder="Confirm Password"
                  onChange={(e) => confirmPassword(e)}
                  autoComplete="turn_off_autocomplete"
                />{" "}
                <div className="d-block small warning-msg"></div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <button
                className="btn btn-primary btn-md py-1 mt-3"
                type="submit"
                onClick={(e) => handleSubmit(e)}
                style={{ boxShadow: "none" }}
              >
                Update Profile
              </button>
            </div>
            <div className="col-sm-6">
              <Link
                to="/details"
                className="btn btn-secondary btn-md py-1 mt-3"
                type="submit"
                style={{ boxShadow: "none" }}
              >
                Cancel
              </Link>
            </div>
          </div>
          {/* <button
            className="btn btn-primary btn-lg py-1 mt-3"
            type="submit"
            onClick={(e) => handleSubmit(e)}
            style={{ boxShadow: "none" }}
          >
            Update Profile
          </button> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, editUserProfile })(
  EditDetails
);
