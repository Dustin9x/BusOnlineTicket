import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  GET_DRIVER_LIST,
  GET_USER_LIST,
  LOGIN_ACTION,
  GET_USER_DETAIL,
  GET_PROFILE_DETAIL,
} from "../constants";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: user,
  arrUser: [],
  userDetail: {},
  profile: {}
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      state.arrUser = action.arrUser;
      return { ...state };

    case LOGIN_ACTION:
      const { loginInfo } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(loginInfo.user));
      localStorage.setItem(TOKEN, loginInfo.accessToken);
      return { ...state, userLogin: loginInfo.user };

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
