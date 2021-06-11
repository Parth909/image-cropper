import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = {
  msg: "",
  alertType: "",
  timeout: 4000,
};

export default function alert(state = initialState, action) {
  // {msg, alertType} in -> payload && {payload, type} in => action
  // dispatched object will be in action
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return { ...state, ...payload };
    case REMOVE_ALERT:
      return { ...state, msg: "", alertType: "" };
    default:
      return state;
  }
}
