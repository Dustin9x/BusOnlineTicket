import { notification } from "antd";
import { OrderDetail } from "../../_core/models/OrderDetail";
import { orderService } from "../../services/OrderService";
import { CHON_GHE, CHUYEN_TAB, CHUYEN_TAB_ACTIVE, GET_TICKET_BY_USER, ORDER_CONFIRM } from "../constants";
import { displayLoadingAction, hideLoadingAction } from './LoadingAction';
import { TOKEN, USER_LOGIN } from "../../util/settings/config";
import { getCurrentUserAction } from "./UserAction";
import { userService } from "../../services/UserService";

const userLoginId = null;

let accessToken = {}
if (localStorage.getItem(TOKEN)) {
    accessToken = localStorage.getItem(TOKEN)
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
            dispatch({ type: CHUYEN_TAB })
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
            dispatch({ type: CHUYEN_TAB_ACTIVE, number: '2' })
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
            const result = await userService.getCurrentUser(accessToken);
            const userLoginId = result.data.id;
            const result2 = await orderService.getTicketByUser(userLoginId);
            dispatch({
                type: GET_TICKET_BY_USER,
                arrTicket: result2.data.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const cancelTicketAction = (id, day) => {
    return async (dispatch) => {
        try {
            const result = await orderService.cancelTicket(id, day);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Cancel ticket successfully</>
                ),
            });
            dispatch(getTicketByUserAction(userLoginId))
        } catch (error) {
            console.log(error)
        }
    }
}



