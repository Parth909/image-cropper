import axios from "axios";
import { setAlert } from "./alert";
// types
import { EMAIL_SENT, EDIT_USER_PROFILE } from "./types";

export const editUserProfile = (data) => async (dispatch) => {
  data["currentpassword"] = data["currpass"];
  data["password"] = data["pass"];
  delete data["currpass"];
  delete data["pass"];
  delete data["cpass"];

  // make request

  console.log(data);
  dispatch({
    type: EDIT_USER_PROFILE,
    // data from db
    payload: { ...data, currentpassword: data.currpass, password: data.pass },
  });
};

export const registerUser = (data) => async (dispatch) => {
  const obj = {
    firstname: data.first,
    lastname: data.last,
    username: data.username.toLowerCase(),
    email: data.email,
    password: data.pass,
  };

  try {
    const res = await axios.post(`/api/register`, obj);

    dispatch(
      setAlert(`An email has been sent to ${data.email}`, "uni-blue", 10000)
    );

    dispatch({
      type: EMAIL_SENT,
      payload: true,
    });
  } catch (error) {
    dispatch(
      setAlert(
        error.response.data.error ?? "Internal Server Error",
        "uni-danger",
        5000
      )
    );
  }
};

export const activateUser = (token) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/register/activate`, { token });

    dispatch(
      setAlert(
        "You have successfully registered please login",
        "uni-blue",
        10000
      )
    );

    dispatch({
      type: EMAIL_SENT,
      payload: false,
    });
  } catch (error) {
    dispatch(
      setAlert(
        error.response.data.error ?? "Internal Server Error",
        "uni-danger",
        5000
      )
    );
  }
};

export const loginUser = (data) => async (dispatch) => {
  const obj = {
    email: data.email,
    password: data.pass,
  };
  try {
    const res = await axios.post(`/api/login`, obj);

    console.log(res);

    dispatch(setAlert("Successfully logged in", "uni-blue", 10000));

    dispatch({
      type: EMAIL_SENT,
      payload: false,
    });
  } catch (error) {
    dispatch(
      setAlert(
        error.response.data.error ?? "Internal Server Error",
        "uni-danger",
        5000
      )
    );
  }
};

export const loadUser = () => async (dispatch) => {};
