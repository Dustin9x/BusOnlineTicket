import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { GET_MOD_LIST, GET_MOD_DETAIL } from "../constants";

let mod = {};
if (localStorage.getItem(USER_LOGIN)) {
  mod = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: mod,
  arrMod: [],
  modDetail: {},
};

export const ModReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOD_LIST:
      state.arrMod = action.arrMod;
      return { ...state };
    case GET_MOD_DETAIL:
      state.modDetail = action.modDetail;
      return { ...state };

    default:
      return state;
  }
};
