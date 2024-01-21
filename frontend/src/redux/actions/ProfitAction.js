import { LAY_DOANH_THU } from "../constants";
import { profitService } from "../../services/ProfitService";



export const GetProfitAction = (year) => {
    return async (dispatch) => {
        try {
            const result = await profitService.layDoanhThu(year);
            dispatch({
                type:LAY_DOANH_THU,
                arrDoanhThu: result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}