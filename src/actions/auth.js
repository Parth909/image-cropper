import { setAlert } from "./alert";
// types
import { USER_LOADED, REGISTER_SUCCESS, EDIT_USER_PROFILE } from "./types";

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

export const loadUser = () => async (dispatch) => {};

export const registerUser = () => async (dispatch) => {};
