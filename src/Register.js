import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./css/Auth.css";
import Brain from "./image/brain.png";
import jwt from "jsonwebtoken";
// actions
import { setAlert } from "./actions/alert";
import {
  registerUser,
  loadUser,
  refreshSignIn,
  signinFacebook,
  signinGoogle,
  refreshSignInGoogle,
} from "./actions/auth";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

const Register = ({
  auth: { isAuthenticated },
  setAlert,
  registerUser,
  loadUser,
  signinFacebook,
  refreshSignIn,
  signinGoogle,
  refreshSignInGoogle,
}) => {
  const [data, setData] = React.useState({
    first: "",
    last: "",
    username: "",
    email: "",
    pass: "",
    cpass: "",
  });

  const { first, last, username, email, pass, cpass } = data;

  React.useEffect(() => {
    let token = localStorage.getItem("__image_cropper_token__");
    if (token !== null) {
      loadUser(token);
    }
  }, []);

  if (isAuthenticated) {
    return <Redirect to="/details" />;
  }

  const componentClicked = () => {
    console.log("clicked");
  };

  const responseFacebook = (response) => {
    let token = localStorage.getItem("__image_cropper_token__");
    if (token !== null) {
      let data = jwt.decode(token);
      if (response.name !== undefined) {
        const obj = {
          name: response.name,
          email: response.email,
          image_url: response.picture.data.url,
          _id: data._id,
        };
        console.log("refreshing token");
        refreshSignIn(obj);
      }
    } else {
      if (response.name !== undefined) {
        const obj = {
          name: response.name,
          email: response.email,
          image_url: response.picture.data.url,
        };
        console.log("obtaining token first time");
        signinFacebook(obj);
      }
    }
  };

  // const obj = {
  //   name: response.profileObj.name,
  //   email: response.profileObj.email,
  //   image_url: response.profileObj.imageUrl,
  // };
  // signinGoogle(obj);

  const responseGoogle = (response) => {
    if (response.profileObj !== undefined) {
      let token = localStorage.getItem("__image_cropper_token__");
      if (token !== null) {
        let data = jwt.decode(token);
        const obj = {
          name: response.profileObj.name,
          email: response.profileObj.email,
          image_url: response.profileObj.imageUrl,
          _id: data._id,
        };
        console.log("refreshing token");
        refreshSignInGoogle(obj);
      } else {
        const obj = {
          name: response.profileObj.name,
          email: response.profileObj.email,
          image_url: response.profileObj.imageUrl,
        };
        console.log("obtaining token first time");
        signinGoogle(obj);
      }
    }

    if (
      response.error &&
      !response.error.includes("idpiframe_initialization")
    ) {
      setAlert(
        "Cannot login using google. Try doing this in Settings -> Privacy and Security -> Clear browsing data -> Clear cached images and files",
        "uni-danger",
        10000
      );
    }
  };

  const showPassword = (e) => {
    e.preventDefault();
    let inputs = document.querySelectorAll(".password");
    for (let input of inputs) {
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
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

    setData({ ...data, cpass: e.target.value });
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
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let key of Object.keys(data)) {
      //  no field empty
      if (data[key].length < 3) {
        setAlert("Please enter valid details", "uni-blue", 5000);
        return;
      }
    }
    if (pass !== cpass) {
      setAlert("Passwords should match", "uni-blue", 5000);
      return;
    }
    let divs = document.querySelectorAll(".small");
    for (let div of divs) {
      // Passwords match ! length
      if (div.innerText.length > 17) {
        setAlert("Please enter valid details", "uni-blue", 5000);
        return;
      }
    }
    registerUser(data);
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

  return (
    <div
      className="container mt-2 mb-5 d-flex justify-content-center"
      id="page-top"
    >
      <div className="card px-1 py-4">
        <div className="card-body">
          <img
            src={Brain}
            style={{ height: "100px", width: "100px" }}
            alt=".."
          />
          <h6 className="information mt-4">
            Please provide the following information for registering
          </h6>
          <form className="p-0 m-0">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="first"
                    value={first}
                    placeholder="First Name"
                    onChange={(e) => handleInput(e, firstpt)}
                    autoComplete="turn_off_autocomplete"
                    title="Firstname atleast 3 characters long containing only alphabets"
                  />{" "}
                  <div className="small warning-msg"></div>
                </div>
              </div>
              <div className="col-sm-12">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="last"
                    value={last}
                    placeholder="Last name"
                    onChange={(e) => handleInput(e, lastpt)}
                    autoComplete="turn_off_autocomplete"
                    title="Lastname atleast 3 characters long containing only alphabets"
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
              <div className="col-sm-12">
                <div className="input-group form-group">
                  <input
                    className="form-control password"
                    type="password"
                    name="pass"
                    value={pass}
                    placeholder="Password"
                    onChange={(e) => handleInput(e, passpt)}
                    autoComplete="turn_off_autocomplete"
                    aria-describedby="button-addon2"
                    // title should be long such that it goes on next line
                    title="Choose a strong password with atleast six characters long"
                  />{" "}
                  <button
                    className="btn btn-sm btn-view-pass"
                    type="button"
                    onClick={(e) => showPassword(e)}
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
          </form>
          <div className=" d-flex flex-column text-center px-5 mt-3 mb-3 ">
            {" "}
            <small className="agree-text">
              By Registering you agree to the
            </small>{" "}
            <a href="#page-top" className="terms">
              Terms & Conditions
            </a>{" "}
          </div>{" "}
          <button
            className="btn btn-primary btn-lg py-1"
            type="submit"
            onClick={(e) => handleSubmit(e)}
            style={{ boxShadow: "none" }}
          >
            Register
          </button>
          <div className="d-block mt-2">
            <FacebookLogin
              appId="274370707485284"
              autoLoad={false}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
              cssClass="loginBtn loginBtn--facebook btn btn-primary"
            />
          </div>
          <div className="d-block mt-2">
            <GoogleLogin
              clientId="1079226342492-s3jc9388fjl1kaqdqfr7fcml76j33sg4.apps.googleusercontent.com"
              buttonText="Login With Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              className="loginBtn loginBtn--google"
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
        <div className="text-center">
          <Link to="/login" style={{ textDecoration: "none" }}>
            Have an account ? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setAlert,
  registerUser,
  loadUser,
  refreshSignIn,
  signinFacebook,
  signinGoogle,
  refreshSignInGoogle,
})(Register);
