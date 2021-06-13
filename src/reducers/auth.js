import {
  USER_LOADED,
  REGISTER_SUCCESS,
  SET_USER,
  SET_LOADING,
} from "../actions/types";
import banner from "../image/banner.jpg";
import square from "../image/square.jpg";

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
};

// const initialState = {
//   token: null,
//   isAuthenticated: false,
//   loading: false,
//   firstname: "Parth",
//   lastname: "Bhoir",
//   username: "parth_bhoir979",
//   email: "parth.bhoir909@gmail.com",
//   bio: "We are the greatest of all time in this whole world<br><br>Noice noice &lt;strong&gt;&lt;/strong&gt;",
//   bannerimg: banner,
//   profileimg: square,
// };

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
