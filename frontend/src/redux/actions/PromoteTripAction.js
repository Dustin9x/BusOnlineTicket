import { GET_PROMOTE_TRIP_DETAIL, GET_PROMOTE_TRIP_LIST } from "../constants";
import { history } from "../../App";
import { notification } from "antd";
import { promoteTripService } from "../../services/PromoteTripService";


export const getPromoteTripListAction = () => {
    return async (dispatch) => {
        try {
            const result = await promoteTripService.getPromoteTrip();
            if (result.data.status === 200) {
                dispatch({
                    type: GET_PROMOTE_TRIP_LIST,
                    arrPromoteTrip: result.data.data
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const getPromoteTripByIdAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await promoteTripService.getPromoteTripById(id);
            if (result.data.status === 200) {
                dispatch({
                    type: GET_PROMOTE_TRIP_DETAIL,
                    promoteTripDetail: result.data.data[0],
                })
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const addNewPromoteTripAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await promoteTripService.addNewPromoteTrip(formData)
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Add new promote trip successfully.</>
                ),
            });
            history.push('/admin/promotripmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}

export const updatePromoteTripByIdAction = (id,formData) => {
    return async (dispatch) => {
        try {
            const result = await promoteTripService.updatePromoteTrip(id,formData);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Update promote trip successfully</>
                ),
            });
            history.push('/admin/promotripmng');
        } catch (error) {
            console.log('error', error);
        }
    }
}


export const deletePromoteTripAction = (id) => {
    return async (dispatch) => {
        try {
            const result = await promoteTripService.deletePromoteTrip(id);
            notification.success({
                closeIcon: true,
                message: 'Success',
                description: (
                    <>Delete promote trip successfully</>
                ),
            });
            dispatch(getPromoteTripListAction())
        } catch (error) {
            console.log('error', error);
        }
    }
}