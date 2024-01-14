import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import {
  GET_DRIVER_LIST,
  LAY_CHI_TIET_NGUOI_DUNG,
  GET_USER_LIST,
  LOGIN_ACTION,
  SET_THONG_TIN_DAT_VE,
  GET_USER_DETAIL,
} from "../constants";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: user,
  arrUser: [],
  userDetail: {},
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

    case SET_THONG_TIN_DAT_VE:
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      return { ...state };
    default:
      return state;
  }
};
