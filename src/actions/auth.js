import axios from "axios";
import { setAlert } from "./alert";
// types
import { EDIT_USER_PROFILE, SET_USER, SET_LOADING } from "./types";

export const editUserProfile = (data) => async (dispatch) => {
  data["currentpassword"] = data["currpass"];
  data["password"] = data["pass"];
  delete data["currpass"];
  delete data["pass"];
  delete data["cpass"];

  // make request

  console.log(data);
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
    await axios.post(`/api/register`, obj);

    dispatch(
      setAlert(`An email has been sent to ${data.email}`, "uni-blue", 10000)
    );
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
    await axios.post(`/api/register/activate`, { token });

    dispatch(
      setAlert(
        "You have successfully registered please login",
        "uni-blue",
        10000
      )
    );
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

    if (res.status === 200) {
      // set the user
      const payload = {
        token: res.data.token,
        isAuthenticated: true,
        loading: false,
        _id: res.data.user._id,
        firstname: res.data.user.firstname,
        lastname: res.data.user.lastname,
        username: res.data.user.username,
        email: res.data.user.email,
        bio: res.data.user.bio,
        bannerimg: res.data.user.bannerimg,
        profileimg: res.data.user.profileimg,
        hobbies: res.data.user.hobbies,
      };
      dispatch({
        type: SET_USER,
        payload,
      });
      dispatch(setAlert("Successfully logged in", "uni-blue", 10000));
    } else {
      dispatch(setAlert("Cannot login", "uni-danger", 10000));
    }
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

export const loadUser = (token) => async (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  try {
    const res = await axios.get("/api/user", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      const payload = {
        token: token,
        isAuthenticated: true,
        loading: false,
        _id: res.data.user._id,
        firstname: res.data.user.firstname,
        lastname: res.data.user.lastname,
        username: res.data.user.username,
        email: res.data.user.email,
        bio: res.data.user.bio,
        bannerimg: res.data.user.bannerimg,
        profileimg: res.data.user.profileimg,
        hobbies: res.data.user.hobbies,
      };
      dispatch({
        type: SET_USER,
        payload,
      });
    }

    dispatch({
      type: SET_LOADING,
      payload: false,
    });
    console.log(res.data);
  } catch (error) {
    dispatch(
      // when JWT malforms | token is absent
      setAlert(
        error.response.data.error ?? "Login to continue",
        "uni-danger",
        5000
      )
    );
    dispatch({
      type: SET_LOADING,
      payload: false,
    });
  }
};
