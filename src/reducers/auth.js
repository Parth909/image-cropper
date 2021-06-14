import { SET_USER, SET_LOADING, REMOVE_USER } from "../actions/types";

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  _id: null,
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  bio: "",
  bannerimg: "",
  profileimg: "",
  hobbies: [],
  facebookAuth: null,
};

export default function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_USER:
      localStorage.setItem("__image_cropper_token__", payload.token);
      return {
        ...state,
        ...payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case REMOVE_USER:
      localStorage.removeItem("__image_cropper_token__");
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
