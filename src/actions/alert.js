import { SET_ALERT, REMOVE_ALERT } from "./types";

// mem-danger
export const setAlert =
  (msg, alertType = "uni-blue", timeout = 4500) =>
  (dispatch) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, timeout },
    });
  };

export const removeAlert = () => (dispatch) => {
  dispatch({
    type: REMOVE_ALERT,
    payload: { msg: "", alertType: "" },
  });

  // Alert will be removed form the modal
};
