import React from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "./css/Auth.css";
import Brain from "./image/brain.png";
// actions
import { setAlert } from "./actions/alert";
import { loginUser, loadUser } from "./actions/auth";

const Login = ({
  auth: { isAuthenticated },
  setAlert,
  loginUser,
  loadUser,
}) => {
  const [data, setData] = React.useState({
    email: "",
    pass: "",
  });

  const { email, pass } = data;

  React.useEffect(() => {
    let token = localStorage.getItem("__image_cropper_token__");
    if (token !== null) {
      loadUser(token);
    }
  }, []);

  if (isAuthenticated) {
    return <Redirect to="/details" />;
  }

  const showPassword = (e) => {
    e.preventDefault();
    let input = document.querySelector(".password");
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  const handleInput = (e, regex) => {
    e.preventDefault();
    if (e.target.name !== "pass") {
      let parent = e.target.parentNode;
      let msgDiv = parent.querySelector(".small");
      if (!regex.test(e.target.value)) {
        msgDiv.innerText = e.target.title;
      } else {
        msgDiv.innerText = "";
      }
    }
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let key of Object.keys(data)) {
      //  no field empty
      if (data[key].length < 3) {
        setAlert("Please enter valid details.", "uni-blue", 5000);
      }
    }
    let divs = document.querySelectorAll(".small");
    for (let div of divs) {
      // Passwords match ! length
      if (div.innerText.length > 1) {
        setAlert("Please enter valid details", "uni-blue", 5000);
        return;
      }
    }
    loginUser(data);
  };

  const patterns = {
    emailpt: /^\S+@\S+\.\S+$/i,
    passpt: /^.{6,}$/i,
  };

  const { emailpt, passpt } = patterns;

  return (
    <div className="container mt-2 mb-5 d-flex justify-content-center">
      <div className="card px-1 py-4">
        <div className="card-body">
          <img
            src={Brain}
            style={{ height: "100px", width: "100px" }}
            alt=".."
          />
          <form className="p-0 m-0">
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
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
                  <div className="small text-start warning-msg"></div>
                </div>
              </div>
              <div className="col-sm-12">
                {/* input-group & form-group don't work with each other sometimes */}
                {/* try them seperately */}
                <div className="input-group">
                  <input
                    className="form-control password"
                    type="password"
                    name="pass"
                    value={pass}
                    placeholder="Password"
                    onChange={(e) => handleInput(e, passpt)}
                    autoComplete="turn_off_autocomplete"
                    aria-describedby="button-addon2"
                    title="Enter your password atleast 6 characters long"
                  />{" "}
                  <button
                    className="btn btn-sm btn-view-pass"
                    type="button"
                    onClick={(e) => showPassword(e)}
                    id="button-addon2"
                  >
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                  </button>
                  <br />
                  <div className="d-block small warning-msg"></div>
                </div>
              </div>
            </div>
          </form>
          <button
            className="btn btn-primary btn-lg mt-3 py-1"
            type="submit"
            onClick={(e) => handleSubmit(e)}
            style={{ boxShadow: "none" }}
          >
            Login
          </button>
        </div>
        <div className="text-center">
          <Link to="/register" style={{ textDecoration: "none" }}>
            Don't have an account yet ? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, loginUser, loadUser })(
  Login
);
