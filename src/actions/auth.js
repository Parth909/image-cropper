import axios from "axios";
import { setAlert } from "./alert";
// types
import { SET_USER, SET_LOADING, REMOVE_USER } from "./types";

export const editUserProfile = (data, token) => async (dispatch) => {
  delete data["password"];
  delete data["currpass"];

  try {
    const res = await axios.post("/api/user", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      delete res.data.user.createdAt;
      delete res.data.user.updatedAt;
      delete res.data.user._v;
      const payload = {
        token: token,
        ...res.data.user,
      };
      dispatch({
        type: SET_USER,
        payload,
      });
      dispatch(setAlert("Successfully updated the profile", "uni-blue", 5000));
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

export const deleteUser = (token) => async (dispatch) => {
  try {
    await axios.delete("/api/user", {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: REMOVE_USER,
      payload: null,
    });
    dispatch(setAlert("Successfully deleted account", "uni-blue", 5000));
  } catch (error) {
    dispatch(
      // when JWT malforms | token is absent
      setAlert(
        error.response.data.error ?? "Error Deleting Account !",
        "uni-danger",
        5000
      )
    );
  }
};

export const logoutUser = (token) => async (dispatch) => {
  // For now just removing token from localStorage Only
  // For security purpose make the make the token invalid(expire) explicitly in the backend
  dispatch({
    type: REMOVE_USER,
    payload: null,
  });
  dispatch(setAlert("Successfully logged out", "uni-blue", 5000));
};
