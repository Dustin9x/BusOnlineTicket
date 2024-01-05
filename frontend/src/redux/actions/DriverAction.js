import { driverService } from "../../services/DriverService"
import { GET_DRIVER_LIST, LAY_CHI_TIET_NGUOI_DUNG, LAY_DANH_SACH_NGUOI_DUNG, LAY_LAI_MAT_KHAU_ACTION, SET_THONG_TIN_DAT_VE, TIM_KIEM_NGUOI_DUNG } from "../constants";
import { history } from '../../App';
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";

export const layThongTinDatVeAction = () => {
    return async (dispatch) => {
        try {
            const result = await driverService.layThongTinDatVe();
            if (result.data.status === 200) {
                dispatch({
                    type: SET_THONG_TIN_DAT_VE,
                    thongTinNguoiDung: result.data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const getDriverAction = () => {
    return async (dispatch) => {
        try {
            const result = await driverService.getDriver();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_DRIVER_LIST,
                    arrDriver: result.data.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const layThongTinNguoiDungAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await driverService.layDanhSachNguoiDung(id);
            if (result.data.status === 200) {
                dispatch({
                    type: LAY_CHI_TIET_NGUOI_DUNG,
                    profile: result.data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

