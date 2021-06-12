import { USER_LOADED, REGISTER_SUCCESS } from "../actions/types";
import banner from "../image/banner.jpg";
import square from "../image/square.jpg";

// const initialState = {
//   token: null,
//   isAuthenticated: true,
//   loading: false,
//   firstname: null,
//   lastname: null,
//   username: null,
//   email: null,
//   bio: null,
//   bannerimg: null,
//   profileimg: null,
// };

const initialState = {
  token: null,
  isAuthenticated: true,
  loading: false,
  firstname: "Parth",
  lastname: "Bhoir",
  username: "parth_bhoir979",
  email: "parth.bhoir909@gmail.com",
  bio: "We are the greatest of all time in this whole world<br><br>Noice noice &lt;strong&gt;&lt;/strong&gt;",
  bannerimg: banner,
  profileimg: square,
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
