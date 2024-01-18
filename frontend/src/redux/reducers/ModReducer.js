import { GET_MOD_LIST, GET_MOD_DETAIL } from "../constants";



const initialState = {
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
