import {
  USER_LOADED,
  REGISTER_SUCCESS,
  EMAIL_SENT,
  SET_USER,
} from "../actions/types";
import banner from "../image/banner.jpg";
import square from "../image/square.jpg";

const initialState = {
  token: null,
  emailSent: false,
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
    case EMAIL_SENT:
      return {
        ...state,
        emailSent: payload, //true
      };
    case SET_USER:
      localStorage.setItem("__image_cropper_token__", payload.token);
      return {
        ...state,
        token: payload.token,

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
