import { CHUYEN_TAB_ACTIVE, LAY_DANH_SACH_DON_HANG_THEO_USER, LAY_DOANH_THU } from "../constants";
import { quanLyDonHangService } from "../../services/QuanLyDonHangService";
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';



export const layDoanhThuAction = (year) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDonHangService.layDoanhThu(year);
            dispatch({
                type:LAY_DOANH_THU,
                arrDoanhThu: result.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}