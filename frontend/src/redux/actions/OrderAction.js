import { notification } from "antd";
import { OrderDetail } from "../../_core/models/OrderDetail";
import { orderService } from "../../services/OrderService";
import { CHON_GHE, CHUYEN_TAB, CHUYEN_TAB_ACTIVE, ORDER_CONFIRM } from "../constants";
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';



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


export const bookSeatAction = (ticket) => {
    return async (dispatch) => {
        try {
            dispatch(displayLoadingAction)

            const result = await orderService.postSeat(ticket);
            notification.success({
                closeIcon: true,
                message: "Success",
                description: <>Book ticket Successfully. Thank you!</>,
              });
            await dispatch(hideLoadingAction)
            dispatch({type:CHUYEN_TAB_ACTIVE,number:'3'})
        } catch (error) {
            console.log(error)
        }
    }
}

export const bookTicketAction = (ticket) => {
    return async (dispatch) => {
        try {

            const result = await orderService.addTicket(ticket);
        } catch (error) {
            console.log(error)
        }
    }
}

export const getTicketByUserAction = (id) => {
    return async (dispatch) => {
        try {

            const result = await orderService.getTicketByUser(id);
        } catch (error) {
            console.log(error)
        }
    }
}

