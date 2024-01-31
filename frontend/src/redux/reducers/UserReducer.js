import {
  GET_USER_LIST,
  GET_USER_DETAIL,
  GET_PROFILE_DETAIL,
  GET_CURRENT_USER_ACTION,
} from "../constants";


const initialState = {
  userLogin: null,
  arrUser: [],
  userDetail: {},
  profile: {},
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_LIST:
      state.arrUser = action.arrUser;
      return { ...state };

    case GET_CURRENT_USER_ACTION:
      state.userLogin = action.userLogin;
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
