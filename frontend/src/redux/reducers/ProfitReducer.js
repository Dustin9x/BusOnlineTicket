import { GET_PROFIT_BY_MONTH, GET_PROFIT_BY_ROUTE } from "../constants";

const initialState = {
  arrProfitByRoute: [],
  arrProfitByMonth: [],
}

export const ProfitReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_PROFIT_BY_ROUTE: {
      state.arrProfitByRoute = action.arrProfitByRoute;
      return { ...state }
    }

    case GET_PROFIT_BY_MONTH: {
      state.arrProfitByMonth = action.arrProfitByMonth;
      return { ...state }
    }

    default:
      return state
  }
}
