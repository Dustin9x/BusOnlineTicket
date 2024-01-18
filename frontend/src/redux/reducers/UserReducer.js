import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  GET_DRIVER_LIST,
  GET_USER_LIST,
  LOGIN_ACTION,
  GET_USER_DETAIL,
  GET_PROFILE_DETAIL,
  GET_CURRENT_USER_ACTION,
} from "../constants";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  // loginInfo: {},
  userLogin: {},
  arrUser: [],
  userDetail: {},
  profile: {}
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      state.arrUser = action.arrUser;
      return { ...state };

    // case LOGIN_ACTION:
    //   localStorage.setItem(TOKEN, action.userLogin.accessToken);
    //   return { ...state };

    case GET_CURRENT_USER_ACTION:
      state.userLogin = action.userLogin;
      console.log('userLogin321',state.userLogin)
      return { ...state };

    case GET_DRIVER_LIST:
      state.arrDriver = action.arrDriver;
      return { ...state };

    case GET_USER_DETAIL:
      state.userDetail = action.userDetail;
      return { ...state };

    case GET_PROFILE_DETAIL:
      state.profile = action.profile;
      return { ...state };

    default:
      return state;
  }
};
