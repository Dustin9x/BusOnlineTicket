import { OrderDetail } from "../../_core/models/OrderDetail";
import { quanLyDatVeService } from "../../services/QuanLyDatVeService";
import { CHON_GHE, CHUYEN_TAB, LAY_DANH_SACH_GHE, ORDER_CONFIRM } from "../constants";
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';


export const layDanhSachGheAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.layDanhSachGhe(id);
            dispatch({
                type: LAY_DANH_SACH_GHE,
                danhSachGhe: result.data.content
            })
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const chonGheAction = (danhSachGheSelect) => {
    return async (dispatch) => {
        try {
            const result = await quanLyDatVeService.chonGhe(danhSachGheSelect);
            dispatch({
                type: CHON_GHE,
                danhSachGheSelect: danhSachGheSelect
            })
            console.log('chonGhe',result)
        } catch (error) {
            console.log(error)
        }
    }
}

export const orderConfirmAction = (orderDetail = new OrderDetail()) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)
            dispatch({
                type: ORDER_CONFIRM,
                donHang: orderDetail
            })
            await dispatch(hideLoadingAction)
            dispatch({type:CHUYEN_TAB})
        } catch (error) {
            console.log(error)
        }
    }
}

