import { USER_LOADED, REGISTER_SUCCESS } from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: true,
  loading: false,
  firstname: null,
  lastname: null,
  username: null,
  email: null,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("__image_cropper_token__", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        ...payload,
      };
    default:
      return state;
  }
}
