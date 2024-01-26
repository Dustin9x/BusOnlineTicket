import { profitService } from "../../services/ProfitService";
import { GET_PROFIT_BY_MONTH, GET_PROFIT_BY_ROUTE } from "../constants";



export const GetProfitByRouteAction = (year) => {
    return async (dispatch) => {
        try {
            const result = await profitService.getProfitByRoute(year);
            dispatch({
                type: GET_PROFIT_BY_ROUTE,
                arrProfitByRoute: result.data.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const GetProfitByMonthAction = (year) => {
    return async (dispatch) => {
        try {
            const result = await profitService.getProfitByMonth(year);
            dispatch({
                type: GET_PROFIT_BY_MONTH,
                arrProfitByMonth: result.data.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}